const fs          = require('fs-extra');
const formidable  = require('formidable');
var users         = require('./users');
const crypto      = require('crypto');

var mongo         = require('mongodb-bluebird');
const url         = "mongodb://localhost:27017/mydb";


function mysha1( data ) {
    var generator = crypto.createHash('sha1');
    generator.update( data );
    return generator.digest('hex')
}

exports.check = function (user_name, pass, res, callback) {
    if (!user_name || !pass) {
        res.statusCode = 400;
        return res.end(JSON.stringify({message: 'missing parameters'}));
    }
    return mongo.connect(url).then(function (db) {
        var users   = db.collection('users');

        var studies = db.collection('studies');
        var query = {user_name: user_name, pass: mysha1(pass)};
        // users.find({}).then(usersd=>console.log(usersd));
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
};
