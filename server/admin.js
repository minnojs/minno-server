const {execSync} = require('child_process');
const fs = require('fs-extra');
const config_file = require.main.require('../config');
const studies_comp  = require('./studies');
const users_comp  = require('./users');

const connection    = Promise.resolve(require('mongoose').connection);

exports.get_data_usage = function () {
    return connection.then(function (db) {
        const data_usage = db.collection('data_usage');
        const users = db.collection('users');
        return data_usage.find({}).toArray().then(all_data_usage=>{
            return users.find({}).toArray().then(users=>Promise.all(users.map(user=>{
                return studies_comp.get_studies(user._id)
                    .then(studies=>{
                        const study_ids = studies.filter(study=>study.permission ==='owner')
                        .map(user_study=>user_study.id);
                        return ({user_id: user._id, user_name: user.user_name, studies_per_day: all_data_usage
                                .flatMap(daily_data_usage=> ({date: daily_data_usage.date, studies: daily_data_usage.studies.filter(study=>study_ids.includes(study.id))}))});
                    });
            })));
        });
    });
};


exports.get_usage = function () {

    return this.get_data_usage().then(data_usage=> {
        const usage_data_arr = execSync('df -hT /home').toString().split('\n')[1].replace(/ +/g, '_').split('_');
        return fs.readdir(config_file.user_folder)
            .then(users =>
                Promise.all(users.map(function (user) {
                    return Promise.all([
                        ({
                            user,
                            total_size: execSync('du -sh  ' + config_file.user_folder + user).toString().split('\n')[0].split('\t')[0]
                        }),
                        fs.readdir(config_file.user_folder + user)
                            .then(studies => studies.map(function (study) {
                                return {
                                    user,
                                    study,
                                    study_id: parseInt(study.match(/[0-9]+$/g)[0]),
                                    study_size: execSync('du -sh  ' + config_file.user_folder + user + '/"' + study + '"').toString().split('\n')[0].split('\t')[0]
                                };
                            }))
                    ]);
                })))

            .then(storage_per_user => {
                return ({
                    storage_per_user,
                    data_usage,
                    Filesystem: usage_data_arr[0],
                    Type: usage_data_arr[1],
                    Size: usage_data_arr[2],
                    Used: usage_data_arr[3],
                    Avail: usage_data_arr[4],
                    Use: usage_data_arr[5],
                    MountedOn: usage_data_arr[6]
                });
            });
    });
};


