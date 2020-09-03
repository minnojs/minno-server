const config = require('../config');
const experiments  = require('./experiments');
const utils         = require('./utils');
const {has_read_permission, has_write_permission} = require('./studies');
const connection    = Promise.resolve(require('mongoose').connection);
const path          = require('path');
const fs            = require('fs-extra');



function generate_id(study_id, version, state) {
    return utils.sha1(study_id + version + state+'*');
}

function get_versions(user_id, study_id) {
    return has_read_permission(user_id, study_id)
        .then(({study_data}) => ({versions: study_data.versions}));
}

function change_version_availability(user_id, study_id, version_id, availability) {
    console.log({study_id, version_id, availability});
    return has_write_permission(user_id, study_id)
        .then(() =>
        {
            return connection.then(function (db) {

                const studies = db.collection('studies');
                return studies.updateOne(
                    {_id: study_id, versions: {$elemMatch: {version:version_id}}},
                    {$set: {'versions.$.availability': availability}}
                )
                    .then(function (user_result) {
                        console.log(user_result);
                        if (!user_result)
                            return Promise.reject();
                        return Promise.resolve({id: version_id, availability});
                    });
            });
        });
}


function insert_new_version(user_id, study_id, version_name, version_date, state, update_url) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}) {
        // fs.copy(path.join(config.user_folder, study_data.folder_name), path.join(config.history_folder, study_data.folder_name, version));

        let version_id = generate_id(study_id, version_date, state);
        fs.copy(path.join(config.user_folder, study_data.folder_name, 'sandbox'), path.join(config.user_folder, study_data.folder_name, version_date));

        if (update_url==='reuse'){
            const versions = study_data.versions.filter(version=>version.state==='Published');
            version_id = versions[versions.length-1].id;
        }
        if (update_url==='keep'){
            const versions = study_data.versions;
            version_id = versions[versions.length-1].id;
        }
        return push_new_version(user_id, study_id, version_name, version_date, state, version_id);
    });
}

function restore_version(user_id, study_id, version_id) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}) {

        const version = study_data.versions.find(version=>version.id===version_id).version;
        const data_files_path = path.join(config.history_folder, study_data.folder_name, version);
        fs.copy(path.join(config.user_folder, study_data.folder_name), path.join(config.history_folder, study_data.folder_name, version));
        return data_files_path;

        // const version_id = generate_id(study_id, version, state);
        //
        // if (update_url==='update') return push_new_version(study_id, version, state, version_id);
        // if (update_url==='keep') return push_new_version(study_id, version, state, versions[versions.length-1].id);
        //
        // const versions = study_data.versions.filter(version=>version.state==='Published');
        // return push_new_version(study_id, version, state, versions[versions.length-1].id)
        //     .then(function({}){
        //     });

    });
}




function push_new_version(user_id, study_id, version_name, version, state, version_id){
    return connection.then(function (db) {
        const studies = db.collection('studies');

        return experiments.get_experiments(user_id, study_id)
            .then(experiments=>
                studies.updateOne({_id: study_id}, {
                    $push: {
                        versions: {
                            id: version_id,
                            version_name,
                            version,
                            state,
                            experiments
                        }
                    }
                })
                .then(function (user_result) {
                    if (!user_result)
                        return Promise.reject();
                    return Promise.resolve({id: version_id, version_name, version, state});
                })
            );
    });
}

module.exports = {get_versions, insert_new_version, restore_version, change_version_availability};
