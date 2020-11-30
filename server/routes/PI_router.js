const express     = require('express');
const PI          = require('../PI');

const PIRouter = express.Router();

module.exports = PIRouter;

PIRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });


PIRouter.route('/deploy_list')
    .get(
        function(req, res){
            return PI.get_all_deploys()
                .then(deploys=>res.json(deploys))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .post(
        function(req, res){
            return PI.insert_new_set(req.user_id, req.body.rules)
                .then(set_data => res.json(set_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .put(function(req, res){
        return PI.update_set(req.user_id, req.body.rules)
            .then(()=>res.json({}))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));
    });

PIRouter.route('/deploy_list/:deploy_id')
    .put(function(req, res){
        return PI.update_deploy(req.params.deploy_id, req.body.priority, req.body.status)
            .then(data=>res.json(data))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));
    });


PIRouter.route('/rules')
    .get(
        function(req, res){
            return PI.get_rules(req.user_id)
            .then(rules_data=>res.json(rules_data))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })

    .post(
        function(req, res){
            return PI.insert_new_set(req.user_id, req.body.rules)
                .then(set_data => res.json(set_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .put(function(req, res){
        return PI.update_set(req.user_id, req.body.rules)
            .then(()=>res.json({}))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));
    });

PIRouter.route('/rules/:set_id')
    .delete(
        function(req, res){
            return PI.delete_set(req.user_id, req.params.set_id)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });

PIRouter.route('/deploy/:study_id')
    .post(
        function(req, res){
            return PI.request_deploy(req.user_id, parseInt(req.params.study_id), req.body.props)
                .then((deploy_data)=>res.json(deploy_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });