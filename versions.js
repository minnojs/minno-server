const config        = require('./config');
const studies_comp  = require('./studies');
const utils         = require('./utils');
const mongo         = require('mongodb-bluebird');
const mongo_url     = config.mongo_url;


const have_permission = studies_comp.have_permission;


function generate_id(study_id, version, state) {
    return utils.sha1(study_id + version + state+'*');
}

function get_versions(user_id, study_id) {
    return have_permission(user_id, study_id)
        .then(function() {
            studies_comp.study_info(study_id)
                .then(function (study_data) {
                    return Promise.resolve({versions: study_data.versions});

                });
        });
}

function insert_new_version(user_id, study_id, version, state, update_url) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(mongo_url).then(function (db) {
                const version_id = generate_id(study_id, version, state);
                if(update_url==='update')
                    return push_new_version(study_id, version, state, version_id);
                return studies_comp.study_info(study_id)
                    .then(function (study_data) {
                        let versions = study_data.versions;
                        if(update_url==='keep')
                            return push_new_version(study_id, version, state, versions[versions.length-1].id);
                        versions = versions.filter(version=>version.state==='Published');
                        return push_new_version(study_id, version, state, versions[versions.length-1].id);
                    });
            });
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
