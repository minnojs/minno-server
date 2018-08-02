const users_obj = require('./users');
const config    = require('./config');
const utils     = require('./utils');
const mongo     = require('mongodb-bluebird');
const url       = config.mongo_url;


function check(user_name, pass) {
    if (!user_name || !pass)
        return Promise.reject({status:400, message: 'ERROR: missing parameters!'});

    return mongo.connect(url).then(function (db) {
    // db.dropDatabase();

        const counters = db.collection('counters');

        const users    = db.collection('users');
        const studies  = db.collection('studies');
        const query    = {user_name: user_name, pass: utils.sha1(pass)};
        return counters.findOne({_id: 'user_id'})
            .then(function(user_data){
                if(!user_data)
                    return users_obj.create_admin_user();
            })
        .then(users.findOne(query)
            .then(function (user_data) {
                if (!user_data)
                    return Promise.reject({status: 400, message: 'ERROR: wrong user name / password'});

                user_data.id = user_data._id;
                if (!user_data.studies)
                    return (user_data);

                const study_ids = user_data.studies.map(function (obj) {
                    return obj.id;
                });

                return studies.find({_id: {$in: study_ids}})
                    .then(function (studies) {
                        user_data.studies = studies;
                        console.log(user_data);
                        return (()=>(user_data));
                    });
            })
        );
    });
}

module.exports = {check};
