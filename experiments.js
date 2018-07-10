const config        = require('./config');
const urljoin       = require('url-join');
const crypto        = require('crypto');
const studies_comp  = require('./studies');
const join = require('path').join;
const users_comp = require('./users');
const data_server  = require('./data_server/controllers/controller');
const mongo         = require('mongodb-bluebird');
const mongo_url     = config.mongo_url;

const have_permission = studies_comp.have_permission;

function mysha1( data ) {
    const generator = crypto.createHash('sha1');
    generator.update( data );
    return generator.digest('hex');
}

// get data for playing a file without creating an experiment
// creates sham info for the player
function get_play_url (user_id, study_id, file_id) {
    return Promise.all([
        have_permission(user_id, study_id).catch(() => false), // have_permission throws if there is no permission, in that case we cast it as false
        studies_comp.study_info(study_id)
    ])
        .then(([user, study_data]) => {
            if (!study_data) return Promise.reject({status:404, message:'Study not found'});
            if (!user) return Promise.reject({status:403, message:'Permission denied'});

            const url = urljoin(config.server_url,'users',user.user_name,study_data.folder_name,file_id);
            const base_url = urljoin(config.server_url,'users',user.user_name,study_data.folder_name);
            const path = join(config.user_folder,user.user_name,study_data.folder_name,file_id);

            // set sham experiment data
            return {
                exp_id: -1,
                descriptive_id: '',
                session_id:-1,
                url,
                path,
                base_url
            };
        });
}

function get_experiment_url (req) {
    return mongo.connect(mongo_url).then(function (db) {
        const counters = db.collection('counters');
        const studies = db.collection('studies');
        console.log(req.params.exp_id);
        return studies.findOne({experiments: { $elemMatch: { id: req.params.exp_id } }})
            .then(function(exp_data){
                // console.log(exp_data);
                return users_comp.user_info(exp_data.users[0].id).then(function(user){
                    const exp = exp_data.experiments.filter(function(exp) {return exp.id==req.params.exp_id;});
                    const url = urljoin(config.server_url,'users',user.user_name,exp_data.folder_name,exp[0].file_id);
                    const base_url = urljoin(config.server_url,'users',user.user_name,exp_data.folder_name);
                    const path = join(config.user_folder,user.user_name,exp_data.folder_name,exp[0].file_id);

                    return counters.findAndModify({_id:'session_id'},
                        [],
                        {"$inc": {"seq": 1}},
                        {upsert: true, new: true, returnOriginal: false})
                        .then(function(counter_data){
                            const session_id = counter_data.value.seq;
                            return {
                                exp_id:req.params.exp_id,
                                descriptive_id: exp[0].descriptive_id, 
                                session_id, 
                                url,
                                path,
                                base_url
                            };
                        });
                });
            });
    });
}


function get_experiments(user_id, study_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            studies_comp.study_info(study_id)
                .then(function (study_data) {
                    res.end(JSON.stringify({experiments: study_data.experiments}));
                });
        });
};

function get_data(user_id, study_id, exp_id, file_format, file_split, start_date, end_date, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            data_server.getData(exp_id, file_format, file_split, start_date, end_date)
                .then(function(data){
            res.send(JSON.stringify({data_file:data}))});
        });
};

function insert_new_experiment(user_id, study_id, file_id, descriptive_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(mongo_url).then(function (db) {
                var users = db.collection('users');
                var studies = db.collection('studies');
                return studies.update({_id: study_id}, {
                    $push: {
                        experiments: {
                            id: mysha1(study_id + file_id + descriptive_id),
                            file_id: file_id, descriptive_id: descriptive_id
                        }
                    }
                })
                .then(function (user_result) {
                    if (!user_result)
                        return Promise.reject();
                    return res.send(JSON.stringify({id: mysha1(study_id + file_id + descriptive_id),
                        file_id: file_id, descriptive_id: descriptive_id}));
                });
            });
        });
};

function delete_experiment(user_id, study_id, file_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(mongo_url).then(function (db) {
                    var studies = db.collection('studies');
                    return studies.update({_id: study_id}, {
                        $pull: {
                            experiments: {file_id: file_id}
                        }
                    })
                        .then(function (user_result) {
                            if (!user_result)
                                return Promise.reject();
                            return res.send(JSON.stringify({}));
                        });

                }
            );
        });
};

function update_descriptive_id(user_id, study_id, file_id, descriptive_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(mongo_url).then(function (db) {
                    var studies = db.collection('studies');
                    return studies.update({_id: study_id, experiments: { $elemMatch: { file_id: file_id } }},
                    { $set: { "experiments.$.descriptive_id" : descriptive_id } }
                    );
                }
            );
        });
};

function update_file_id(user_id, study_id, file_id, new_file_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(mongo_url).then(function (db) {
                    var studies = db.collection('studies');
                    return studies.update({_id: study_id, experiments: { $elemMatch: { file_id: file_id } }},
                    { $set: { "experiments.$.file_id" : new_file_id } }
                    );
                }
            );
        });
};

function is_descriptive_id_exist(user_id, study_id, descriptive_id) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(mongo_url).then(function (db) {
                const studies = db.collection('studies');
                return studies.findOne({_id: study_id, experiments: { $elemMatch: { descriptive_id: descriptive_id } }})
                .then(function(study_data){
                    return Promise.resolve(!!study_data);
                });
            }
            );
        });
};

module.exports = {get_play_url, get_experiment_url, is_descriptive_id_exist, get_experiments, get_data, update_descriptive_id, update_file_id, delete_experiment, insert_new_experiment};
