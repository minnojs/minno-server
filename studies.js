const config = require('./config');
const url         = config.mongo_url;
const fs          = require('fs-extra');
const mongo         = require('mongodb-bluebird');
const dateFormat = require('dateformat');
const path        = require('path');
const utils        = require('./utils');
const {user_info} = require('./users');

const PERMISSION_OWNER = 'owner';
const PERMISSION_READ_ONLY = 'read only';

function create_version_obj(study_id, state) {
    const now = new Date();
    const version = dateFormat(now, 'yyyymmdd.HHMMss');
    return {id: generate_id(study_id, version, state), version: version, state: state};
}

function generate_id(study_id, version, state) {
    return utils.sha1(study_id + version + state+'*');
}

function get_studies(user_id) {
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        const studies   = db.collection('studies');

        return Promise.all([
            get_user_studies(),
            get_bank_studies()
        ])
            .then(studyArr => [].concat.apply([], studyArr));

        function get_user_studies(){
            return users.findOne({_id:user_id})
            .then(user_result => {
                const study_ids = user_result.studies.map(study => study.id);
                return studies
                .find({ _id: { $in: study_ids } })
                .then(studies => studies.map(study => composeStudy(study, {
                    permission: PERMISSION_OWNER,
                    study_type:'regular',
                    base_url:study.folder_name,
                    tags: get_tags(user_result, study)
                })));
            });
        }

        function get_bank_studies(){
            return users.findOne({user_name:'bank'})
            .then(user_result => {
                const study_ids = user_result.studies.map(study => study.id);
                return studies
                .find({ _id: { $in: study_ids } })
                .then(studies => studies.map(study => composeStudy(study, {
                    is_bank: true,
                    permission: PERMISSION_READ_ONLY,
                    study_type:'regular',
                    base_url:study.folder_name,
                    tags: get_tags(user_result, study)
                })));
            });
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

function create_new_study({user_id, study_name, study_type = 'minnoj0.2', description = '', is_public = false}, additional_params) {
    return ensure_study_not_exist(user_id, study_name)
        .then(() => user_info(user_id))
        .then(function ({user_name}) {
            const study_obj = Object.assign({
                name: study_name,
                description,
                folder_name: path.join(user_name,study_name),
                type: study_type,
                users: [{id: user_id}],
                experiments: [],
                versions: [create_version_obj('*', 'Develop')],
                modify_date: Date.now()
            }, additional_params);

            return insert_obj(user_id, study_obj)
                .then(study => {
                    return  fs.mkdirp(study.dir).then(() => study);
                });
        });
}


function duplicate_study(user_id, study_id, new_study_name) {
    return Promise.all([
        has_read_permission(user_id, study_id),
        ensure_study_not_exist(user_id, new_study_name)
    ])
    .then(function([{user_data, study_data: original_study}]){
        const study_obj = {
            name: new_study_name,
            folder_name: path.join(user_data.user_name, new_study_name),
            type: original_study.type
        };

        return insert_obj(user_id, study_obj)
            .then(function (study_data) {
                const originalPath = path.join(config.user_folder ,original_study.folder_name);
                return fs.pathExists(study_data.dir)
                    .then(exists => {
                        if (!exists)
                            return fs.copy(originalPath, study_data.dir)
                                .then(() => ({study_id: study_data.study_id}))
                                .catch(() => Promise.reject({status:500, message: 'ERROR: Study does not exist in FS!'}));
                    });
            });
    });
}

function delete_study(user_id, study_id) {
    return has_write_permission(user_id, study_id)
        .then(function() {
            return delete_by_id(user_id, study_id)
                .then(function(study_data) {
                    const dir = path.join(config.user_folder, study_data.value.folder_name);
                    return fs.pathExists(dir)
                        .then(existing => !existing
                                    ?  Promise.reject({status:500, message: 'ERROR: Study does not exist in FS!'})
                                    : fs.remove(dir));
                }
            );
        });
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
    return mongo.connect(url).then(function (db) {
        const users = db.collection('users');
        const studies = db.collection('studies');
        return Promise.all([
            users.findOne({_id:+user_id}),
            studies.findOne({_id:+study_id})
        ]);
    })
    .then(function([user_data, study_data]){
        // why not return a boolean?
        if (!user_data) return Promise.reject({status:403, message:'Error: User not found'});
        if (!study_data) return Promise.reject({status:403, message:'Error: Study not found'});

        const can_write = user_data.studies.some(study => study.id === study_id);
        const can_read = can_write || study_data.is_public;
        return {user_data, study_data, can_read, can_write};
    });
}

function ensure_study_not_exist(user_id, study_name) {
    return mongo.connect(url).then(function (db) {
        const studies   = db.collection('studies');
        const users = db.collection('users');

        return Promise.all([
            studies.findOne({name:study_name , users: {$elemMatch: {id:user_id}}}),
            users
                .findOne({_id:user_id})
                .then(user_data => {
                    return fs.pathExists(path.join(config.user_folder,user_data.user_name,study_name));
                })
                
        ]);
    })
    .then(function([study_data, path_exists]){
        if (study_data) return Promise.reject({status:400, message: 'ERROR: Study with this name already exists'});
        if (path_exists) return Promise.reject({status: 500, message: 'ERROR: Study already exists in FS!'});
    });
}

function insert_obj(user_id, study_props) {
    if (!study_props.name) return Promise.reject({status:500, message: 'Error: creating a new study requires the study name'});
    if (['minno02', 'html'].indexOf(study_props.type) === -1) return Promise.reject({status:500, message: `Error: unknown study type ${study_props.type}`});
    if (!study_props.folder_name) return Promise.reject({status:500, message: 'Error: creating a new study requires the study folder_name'});

    const dflt_study_props = {
        users: [{id: user_id}],
        experiments:[],
        modify_date: Date.now()
    };

    const study_obj = Object.assign(dflt_study_props, study_props);

    return mongo.connect(url).then(function (db) {
        const counters = db.collection('counters');
        const studies  = db.collection('studies');
        const users    = db.collection('users');
        return counters.findAndModify(
            {_id:'study_id'},
            [],
            {$inc: {seq: 1}},
            {upsert: true, new: true, returnOriginal: false}
        )
        .then(function(counter_data){
            study_obj._id = counter_data.value.seq;
            return studies.insert(study_obj);
        })
        .then(function(){
            return users.findAndModify({_id: user_id},
                        [],
                        {$push: {studies: {id: study_obj._id, tags: []}}});
        })
        .then(function(){
            const dir = path.join(config.user_folder, study_obj.folder_name);
            const study_id = study_obj._id;
            return {study_id, dir};
        });
    });
}

function update_obj(study_id, study_obj) {
    return mongo.connect(url).then(function (db) {
        const studies   = db.collection('studies');
        return studies.findAndModify({_id:study_id},
            [],
            {$set: study_obj});
    });
}

function delete_by_id(user_id, study_id) {
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        const studies   = db.collection('studies');
        return users
            .update({_id:user_id}, {$pull: {studies: {id: study_id}}})
            .then(function(){return studies.findAndModify({_id:study_id},
                [],
                {remove: true});})
            .then(function(study_data){
                return Promise.resolve(study_data);
            });
    });
}


function study_info (study_id) {
    return mongo
        .connect(url)
        .then( db => db
            .collection('studies')
            .findOne({_id: +study_id}) // study ids must be numbers
        );
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
        .then(function({user_data}) {
            return ensure_study_not_exist(user_id, new_study_name)
                .then(function() {
                    const study_obj = { name: new_study_name, folder_name: path.join(user_data.user_name, new_study_name) ,modify_date: Date.now()};
                    return update_obj(study_id, study_obj)
                        .then(function (study_data) {
                            if (!study_data.ok)
                                return Promise.reject({status:500, message: 'ERROR: internal error'});

                            const new_file_path = path.join(config.user_folder , study_obj.folder_name);
                            const file_path     = path.join(config.user_folder , study_data.value.folder_name);

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
            return mongo.connect(url).then(function (db) {
                const studies = db.collection('studies');
                return studies.update({_id: study_id}, {$set: {locked: status}});
            });
        });
}

function update_modify(study_id) {
    const modify_date = Date.now();

    return mongo.connect(url).then(function (db) {
        const studies   = db.collection('studies');
        return studies.update({_id: study_id}, {$set: {modify_date}});
    });
}

function make_public(user_id, study_id, is_public) {
    return has_write_permission(user_id, study_id)
        .then(()=> mongo.connect(url).then(function (db) {
            const studies = db.collection('studies');
            return studies.update({_id: study_id}, {$set: {is_public}});
        }));
}

module.exports = {update_study, make_public, set_lock_status, update_modify, get_studies, create_new_study, delete_study, rename_study, study_info, duplicate_study, has_read_permission, has_write_permission};
