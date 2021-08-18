/* eslint no-console:0 */
require('./config_validation');
const config        = require('../config');
const versions        = require('./versions');
const fs            = require('fs-extra');
const dateFormat    = require('dateformat');
const {insert_new_user, update_role} = require('./users');
const {create_new_study, delete_study} = require('./studies');
const path = require('path');
// const study_list = require('./bank/studyList');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url, {useNewUrlParser:true});
const connection    = Promise.resolve(mongoose.connection);


function fix_versions(studies, study){

    let versions = study.versions;

    return versions.map((version, id)=> {
        console.log('check version '+(id+1));
        if(id<versions.length-1)
            version.state = 'Published';
        version.hash = version.id;
        version.creation_date = version.version;
        version.id = id + 1;
        version.availability = false;
        version.experiments = study.experiments;
        return fs.pathExists(`${config.user_folder}/${study.folder_name}/v${id + 1}`)
            .then(existing => existing
                ? ''
                :
                fs.copy(`${config.user_folder}/${study.folder_name}_tmp`, `${config.user_folder}/${study.folder_name}/v${id + 1}`)
            )
            .then(() => studies.updateOne({_id: study._id}, {$set: {versions}}));

    });

}

connection
    .then(function (db) {
        const studies = db.collection('studies');
        return studies.find({})
            .toArray()
            .then(data=>{
                data.filter(study=>study.versions.filter(version=>!version.hash).length>0).map(study=>
                {

                    console.log(`create tmp: ${config.user_folder}${study.folder_name}`);
                    return fs.copy(`${config.user_folder}${study.folder_name}`, `${config.user_folder}${study.folder_name}_tmp`)
                        .then(() => console.log('success!'))
                        .catch(err => console.error(err))
                        .then(()=>Promise.all(fix_versions(studies, study)))
                        .then(()=>fs.remove(`${config.user_folder}/${study.folder_name}_tmp`))
                        // .then(()=>studies.updateOne({id:study.id}, {$set: {versions}}))
                        ;
                    })


                        //

                })
            });

return;
