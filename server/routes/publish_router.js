const versions   = require('../versions');
const express    = require('express');
const dateFormat = require('dateformat');
const publishRouter     = express.Router();

module.exports   = publishRouter;

publishRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });



publishRouter.route('/:study_id/version')
    .post(
        function(req, res){

            const now = new Date();

            return versions.insert_new_version(req.user_id, parseInt(req.params.study_id),
                dateFormat(now, 'yyyymmdd.HHMMss'),
                'Develop')
                .then(version_data=>res.json(version_data));
        });


publishRouter.route('/:study_id/publish')
    .get(
        function(req, res){
            return versions.get_versions(req.user_id, parseInt(req.params.study_id))
                .then(data=>res.json((data)));
        })
    .post(
        function(req, res){
            const update_url   = req.body.update_url;
            const version_name   = req.body.version_name;

            const now = new Date();
            return versions.publish_version(req.user_id, parseInt(req.params.study_id), update_url)
                .then(version_data=>res.json(version_data));

            return versions.insert_new_version(req.user_id, parseInt(req.params.study_id),
                version_name,
                dateFormat(now, 'yyyymmdd.HHMMss'),
                'Develop',
                update_url)
                .then(version_data=>res.json(version_data));
        });

