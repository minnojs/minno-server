var config = require('./config');

const url         = config.mongo_url;
const crypto      = require('crypto');
var studies_comp = require('./studies');


var mongo         = require('mongodb-bluebird');

function mysha1( data ) {
    var generator = crypto.createHash('sha1');
    generator.update( data );
    return generator.digest('hex')
}


get_experiment_url = function (req) {
    return mongo.connect(url).then(function (db) {
        var counters = db.collection('counters');
        var studies = db.collection('studies');
        // console.log(req.params.exp_id);
        return studies.findOne({experiments: { $elemMatch: { id: req.params.exp_id } }})
            .then(function(exp_data){
                // console.log(exp_data);
                return user_info(exp_data.users[0].id).then(function(user){
                    var exp = exp_data.experiments.filter(function(exp) {return exp.id==req.params.exp_id;});
                    return counters.findAndModify({_id:'session_id'},
                        [],
                        {"$inc": {"seq": 1}},
                        {upsert: true, new: true, returnOriginal: false})
                        .then(function(counter_data){
                            var session_id = counter_data.value.seq;
                            return Promise.resolve({study_id:exp_data._id, session_id:session_id, url:config.server_url+'/users/'+user.user_name+'/'+exp_data.folder_name+'/'+exp[0].file_id});
                        });

                });
            });
        }
    );
};


get_experiments = function (user_id, res) {
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.findOne({_id: user_id})
            .then(user_data=>res.send(JSON.stringify({tags: user_data.tags})));
    });
};

insert_new_experiment = function (user_id, study_id, file_id, descriptive_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(url).then(function (db) {
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

delete_experiment = function (user_id, study_id, file_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(url).then(function (db) {
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

update_descriptive_id = function (user_id, study_id, file_id, descriptive_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(url).then(function (db) {
                    var studies = db.collection('studies');
                    return studies.update({_id: study_id, experiments: { $elemMatch: { file_id: file_id } }},
                    { $set: { "experiments.$.descriptive_id" : descriptive_id } }
                    );
                }
            );
        });
};

update_file_id = function (user_id, study_id, file_id, new_file_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(url).then(function (db) {
                    var studies = db.collection('studies');
                    return studies.update({_id: study_id, experiments: { $elemMatch: { file_id: file_id } }},
                    { $set: { "experiments.$.file_id" : new_file_id } }
                    );
                }
            );
        });
};



is_descriptive_id_exist = function (user_id, study_id, descriptive_id) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(url).then(function (db) {
                    var studies = db.collection('studies');
                    return studies.findOne({_id: study_id, experiments: { $elemMatch: { descriptive_id: descriptive_id } }})
                        .then(function(study_data){
                            return Promise.resolve(!!study_data);
                        });
                }
            );
        });
};


module.exports = {get_experiment_url:get_experiment_url, is_descriptive_id_exist:is_descriptive_id_exist, get_experiments:get_experiments, update_descriptive_id:update_descriptive_id, update_file_id:update_file_id, delete_experiment:delete_experiment, insert_new_experiment:insert_new_experiment};