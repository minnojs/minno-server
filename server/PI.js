const utils         = require('./utils');
const connection    = Promise.resolve(require('mongoose').connection);
const dateFormat    = require('dateformat');
const versions_comp   = require('./versions');

const {has_write_permission} = require('./studies');

function get_rules(user_id, deployer = false, user_role = '') {
    if(deployer && (user_role !== 'du' && user_role !== 'su'))
        return Promise.reject({status:400, message:'Error: Permission denied'});
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOne({_id: deployer ? -1 : user_id})
            .then(user_data=>{
                if (deployer && !user_data)
                    users.insertOne({_id:-1, rules:[]});
                return ({sets: user_data ? user_data.rules : []});
            });
    });
}

function insert_new_set(user_id, rules, deployer = false, user_role = '') {
    // return console.log({user_id, rules, deployer, user_role});
    if(deployer && (user_role !== 'du' && user_role !== 'su'))
        return Promise.reject({status:400, message:'Error: Permission denied'});
    if(!rules.name)
        return Promise.reject({status:400, message: 'ERROR: Sets have to include a unique name'});
    return connection.then(function (db) {
        const users   = db.collection('users');
        rules['id'] = utils.sha1(Math.floor(Date.now() / 1000));
        return users.updateOne({_id: deployer ? -1 : user_id}, {
            $push: {rules:rules}
        })
        .then(function (user_result) {
            if (!user_result)
                return Promise.reject({status: 500, message: 'ERROR: internal error'});
        })
        .then(() => ({rules}));
    });
}

function delete_set(user_id, set_id, deployer = false) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.updateOne({_id: deployer ? -1 : user_id}, {$pull: {rules: {id: set_id}}})
            .then(function(user_result){
                if (!user_result)
                    return Promise.reject({status:500, message: 'ERROR: internal error'});
            });
    });
}

function update_set(user_id, rules, deployer = false, user_role) {
    if(deployer && (user_role !== 'du' && user_role !== 'su'))
        return Promise.reject({status:400, message:'Error: Permission denied'});
    return connection.then(function (db) {
        if(!rules.name)
            return Promise.reject({status:400, message: 'ERROR: Sets have to include a name'});
        const users = db.collection('users');
        return users.updateOne({_id: deployer ? -1 : user_id, rules: { $elemMatch: {id:rules.id}}},
            {$set: {'rules.$': rules}}
        )
            .then(function(updated){
                if (!updated)
                    return Promise.reject({status:500, message: 'ERROR: internal error'});
            });
    });
}


function read_review(user_id, deploy_id){
    return connection.then(function (db) {
        const users = db.collection('users');
        return users.updateOne({_id: user_id},
            {$pull: {reviewed_requests: {deploy_id}}});
    });
}

function update_deploy(deploy_id, priority, pause_rules, reviewer_comments, status, user_role) {
    if(user_role !== 'du' && user_role !== 'su')
        return Promise.reject({status:400, message:'Error: Permission denied'});

    return connection.then(function (db) {
        const deploys = db.collection('deploys');
        const studies = db.collection('studies');
        const users = db.collection('users');

        return deploys.findOneAndUpdate({_id: deploy_id},
            {$set: {priority, status, pause_rules, reviewer_comments}}
        ).then(request=>{
            return studies.findOne({_id:request.value.study_id})
                .then(study_data=>
                {
                    let versions = study_data.versions;
                    let version2update  = versions.find(version=>version.id===request.value.version_id);
                    let deploy2update   = version2update.deploys.find(deploy=>deploy.sets.find(set=>set._id===deploy_id));
                    let set2update      = deploy2update.sets.find(set=>set._id===deploy_id);
                    set2update.status   = status;
                    set2update.priority = priority;
                    set2update.reviewer_comments = reviewer_comments;
                    users.updateMany({_id: {$in: study_data.users.map(user=>user.user_id)}},
                        {$push: {reviewed_requests: {
                            study_id:request.value.study_id,
                            study_name:request.value.study_name,
                            version_id: request.value.version_id,
                            deploy_id: request.value._id,
                            file_name: set2update.experiment_file.file_id,
                            status: status,
                            reviewer_comments: reviewer_comments
                        }}});

                    return studies.updateOne({_id:request.value.study_id},
                        {$set: {versions:versions}})
                        .then(()=> {

                            const now = new Date();
                            // console.log(version2update.state !=='Develop');
                            if (version2update.state ==='Develop')
                                return versions_comp.insert_new_version(study_data.users.find(user=>user.permission === 'owner').user_id, parseInt(request.value.study_id),
                                    '',
                                    dateFormat(now, 'yyyymmdd.HHMMss'),
                                    'Develop',
                                    true);});
                })
                .then(get_all_deploys);
        });
    });
}

function get_all_deploys() {
    return connection.then(function (db) {
        const deploys = db.collection('deploys');
        return deploys.find({}).toArray();
    });
}

function get_deploy(deploy_id) {
    return connection.then(function (db) {
        const deploys = db.collection('deploys');
        return deploys.findOne({_id:deploy_id});
    });
}

function request_deploy(user_id, study_id, props) {
    return has_write_permission(user_id, study_id)
        .then(function({user_data, study_data}) {
            let versions = study_data.versions;
            let version2deploy = versions.find(version=>version.hash===props.version_id);
            const now = new Date();
            props.creation_date = dateFormat(now, 'yyyymmdd.HHMMss');
            props.sets.map(set=>set._id = utils.sha1(Date.now()+Math.random()));
            if(Array.isArray(version2deploy.deploys))
                version2deploy.deploys.push(props);
            else
                version2deploy.deploys = [props];
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
                        version_id:version2deploy.id,
                        version_hash:version2deploy.hash,
                        status:'pending',
                        creation_date:props.creation_date,
                        email:user_data.email,
                        launch_confirmation:props.launch_confirmation,
                        comments:props.comments,
                        experiment_file:set.experiment_file,
                        rules:set.rules,
                        priority:set.priority,
                        planned_procedure: props.planned_procedure,
                        sample_size: props.sample_size,
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
function change_deploy(user_id, study_id, props) {

    return has_write_permission(user_id, study_id)
        .then(function({user_data, study_data}) {

            let versions = study_data.versions;
            let version2update = versions.find(version=>version.id===props.version_id);

            let deploy2update = JSON.parse(JSON.stringify(version2update.deploys.find(deploy=>deploy.sets.find(set=>set._id===props.deploy_id))));

            let set2update = JSON.parse(JSON.stringify(deploy2update.sets.find(set=>set._id===props.deploy_id)));

            deploy2update.creation_date = dateFormat(Date.now(), 'yyyymmdd.HHMMss');
            set2update.target_number = props.target_number;

            set2update.priority    = props.priority;
            deploy2update.comments = props.comments;
            set2update.ref_id      = set2update._id;
            set2update._id         = utils.sha1(Date.now()+Math.random());
            set2update.status      = 'pending';
            deploy2update.sets     = [set2update];
            version2update.deploys.push(deploy2update);
            return connection.then(function (db) {
                const studies = db.collection('studies');

                return studies.updateOne({_id: study_id}, {
                    $set: {versions}
                })
                .then(()=> {
                    const new_deploy ={
                        user_name:user_data.user_name,
                        _id:set2update._id,
                        ref_id:set2update.ref_id,
                        study_id,
                        study_name:study_data.name,
                        version_id:props.version_id,
                        version_hash:version2update.hash,
                        status:'pending',
                        creation_date:deploy2update.creation_date,
                        email:user_data.email,
                        launch_confirmation:deploy2update.launch_confirmation,
                        comments:deploy2update.comments,
                        experiment_file:set2update.experiment_file,
                        rules:set2update.rules,
                        priority:set2update.priority,
                        target_number: set2update.target_number};
                    const deploys = db.collection('deploys');
                    return deploys.insertOne(new_deploy)
                        .then(function (user_result) {
                            if (!user_result)
                                return Promise.reject();
                            return Promise.resolve(new_deploy);
                        });

                });
            });
        });
}

module.exports = {get_rules, insert_new_set, delete_set, update_set, request_deploy, change_deploy, get_deploy, get_all_deploys, update_deploy, read_review};
