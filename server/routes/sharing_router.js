const express     = require('express');
const studies     = require('../studies');
const config      = require('../../config');
const url         = require('url');

const sharingRouter = express.Router();

module.exports = sharingRouter;

sharingRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });


sharingRouter.route('/:study_id/public')
    .post(
        function(req, res){
            return studies.make_public(req.user_id, parseInt(req.params.study_id), req.body.is_public)
                .then(res.json({}));

        });

sharingRouter.route('/:study_id/link')
    .post(
        function(req, res){
            return studies.make_link(req.user_id, parseInt(req.params.study_id), req.headers.origin)
                .then(link=>
                {
                    const link_str = new url.URL(req.headers.origin+'/dashboard/?/view/'+link);
                    return res.json({link: link_str});
                });
        })
    .delete(
        function(req, res){
            return studies.delete_link(req.user_id, parseInt(req.params.study_id))
                .then(link=>res.json({link}));

        });