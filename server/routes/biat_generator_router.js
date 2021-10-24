const express     = require('express');
const generator       = require('../biat_generator');
const generetorRouter = express.Router();

module.exports = generetorRouter;

generetorRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });

generetorRouter.route('/:study_id/biat_generator/:file_id')
    .get(
        function(req, res){
            return generator.get_properties(req.user_id, parseInt(req.params.study_id), req.params.file_id)
                .then(properties=>res.json(properties))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .put(
        function(req, res){
            return generator.save_file(req.user_id, parseInt(req.params.study_id), req.params.file_id, req.body.settings)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });