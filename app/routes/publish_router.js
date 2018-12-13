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


publishRouter.route('/:study_id/publish')
    .get(
        function(req, res){
            return versions.get_versions(req.user_id, parseInt(req.params.study_id))
                .then(data=>res.json((data)));
        })
    .post(
        function(req, res){
            const version_type = req.body.publish ? 'Published' : 'Develop';
            const update_url   = req.body.update_url;

            const now = new Date();
            return versions.insert_new_version(req.user_id, parseInt(req.params.study_id),
                dateFormat(now, 'yyyymmdd.HHMMss'),
                version_type, update_url)
                .then(version_data=>res.json(version_data));
        });