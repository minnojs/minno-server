const utils         = require('./utils');
const connection    = Promise.resolve(require('mongoose').connection);
const dateFormat    = require('dateformat');
const versions_comp   = require('./versions');
const research_pool   = require('./researchpool');
const Validator = require('node-input-validator');
const config        = require('../config');
const path          = require('path');
const urljoin       = require('url-join');
const join          = require('path').join;

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



function add_study2pool(deploy) {
    return connection.then(function (db) {
        const deploys = db.collection('deploys');
        const studies = db.collection('studies');
        return deploys.findOneAndUpdate({_id: deploy._id},
            {$set: {status: 'running'}})
            .then(request => {
                return studies.findOne({_id: request.value.study_id})
                    .then(study_data => {
                        let versions = study_data.versions;
                        let version2update = versions.find(version => version.id === request.value.version_id);
                        let deploy2update = version2update.deploys.find(deploy => deploy.sets.find(set => set._id === deploy._id));
                        let set2update = deploy2update.sets.find(set => set._id === deploy._id);
                        set2update.status = 'running';
                        const studies = db.collection('studies');
                        return studies.updateOne({_id: request.value.study_id}, {
                            $set: {versions}
                        });
                    });

            });
    });
}


function add2pool(deploy_id) {
    return get_deploy(deploy_id)
        .then(deploy=>{
            if(deploy.ref_id)
                return get_deploy(deploy.ref_id)
                    .then(old_deploy=>update_in_pool(deploy, old_deploy));
            return research_pool.addPoolStudy(deploy)
                .then(()=>add_study2pool(deploy));
        })
    .then(()=>get_deploy(deploy_id));
}

function update_in_pool(new_deploy, old_deploy) {
    if (old_deploy.status!=='running')
        return research_pool.addPoolStudy(new_deploy)
            .then(()=>add_study2pool(new_deploy));
    const new_id = new_deploy._id;
    new_deploy._id = old_deploy._id;
    return research_pool.updateStudyPool(new_deploy)
        .catch(err=>console.log(err))
        .then(()=>{
            new_deploy._id = new_id;
            return add_study2pool(new_deploy)
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
                            if (status==='accept' && version2update.state ==='Develop') {
                                return versions_comp.publish_version(study_data.users.find(user => user.permission === 'owner').user_id, parseInt(request.value.study_id), 'keep');
                            }
                        });
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

function edit_registration(study_id, version_id, experiment_id) {
    return connection.then(function (db) {
        const config_data = db.collection('config');
        return config_data.updateOne({var: 'registration'},
            {$set: {study_id, version_id, experiment_id}}, {upsert: true})
            .then(() => ('registration successfully updated'));
    });
}

function registration(email_address) {
    let validator = new Validator({email:email_address},
        {email: 'required|email'});

    return validator.check()
        .then(function () {
            if (Object.keys(validator.errors).length !== 0)
                return Promise.reject({status: 400, message: 'The email must be a valid email address'});
            return connection.then(function (db) {
                const participants = db.collection('participants');
                return participants.findOne({email_address})
                    .then(data=>
                    {
                        if (data)
                            return Promise.reject({status: 400, message: 'This email is already in used'});
                        return participants.insertOne({email_address})
                            .then(function (user_result) {
                                if (!user_result)
                                    return Promise.reject();
                                return Promise.resolve(user_result.ops[0]);
                            });

                    });
            });
        });

}


function get_registration_url (id) {
    return connection.then(function (db) {
        const counters = db.collection('counters');
        const studies = db.collection('studies');
        return get_registration().then(registration_data=>


        studies.findOne({versions: { $elemMatch: {hash: registration_data.version_id} }})
            .then(function(study_data){
                if(!study_data)
                    return Promise.reject({status:400, message:'Error: Experiment doesn\'t exist.'});

                const version_data = study_data.versions.filter(version=>version.hash === registration_data.version_id)[0];

                if(!version_data.availability)
                    return Promise.reject({status:400, message:'Error: Experiment doesn\'t available.'});

                const exp_data = version_data.experiments.filter(exp=>exp.id === registration_data.experiment_id)[0];
                if (!exp_data)
                    return Promise.reject({status:400, message:'Error: Experiment doesn\'t exist'});

                const version_folder = path.join(study_data.folder_name, 'v'+version_data.id);

                const url       = urljoin(config.relative_path, 'users', version_folder, exp_data.file_id);
                const base_url  = urljoin(config.relative_path, 'users', version_folder, '/');

                const file_path = join(config.user_folder,  version_folder, exp_data.file_id);

                return counters.findOneAndUpdate({_id:'session_id'},
                    {'$inc': {'seq': 1}},
                    {upsert: true, new: true, returnOriginal: false})
                    .then(function(counter_data){

                        const session_id = counter_data.value.seq;
                        return {
                            version_data: version_data,
                            exp_id:exp_data.id,
                            descriptive_id: exp_data.descriptive_id,
                            session_id,
                            registration_id:id,
                            type: study_data.type,
                            url,
                            path: file_path,
                            base_url
                        };
                    });
            }));
    });
}

function get_registration() {
    return connection.then(function (db) {
        const config_data = db.collection('config');
        return config_data.findOne({var: 'registration'})
            .then(data=>data);
    });
}


function request_deploy(user_id, study_id, props) {
    return has_write_permission(user_id, study_id)
        .then(function({user_data, study_data}) {
            let versions        = study_data.versions;
            let version2deploy  = versions.find(version=>version.hash===props.version_id);
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
                .then(function (res) {
                    if (!res)
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
            set2update.changed     = props.changed;
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
                        changed:props.changed,
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
                        .then(function (deploy_data) {
                            if (!deploy_data)
                                return Promise.reject();
                            return Promise.resolve(new_deploy);
                        });

                });
            });
        });
}

module.exports = {add2pool, edit_registration, registration, get_registration, get_registration_url, get_rules, insert_new_set, delete_set, update_set, request_deploy, change_deploy, get_deploy, get_all_deploys, update_deploy, read_review};
