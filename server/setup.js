/* eslint no-console:0 */
require('./config_validation');
const config        = require('../config');
const fs            = require('fs-extra');
const {insert_new_user, update_role} = require('./users');
const {create_new_study, delete_study} = require('./studies');
const path = require('path');
// const study_list = require('./bank/studyList');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url, {useNewUrlParser:true});
const connection    = Promise.resolve(mongoose.connection);


console.log('Setting up MinnoJS server');
console.log('=========================');
Promise.resolve()
    .then(create_dirs)
    .then(create_counters)
    .then(create_users)
    .then(create_bank_studies)
    .then(update_admin_role)
    .then(process.exit.bind(process));

function create_counters(){
    console.log('Checking counters');
    const counters2check = ['session_id', 'study_id', 'user_id'];
    return connection
        .then(function (db) {
            const counters = db.collection('counters');
            return counters.find({})
            .toArray()
            .then(function (counters_data) {
                const counter_ids = counters_data.map(counter=>counter._id);

                const counters2add = counters2check.filter(counter => !counter_ids.includes(counter));
                if (counters2add.length===0)
                    return;
                const object2add = counters2add.map(counter=>({'_id':counter, 'seq':0}));
                return counters.insertMany(object2add);

            });

        });

}

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
        console.log('Updating bank studies:');
        return getBankStudies()
            .then(createBankStudies)
            .then(getBankStudies)
            .then(updateBankStudies)
            .then(() => console.log('Bank studies updated.'));

        function getBankStudies(){
            const users = db.collection('users');
            const studies = db.collection('studies');
            return users.findOne({user_name:'bank'})
            .then(user_result => {
                const study_ids = user_result.studies.map(study => study.id);
                return studies
                .find({ _id: { $in: study_ids } })
                .toArray()
                .then(studies => [user_result, studies.filter(study=>!study.users.find(user=>user.user_id===user_result._id).archive)]);
            });
        }

        function createBankStudies4type(user_id, type, js_file, bank_studies){
            const study_list = require(`./bank/${type}/${js_file}`);

            const study_list_names = study_list.map(study => study.name);
            const bank_studies_of_type = bank_studies.filter(study=>study.bank_type ===type);
            const bank_names = bank_studies_of_type.map(study => study.name);
            const new_studies = study_list.filter(study => !bank_names.includes(study.name));
            const del_studies = bank_studies_of_type.filter(study => !study_list_names.includes(study.name));

            const new_promises = new_studies.map(log_name('Creating')).map(inject_id).map(study => create_new_study(study, {is_bank:true, is_public:true, bank_type:type}).catch(err=>console.log(err.message)));
            const del_promises = del_studies.map(log_name('Deleting')).map(study => delete_study(user_id, study._id));

            return Promise.all([].concat(del_promises, new_promises));

            function inject_id(study){
                study.study_name = study.name;
                study.user_id    = user_id;
                return study;
            }
        }

        function log_name(str){
            return function(study) {
                console.log(`-- ${str}: "${study.name}"`);
                return study;
            };
        }
        function createBankStudies([user_result, bank_studies]){
            return fs.readdir('server/bank')
                .then(bank_types=>{
                    const all_types = bank_studies.map(study=>study.bank_type);
                    const types2remove =  all_types.filter(function(item, pos) {
                        return all_types.indexOf(item) === pos;
                    }).filter(type=>!bank_types.includes(type));

                    const del_studies = bank_studies.filter(study => types2remove.includes(study.bank_type));
                    const del_promises = del_studies.map(log_name('Deleting')).map(study => delete_study(user_result._id, study._id));
                    return Promise.all(del_promises)
                    .then(()=>{
                        const p = bank_types.map(bank_type=> fs.readdir(`server/bank/${bank_type}`)
                            .then(files => {
                                const k = files.filter(el => /\.js$/.test(el)).map(js=>createBankStudies4type(user_result._id, bank_type, js, bank_studies));
                                return Promise.all(k);
                            })
                        );
                        return Promise.all(p);
                    });
                });

            function log_name(str){
                return function(study) {
                    console.log(`-- ${str}: "${study.name}"`);
                    return study;
                };
            }
        }

        function updateBankStudies([user_result, bank_studies]){
            const promises = bank_studies.map(study => {
                console.log(`-- copying "${path.join(`./server/bank/${study.bank_type}`,study.name)}" into "${path.join(config.user_folder, study.folder_name), 'v1'}"`);
                return fs.copy(path.join(`./server/bank/${study.bank_type}`, study.name), path.join(config.user_folder, study.folder_name, 'v1'));
            });
            return Promise.all(promises);
        }
    });
}


process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
