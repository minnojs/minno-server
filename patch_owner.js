require('./config_validation');
const config        = require('./config');
const url           = config.mongo_url;
const mongo         = require('mongodb-bluebird');

mongo.connect(url).then(function(db){
    const studies = db.collection('studies');
    const users = db.collection('users');

    // return studies.find({}).then(studies_Data => {
    //     const promises = studies_Data.map(study =>
    //             {studies.update({_id: study._id},
    //             {$set: {'users.0.permission' : 'owner'}}
    //         );
    //     });
    //     return Promise.all(promises);
    // });

    return users.find({}).then(usersData => {
        const promises = usersData.map(user =>
                user.studies.map(study=>
                studies.update({_id: study.id},
                    {$set: {users: [{user_id: user._id, user_name:user.user_name, permission: 'owner'}]}}
                ).then(result=>console.log(result.result))
            )
        );
        return Promise.all(promises);
    });


}).then(process.exit.bind(process));