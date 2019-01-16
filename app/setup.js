/* eslint no-console:0 */
require('./config_validation');
const config        = require('../config');
const fs            = require('fs-extra');
const {insert_new_user, update_role} = require('./users');
const {create_new_study, delete_study} = require('./studies');
const path = require('path');
const study_list = require('./bank/studyList');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url);
const connection    = Promise.resolve(mongoose.connection);


console.log('Setting up MinnoJS server');
console.log('=========================');
Promise.resolve()
    .then(create_dirs)
    .then(create_users)
    .then(create_bank_studies)
    .then(update_admin_role)
    .then(process.exit.bind(process));

function create_dirs(){
    console.log('Creating directories');
    return fs.ensureDir(config.user_folder)
        .then(() => console.log(`User folder created at "${config.user_folder}"`));
}

function update_admin_role(){
    console.log('Updating admin rule (su)');
    return connection
        .then(function (db) {
            const users = db.collection('users');
            return users
                .findOne({user_name: 'admin'})
                .then(admin_data => update_role(admin_data._id, 'su'));
        });

}

function create_users(){
    console.log('Creating default users:');
    return connection
        .then(function (db) {
            const users = db.collection('users');
            return Promise.all([
                createUser('admin', config.admin_default_pass, 'su'),
                createUser('bank', Math.random(), 'u')
            ]);

            function createUser(user_name, password, role){
                return users
                    .findOne({user_name})
                    .then(user => {
                        if (user) return console.log(`-- Creating ${user_name}: user found`);

                        return insert_new_user({username:user_name, first_name:user_name, last_name:user_name, email:'admin@admin.com', role, password, confirm:password})
                            .then(user_data => {
                                console.log(`-- Creating ${user_name}: user created`);
                                return user_data;
                            });
                    });
            }
        })
        .then(() => console.log(`Default users created`));
}



function create_bank_studies(){
    return connection.then(function(db){
        const users = db.collection('users');
        const studies = db.collection('studies');

        return users.findOne({user_name:'bank'})
        .then(user_result => {
            const study_ids = user_result.studies.map(study => study.id);
            return studies
            .find({ _id: { $in: study_ids } })
            .toArray()
            .then(studies => [user_result, studies]);
        })
        .then(function([user_result, bank_studies]){
            const study_list_names = study_list.map(study => study.name);
            const bank_names = bank_studies.map(study => study.name);
            const new_studies = study_list.filter(study => !bank_names.includes(study.name));
            const del_studies = bank_studies.filter(study => !study_list_names.includes(study.name));

            console.log('Updating bank studies:');

            const new_promises = new_studies.map(log_name('Creating')).map(inject_id).map(study => create_new_study(study, {is_bank:true, is_public:true}).then(()=>fs.copy(`./app/bank/${study.name}`, path.join(config.user_folder, `/bank/${study.name}-${study.id}`))).catch(err=>console.log(err.message)));
            const del_promises = del_studies.map(log_name('Deleting')).map(study => delete_study(user_result._id, study._id));
            return Promise.all([].concat(new_promises, del_promises));

            function inject_id(study){
                study.study_name = study.name;
                study.user_id = user_result._id;

                return study;
            }

            function log_name(str){
                return function(study) {
                    console.log(`-- ${str}: "${study.name}"`);
                    return study;
                };
            }
        })

        .then(() => fs.copy('./app/bank', path.join(config.user_folder, 'bank')))
        .then(() => console.log('Bank studies updated.'));
    });
}

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
