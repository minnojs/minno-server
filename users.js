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
        return users.findOne({_id: user_id})
            .then(user_data=>user_data);
    });
}

function set_password(user_id, password, confirm) {
    console.log({user_id, password, confirm})
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

function get_email(user_id) {
    return user_info(user_id)
        .then(function(user_data) {
            return ({email: user_data.email});
        });
}

function create_admin_user() {
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        const counters   = db.collection('counters');
        return counters.insert(
            {
                _id: 'user_id',
                seq: 1
            }
        )
        .then(function () {
            if (!fs.existsSync(config.user_folder))
            {
                fs.mkdirSync(config.user_folder);
                fs.mkdirSync(path.join(config.user_folder,'admin'));
            }

            const user_obj = {_id:1,
                user_name:'admin',
                first_name:'admin',
                last_name:'admin',
                email:'admin@admin.com',
                role:'su',
                pass:utils.sha1('admin123'),
                studies:[],tags:[]};
            return users.insert(user_obj);
        });
    });
}

function get_users(res) {
    return mongo.connect(url).then(function (db) {
        var users = db.collection('users');
        users.find({})
            .then(function (user_data) {
                return res.end(JSON.stringify({user_data: user_data}));
            });
    });
}

function insert_new_user(req, res) {
    const user_name  = req.body.username;
    const first_name = req.body.first_name;
    const last_name  = req.body.last_name;
    const email      = req.body.email;
    const server     = config.server_url;

    if (!evalidator.validate(email)){
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Invalid email address'}));
    }
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        const counters   = db.collection('counters');
        return users.findOne({$or: [{user_name:user_name}, {email:email}]})
            .then(function(user_data){
                if (!!user_data)
                {
                    res.statusCode = 400;
                    return res.send(JSON.stringify({message: 'User already exist'}));
                }
                counters.findAndModify({_id: 'user_id'},
                    [],
                    {upsert: true, new: true, returnOriginal: false})
                    .then(function (counter_data) {
                        const activation_code = utils.sha1(user_name+Math.floor(Date.now() / 1000));
                        const user_id = counter_data.value.seq;
                        const user_obj = {_id:user_id, activation_code:activation_code, user_name:user_name, first_name:first_name, last_name:last_name, email:email, email:email, studies:[],tags:[]}
                        return users.insert(user_obj)
                            .then(function(){
                                const userFolder = path.join(config.user_folder, user_name);
                                if (!fs.existsSync(userFolder)) {
                                    fs.mkdirSync(userFolder);
                                    return sender.send_mail('ronenhe.pi@gmail.com', 'welcome', 'email', {url: server+'/static/?/activation/'+activation_code, email: email, user_name: user_name});
                                }
                            });
                    });
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
        // db.dropDatabase();
        const counters = db.collection('counters');
        const users    = db.collection('users');
        const studies  = db.collection('studies');

        return counters.findOne({_id: 'user_id'})
            .then(function(user_data){
                if(!user_data)
                    return create_admin_user();
            })
            .then(()=>users.findOne({user_name: user_name, pass: utils.sha1(pass)})
                .then(function (user_data) {
                    if (!user_data)
                        return Promise.reject({status: 400, message: 'ERROR: wrong user name / password'});

                    user_data.id = user_data._id;
                    if (!user_data.studies)
                        return (user_data);
                    const study_ids = user_data.studies.map(obj=>obj.id);
                    return studies.find({_id: {$in: study_ids}})
                        .then(function (studies) {
                            user_data.studies = studies;
                            return (user_data);
                        });
                })
            );
    });
}


module.exports = {connect, reset_password, check_reset_code, reset_password_request, get_users, create_admin_user, user_info, get_email, set_email, set_password, insert_new_user, check_activation_code, set_user_by_activation_code};