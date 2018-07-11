const fs          = require('fs-extra');
const formidable  = require('formidable');
var users_obj     = require('./users');
const crypto      = require('crypto');
var config        = require('./config');

var mongo         = require('mongodb-bluebird');
const url         = config.mongo_url;

function mysha1( data ) {
    var generator = crypto.createHash('sha1');
    generator.update( data );
    return generator.digest('hex')
}

exports.check = function (user_name, pass, res, callback) {
    log.info(`201804201319 | new login: ${user_name}`);

    if (!user_name || !pass) {
        res.statusCode = 400;
        return res.end(JSON.stringify({message: 'missing parameters'}));
    }


    return mongo.connect(url).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    })
        .then(function (db) {
        // db.dropDatabase();

        var users   = db.collection('users');

        var studies = db.collection('studies');
        var query = {user_name: user_name, pass: mysha1(pass)};

        var counters   = db.collection('counters');


        return counters.findOne({_id: 'user_id'})
        .then(function(user_data){
            if(!user_data)
            {
                users_obj.create_admin_user();
            }
            // users.findOne({}).then((aa)=>console.log(aa));
            // users.find({}).then(usersd=>console.log(usersd));
        })
        .then(function(){

            users.findOne(query)
                .then(function (user_data) {
                    if (!user_data) {
                        res.statusCode = 400;
                        return res.end(JSON.stringify({message: 'wrong user name / password'}));
                    }
                    user_data.id = user_data._id;

                    if (!user_data.studies)
                        return callback(user_data);

                    var study_ids = user_data.studies.map(function (obj) {
                        return obj.id;
                    });

                    studies.find({_id: {$in: study_ids}})
                        .then(function (studies) {
                            user_data.studies = studies;
                            return callback(user_data);
                        });

                });
        });
    });
};
