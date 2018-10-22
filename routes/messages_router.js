const express     = require('express');
const mongo         = require('mongodb-bluebird');
const config        = require('../config');
const studies     = require('../studies');

const url           = config.mongo_url;

const messagesRouter = express.Router();

module.exports = messagesRouter;

messagesRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });


messagesRouter.route('/pending')
    .get(
        function(req,res){
            return studies.get_pending_studies(req.user_id)
                .then(studies_data=>res.json({studies:studies_data}));
        })
    .post(function(req,res)
    {
        return studies.create_new_study({user_id: req.user_id, study_name: req.body.study_name, study_type: req.body.study_type, description: req.body.description})
            .then(study_data=>res.json({study_id: study_data.study_id}))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));
    });


