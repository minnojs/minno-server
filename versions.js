const config = require('./config');
const urljoin = require('url-join');
const crypto      = require('crypto');
const studies_comp = require('./studies');
const data_server  = require('./data_server/controllers/controller');
const mongo         = require('mongodb-bluebird');
const mongo_url         = config.mongo_url;

const have_permission = studies_comp.have_permission;

function mysha1( data ) {
    const generator = crypto.createHash('sha1');
    generator.update( data );
    return generator.digest('hex');
}

// get data for playing a file without creating an experiment
// creates sham info for the player
function get_play_url (user_id, study_id, file_id) {
    return Promise.all([
        have_permission(user_id, study_id).catch(() => false), // have_permission throws if there is no permission, in that case we cast it as false
        studies_comp.study_info(study_id)
    ])
        .then(([user, study_data]) => {
            if (!study_data) return Promise.reject({status:404, message:'Study not found'});
            if (!user) return Promise.reject({status:403, message:'Permission denied'});

            const path = urljoin(config.server_url,'users',user.user_name,study_data.folder_name,decodeURI(file_id));

            // set sham experiment data
            return {
                url:path,
                descriptiveId: '',
                session_id:-1
            };
        });
}

function get_experiment_url (req) {
    return mongo.connect(mongo_url).then(function (db) {
        const counters = db.collection('counters');
        const studies = db.collection('studies');
        console.log(req.params.exp_id);
        return studies.findOne({experiments: { $elemMatch: { id: req.params.exp_id } }})
            .then(function(exp_data){
                // console.log(exp_data);
                return user_info(exp_data.users[0].id).then(function(user){
                    const exp = exp_data.experiments.filter(function(exp) {return exp.id==req.params.exp_id;});
                    const path = urljoin(config.server_url,'users',user.user_name,exp_data.folder_name,exp[0].file_id);
                    return counters.findAndModify({_id:'session_id'},
                        [],
                        {"$inc": {"seq": 1}},
                        {upsert: true, new: true, returnOriginal: false})
                        .then(function(counter_data){
                            var session_id = counter_data.value.seq;
                            return Promise.resolve({exp_id:req.params.exp_id, descriptive_id: exp[0].descriptive_id, session_id:session_id, url:path});
                        });

                });
            });
        }
    );
}


function get_versions(user_id, study_id, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            studies_comp.study_info(study_id)
                .then(function (study_data) {
                    res.end(JSON.stringify({versions: study_data.versions}));
                });
        });
};

function get_data(user_id, study_id, exp_id, file_format, file_split, start_date, end_date, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            data_server.getData(exp_id, file_format, file_split, start_date, end_date)
                .then(function(data){
            res.send(JSON.stringify({data_file:data}))});
        });
};

function insert_new_version(user_id, study_id, version, state, update_url, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(mongo_url).then(function (db) {
                var version_id = mysha1(study_id + version + state+'*');
                if(update_url==='update')
                    return push_new_version(study_id, version, state, version_id, res);

                studies_comp.study_info(study_id)
                    .then(function (study_data) {
                        var versions = study_data.versions;
                        console.log(versions[versions.length-1].id);
                        if(update_url==='keep')
                            return push_new_version(study_id, version, state, versions[versions.length-1].id, res);
                        versions = versions.filter(version=>version.state==='Published');
                        return push_new_version(study_id, version, state, versions[versions.length-1].id, res);
                    });
            });
        });
};


function push_new_version(study_id, version, state, version_id, res){
    return mongo.connect(mongo_url).then(function (db) {
        var studies = db.collection('studies');

        return studies.update({_id: study_id}, {
            $push: {
                versions: {
                    id: version_id,
                    version: version,
                    state: state
                }
            },
            $set: {locked: state==='Published'}
        })
        .then(function (user_result) {
            if (!user_result)
                return Promise.reject();
            return res.send(JSON.stringify({id: version_id,
                version: version,
                state: state}));
        });
    });
}

function update_state(user_id, study_id, version_id, state, res) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(mongo_url).then(function (db) {
                    var studies = db.collection('studies');
                    return studies.update({_id: study_id, versions: { $elemMatch: { id: version_id } }},
                    { $set: { "versions.$.state" : state } }
                    );
                }
            );
        });
};


function is_version_id_exist(user_id, study_id, version_id) {
    return have_permission(user_id, study_id)
        .then(function() {
            return mongo.connect(mongo_url).then(function (db) {
                const studies = db.collection('studies');
                return studies.findOne({_id: study_id, versions: { $elemMatch: { id: id } }})
                .then(function(study_data){
                    return Promise.resolve(!!study_data);
                });
            }
            );
        });
};

module.exports = {get_play_url, get_experiment_url, is_version_id_exist, get_versions, get_data, update_state, insert_new_version};
