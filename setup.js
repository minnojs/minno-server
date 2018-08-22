/* eslint no-console:0 */
require('./config_validation');
const config        = require('./config');
const url           = config.mongo_url;
const fs            = require('fs-extra');
const mongo         = require('mongodb-bluebird');
const {insert_new_user,set_password} = require('./users');
const {create_new_study, delete_study} = require('./studies');
const path = require('path');
const study_list = require('./bank/studyList');


console.log('Setting up MinnoJS server');
console.log('=========================');
Promise.resolve()
    .then(create_dirs)
    .then(create_users)
    .then(create_bank_studies)
    .then(process.exit.bind(process));

function create_dirs(){
    console.log('Creating directories');
    return fs.ensureDir(config.user_folder)
        .then(() => console.log(`User folder created at "${config.user_folder}"`));
}

function create_users(){
    console.log('Creating defaul users:');
    return mongo.connect(url)
        .then(function (db) {
            const counters = db.collection('counters');
            return counters.findOne({_id: 'user_id'});
        })
            .then(function(user_data){
                if (user_data) return console.log('-- Default users found');

                console.log('Creating default users...');
                return Promise.all([
                    insert_new_user({username:'admin', first_name:'admin', last_name:'admin', email:'admin@admin.com', role:'su'})
                        .then(user_result => set_password(user_result._id, 'admin123', 'admin123')),

                    insert_new_user({username:'bank', first_name:'bank', last_name:'bank', email:'bank@admin.com'})
                ])
                .then(() => console.log('-- Default users created.'));
            });
}

function create_bank_studies(){
    return mongo.connect(url).then(function(db){
        const users = db.collection('users');
        const studies = db.collection('studies');

        return users.findOne({user_name:'bank'})
            .then(user_result => {
                const study_ids = user_result.studies.map(study => study.id);
                return studies
                    .find({ _id: { $in: study_ids } })
                    .then(studies => [user_result, studies]);
            })
            .then(function([user_result, bank_studies]){
                const study_list_names = study_list.map(study => study.name);
                const bank_names = bank_studies.map(study => study.name);

                const new_studies = study_list.filter(study => !bank_names.includes(study.name));
                const del_studies = bank_studies.filter(study => !study_list_names.includes(study.name));

                console.log('Creating bank studies:');
                const new_promises = new_studies.map(log_name('Creating')).map(inject_id).map(study => create_new_study(study, {is_bank:true, is_public:true}));
                const del_promises = del_studies.map(log_name('Deleting')).map(study => delete_study(user_result._id, study._id));
                return Promise.all([].concat(new_promises, del_promises));

                function inject_id(study){
                    study.study_name = study.name;
                    study.user_id = user_result._id;
                    return study;
                }

                function log_name(str){
                    return function(study) {
                        console.log(`${str}: "${study.name}"`);
                        return study;
                    }
                }
            })
            .then(() => fs.copy('bank', path.join(config.user_folder, 'bank')));
    });
}

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
