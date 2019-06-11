const express     = require('express');
const users        = require('../users');
const config      = require('../../config');

const settingsRouter = express.Router();

module.exports = settingsRouter;

settingsRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });

settingsRouter.route('/settings')
    .post(
        function(req, res){
            if (req.session.user.first_admin_login && req.session.user.user_name === 'admin' && req.body.params.password && req.body.params.password !== config.admin_default_pass) {
                req.session.user.first_admin_login = false;
                req.session.save(function (err) {
                    console.log(err);
                });
            }
            return users.update_details(req.user_id, req.body.params)
                .then(data=>res.json(data))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
        });

settingsRouter.route('/change_password')
    .post(
        function(req, res){
            return users.set_password(req.user_id, req.body.password, req.body.confirm)
                .then(()=>res.json({}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
        });

settingsRouter.route('/change_email')
    .get(
        function(req, res){
            return users.get_email(req.user_id)
                .then(user_data=>res.json({email: user_data.email}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
        })
    .post(
        function(req, res){
            return users.set_email(req.user_id, req.body.email)
                .then(()=>res.json({}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
        });