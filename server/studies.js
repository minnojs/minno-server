const fs            = require('fs-extra');
const config      = require('../config');
const dateFormat    = require('dateformat');
const path          = require('path');
const utils         = require('./utils');
const sender        = require('./sender');
const sanitize      = require('sanitize-filename');
const connection    = Promise.resolve(require('mongoose').connection);

const {user_info, user_info_by_name}   = require('./users');


const PERMISSION_OWNER     = 'owner';
const PERMISSION_READ_ONLY = 'read only';

function create_version_obj(study_id, state, id) {
    const now     = new Date();
    const creation_date = dateFormat(now, 'yyyymmdd.HHMMss');

    return {id, hash: generate_hash(study_id, creation_date, state), creation_date, state, experiments:[]};
}

function generate_hash(study_id, creation_date, state, id) {
    return utils.sha1(study_id + creation_date + state + id + '*');
}

function get_pending_studies(user_id) {
    return connection.then(function (db) {
        const users = db.collection('users');
        return users.findOne({_id:user_id})
            .then(user_result =>user_result.pending_studies);

    });
}


function get_studies(user_id) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        const studies   = db.collection('studies');

        return Promise.all([
            get_user_studies(),
            get_public_studies(),
            get_bank_studies()
        ])
        .then(studyArr => [].concat.apply([], studyArr));

        function get_user_studies(){
            return users.findOne({_id:user_id})
            .then(user_result => {

                const study_ids = user_result.studies.map(study => study.id);
                return studies
                .find({ _id: { $in: study_ids } })
                .toArray()

                .then(user_studies =>  user_studies.map(study =>{
                    const user_data = study.users.find(user=>user.user_id===user_id);
                    return composeStudy(study, {
                        permission: user_data.deleted ? 'deleted' : user_data.permission,
                        has_data_permission: user_data.permission === 'owner' || user_data.data_permission === 'visible',
                        study_type:'regular',
                        base_url:study.folder_name,
                        tags: get_tags(user_result, study)
                    });
                }
                ));
            });
        }

        function get_bank_studies(){
            return users.findOne({user_name:'bank'})
            .then(user_result => {
                const study_ids = user_result.studies.map(study => study.id);
                return studies
                .find({ _id: { $in: study_ids } })
                .toArray()
                .then(studies => studies.filter(study=>!study.users.find(user=>user.user_id===user_result._id).deleted))
                .then(studies => studies.map(study => composeStudy(study, {
                    is_bank: true,
                    bank_type: study.bank_type,
                    permission: PERMISSION_READ_ONLY,
                    study_type:'regular',
                    base_url:study.folder_name,
                    tags: get_tags(user_result, study)
                })));
            });
        }
        function get_public_studies(){
            return studies
            .find({$and: [{is_public: true}, {users: {$not: {$elemMatch: {user_id: user_id } } }}] })
            .toArray()
            .then(studies => studies.map(study => composeStudy(study, {
                is_public: true,
                users: study.users,
                permission: PERMISSION_READ_ONLY,
                study_type:'regular',
                base_url:study.folder_name,
                tags: []
            })));
        }
    });


    function get_tags(user_result, study){ return user_result.studies.find(study2 => study2.id === study._id).tags.map(tag_id=> user_result.tags.find(tag => tag.id === tag_id)); }

    function composeStudy(study, overide){
        return Object.assign({
            id: study._id,
            name:study.name,
            type:study.type,
            versions:study.versions,
            is_public: study.is_public,
            description: study.description,

            is_published: study.versions && study.versions.length>1 && study.versions[study.versions.length-1].state==='Published',
            is_locked:study.locked,
            // is_template:false,
            last_modified:study.modify_date
        }, overide);
    }
}

function get_collaborations(user_id, study_id){
    return has_read_permission(user_id, study_id)
        .then(data=>
        {
            const users = data.study_data.users.filter(user=>user.user_id!==user_id && user.permission!=='owner');
            const study_name = data.study_data.name;
            const is_public = data.study_data.is_public;
            const link = data.study_data.link;
            return {users, study_name, is_public, link};
        });
}


function get_id_with_link(link){
    return connection.then(function (db) {
        const studies = db.collection('studies');
        return studies.findOne({link});
    });
}



function get_owner(user_id, study_id){
    return has_read_permission(user_id, study_id)
        .then(data=>
        {
            const owner_obj = data.study_data.users.filter(user=>user.permission==='owner')[0];

            return user_info(owner_obj.user_id);
            // return {users, study_name, is_public};
        });
}

function remove_collaboration(user_id, study_id, collaboration_user_id){
    return connection.then(function (db) {
        const studies   = db.collection('studies');
        const users   = db.collection('users');
        return has_read_permission(user_id, study_id)
            .then(()=>
                Promise.all([
                    studies.updateOne({_id: study_id},
                        {$pull: {users: {user_id: collaboration_user_id}}}),
                    users.updateOne({_id: collaboration_user_id},
                        {$pull: {studies: {id: study_id}}}),
                    users.updateOne({_id: collaboration_user_id},
                        {$pull: {pending_studies: {id: study_id}}})
                ]));
    });
}

function update_collaboration(user_id, study_id, body){
    return connection.then(function (db) {
        const studies   = db.collection('studies');
        const users   = db.collection('users');
        return has_read_permission(user_id, study_id)
            .then(()=>
                Promise.all([
                    studies.updateOne({_id: study_id, users: { $elemMatch: {user_id:body.collaborator_id}}},
                        {$set: body.permissions.permission ? {'users.$.permission': body.permissions.permission} : {'users.$.data_permission': body.permissions.data_permission}}),
                    users.updateOne({_id: body.collaborator_id, studies: { $elemMatch: {id: study_id}}},
                        {$set: body.permissions.permission ? {'studies.$.permission': body.permissions.permission} : {'studies.$.data_permission': body.permissions.data_permission}})

                ]));
    });
}


function add_collaboration(user_id, study_id, collaborator_name, permission, data_permission, server_url){
    return connection.then(function (db) {
        const studies   = db.collection('studies');
        const users   = db.collection('users');
        const accept = utils.sha1(study_id + collaborator_name +'accept*'+Math.random());
        const reject = utils.sha1(study_id + collaborator_name +'reject*'+Math.random());
        return has_read_permission(user_id, study_id)
            .then((full_data)=>user_info_by_name(collaborator_name)
                    .then(function(collaborator_data)
                    {
                        const owner_name = `${full_data.user_data.first_name} ${full_data.user_data.last_name}`;
                        const study_name = full_data.study_data.name;
                        return studies.findOne({_id: study_id, users:{ $elemMatch: {user_id:collaborator_data._id}}})
                            .then(data=> data ? Promise.reject({status:500, message: 'ERROR: user already collaborated'}) :
                                Promise.all([
                                    studies.updateOne({_id: study_id},
                                        {$push: {users: {user_id: collaborator_data._id, user_name:collaborator_data.user_name, permission, data_permission, status:'pending'}}}),
                                    users.updateOne({_id: collaborator_data._id},
                                        {$push: {pending_studies: {id:study_id, accept, reject, permission, data_permission, study_name:full_data.study_data.name, owner_name}}}),
                                    sender.send_mail(collaborator_data.email, 'Message from the Researcher Dashboard‏', 'collaboration.ejs',
                                        {accept: utils.clean_url(server_url+'/dashboard/?/collaboration/'+accept),
                                            reject: utils.clean_url(server_url+'/dashboard/?/collaboration/'+reject),
                                            collaborator_name,
                                            permission,
                                            data_permission,
                                            owner_name,
                                            study_name
                                        })
                                ]));
                    }));
    });
}

function make_collaboration(user_id, code){
    return connection.then(function (db) {
        const users   = db.collection('users');
        const studies   = db.collection('studies');
        return users.findOne({pending_studies: { $elemMatch: {$or: [{accept:code}, {reject:code}]}}})
            .then(user_data=>{
                if (!user_data)
                    return Promise.reject({status:400, message:'wrong code'});

                if(user_data._id!==user_id)
                    return Promise.reject({status:400, message:'wrong user'});

                const study = user_data.pending_studies.filter(study=>study.accept===code || study.reject===code)[0];
                return users.updateOne({_id: user_data._id},
                    {$pull: {pending_studies: {id: study.id}}})
                    .then(function() {
                        if (study.accept === code)
                            return Promise.all([
                                users.updateOne({_id: user_data._id},
                                    {$push: {studies: {id: study.id, tags: []}}}),
                                studies.updateOne({_id: study.id, 'users.user_id':user_data._id},
                                    {$unset: {'users.$.status': ''}})
                            ]);
                        return studies.updateOne({_id: study.id, 'users.user_id':user_data._id},
                            {$set: {'users.$.status': 'reject'}});
                    });
            });
    });
}


function create_new_study({user_id, study_name, study_type = 'minnoj0.2', description = '', is_public = false}, additional_params) {
    const sanitize_study_name = sanitize(study_name);
    if(study_name!==sanitize_study_name || study_name[0]==='.')
        return Promise.reject({status:400, message: 'ERROR: illegal characters in study name.  Also, study name cannot start with a period.'});
    return ensure_study_not_exist(user_id, study_name)
        .then(() => user_info(user_id))
        .then(function ({user_name}) {
            const study_obj = Object.assign({
                name: study_name,
                description,
                folder_name: path.join(user_name, study_name),
                type: study_type,
                users: [{id: user_id}],
                modify_date: Date.now(),
                is_public
            }, additional_params);
            return insert_obj(user_id, study_obj)
                .then(study => {
                    const dir = path.join(config.user_folder, study.folder_name);
                    return fs.mkdirp(dir)
                        .then(()=>fs.mkdirp(path.join(dir, 'v1')))
                        .then(() => study);
                });
        });
}


function duplicate_study(user_id, study_id, new_study_name) {
    return Promise.all([
        has_read_permission(user_id, study_id),
        ensure_study_not_exist(user_id, new_study_name)
    ])
    .then(function([{user_data, study_data: original_study}]){
        const latest_version = original_study.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current);
        const version_id = latest_version.id;
        const exps = latest_version.experiments;
        let experiments = [];
        exps.map(function(exp) {
            const id = utils.sha1(study_id + exp.file_id + exp.descriptive_id + Math.random());
            experiments.push({
                id,
                file_id: exp.file_id,
                descriptive_id: exp.descriptive_id
            });
        });

        const study_obj = {
            name: new_study_name,
            folder_name: path.join(user_data.user_name, new_study_name),
            type: original_study.type,
            description: original_study.description,
        };
        return insert_obj(user_id, study_obj)
            .then(function (study_data) {
                const originalPath = path.join(config.user_folder, original_study.folder_name, 'v'+version_id);
                const dir = path.join(config.user_folder, study_data.folder_name, 'v1');
                return fs.pathExists(dir)
                    .then(exists => {
                        if (!exists)
                            return fs.copy(originalPath, dir)
                                .then(()=>
                                    duplicate_experiments(study_data, experiments)
                                        .then(() => ({study_id: study_data._id}))
                                        .catch(() => Promise.reject({status:500, message: 'ERROR: Study does not exist in FS!'}))

                                );
                    });
            });
    });
}

function duplicate_experiments(study_data, experiments) {
    return connection.then(function (db) {
        const studies = db.collection('studies');
        const versions = study_data.versions;

        const version_data = versions[0];
        version_data.experiments = experiments;
        return studies.updateOne({_id: study_data._id},
            {$set:{versions}}
        );
    });
}

function delete_study(user_id, study_id) {
    return has_write_permission(user_id, study_id)
        .then(()=>delete_by_id(user_id, study_id)
            // .then(function(study_data) {
            //     const dir = path.join(config.user_folder, study_data.value.folder_name);
            //     return fs.pathExists(dir)
            //         .then(existing => !existing
            //                     ?  Promise.reject({status:500, message: 'ERROR: Study does not exist in FS!'})
            //                     : fs.remove(dir));
            // }
        );
}

function has_read_data_permission(user_id, study_id){
    return get_user_study(user_id, study_id)
        .then(result => result.can_read_data ? result : Promise.reject({status:403, message:'Permission denied'}));
}

function has_read_permission(user_id, study_id){
    return get_user_study(user_id, study_id)
        .then(result => result.can_read ? result : Promise.reject({status:403, message:'Permission denied'}));
}

function has_write_permission(user_id, study_id){
    return get_user_study(user_id, study_id)
        .then(result => result.can_write ? result : Promise.reject({status:403, message:'Permission denied'}));
}


function get_user_study(user_id, study_id){
    return connection.then(function (db) {
        const users = db.collection('users');
        const studies = db.collection('studies');

        return Promise.all([
            users.findOne({_id:+user_id}),
            studies.findOne({_id:+study_id})
        ]);
    })
        .then(function([user_data, study_data]){
            if (!user_data) return Promise.reject({status:403, message:'Error: User not found'});
            if (!study_data) return Promise.reject({status:403, message:'Error: Study not found'});
            if (user_data.role==='su')
                return {user_data, study_data, can_read:true, can_write:true, can_read_data:true};

            if (study_data.users.find(user=>user.user_id===user_id))
            {
                const can_write     = study_data.users.find(user=>user.user_id===user_id).permission !=='read only';
                const can_read_data = study_data.users.find(user=>user.user_id===user_id).data_permission !=='invisible';
                const can_read = study_data.users.find(user=>user.user_id===user_id);
                return {user_data, study_data, can_read, can_write, can_read_data};
            }
            const can_write = false;
            const can_read = study_data.is_bank || study_data.is_public;

            return {user_data, study_data, can_read, can_write};
        });
}

function ensure_study_not_exist(user_id, study_name) {
    return connection.then(function (db) {
        const studies   = db.collection('studies');
        const users = db.collection('users');

        return Promise.all([
            studies.findOne({name:study_name , users: {$elemMatch: {id:user_id}}}),
            users
                .findOne({_id:user_id})
                .then(user_data => {
                    return fs.pathExists(path.join(config.user_folder, user_data.user_name, study_name));
                })
                
        ]);
    })
        .then(function([study_data, path_exists]){
            if (study_data) return Promise.reject({status:400, message: `ERROR: Study ${study_name} already exists`});
            if (path_exists) return Promise.reject({status: 500, message: `ERROR: Study ${study_name} already exists in FS!`});
        });
}

function insert_obj(user_id, study_props) {
    if (!study_props.name)
        return Promise.reject({status:500, message: 'Error: creating a new study requires the study name'});
    if (['minno02', 'html'].indexOf(study_props.type) === -1)
        return Promise.reject({status:500, message: `Error: unknown study type ${study_props.type}`});
    if (!study_props.folder_name)
        return Promise.reject({status:500, message: 'Error: creating a new study requires the study folder_name'});

    const dflt_study_props = {
        users: [{user_id: user_id, permission:PERMISSION_OWNER}],
        experiments:[],
        modify_date: Date.now()
    };

    const study_obj = Object.assign({}, study_props, dflt_study_props);
    return connection.then(function (db) {
        const counters = db.collection('counters');
        const studies  = db.collection('studies');
        const users    = db.collection('users');
        return counters.findOneAndUpdate(
            {_id:'study_id'},
            {$inc: {seq: 1}},
            {update: true, new: true, returnOriginal: false}
        )
        .then(function(counter_data){
            const study_id = counter_data.value.seq;
            study_obj._id = study_id;
            study_obj.folder_name = `${study_obj.folder_name}-${study_id}`;
            study_obj.versions = [create_version_obj(study_obj._id, 'Develop', 1)];
            return studies.insertOne(study_obj);
        })
        .then(function(){
            return users.updateOne(
                {_id: user_id},
                {$push: {studies: {id: study_obj._id, tags: []}}}
            );
        })
        .then(function(){
            const dir = path.join(config.user_folder, study_obj.folder_name);
            const version_id = study_obj.versions[0].version;
            const study_id = study_obj._id;
            return study_obj;
        });
    });
}

function update_obj(study_id, study_obj) {
    return connection.then(function (db) {
        const studies   = db.collection('studies');
        return studies.findOneAndUpdate({_id:study_id},
            {$set: study_obj});
    });
}

function delete_by_id(user_id, study_id) {
    return connection.then(function (db) {
        const studies   = db.collection('studies');
        return studies.updateOne({_id: study_id, users: {$elemMatch: {user_id: user_id}}},
            {$set: {'users.$.deleted': true}}
        );
    });
}

function update_study(user_id, study_id, update_body) {
    const modify_date = Date.now();
    const white_list = ['description', 'study_type'];
    const clean_update_body = white_list.reduce((acc, key) => {
        if (key in update_body) acc[key] = update_body[key];
        return acc;
    }, {modify_date});

    return has_write_permission(user_id, study_id)
        .then(function() {
            return update_obj(study_id, clean_update_body);
        });
}

function rename_study(user_id, study_id, new_study_name) {
    if (!new_study_name) return Promise.reject({status:400, message: 'ERROR: empty study name'});
    return has_write_permission(user_id, study_id)
        .then(function() {
            return get_owner(user_id, study_id)
                .then(function(owner_data) {
                    const study_obj = {
                        name: new_study_name,
                        folder_name: path.join(owner_data.user_name, `${new_study_name}-${study_id}`),
                        modify_date: Date.now()
                    };
                    return update_obj(study_id, study_obj)
                        .then(function (study_data) {
                            if (!study_data.ok)
                                return Promise.reject({status: 500, message: 'ERROR: internal error'});
                            const new_file_path = path.join(config.user_folder, study_obj.folder_name);
                            const file_path = path.join(config.user_folder, study_data.value.folder_name);
                            return fs.pathExists(file_path)
                                .then(existing => !existing
                                    ?
                                    Promise.reject({status: 500, message: 'ERROR: Study does not exist in FS!'})
                                    :
                                    fs.rename(file_path, new_file_path)
                                );
                        });
                });
        });
}


function set_lock_status(user_id, study_id, status) {
    return has_write_permission(user_id, study_id)
        .then(function() {
            return connection.then(function (db) {
                const studies = db.collection('studies');
                return studies.updateOne({_id: study_id}, {$set: {locked: status}});
            });
        });
}

function update_modify(study_id) {
    const modify_date = Date.now();

    return connection.then(function (db) {
        const studies   = db.collection('studies');
        return studies.updateOne({_id: study_id}, {$set: {modify_date}});
    });
}

function make_public(user_id, study_id, is_public) {
    return has_write_permission(user_id, study_id)
        .then(()=> connection.then(function (db) {
            const studies = db.collection('studies');
            return studies.updateOne({_id: study_id}, {$set: {is_public}});
        }));
}

function make_link(user_id, study_id, server_url) {
    return has_write_permission(user_id, study_id)
        .then(()=> connection.then(function (db) {

            const studies = db.collection('studies');

            const link = utils.clean_url(server_url + '/dashboard/?/view/' + utils.sha1(study_id+'*'+Math.floor(Date.now() / 1000)));


            return studies.updateOne({_id: study_id}, {$set: {link}})
                .then(()=>link);
        }));
}

function delete_link(user_id, study_id) {
    return has_write_permission(user_id, study_id)
        .then(()=> connection.then(function (db) {
            const studies = db.collection('studies');
            return studies.updateOne({_id: study_id}, {$unset: {link:{}}})
                .then({});
        }));
}


module.exports = {update_study, make_public, make_link, delete_link, set_lock_status, update_modify, get_studies, get_pending_studies, create_new_study, delete_study, rename_study, get_collaborations, add_collaboration, remove_collaboration, update_collaboration, make_collaboration, duplicate_study, has_read_permission, has_write_permission, has_read_data_permission, get_id_with_link};