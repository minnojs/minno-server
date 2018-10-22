const express     = require('express');
const studies     = require('../studies');

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


