const connection    = Promise.resolve(require('mongoose').connection);
const dateFormat    = require('dateformat');


function update_status(deploy_id, status, reviewer_comments = '') {
    return connection.then(function (db) {
        const deploys = db.collection('deploys');
        const studies = db.collection('studies');
        const users = db.collection('users');
        return deploys.findOne({_id: deploy_id})
            .then(deploy=>{
                return studies.findOne({_id:deploy.study_id})
                .then(study_data=>
                {
                    const now = new Date();

                    return users.updateMany({_id: {$in: study_data.users.map(user=>user.user_id)}},
                        {$push: {updated_requests: {
                            study_id:deploy.study_id,
                            study_name:deploy.study_name,
                            version_id: deploy.version_id,
                            deploy_id: deploy._id,
                            file_name: deploy.experiment_file.file_id,
                            status: status,
                            creation_date: dateFormat(now, 'yyyymmdd.HHMMss'),
                            reviewer_comments: reviewer_comments
                        }}});
                });
            });
    });
}


module.exports = {update_status};
