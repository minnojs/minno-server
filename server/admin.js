const {execSync} = require('child_process');
const fs = require('fs-extra');
const config_file = require.main.require('../config');


exports.get_usage = function () {
    const usae_data_arr = execSync('df -hT /home').toString().split('\n')[1].replace(/ +/g, '_').split('_');
    return fs.readdir(config_file.user_folder)
        .then(users => users.map(function (user) {
            return {user,size: execSync('du -sh  ' + config_file.user_folder + user).toString().split('\n')[0].split('\t')[0]};
        }))
        .then(data_per_user => ({
            data_per_user,
            Filesystem: usae_data_arr[0],
            Type: usae_data_arr[1],
            Size: usae_data_arr[2],
            Used: usae_data_arr[3],
            Avail: usae_data_arr[4],
            Use: usae_data_arr[5],
            MountedOn: usae_data_arr[6]
        }));


};


