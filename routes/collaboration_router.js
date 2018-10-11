const express     = require('express');
const mongo         = require('mongodb-bluebird');
const config        = require('../config');

const url           = config.mongo_url;

const collaborationRouter = express.Router();

module.exports = collaborationRouter;

collaborationRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });


collaborationRouter.route('/:code')
    .get(
        function(req, res){
            const code = req.params.code;
            return mongo.connect(url).then(function (db) {
                const users   = db.collection('users');
                const studies   = db.collection('studies');
                return users.findOne({pending_studies: { $elemMatch: {$or: [{accept:code}, {reject:code}]}}})
                    .then(user_data=>{
                        if (!user_data)
                            return Promise.reject({status:400, message:'wrong code'})

                        if(user_data._id!==req.user_id)
                            return Promise.reject({status:400, message:'wrong user'})


                        const study = user_data.pending_studies.filter(study=>study.accept===code || study.reject===code)[0];
                        return users.update({_id: user_data._id},
                            {$pull: {pending_studies: {id: study.id}}})
                            .then(function() {
                                if (study.accept === code)
                                    return Promise.all([

                                        users.update({_id: user_data._id},
                                        {$push: {studies: {id: study.id, tags: []}}}),
                                        studies.update({_id: study.id, 'users.user_id':user_data._id},
                                            {$unset: {'users.$.status': ''}})

                                    ]);
                                return studies.update({_id: study.id, 'users.user_id':user_data._id},
                                        {$set: {'users.$.status': 'reject'}});

                            });


                    });
            });
        });


