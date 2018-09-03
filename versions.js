const config        = require('./config');
const utils         = require('./utils');
const mongo         = require('mongodb-bluebird');
const mongo_url     = config.mongo_url;

const {has_read_permission, has_write_permission} = require('./studies');


function generate_id(study_id, version, state) {
    return utils.sha1(study_id + version + state+'*');
}

function get_versions(user_id, study_id) {
    return has_read_permission(user_id, study_id)
        .then(({study_data}) => ({versions: study_data.versions}));
}

function insert_new_version(user_id, study_id, version, state, update_url) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}) {
        const version_id = generate_id(study_id, version, state);

        if (update_url==='update') return push_new_version(study_id, version, state, version_id);
        if (update_url==='keep') return push_new_version(study_id, version, state, versions[versions.length-1].id);

        const versions = study_data.versions.filter(version=>version.state==='Published');
        return push_new_version(study_id, version, state, versions[versions.length-1].id);
    });
}

function push_new_version(study_id, version, state, version_id){
    return mongo.connect(mongo_url).then(function (db) {
        const studies = db.collection('studies');
        return studies.update({_id: study_id}, {
            $push: {
                versions: {
                    id: version_id,
                    version: version,
                    state: state
                }
            },
            $set: {locked: true}
        })
        .then(function (user_result) {
            if (!user_result)
                return Promise.reject();
            return Promise.resolve({id: version_id,
                version: version,
                state: state});
        });
    });
}

module.exports = {get_versions, insert_new_version};
