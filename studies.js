const config = require('./config');
const url         = config.mongo_url;
const fs          = require('fs-extra');
const mongo         = require('mongodb-bluebird');
const dateFormat = require('dateformat');
const path        = require('path');
const utils        = require('./utils');

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
        return users.findOne({_id:user_id})
            .then(function(user_result){
                if(!user_result.studies)
                    return Promise.resolve({studies: []});
                const study_ids = user_result.studies.map(function(obj) {return obj.id;});
                return studies.find({ _id: { $in: study_ids } })
                    .then(function(studies){
                        let studies_arr = [];
                        studies.forEach(function(study){
                            const study_tags = user_result.studies.find(study2 => study2.id === study._id).tags.map(tag_id=> user_result.tags.find(tag => tag.id === tag_id));
                            studies_arr.push({id: study._id,
                                name:study.name,
                                is_published: study.versions && study.versions.length>1 && study.versions[study.versions.length-1].state==='Published',
                                is_locked:study.locked,
                                type:study.type,
                                is_public: study.is_public,
                                // is_template:false,
                                last_modified:study.modify_date,
                                permission:'owner',
                                versions:study.versions,
                                study_type:'regular',
                                base_url:user_result.user_name+'/'+study.folder_name,
                                tags:study_tags});
                        });
                        return Promise.resolve({studies: studies_arr});
                    });
            });
    });
}

function create_new_study(user_id, study_name, study_type) {
    return study_exist(user_id, study_name)
        .then(function (study) {
            if (study.is_exist)
                return Promise.reject({status: 400, message: 'ERROR: Study with this name already exists'});
            const study_obj = {
                name: study_name,
                folder_name: study_name,
                type: study_type,
                users: [{id: user_id}],
                experiments: [],
                versions: [create_version_obj('*', 'Develop')],
                modify_date: Date.now()
            };
            return insert_obj(user_id, study_obj)
                .then(function (study_data) {
                    return fs.pathExists(study_data.dir)
                        .then(existing => existing
                            ?
                            Promise.reject({status: 500, message: 'ERROR: Study already exists in FS!'})
                            :
                            fs.mkdirp(study_data.dir)
                        )
                        .then(() => ({study_id: study_data.study_id}));
                });
        });
}

function duplicate_study(user_id, study_id, new_study_name) {
    return Promise.all([
        have_permission(user_id, study_id),
        study_exist(user_id, new_study_name),
        study_info(study_id)
    ])
    .then(function([user_data, {is_exist}, original_study]){
        if (is_exist) return Promise.reject({status:400, message: `ERROR: Study with this name already exists:${new_study_name}`});
        const study_obj = {
            name: new_study_name,
            folder_name: new_study_name,
            type: original_study.type
        };

        return insert_obj(user_id, study_obj)
            .then(function (study_data) {
                const originalPath = path.join(config.user_folder ,user_data.user_name, original_study.folder_name);
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
    return have_permission(user_id, study_id)
        .catch(()=>Promise.reject({status:403, message: 'ERROR: Permission denied!'}))
        .then(function(user_data) {
            return delete_by_id(user_id, study_id)
                .then(function(study_data) {
                    const dir = path.join(config.user_folder, user_data.user_name , study_data.value.folder_name);
                    return fs.pathExists(dir)
                        .then(existing => !existing
                                    ?
                                    Promise.reject({status:500, message: 'ERROR: Study does not exist in FS!'})
                                    :
                                    fs.remove(dir));
                }
            );
        });
}

function have_permission(user_id, study_id) {
    return mongo.connect(url).then(function (db) {
        const users = db.collection('users');
        return users.findOne({_id:user_id, studies: {$elemMatch: {id:+study_id}} }); // study id must be an int
    })
    .then(function(user_result){
        // why not return a boolean?
        if (!user_result) return Promise.reject({status:403, message:'Error: permission denied'});
        return user_result;
    });
}

function study_exist(user_id, study_name) {
    return mongo.connect(url).then(function (db) {
        const studies   = db.collection('studies');
        return studies.findOne({name:study_name , users: {$elemMatch: {id:user_id}}});
    })
    .then(function(study_data){
        return {is_exist: !!study_data};
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
        return counters.findAndModify({_id:'study_id'},
            [],
            {'$inc': {'seq': 1}},
            {upsert: true, new: true, returnOriginal: false})
        .then(function(counter_data){
            study_obj._id = counter_data.value.seq;
            return studies.insert(study_obj);
        })
        .then(function(){
            return users.findAndModify({_id: user_id},
                        [],
                        {$push: {studies: {id: study_obj._id, tags: []}}});
        })
        .then(function(user_data){
            const dir = path.join(config.user_folder,user_data.value.user_name,study_obj.name);
            const study_id = study_obj._id;
            return Promise.resolve({study_id, dir});
        });
    });
}

function update_obj(study_id, study_obj) {
    return mongo.connect(url).then(function (db) {
        const studies   = db.collection('studies');
        return studies.findAndModify({_id:study_id},
            [],
            {$set: study_obj})
            .then(function(study_data){
                return Promise.resolve(study_data);
            });
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

function rename_study(user_id, study_id, new_study_name) {
    if (!new_study_name)
        return Promise.reject({status:400, message: 'ERROR: empty study name'});
    const study_obj = { name: new_study_name, folder_name: new_study_name ,modify_date: Date.now()};
    return have_permission(user_id, study_id)
        .catch(function(){
            return Promise.reject({status:403, message: 'ERROR: Permission denied!'});
        })
        .then(function(user_data) {
            return study_exist(user_id, new_study_name)
                .then(function (study) {
                    if (study.is_exist)
                        return Promise.reject({status:400, message: 'ERROR: Study with this name already exists'});
                    return update_obj(study_id, study_obj)
                        .then(function (study_data) {
                            if (!study_data.ok)
                                return Promise.reject({status:500, message: 'ERROR: internal error'});

                            const new_file_path = path.join(config.user_folder , user_data.user_name , new_study_name);
                            const file_path     = path.join(config.user_folder , user_data.user_name , study_data.value.folder_name);

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
    return have_permission(user_id, study_id)
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
        return studies.update({_id: study_id}, {$set: {modify_date: modify_date}});
    });
}

function make_public(user_id, study_id, is_public) {
    return have_permission(user_id, study_id)
        .catch(()=>Promise.reject({status:403, message: 'ERROR: Permission denied!'}))
        .then(()=> mongo.connect(url).then(function (db) {
                const studies = db.collection('studies');
                return studies.update({_id: study_id}, {$set: {is_public: is_public}});
            })
        );
}

module.exports = {make_public, set_lock_status, update_modify, get_studies, create_new_study, delete_study, have_permission, rename_study, study_info, duplicate_study};
