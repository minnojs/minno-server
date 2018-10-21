const config      = require('./config');
const url         = config.mongo_url;
const sender      = require('./sender');
const fs          = require('fs-extra');
const path        = require('path');
const utils       = require('./utils');

const mongo       = require('mongodb-bluebird');
const evalidator  = require('email-validator');

function user_info (user_id) {
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findOne({_id: user_id});
    });
}

function user_info_by_name (user_name) {
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findOne({user_name})
            .then(user_data => user_data ? user_data : Promise.reject({status:400, message: `ERROR: ${user_name} does not exist`}));
    });
}

function set_password(user_id, password, confirm) {

    if(!password || !confirm)
        return Promise.reject({status:400, message: 'ERROR: Missing password / confirm password'});
    if(password.length<8)
        return Promise.reject({status:400, message: 'ERROR: Passwords must be at least 8 characters in length'});
    if(password !== confirm)
        return Promise.reject({status:400, message: 'ERROR: Passwords do not match'});

    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findAndModify({_id: user_id},
                            [],
                            {$set: {pass: utils.sha1(password)}})
            .then(() => ({}));
    });
}


function set_email(user_id, email) {
    if(!email)
        return Promise.reject({status:400, message: 'Missing email'});
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findAndModify({_id: user_id},
            [],
            {$set: {email: email}})
            .then(()=>({}));

    });
}


function set_dbx_token(user_id, access_token) {
    if(!access_token)
        return Promise.reject({status:400, message: 'Missing access_token'});
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findAndModify({_id: user_id},
            [],
            {$set: {dbx_token: access_token}})
            .then(()=>({}));

    });
}

function revoke_dbx_token(user_id) {
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findAndModify({_id: user_id},
            [],
            {$unset: {dbx_token: ''}})
            .then(()=>({}));

    });
}



function get_email(user_id) {
    return user_info(user_id)
        .then(function(user_data) {
            return ({email: user_data.email});
        });
}


function get_users() {
    return mongo.connect(url).then(function (db) {
        const users = db.collection('users');
        return users.find({})
            .then(function(users_data)
            {
                users_data = users_data.filter(user=>user.user_name!=='bank');
                return (users_data.map(user=>({id:user._id, user_name: user.user_name, first_name:user.first_name, last_name: user.last_name, email:user.email, role:user.role})));
            });
    });
}

function update_role(user_id, role) {
    return mongo.connect(url).then(function (db) {
        const users = db.collection('users');
        return users.update({_id: user_id}, {$set: {role: role}})
            .then(user_data => (user_data));
    });
}


function remove_user(user_id) {
    return mongo.connect(url).then(function (db) {
        const users = db.collection('users');
        return users.remove({_id: user_id})
            .then(user_data => (user_data));
    });
}

function insert_new_user({username, first_name, last_name, email, role, password, confirm}) {
    const user_name  = username;
    const userFolder = path.join(config.user_folder, user_name);
    const activation_code = utils.sha1(user_name+Math.floor(Date.now() / 1000));

    if (!evalidator.validate(email))
        return Promise.reject({status:400, message: 'Invalid email address'});

    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        const counters   = db.collection('counters');
        return users.findOne({$or: [{user_name}, {email}]})
            .then(function(user_data){
                if (user_data) return Promise.reject({status:400, message: 'User already exists'});
            })
            .then(() => fs.ensureDir(userFolder))
            .then(function(){
                if(!password)
                    sender.send_mail(email, 'Welcome', 'email', {email, user_name, url: `${config.server_url}/static/?/activation/${activation_code}`})
            })
            .then(() => counters.findAndModify(
                {_id: 'user_id'},
                [],
                {$inc: {'seq': 1}},
                {upsert: true, new: true, returnOriginal:false}
            ))
            .then(function (counter_data) {
                const user_id = counter_data.value.seq;
                const user_obj = {_id:user_id, activation_code, user_name, first_name, last_name, email, role, studies:[],tags:[]};
                return users.insert(user_obj);
            })
            .then(response => {
                const user_data = response.ops[0];
                    set_password(user_data._id, password, confirm);
                return user_data;
            });
    });
}

function check_activation_code(code) {
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findOne({activation_code:code})
            .then(function (user_data) {
                if(!user_data)
                    return Promise.reject({status:400, message: 'ERROR: wrong code!'});
                return (user_data);
            });
    });
}

function set_user_by_activation_code(code, pass, pass_confirm)
{
    if(!pass || !pass_confirm)
        return Promise.reject({status:400, message: 'ERROR: Missing password / confirm password'});
    if(pass.length<8)
        return Promise.reject({status:400, message: 'ERROR: Passwords must be at least 8 characters in length'});
    if(pass !== pass_confirm)
        return Promise.reject({status:400, message: 'ERROR: Passwords do not match'});

    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findAndModify(
            {activation_code:code},
            [],
            {$set: {pass:utils.sha1(pass)}, $unset: {activation_code: ''}})
            .then(function () {
                return ({});
            });
    });
}

function reset_password_request(user_name)
{
    if(user_name.length<3)
        return Promise.reject({status:400, message: 'ERROR: user name / email must be at least 8 characters in length!'});
    return mongo.connect(url).then(function (db) {
        const users = db.collection('users');
        const reset_code = utils.sha1(user_name + Math.floor(Date.now() / 1000));
        return users.update({$or: [{user_name: user_name}, {email: user_name}]}, {$set: {reset_code: reset_code}})
            .then(function()
            {
                sender.send_mail('ronenhe.pi@gmail.com', 'Restore password', 'reset_password', {url: config.server_url+'/static/?/reset_password/'+reset_code});
                return ({});
            });
    });
}

function check_reset_code(code) {
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findOne({reset_code:code})
            .then(function (user_data) {
                if(!user_data)
                    return Promise.reject({status:400, message: 'ERROR: wrong code!'});
                return (user_data);
            });
    });
}

function use_reset_code(reset_code) {
    return mongo.connect(url).then(function (db) {
        const users = db.collection('users');
        return users.update({reset_code: reset_code}, {$unset: {reset_code: 0}})
            .then(() => ({}));
    });
}

function reset_password(reset_code, password, confirm) {
    return check_reset_code(reset_code)
        .then(user_data=>set_password(user_data._id, password, confirm))
        .then(()=>use_reset_code(reset_code))
        .then(()=>({}));
}


function connect(user_name, pass) {
    if (!user_name || !pass)
        return Promise.reject({status:400, message: 'missing parameters!'});

    return mongo.connect(url).then(function (db) {
        const users    = db.collection('users');
        const studies  = db.collection('studies');
        let query = {user_name, pass: utils.sha1(pass)};

        if (!user_name.includes('_'))
            return user_obj();

        const users_names = user_name.split('_');
        query = {user_name: users_names[0], pass: utils.sha1(pass)};

        return user_obj()
            .then(function(user_data){
                if(user_data.role!=='su')
                    return Promise.reject({status: 400, message: 'ERROR: wrong user name / password'});
                query = {user_name: users_names[1]};
                return user_obj();
            });

        function user_obj()
        {
            return users.findOne(query)
                .then(function (user_data) {
                    if (!user_data)
                        return Promise.reject({status: 400, message: 'ERROR: wrong user name / password'});
                    user_data.id = user_data._id;
                    if (!user_data.studies) user_data.studies = [];
                    if(user_name == pass)
                        user_data.first_login = true;
                    const study_ids = user_data.studies.map(obj=>obj.id);
                    return studies.find({_id: {$in: study_ids}})
                        .then(function (studies) {
                            user_data.studies = studies;
                            return user_data;
                        });
            });
        }
    });
}


module.exports = {connect, reset_password, check_reset_code, reset_password_request, get_users, remove_user, user_info, user_info_by_name, get_email, set_email, set_password, set_dbx_token, revoke_dbx_token, insert_new_user, update_role, check_activation_code, set_user_by_activation_code};
