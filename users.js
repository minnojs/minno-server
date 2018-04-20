var config = require('./config');
const url         = config.mongo_url;
const crypto      = require('crypto');
const sender      = require('./sender');
const fs          = require('fs-extra');

var mongo         = require('mongodb-bluebird');
var evalidator    = require("email-validator");

function mysha1( data ) {
    var generator = crypto.createHash('sha1');
    generator.update( data );
    return generator.digest('hex')
}

user_info = function (user_id) {
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.findOne({_id: user_id})
            .then(function(user_data){
                return Promise.resolve(user_data);
            });
    });
};

set_password = function (user_id, password, confirm, res) {
    if(!password || !confirm)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Missing password / confirm password'}));
    }
    if(password != confirm)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Passwords do not match'}));
    }
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.findAndModify({_id: user_id},
            [],
            {$set: {pass: mysha1(password)}})
            .then(function () {
                return res.send(JSON.stringify({}));
            });
    });
};


set_email = function (user_id, email, res) {
    if(!email)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Missing email'}));
    }
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.findAndModify({_id: user_id},
            [],
            {$set: {email: email}})
            .then(function () {
                return res.send(JSON.stringify({}));
            });
    });
};

get_email = function (user_id, res) {
    user_info(user_id)
        .then(function(user_data) {
            return res.send(JSON.stringify({email: user_data.email}));
        })
};

create_admin_user = function () {

    return mongo.connect(url).then(function (db) {
            var users   = db.collection('users');
            var counters   = db.collection('counters');
            return counters.insert(
                {
                    _id: "user_id",
                    seq: 1
                }
            )

            .then(function (counter_data) {
                console.log(counter_data.value);
                var user_obj = {_id:1,
                                user_name:'admin',
                                first_name:'admin',
                                last_name:'admin',
                                email:'admin@admin.com',
                                role:'su',
                                pass:mysha1('admin'),
                                studies:[],tags:[]};
                return users.insert(user_obj)
            });
    });
};

get_users = function (res) {
    return mongo.connect(url).then(function (db) {
        var users = db.collection('users');
        users.find({})
            .then(function (user_data) {
                return res.end(JSON.stringify({user_data: user_data}));

            });
    });

};


insert_new_user = function (req, res) {
    var user_name  = req.body.username;
    var first_name = req.body.first_name;
    var last_name  = req.body.last_name;
    var email      = req.body.email;
    var role       = req.body.role;
    var server     = config.server_url;


    if (!evalidator.validate(email)){
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'Invalid email address'}));
    }
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        var counters   = db.collection('counters');
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
                    var activation_code = mysha1(user_name+Math.floor(Date.now() / 1000));
                    var user_id = counter_data.value.seq;
                    var user_obj = {_id:user_id, activation_code:activation_code, user_name:user_name, first_name:first_name, last_name:last_name, email:email, email:email, studies:[],tags:[]}
                    return users.insert(user_obj)
                        .then(function(){
                            if (!fs.existsSync('users/'+user_name)) {
                                fs.mkdirSync('users/'+user_name);
                                return sender.send_mail('ronenhe.pi@gmail.com', 'welcome', 'email', {url: server+'/static/?/activation/'+activation_code, email: email, user_name: user_name});
                            }
                        });
                });
            });
    });
};

check_activation_code = function (code, res) {
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.findOne({activation_code:code})
            .then(function (user_data) {
                if(!user_data){
                    res.statusCode = 400;
                    return res.send(JSON.stringify({message: 'wrong code'}));
                }
                return res.send(JSON.stringify({}));
            });
    });
};

set_user_by_activation_code = function (code, pass, pass_confirm, res, callback) {
    if(pass!=pass_confirm)
    {
        res.statusCode = 400;
        return res.send(JSON.stringify({message: 'passwords mismatch!'}));
    }
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');
        return users.findAndModify(
            {activation_code:code},
            [],
            {$set: {pass:mysha1(pass)}, $unset: {activation_code: ""}})
            .then(function (user_data) {
                return res.send(JSON.stringify({}));
            });
        });

};

module.exports = {get_users, create_admin_user, user_info, get_email, set_email, set_password, insert_new_user, check_activation_code, set_user_by_activation_code};