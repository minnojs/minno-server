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

exports.get_tags = function (user_id, res) {
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.findOne({_id: user_id})
            .then(user_data=>res.send(JSON.stringify({tags: user_data.tags})));
    });
};

exports.get_study_tags = function (user_id, study_id, res) {
    have_permission(user_id, study_id)
        .then(function(){
            return mongo.connect(url).then(function (db) {
                var users   = db.collection('users');
                return users.findOne({_id:user_id, studies: {$elemMatch: {id:study_id}}})
                    .then(function(user_data){
                        var study_obj = user_data.studies.find(study => study.id === study_id);
                        var all_tags = user_data.tags;
                        var used = all_tags.map(function(tag){
                            var used = study_obj.tags.indexOf(tag.id)>-1;
                            return{id:tag.id, text:tag.text, color: tag.color, used:used}});
                        return res.send(JSON.stringify({tags: used}));
                    })
            })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
    })
};

exports.update_study_tags = function (user_id, study_id, tags, res) {
    return have_permission(user_id, study_id)
        .then(function(){
            return mongo.connect(url).then(function (db) {
                var users   = db.collection('users');
                return users.findOne({_id: user_id})
                    .then(function(user_data){
                        var study_obj = user_data.studies.find(study => study.id === study_id);
                        var study_tags = study_obj.tags;
                        tags.forEach(function(tag){
                                    if(tag.used)
                                        study_tags.push(tag.id);
                                    else
                                        study_tags = study_tags.filter(function(el) {
                                            return el != tag.id;
                                        });
                                }
                        );
                        // study_tags = [];
                        var studies = user_data.studies;

                        studies.forEach(function(study) {
                            study.id === study_id && (study.tags = study_tags);
                        });
                        users.findAndModify(
                            {_id:user_id, studies: {$elemMatch: {id:study_id}} },
                            [],
                            {$set: {studies: studies}})
                            .then(function(){return res.send(JSON.stringify({tags:study_tags}));});
                    });
            });
        });
};

exports.insert_new_tag = function (user_id, tag_text, tag_color, res) {
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.update({_id: user_id}, {$push: { tags:{id:mysha1(tag_text+tag_color), text:tag_text, color:tag_color} } })
            .then(function(user_result){
                if (!user_result)
                    return Promise.reject();
                return res.send(JSON.stringify({}));
            });
    });
};

exports.delete_tag = function (user_id, tag_id, res) {
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.findOne({_id: user_id}).then(function(user) {
            user.studies.map(function (study) {
                    study.tags = study.tags.filter(function (el) {
                        return el != tag_id;
                    });
                }
            );
            return users.update({_id: user_id}, {$pull: {tags: {id: tag_id}}, $set: {studies: user.studies} })
                .then(function(user_result){
                    if (!user_result)
                        return Promise.reject();
                    return res.send(JSON.stringify({}));
                });
        });
    });
};


exports.update_tag = function (user_id, tag, res) {
        return mongo.connect(url).then(function (db) {
                var users = db.collection('users');
                return users.update({_id: user_id, tags: { $elemMatch: { id: tag.id } }},
                    { $set: { "tags.$.text" : tag.text, "tags.$.color" : tag.color} }
                )
                .then(function(tag_result){
                    if (!tag_result)
                        return Promise.reject();
                    return res.send(JSON.stringify({}));
                });
            }
        );
};
