const dropbox       = require('../dropbox');
const express       = require('express');
const dropboxRouter = express.Router();
const config        = require('../../config');
const url           = require('url');

module.exports   = dropboxRouter;

dropboxRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });


dropboxRouter.route('')
    .get(
        function(req, res){
            // todoR const server_url =  url.resolve(req.protocol + '://' + req.headers.host, config.relative_path);
            dropbox.get_auth_link(req.user_id, config.server_url)
                .then(dbx_data=>res.json(dbx_data));
        })
    .delete(
        function(req, res){
            dropbox.revoke_user(req.user_id)
                .then(dbx_data=>res.json(dbx_data));
        });

dropboxRouter.route('/set')
    .get(
        function(req, res){
            // todoR: const server_url =  url.resolve(req.protocol + '://' + req.headers.host, config.relative_path);

            const user_id = req.session.user.id;
            const code = req.query.code;
            return dropbox.get_access_token(code, config.server_url)
                .then(body=>dropbox.add_user_folder(user_id, body.access_token))
                .then(() => res.redirect('/dashboard/'));
        });
