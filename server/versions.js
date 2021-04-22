const config = require('../config');
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
    return has_write_permission(user_id, study_id)
        .then(() =>
        {
            return connection.then(function (db) {
                const studies = db.collection('studies');
                return studies.updateOne(
                    {_id: study_id, versions: {$elemMatch: {hash:version_id}}},
                    {$set: {'versions.$.availability': availability}}
                )
                    .then(function (user_result) {
                        if (!user_result)
                            return Promise.reject();
                        return Promise.resolve({id: version_id, availability});
                    });
            });
        });
}



function insert_new_version(user_id, study_id, creation_date, state) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}) {
        let versions = study_data.versions;
        const last_version = versions.reduce((prev, current) => (prev.id > current.id) ? prev : current);
        const version_id = last_version.id;

        let version_hash = generate_id(study_id, creation_date, state);
        fs.copy(path.join(config.user_folder, study_data.folder_name, 'v'+version_id), path.join(config.user_folder, study_data.folder_name, 'v'+(version_id+1)));

        versions.push({id:version_id+1, hash:version_hash, availability: true, creation_date, state, experiments:last_version.experiments});

        return connection.then(function (db) {
            const studies = db.collection('studies');

            return studies.updateOne({_id: study_id}, {
                $set: {versions}
            })
            .then(function (user_result) {
                if (!user_result)
                    return Promise.reject();
                return Promise.resolve(versions[versions.length - 1]);
            });
        });
    });
}

function publish_version(user_id, study_id, update_url) {
    return has_write_permission(user_id, study_id)
        .then(function({study_data}) {
            let versions = study_data.versions;
            const last_version = versions.reduce((prev, current) => (prev.id > current.id) ? prev : current);

            let version_hash = generate_id(study_id, Math.floor(Date.now() / 1000), 'Published');
            last_version.hash = version_hash;
            if (update_url!=='keep')
                last_version.hash = version_hash;

            last_version.state = 'Published';

            return connection.then(function (db) {
                const studies = db.collection('studies');

                return studies.updateOne({_id: study_id}, {
                    $set: {versions}
                })
                    .then(function (user_result) {
                        if (!user_result)
                            return Promise.reject();
                        return Promise.resolve(versions[versions.length - 1]);
                    });
            });
        });
}


function restore_version(user_id, study_id, version_id) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}) {

        const version = study_data.versions.find(version=>version.id===version_id).version;
        const data_files_path = path.join(config.history_folder, study_data.folder_name, version);
        fs.copy(path.join(config.user_folder, study_data.folder_name), path.join(config.history_folder, study_data.folder_name, version));
        return data_files_path;


    });
}

module.exports = {get_versions, publish_version, insert_new_version, restore_version, change_version_availability};
