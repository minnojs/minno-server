const express     = require('express');
const config_db   = require('../config_db');
const users       = require('../users');
const {execSync} = require('child_process');
const fs           = require('fs-extra');
const config_file = require.main.require('../config');
const admin = require('../admin');

const configRouter = express.Router();

module.exports = configRouter;

configRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user || req.session.user.role!=='su') return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });

configRouter.route('')
    .get(function(req, res){
        return config_db.get_config()
            .then(config=>
                admin.get_usage().then(usage_data=>{config.usage = usage_data})
                    .then(()=>res.json({config})))
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}))

    })
    .delete(function(req, res){
        return users.remove_user(req.body.user_id)
            .then(user_data=>res.json({users:user_data}))
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}));
    })
    .put(function(req, res){
        if (req.body.role)
            return users.update_role(req.body.user_id, req.body.role)
                .then(user_data=>res.json({users:user_data}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
        return users.set_password(req.body.user_id, req.body.password, req.body.password)
                .then(user_data=>res.json({users:user_data}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
    });


configRouter.route('/homepage')
    .get(function(req, res){
        return config_db.get_homepage()
            .then(homepage=>res.json(homepage))
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}));
    })
    .put(function(req, res){
        return config_db.update_homepage(req.body.upper_panel, req.body.right_panel)
            .then((output)=>res.json(output))
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}));
    });

configRouter.route('/params')
    .put(
        function(req, res){

            return Promise.all([
                config_db.update_fingerprint(req.body.fingerprint),
                config_db.update_gmail(req.body.gmail),
                config_db.update_dbx(req.body.dbx),
                config_db.update_server(req.body.server_data, req.app)
            ])
            .then((output)=>res.json(output))
            .catch((err)=> {
                const err_name = Object.keys(err)[0];

                return res.status(err[err_name].status  || 500).json({
                    message:
                        err[err_name].message
                });
            });
        })
    .delete(
        function(req, res){
            return config_db.unset_gmail()
                .then(()=>res.json({}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));


        });


configRouter.route('/gmail')
    .put(
        function(req, res){
            return config_db.set_gmail(req.body.email, req.body.password)
                .then(()=>res.json({}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));


        })
    .delete(
        function(req, res){
            return config_db.unset_gmail()
                .then(()=>res.json({}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));


        });


configRouter.route('/dbx')
    .put(
        function(req, res){
            return config_db.set_dbx(req.body.client_id, req.body.client_secret)
                .then(()=>res.json({}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));


        })
    .delete(
        function(req, res){
            return config_db.unset_dbx()
                .then(()=>res.json({}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));


        });
