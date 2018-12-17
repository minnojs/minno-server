const config        = require('./config');
const urljoin       = require('url-join');
const studies_comp  = require('./studies');
const join = require('path').join;
const users_comp = require('./users');
const utils        = require('./utils');
const data_server  = require('./data_server/controllers/controller');
const connection    = Promise.resolve(require('mongoose').connection);

const {has_read_permission, has_read_data_permission, has_write_permission} = studies_comp;

// get data for playing a file without creating an experiment
// creates sham info for the player
function get_play_url (user_id, study_id, file_id) {
    return has_read_permission(user_id, study_id)
        .then(({study_data})  => {
            const url = urljoin(config.relative_path,config.user_folder,study_data.folder_name,file_id);
            const base_url = urljoin(config.relative_path,config.user_folder,study_data.folder_name, '/');
            const path = join(config.user_folder,study_data.folder_name,file_id);

            // set sham experiment data
            return {
                exp_id: -1,
                descriptive_id: '',
                session_id:-1,
                type: study_data.type,
                url,
                path,
                base_url
            };
        });
}

function get_experiment_url (req) {
    return connection.then(function (db) {
        const counters = db.collection('counters');
        const studies = db.collection('studies');
        return studies.findOne({experiments: { $elemMatch: {id: req.params.exp_id} }})
            .then(function(exp_data){
                if(!exp_data)
                    return Promise.reject({status:400, message:'Error: Experiment doesn\'t exist'});
                return users_comp.user_info(exp_data.users[0].id)
                    .then(function(){
                        const last_version = exp_data.versions ? exp_data.versions[exp_data.versions.length-1] : '';
                        if(last_version.id !== req.params.version_id)
                            return Promise.reject({status:400, message:'Error: Wrong version'});

                        const exp       = exp_data.experiments.filter(exp => exp.id===req.params.exp_id);
                        const url       = urljoin(config.relative_path, 'users', exp_data.folder_name, exp[0].file_id);
                        const base_url  = urljoin(config.relative_path, 'users', exp_data.folder_name,'/');
                        const path      = join(config.user_folder,  exp_data.folder_name,exp[0].file_id);

                        return counters.findAndModify({_id:'session_id'},
                            [],
                            {'$inc': {'seq': 1}},
                            {upsert: true, new: true, returnOriginal: false})
                            .then(function(counter_data){
                                const session_id = counter_data.value.seq;
                                return {
                                    version_data: last_version,
                                    exp_id:req.params.exp_id,
                                    descriptive_id: exp[0].descriptive_id,
                                    session_id,
                                    type: exp_data.type,
                                    url,
                                    path,
                                    base_url
                                };
                            });
                    });
            });
    });
}

function get_experiments(user_id, study_id) {
    return has_read_permission(user_id, study_id)
        .then(({study_data})=>study_data);
}

function get_data(user_id, study_id, exp_id, file_format, file_split, start_date, end_date, version_id) {
    return has_read_data_permission(user_id, study_id)
        .then(()=> data_server.getData(exp_id, file_format, file_split, start_date, end_date, version_id))
        .catch(err=>Promise.reject({status:err.status || 500, message: err.message}));
}

function insert_new_experiment(user_id, study_id, file_id, descriptive_id) {
    return has_write_permission(user_id, study_id)
        .then(function() {
            return connection.then(function (db) {
                const studies = db.collection('studies');
                return studies.findAndModify({_id: study_id, experiments: {$elemMatch:{file_id:file_id, descriptive_id: descriptive_id}}},
                    [],
                    {$unset:{'experiments.$.inactive': false}},
                    {upsert: false, new: true, returnOriginal: true})
                    .then(function(data){
                        if(!data.lastErrorObject.n)
                            return studies.update({_id: study_id}, {
                                $push: {
                                    experiments: {
                                        id: utils.sha1(study_id + file_id + descriptive_id + Math.random()),
                                        file_id: file_id, descriptive_id: descriptive_id
                                    }
                                }
                            })
                            .then(function (user_result) {
                                if (!user_result)
                                    return Promise.reject({status:500, message: 'ERROR: internal error!'});
                                return ({id: utils.sha1(study_id + file_id + descriptive_id),
                                    file_id: file_id,
                                    descriptive_id: descriptive_id
                                });
                            });
                    });
                //
            });
        });
}

function delete_experiment(user_id, study_id, file_id) {
    return has_write_permission(user_id, study_id)
        .then(function() {
            return connection.then(function (db) {
                const studies = db.collection('studies');
                // return studies.update({_id: study_id},
                //     {$set:{'experiments': []}}
                // )
                return studies.findOne({_id: study_id, experiments:{$elemMatch:{file_id:file_id}}})
                    .then(function(study_data){
                        const exps = study_data.experiments.map(exp=>exp.file_id!==file_id ? exp : {id:exp.id, file_id:exp.file_id, descriptive_id: exp.descriptive_id, inactive:true});
                        return studies.update({_id: study_id},
                            {$set:{experiments: exps}}
                        );
                    });
            });
        });
}

function update_descriptive_id(user_id, study_id, file_id, descriptive_id) {
    return has_write_permission(user_id, study_id)
        .then(function() {
            return connection.then(function (db) {
                const studies = db.collection('studies');
                return studies.update({_id: study_id, experiments:{$elemMatch:{file_id:file_id}}},
                                      {$set:{'experiments.$.descriptive_id': descriptive_id}}
                );
            });
        });
}

function update_file_id(user_id, study_id, file_id, new_file_id) {
    return has_write_permission(user_id, study_id)
        .then(function() {
            return connection.then(function (db) {
                const studies = db.collection('studies');
                return studies.update({_id: study_id, experiments:{$elemMatch:{file_id:file_id}}},
                { $set:{'experiments.$.file_id':new_file_id}}
                );
            });
        });
}

function is_descriptive_id_exist(user_id, study_id, descriptive_id) {
    return has_read_permission(user_id, study_id)
        .then(function() {
            return connection.then(function (db) {
                const studies = db.collection('studies');
                return studies.findOne({_id: study_id, experiments: { $elemMatch: { descriptive_id: descriptive_id } }})
                .then(study_data => !!study_data);
            });
        });
}

module.exports = {get_play_url, get_experiment_url, is_descriptive_id_exist, get_experiments, get_data, update_descriptive_id, update_file_id, delete_experiment, insert_new_experiment};
