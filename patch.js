require('./config_validation');
const config        = require('./config');
const url           = config.mongo_url;
const mongo         = require('mongodb-bluebird');

mongo.connect(url).then(function(db){
    const users = db.collection('users');
    const studies = db.collection('studies');

    return Promise.all([
        users.find({}),
        studies.find({})
    ])
        .then(([usersData, studiesData]) => {
            const userNames = usersData.reduce((acc,val) => {
                acc[val._id] = val.user_name;
                return acc;
            }, {});

            const promises = studiesData.map(study => study.users && studies.findAndModify({_id:study._id}, [], {$set: {folder_name:`${userNames[study.users[0].id]}/${study.folder_name}`}}));

            return Promise.all(promises);
        });
})
    .then(process.exit.bind(process));
