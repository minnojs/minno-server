const url         = "mongodb://localhost:27017/mydb";
const crypto      = require('crypto');
const fs          = require('fs-extra');
const formidable  = require('formidable');
var mongo         = require('mongodb-bluebird');
var users_comp    = require('./users');

get_studies = function (user_id, res, callback) {
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        var studies   = db.collection('studies');
        return users.findOne({_id:user_id})
            .then(function(user_result){
                if(!user_result.studies)
                    return res.send(JSON.stringify({studies: []}));
                var study_ids = user_result.studies.map(function(obj) {return obj.id;});
                return studies.find({ _id: { $in: study_ids } })
                    .then(function(studies){
                        var studies_arr = [];
                        studies.forEach(function(study){
                            var study_tags = user_result.studies.find(study2 => study2.id === study._id).tags.map(tag_id=>
                            user_result.tags.find(tag => tag.id === tag_id));
                            studies_arr.push({id: study._id,
                                name:study.name,
                                // is_locked:false,
                                // is_public:false,
                                // is_template:false,
                                last_modified:study.modify_date,
                                // permission:"owner",
                                study_type:"regular",
                                base_url:user_result.user_name+'/'+study.folder_name,
                                tags:study_tags});
                        });
                        return res.send(JSON.stringify({studies: studies_arr}));
                    });
            });
    });
};

create_new_study = function (user_id, study_name, res) {
    study_exist(user_id, study_name)
        .then(function (study) {
            if (study.is_exist) {
                res.statusCode = 400;
                return res.send(JSON.stringify({message: 'ERROR: Study with this name already exists'}));
            }
            var study_obj = {
                name: study_name,
                folder_name: study_name,
                users: [{id: user_id}],
                experiments:[],
                modify_date: Date.now()
            };
            return insert_obj(user_id, study_obj)
                .then(function (study_data) {
                    try {
                        if (!fs.existsSync(study_data.dir)) {
                            fs.mkdirSync(study_data.dir);
                            return res.send(JSON.stringify({study_id: study_data.study_id}));
                        }
                    } catch (err) {
                        res.statusCode = 500;
                        return res.send(JSON.stringify({message: 'ERROR: Study does not exist in FS!'}));
                    }
                });
        });
};

duplicate_study = function (user_id, study_id, new_study_name, res) {
    have_permission(user_id, study_id)
        .then(function(user_data){
            study_exist(user_id, new_study_name)
                .then(function (study) {
                    if (study.is_exist) {
                        res.statusCode = 400;
                        return res.send(JSON.stringify({message: 'ERROR: Study with this name already exists: ' + new_study_name}));
                    }
                    var study_obj = {
                        name: new_study_name,
                        folder_name: new_study_name,
                        users: [{id: user_id}],
                        modify_date: Date.now()
                    };
                    return insert_obj(user_id, study_obj)
                        .then(function (study_data) {
                            study_info(study_id)
                                .then(function(original_study_data) {
                                    users_comp.user_info(user_id)
                                        .then(function(user_data) {
                                            try {
                                                if (!fs.existsSync(study_data.dir)) {
                                                    fs.copySync('users/' + user_data.user_name + '/' + original_study_data.folder_name, study_data.dir);
                                                    return res.send(JSON.stringify({study_id: study_data.study_id}));
                                                }
                                                } catch (err) {
                                                    res.statusCode = 500;
                                                    return res.send(JSON.stringify({message: 'ERROR: Study does not exist in FS!'}));
                                                }
                                        })
                                })
                        });
                });
        })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
    });
};

delete_study = function (user_id, study_id, res) {
    have_permission(user_id, study_id)
        .then(function(user_data) {
            delete_by_id(user_id, study_id)
                .then(function(study_data) {
                        var dir = 'users/' + user_data.user_name + '/' + study_data.value.folder_name;
                        try {
                            if (!fs.existsSync(dir)) {
                                res.statusCode = 500;
                                return res.send(JSON.stringify({message: 'ERROR: Study does not exist in FS!'}));
                            }
                            fs.removeSync(dir);
                                return res.send(JSON.stringify({}));
                        } catch (err) {
                            console.log(err);
                            res.statusCode = 500;
                            return res.send(JSON.stringify({message: err}));
                        }
                }
            );}
        )
        .catch(function(){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};


have_permission = function (user_id, study_id) {
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.findOne({_id:user_id, studies: {$elemMatch: {id:study_id}} })
            .then(function(user_result){
                if (!user_result)
                    return Promise.reject();
                return Promise.resolve(user_result);
            })
    });
};

study_exist = function (user_id, study_name) {
    return mongo.connect(url).then(function (db) {
        var studies   = db.collection('studies');
        return studies.findOne({name:study_name , users: {$elemMatch: {id:user_id}}})
            .then(function(study_data){
                return Promise.resolve({is_exist: !!study_data});
            })
    });
};

insert_obj = function (user_id, study_obj) {
    return mongo.connect(url).then(function (db) {
        var counters = db.collection('counters');
        var studies  = db.collection('studies');
        var users    = db.collection('users');
        return counters.findAndModify({_id:'study_id'},
            [],
            {"$inc": {"seq": 1}},
            {upsert: true, new: true, returnOriginal: false})
        .then(function(counter_data){
            var study_id = counter_data.value.seq;
            study_obj._id = study_id;
            return studies.insert(study_obj)
                .then(function(study_data){
                    return users.findAndModify({_id: user_id},
                        [],
                        {$push: {studies: {id: study_id, tags: []}}})
                        .then(function(user_data){
                            var dir = 'users/'+user_data.value.user_name+'/'+study_obj.name;
                            return Promise.resolve({study_id, dir});
                        })
                })
        })
    });
};

update_obj = function (study_id, study_obj) {
    return mongo.connect(url).then(function (db) {
        var studies   = db.collection('studies');
        return studies.findAndModify({_id:study_id},
            [],
            {$set: study_obj})
            .then(function(study_data){
                return Promise.resolve(study_data);
            })
    });
};

delete_by_id = function (user_id, study_id) {
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        var studies   = db.collection('studies');
        return users.update({_id:user_id}, {$pull: {studies: {id: study_id}}})
            .then(function(){return studies.findAndModify({_id:study_id},
                [],
                {remove: true});})
            .then(function(study_data){
                return Promise.resolve(study_data);
            });
    });
};


study_info = function (study_id) {
    return mongo.connect(url).then(function (db) {
        var studies   = db.collection('studies');
        return studies.findOne({_id: study_id})
            .then(function(study_data){
                return Promise.resolve(study_data);
            });
    });
};
rename_study = function (user_id, study_id, new_study_name, res) {
    if (!new_study_name) {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'ERROR: empty study name'}));
    }
    var study_obj = { name: new_study_name, folder_name: new_study_name ,modify_date: ''/*Date.now()*/};
    have_permission(user_id, study_id)
        .then(function(user_data) {
                study_exist(user_id, new_study_name)
                    .then(function (study) {
                        if (study.is_exist) {
                            res.statusCode = 400;
                            return res.send(JSON.stringify({message: 'ERROR: Study with this name already exists'}));
                        };
                        return update_obj(study_id, study_obj)
                            .then(function (study_data) {
                                if (!study_data.ok) {
                                    res.statusCode = 500;
                                    return res.send(JSON.stringify({message: 'ERROR: internal error'}));
                                }
                                var new_file_path = 'users/' + user_data.user_name + '/' + new_study_name;
                                var file_path     = 'users/' + user_data.user_name + '/' + study_data.value.folder_name;
                                if (!fs.existsSync(file_path)) {
                                    res.statusCode = 500;
                                    return res.send(JSON.stringify({message: 'ERROR: ERROR: Study does not exist in FS'}));
                                }
                                fs.rename(file_path, new_file_path, function (err) {
                                    if (err) {
                                        res.statusCode = 500;
                                        return res.send(JSON.stringify({message: err.message}));
                                    }
                                    return res.send(JSON.stringify({}));
                                });
                            })
                            .catch(function (study_data) {
                                res.statusCode = 500;
                                return res.send(JSON.stringify({message: 'ERROR: internal error (1)'}));
                            });
                    })
            }
        )
        .catch(function(){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};

update_modify = function (study_id) {
    var modify_date = Date.now();

    return mongo.connect(url).then(function (db) {
        var studies   = db.collection('studies');
        return studies.update({_id: study_id}, {$set: {modify_date: modify_date}});
    });
}

module.exports = {update_modify, get_studies, create_new_study, delete_study, have_permission, rename_study, study_info, duplicate_study};