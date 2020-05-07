const express     = require('express');
const generator       = require('../generator');
const experiments = require('../experiments');
const config      = require('../../config');
const url         = require('url');
const generetorRouter = express.Router();

module.exports = generetorRouter;

generetorRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });


generetorRouter.route('/:study_id/generator')
    // .get(
    //     function(req, res){
    //         return generator.get_file_content(req.user_id, parseInt(req.params.study_id), req.params.file_id)
    //             .then(tags_data=>res.json(tags_data))
    //             .catch(err=>res.status(err.status || 500).json({message:err.message}));
    //     })
    .put(
        function(req, res){
            return generator.save_file(req.user_id, parseInt(req.params.study_id), req.body.responses, req.body.stimuli, req.body.conditions)
                .then(tags_data=>res.json(tags_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });