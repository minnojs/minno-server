const utils         = require('./utils');
const connection    = Promise.resolve(require('mongoose').connection);

const {has_read_permission, has_write_permission} = require('./studies');

function get_tags(user_id) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOne({_id: user_id})
            .then(user_data=>({tags: user_data.tags}));
    });
}

function get_study_tags(user_id, study_id) {
    return has_read_permission(user_id, study_id)
        .then(function(){
            return connection.then(function (db) {
                const users   = db.collection('users');
                return users.findOne({_id:user_id, studies: {$elemMatch: {id:study_id}}})
                    .then(function(user_data){
                        const study_obj = user_data.studies.find(study => study.id === study_id);
                        const all_tags = user_data.tags;
                        const used = all_tags.map(function(tag){
                            const used = study_obj.tags.indexOf(tag.id)>-1;
                            return{id:tag.id, text:tag.text, color: tag.color, used:used};
                        });
                        return ({tags: used});
                    });
            });
        });
}

function update_study_tags(user_id, study_id, tags) {
    return has_write_permission(user_id, study_id)
    .then(function({user_data}){
        return connection.then(function (db) {
            const users   = db.collection('users');
            const study_obj = user_data.studies.find(study => study.id === study_id);
            let study_tags = study_obj.tags;
            tags.forEach(tag=>tag.used ? study_tags.push(tag.id): study_tags = study_tags.filter(el=>el !== tag.id));
            return users.findOneAndUpdate(
                {_id:user_id, studies: {$elemMatch: {id:study_id}} },
                {$set: {'studies.$.tags': study_tags}})
                .then(()=>({tags:study_tags}));
        });
    });
}

function insert_new_tag(user_id, tag_text, tag_color) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.updateOne({_id: user_id}, {$push: {tags:{id:utils.sha1(tag_text+tag_color), text:tag_text, color:tag_color}}})
            .then(function(user_result){
                if (!user_result)
                    return Promise.reject({status:500, message: 'ERROR: internal error'});

            })
            .then(()=>({id:utils.sha1(tag_text+tag_color), text:tag_text, color:tag_color}));

    });
}

function delete_tag(user_id, tag_id) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOne({_id: user_id}).then(function(user) {
            user.studies.map(function (study) {
                study.tags = study.tags.filter(function (tag) {
                    return tag !== tag_id;
                });
            });
            return users.updateOne({_id: user_id}, {$pull: {tags: {id: tag_id}}, $set: {studies: user.studies} })
                .then(function(user_result){
                    if (!user_result)
                        return Promise.reject({status:500, message: 'ERROR: internal error'});
                });
        });
    });
}

function update_tag(user_id, tag) {
    return connection.then(function (db) {
        const users = db.collection('users');
        return users.updateOne({_id: user_id, tags: { $elemMatch: {id:tag.id}}},
            {$set: {'tags.$.text': tag.text, 'tags.$.color': tag.color}}
        )
        .then(function(tag_result){
            if (!tag_result)
                return Promise.reject({status:500, message: 'ERROR: internal error'});
        });
    });
}


module.exports = {get_tags, get_study_tags, update_study_tags, insert_new_tag, delete_tag, update_tag};
