const express       = require('express');
const PI            = require('../PI');
const research_pool = require('../researchpool');
const PIRouter = express.Router();

module.exports = PIRouter;

PIRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        req.role = req.session.user.role;
        next();
    });

PIRouter.route('/participants')
    .post(
        function(req, res){
            PI.get_participants_between_dates(req.body.file_format, req.body.pertains_to, req.body.demographic, req.body.start_date, req.body.end_date)
                .then(participants=>res.json(participants))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));

        });


PIRouter.route('/research_pool')
    .post(
        function(req, res){
            return research_pool.getPoolStudies()
                .then(deploys=>res.json(deploys))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });

PIRouter.route('/research_pool/:deploy_id')
    .get(
        function(req, res){
            return PI.get_deploy(req.params.deploy_id)
                .then(data=>res.json(data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .post(
        function(req, res){
            return PI.pause_study(req.params.deploy_id, req.body.status)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
            // return research_pool.getPoolStudies()
            //     .then(deploys=>res.json(deploys))
            //     .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .delete(
        function(req, res){
            return PI.remove_study(req.params.deploy_id)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
            // return research_pool.getPoolStudies()
            //     .then(deploys=>res.json(deploys))
            //     .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });


		
PIRouter.route('/edit_registration')
    .put(
        function(req, res){
            return PI.edit_registration(req.body.study_id, req.body.version_id, req.body.experiment_id)
                .then(registration=>res.json(registration))
                .then(registration=>res.json(registration))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .get(
        function(req, res){
            return PI.get_registration()
                .then(registration=>res.json(registration))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });

PIRouter.route('/deploy_request')
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

PIRouter.route('/deploy_request/:deploy_id')
    .post(
        function(req, res){
            return PI.add2pool(req.user_id, req.params.deploy_id)
                .then(research_pool.addPoolStudy(req.params.deploy_id))

                .then(deploy=>res.json(deploy))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })

    .get(
        function(req, res){
            return PI.get_deploy(req.params.deploy_id)
                .then(deploy=>res.json(deploy))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));

        })
    .put(function(req, res){
        return PI.update_deploy(req.params.deploy_id, req.body.priority, req.body.pause_rules, req.body.reviewer_comments, req.body.status, req.role)
            .then(data=>res.json(data))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));
    });


PIRouter.route('/deployer_rules')
    .get(
        function(req, res){
            return PI.get_rules(req.user_id, true, req.role)
            .then(rules_data=>res.json(rules_data))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .post(
        function(req, res){
            return PI.insert_new_set(req.user_id, req.body.rules, true, req.role)
                .then(set_data => res.json(set_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .put(function(req, res){
        return PI.update_set(req.user_id, req.body.rules, true, req.role)
            .then(()=>res.json({}))
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

PIRouter.route('/deployer_rules/:set_id')
    .delete(
        function(req, res){
            return PI.delete_set(req.user_id, req.params.set_id, true)
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
        })
    .put(
        function(req, res){
            return PI.change_deploy(req.user_id, parseInt(req.params.study_id), req.body.props)
                .then((deploy_data)=>res.json(deploy_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });

