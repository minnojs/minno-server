const config      = require('../config');
const sender      = require('./sender');
const fs          = require('fs-extra');
const path        = require('path');
const utils       = require('./utils');
const config_db = require('./config_db');

const connection    = Promise.resolve(require('mongoose').connection);
const {Validator} = require('node-input-validator');

function user_info (user_id) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOne({_id: user_id});
    });
}

function new_msgs (user_id) {
    return user_info(user_id)
    .then(user_data => !!user_data.pending_studies && user_data.pending_studies.length);
}

function user_info_by_name (user_name) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOne({user_name})
            .then(user_data => user_data ? user_data : Promise.reject({status:400, message: `ERROR: ${user_name} does not exist`}));
    });
}

function set_password(user_id, password, confirm, force) {
    if(!password || !confirm)
        return Promise.reject({status:400, message: 'Missing password / confirm password'});
    if(password.length<8)
        return Promise.reject({status:400, message: 'Passwords must be at least 8 characters in length'});
    if(password !== confirm)
        return Promise.reject({status:400, message: 'Passwords do not match'});
    if(password===config.admin_default_pass && !force)
        return Promise.reject({status:400, message: 'Password must be different from the default'});

    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOneAndUpdate({_id: user_id},
            {$set: {pass: utils.sha1(password)}})
            .then(() => ({}));
    });
}



function update_details(user_id, params) {

    let status = {};
    if (params.password)
        status.password = {};
    if (params.email)
        status.email = {};

    return Promise.all([
        params.password ? set_password(user_id, params.password, params.confirm).catch(err=>status.password.error = err.message) : '',
        params.email ? set_email(user_id, params.email).catch(err=>status.email.error = err.message) : ''
    ]).then(()=>(status));

}

function set_email(user_id, email) {


    if (!email)
        return Promise.reject({status: 400, message: 'Missing email'});


    let validator = new Validator({email},
        {email: 'required|email'});

    return validator.check()
        .then(function () {
            if (!Object.keys(validator.errors).length == 0)
                return Promise.reject({status: 400, message: validator.errors.email.message});
            return connection.then(function (db) {
                const users = db.collection('users');
                return users.findOneAndUpdate({_id: user_id},
                    {$set: {email: email}})
                    .then(() => ({}));

            });
        });
}


function set_dbx_token(user_id, access_token) {
    if(!access_token)
        return Promise.reject({status:400, message: 'Missing access_token'});
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOneAndUpdate({_id: user_id},
            {$set: {dbx_token: access_token}})
            .then(()=>({}));

    });
}

function revoke_dbx_token(user_id) {
    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOneAndUpdate({_id: user_id},
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


function get_users(server_url) {
    return connection.then(function (db) {
        const users = db.collection('users');
        return users.find({})
            .toArray()
            .then(function(users_data)
            {
                users_data = users_data.filter(user=>user.user_name!=='bank' && user.user_name!=='admin');
                return (users_data.map(user=>(
                    {id:user._id,
                        user_name: user.user_name,
                        first_name:user.first_name,
                        last_name: user.last_name,
                        email:user.email,
                        role:user.role,
                        activation_code: !user.activation_code ? '' : server_url + `/dashboard/?/activation/${user.activation_code}`,
                        reset_code: !user.reset_code ? '' : server_url + `/dashboard/?/reset_password/${user.reset_code}`
                    })));
            });
    });
}

function update_role(user_id, role) {
    return connection.then(function (db) {
        const users = db.collection('users');
        return users.updateOne({_id: user_id}, {$set: {role: role}})
            .then(user_data => (user_data));
    });
}


function remove_user(user_id) {
    return connection.then(function (db) {
        const users = db.collection('users');
        return users.deleteOne({_id: user_id})
            .then(user_data => (user_data));
    });
}

function insert_new_user({username, first_name, last_name, email, role, password, confirm}, server_url) {
    let validator = new Validator(
        {username, email, first_name, last_name},
        {username:'required|alphaDash|minLength:4', first_name: 'required|alphaDash|minLength:3', last_name: 'required|alphaDash|minLength:3', email:'required|email'}
    );

    return validator.check()
    .then(function () {
        if (!Object.keys(validator.errors).length==0)
        {
            let error = '';
            if(validator.errors.username)
                error = validator.errors.username.message;
            else if(validator.errors.first_name)
                error = validator.errors.first_name.message;
            else if(validator.errors.last_name)
                error = validator.errors.last_name.message;
            else
                error = validator.errors.email.message;
            return Promise.reject({status:400, message: error});
        }
        const user_name  = username.toLowerCase();


        const userFolder = path.join(config.user_folder, user_name);
        const activation_code = utils.sha1(user_name+Math.floor(Date.now() / 1000));


        return connection.then(function (db) {
            const users   = db.collection('users');
            const counters   = db.collection('counters');
            return users.findOne({$or: [{user_name}, {email}]})
                .then(function(user_data){
                    if (user_data) return Promise.reject({status:400, message: 'User already exists'});
                })
                .then(() => fs.ensureDir(userFolder))

                .then(() => counters.findOneAndUpdate(
                    {_id: 'user_id'},
                    {$inc: {'seq': 1}},
                    {update: true, new: true, returnOriginal:false}
                ))
                .then(function (counter_data) {
                    const user_id = counter_data.value.seq;
                    const user_obj = {_id:user_id, activation_code, user_name, first_name, last_name, email, role:role ? role : 'u', studies:[],tags:[]};
                    return users.insertOne(user_obj)
                        .then(response => {
                            if(password && confirm){
                                set_password(response.ops[0]._id, password, confirm, true);
                            }

                        });
                })
                .then(()=>!password ? sender.send_mail(email, 'Welcome', 'activation.ejs', {email, user_name, url: utils.clean_url(`${server_url}/dashboard/?/activation/${activation_code}`)}) : ({}))
                .then(sent=>sent ? ({}) : ({activation_code:utils.clean_url(`${server_url}/dashboard/?/activation/${activation_code}`)}));
        });
    });

}

function check_activation_code(code) {
    return connection.then(function (db) {
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

    return connection.then(function (db) {
        const users   = db.collection('users');
        return users.findOneAndUpdate(
            {activation_code:code},
            {$set: {pass:utils.sha1(pass)}, $unset: {activation_code: ''}})
            .then(function () {
                return ({});
            });
    });
}

function reset_password_request(user_name, server_url)
{
    if(user_name.length<3)
        return Promise.reject({status:400, message: 'ERROR: user name / email must be at least 8 characters in length!'});
    return connection.then(function (db) {
        const users = db.collection('users');
        const reset_code = utils.sha1(user_name + Math.floor(Date.now() / 1000));
        return users.findOne({$or: [{user_name: user_name}, {email: user_name}]})
            .then(user=>{
                if(!user)
                    return Promise.reject({status:400, message: 'Could not find user name or email. Failed to recover your password.'});
                return users.updateOne({_id:user._id},{$set: {reset_code: reset_code}})
                    .then(function()
                    {
                        return config_db.get_gmail().then(function (gmail_details) {
                            if (!gmail_details)
                                return ({message: 'Sent your request to the admin’s email account. You can contact the admin as well, to alert them that you sent this request'});
                            sender.send_mail(user.email, 'Restore password', 'reset_password.ejs', {url: server_url+'/dashboard/?/reset_password/'+reset_code});
                            return ({message: 'Check your email. We sent you a link to choose a new password!'});
                        });
                    });
            });


    });
}

function check_reset_code(code) {
    return connection.then(function (db) {
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
    return connection.then(function (db) {
        const users = db.collection('users');
        return users.updateOne({reset_code: reset_code}, {$unset: {reset_code: 0}})
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

    return connection.then(function (db) {
        const users    = db.collection('users');
        const studies  = db.collection('studies');


        let query = {$or: [{user_name:user_name}, {email:user_name}], pass: utils.sha1(pass)};

        if (!user_name.includes('#'))
            return user_obj();

        const users_names = user_name.split('#');
        query = {$or: [{user_name:users_names[0]}, {email:users_names[0]}], pass: utils.sha1(pass)};

        return user_obj()
            .then(function(user_data){
                if(user_data.role!=='su')
                    return Promise.reject({status: 400, message: 'ERROR: wrong user name / password'});
                query = {$or: [{user_name:users_names[1]}, {email:users_names[1]}]};
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
                    if(user_name ==='admin' && pass === config.admin_default_pass)
                    {
                        user_data.first_admin_login = true;
                    }

                    const study_ids = user_data.studies.map(obj=>obj.id);
                    return studies
                        .find({_id: {$in: study_ids}})
                        .toArray()
                        .then(function (studies) {
                            user_data.studies = studies;
                            return user_data;
                        });
                });
        }
    });
}


module.exports = {connect, reset_password, check_reset_code, reset_password_request, get_users, remove_user, user_info, new_msgs, user_info_by_name, get_email, set_email, set_password, update_details, set_dbx_token, revoke_dbx_token, insert_new_user, update_role, check_activation_code, set_user_by_activation_code};
