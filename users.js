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

function set_password(user_id, password, confirm, res) {
    if(!password || !confirm)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Missing password / confirm password'}));
    }
    if(password.length<8)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Passwords must be at least 8 characters in length!'}));
    }
    if(password !== confirm)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Passwords do not match'}));
    }
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findAndModify({_id: user_id},
            [],
            {$set: {pass: utils.sha1(password)}})
            .then(function () {
                return res.send(JSON.stringify({}));
            });
    });
}


function set_email(user_id, email, res) {
    if(!email)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Missing email'}));
    }
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findAndModify({_id: user_id},
            [],
            {$set: {email: email}})
            .then(function () {
                return res.send(JSON.stringify({}));
            });
    });
}

function get_email(user_id, res) {
    user_info(user_id)
        .then(function(user_data) {
            return res.send(JSON.stringify({email: user_data.email}));
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
        .then(function (counter_data) {
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
    const role       = req.body.role;
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

function check_activation_code(code, res) {
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findOne({activation_code:code})
            .then(function (user_data) {
                if(!user_data){
                    res.statusCode = 400;
                    return res.send(JSON.stringify({message: 'wrong code'}));
                }
                return res.send(JSON.stringify({}));
            });
    });
}

function set_user_by_activation_code(code, pass, pass_confirm, res, callback) {
    if(pass.length<8)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Passwords must be at least 8 characters in length!'}));
    }
    if(pass!==pass_confirm)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'passwords mismatch!'}));
    }
    return mongo.connect(url).then(function (db) {
        const users   = db.collection('users');
        return users.findAndModify(
            {activation_code:code},
            [],
            {$set: {pass:utils.sha1(pass)}, $unset: {activation_code: ""}})
            .then(function (user_data) {
                return res.send(JSON.stringify({}));
            });
    });

};

module.exports = {get_users, create_admin_user, user_info, get_email, set_email, set_password, insert_new_user, check_activation_code, set_user_by_activation_code};
