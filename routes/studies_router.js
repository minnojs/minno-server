const express     = require('express');
const studies     = require('../studies');
const tags        = require('../tags');
const experiments = require('../experiments');

const studiesRouter = express.Router();

module.exports = studiesRouter;

studiesRouter
    .use(function is_logged_in(req,res,next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.id = req.session.user.id;
        next();
    });

studiesRouter.route('')
    .get(function(req, res){
        studies.get_studies(req.id, res);
    })
    .post(function(req, res){
        studies.create_new_study(req.id, req.body.study_name, res);
    });

studiesRouter.route('/:study_id/experiments')
    .get(
        function(req, res){
            experiments.get_experiments(req.id, parseInt(req.params.study_id), res);
        })
    .post(
        function(req, res){
            experiments.get_data(req.id, parseInt(req.params.study_id), req.body.exp_id,
                                    req.body.file_format, req.body.file_split, req.body.start_date, req.body.end_date, res);
        });


studiesRouter.route('/:study_id/copy')
    .put(
        function(req, res){
            studies.duplicate_study(req.id, parseInt(req.params.study_id), req.body.study_name, res);
        });


studiesRouter.route('/:study_id/tags')
    .get(
        function(req, res){
            tags.get_study_tags(req.id, parseInt(req.params.study_id), res);
        })
    .put(
        function(req, res){
            tags.update_study_tags(req.id, parseInt(req.params.study_id), req.body.tags, res);
        });



studiesRouter.route('/:study_id')
    .delete(
        function(req, res){
            studies.delete_study(req.id, parseInt(req.params.study_id), res);
        })
    .put(
        function(req, res){
            studies.rename_study(req.id, parseInt(req.params.study_id), req.body.study_name, res);
        });
