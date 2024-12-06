const express     = require('express');
const studies     = require('../studies');
const users = require('../users');
const config = require('../../config');

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
            return studies.make_collaboration(req.user_id, req.params.code)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });

collaborationRouter.route('')
    .get(function(req, res){
        // todoR: const server_url =  config.relative_path === '/' ?  req.headers.origin : urljoin(req.headers.origin, config.relative_path);
        return users.get_users(config.server_url)
            .then(user_data=>res.json({users:user_data.filter(user=>user.id!==req.user_id)}))
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}));
    });
