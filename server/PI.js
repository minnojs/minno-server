const utils         = require('./utils');
const connection    = Promise.resolve(require('mongoose').connection);
const dateFormat    = require('dateformat');

const {has_read_permission, has_write_permission} = require('./studies');

function get_rules(user_id) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOne({_id: user_id})
            .then(user_data=>({sets: user_data.rules}));
    });
}

function insert_new_set(user_id, rules) {
    if(!rules.name)
        return Promise.reject({status:400, message: 'ERROR: Sets have to include a unique name'});
    return connection.then(function (db) {
        const users   = db.collection('users');
        rules['id'] = utils.sha1(Math.floor(Date.now() / 1000));
        return users.updateOne({_id: user_id}, {
            $push: {rules:rules}
        })
        .then(function (user_result) {
            if (!user_result)
                return Promise.reject({status: 500, message: 'ERROR: internal error'});
        })
        .then(() => ({rules}));
    });
}

function delete_set(user_id, set_id) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.updateOne({_id: user_id}, {$pull: {rules: {id: set_id}}})
            .then(function(user_result){
                if (!user_result)
                    return Promise.reject({status:500, message: 'ERROR: internal error'});
            });
    });
}

function update_set(user_id, rules) {
    return connection.then(function (db) {
        if(!rules.name)
            return Promise.reject({status:400, message: 'ERROR: Sets have to include a name'});
        const users = db.collection('users');
        return users.updateOne({_id: user_id, rules: { $elemMatch: {id:rules.id}}},
            {$set: {'rules.$': rules}}
        )
        .then(function(updated){
            if (!updated)
                return Promise.reject({status:500, message: 'ERROR: internal error'});
        });
    });
}

function request_deploy(user_id, study_id, props) {
    return has_write_permission(user_id, study_id)
        .then(function({study_data}) {
            let versions = study_data.versions;
            let last_version = versions.filter(version=>version.state==='Published').reduce((prev, current) => (prev.id > current.id) ? prev : current);
            const now = new Date();
            props.creation_date = dateFormat(now, 'yyyymmdd.HHMMss');
            if(Array.isArray(last_version.deploys))
                last_version.deploys.push(props);
            else
                last_version.deploys = [props];
            return connection.then(function (db) {
                const studies = db.collection('studies');
                return studies.updateOne({_id: study_id}, {
                    $set: {versions}
                })
                .then(function (user_result) {
                    if (!user_result)
                        return Promise.reject();
                    return Promise.resolve(versions[versions.length - 1]);
                });
            });
        });
}

module.exports = {get_rules, insert_new_set, delete_set, update_set, request_deploy};
