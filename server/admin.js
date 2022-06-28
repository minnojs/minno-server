const {execSync} = require('child_process');
const fs = require('fs-extra');
const config_file = require.main.require('../config');
const studies_comp  = require('./studies');
const users_comp  = require('./users');


exports.get_usage = function () {
    const usae_data_arr = execSync('df -hT /home').toString().split('\n')[1].replace(/ +/g, '_').split('_');
    return fs.readdir(config_file.user_folder)
        .then(users =>
            Promise.all(users.map(function (user) {
                return Promise.all([
                    ({user, total_size: execSync('du -sh  ' + config_file.user_folder + user).toString().split('\n')[0].split('\t')[0]}),
                    fs.readdir(config_file.user_folder + user)
                        .then(studies => studies.map(function(study){
                            return {user, study, study_size: execSync('du -sh  ' + config_file.user_folder + user +'/'+ study).toString().split('\n')[0].split('\t')[0]};
                        }))
                ]);
            })))

        // .then(details=>{
                //     // console.log(details);
                //     return details;
                //     // return ({user, details, size: execSync('du -sh  ' + config_file.user_folder + user).toString().split('\n')[0].split('\t')[0]});
                //
                // });
        .then(storage_per_user => {
            return ({
            storage_per_user,
            Filesystem: usae_data_arr[0],
            Type: usae_data_arr[1],
            Size: usae_data_arr[2],
            Used: usae_data_arr[3],
            Avail: usae_data_arr[4],
            Use: usae_data_arr[5],
            MountedOn: usae_data_arr[6]
        })});


};


