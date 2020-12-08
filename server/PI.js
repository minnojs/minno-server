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



function update_deploy(deploy_id, priority, status) {
    return connection.then(function (db) {
        const deploys = db.collection('deploys');
        const studies = db.collection('studies');

        return deploys.findOneAndUpdate({_id: deploy_id},
            {$set: {priority, status }}
            // {$set: {priority}}
        ).then(request=>{
            // studies.findOne({_id:request.value.study_id, 'versions.deploys': { $elemMatch: {id: deploy_id}}})
            return studies.findOne({_id:request.value.study_id})

                // {$set: {'versions.$.deploys.status':status}})
                .then(study_data=>
                {
                    let versions = study_data.versions;
                    let version2update = versions.find(version=>version.id===request.value.version_id);
                    let deploy2update = version2update.deploys.find(deploy=>deploy.sets.find(set=>set._id===deploy_id));
                    let set2update = deploy2update.sets.find(set=>set._id===deploy_id);
                    set2update.status = status;
                    set2update.priority = priority;
                    return studies.updateOne({_id:request.value.study_id},
                        {$set: {versions:versions}}).then(get_all_deploys);

                });
        });
    });
}

function get_all_deploys() {
    return connection.then(function (db) {
        const deploys = db.collection('deploys');
        return deploys.find({}).toArray();
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
        .then(function({user_data, study_data}) {
            let versions = study_data.versions;
            let last_version = versions.filter(version=>version.state==='Published').reduce((prev, current) => (prev.id > current.id) ? prev : current);
            const now = new Date();
            props.creation_date = dateFormat(now, 'yyyymmdd.HHMMss');
            props.sets.map(set=>set._id = utils.sha1(Date.now()+Math.random()));
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
                    let requests = [];

                    props.sets.map(set=>requests.push({user_name:user_data.user_name,
                        _id:set._id,
                        study_id,
                        study_name:study_data.name,
                        version_id:last_version.id,
                        status:'pending',
                        link:'link',
                        creation_date:props.creation_date,
                        email:user_data.email,
                        approved_by_a_reviewer:props.approved_by_a_reviewer,
                        launch_confirmation:props.launch_confirmation,
                        comments:props.comments,
                        experiment_file:set.experiment_file,
                        rules:set.rules,
                        priority:set.priority,
                        target_number: set.target_number}));

                    const deploys = db.collection('deploys');

                    return deploys.insertMany(requests)
                        .then(function (user_result) {
                            if (!user_result)
                                return Promise.reject();
                            return Promise.resolve(versions[versions.length - 1]);
                        });

                });

            });
        });
}

module.exports = {get_rules, insert_new_set, delete_set, update_set, request_deploy, get_all_deploys, update_deploy};
