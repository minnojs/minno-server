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
            console.log(req.params.code);
            const code = req.params.code;
            return mongo.connect(url).then(function (db) {
                const users   = db.collection('users');
                const studies   = db.collection('studies');

                users.findOne({_id: 3}).then(data=>console.log(data));

                users.findOne({pending_studies: { $elemMatch: {$or: [{accept:code}, {reject:code}]}}})
                    .then(user_data=>{
                        if (!user_data)
                            return console.log('wrong code');

                        if(user_data._id!==req.user_id)
                            return console.log('wrong user');

                        const study = user_data.pending_studies.filter(study=>study.accept===code || study.reject===code)[0];
                        return users.update({_id: user_data._id},
                            {$pull: {pending_studies: {id: study.id}}})
                            .then(function() {
                                console.log('accept');

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

            // accept: '8c09ab30218b3481f5dbc0b4ff3be85da1062a45'
            // reject: '52a0c45618abb8252b109f38294e328c79ed4896'

            // return studies.make_public(req.user_id, parseInt(req.params.code))
            //     .then(res.json({}));

        });


