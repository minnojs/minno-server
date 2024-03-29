const express     = require('express');
const studies     = require('../studies');
const tags        = require('../tags');
const experiments = require('../experiments');
const versions    = require('../versions');
const studiesRouter = express.Router();
const config      = require('../../config');
const url               = require('url');


module.exports = studiesRouter;

studiesRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });

studiesRouter.route('')
    .get(
        function(req,res){
            return studies.get_studies(req.user_id)
                .then(studies_data=>res.json({studies:studies_data}));
        })
    .post(function(req,res)
    {
        return studies.create_new_study({user_id: req.user_id, study_name: req.body.study_name, study_type: req.body.study_type, description: req.body.description})
            .then(study_data=>res.json({study_id: study_data._id}))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));
    });

studiesRouter.route('/pending')
    .get(
        function(req,res){
            return studies.get_pending_studies(req.user_id)
                .then(studies_data=>res.json({studies:studies_data}));
        });

studiesRouter.route('/:study_id')
    .delete(
        function(req, res){
            if (req.body.restore)
                return studies.restore_study(req.user_id, parseInt(req.params.study_id))
                    .then(()=>res.json({}))
                    .catch(err=> res.status(err.status || 500).json({message:err.message}));
            if (req.body.permanently)
                return studies.delete_study(req.user_id, parseInt(req.params.study_id))
                    .then(()=>res.json({}))
                    .catch(err=> res.status(err.status || 500).json({message:err.message}));

            return studies.send2archive(req.user_id, parseInt(req.params.study_id))
                .then(()=>res.json({}))
                .catch(err=> res.status(err.status || 500).json({message:err.message}));
        })
    .put(
        function(req, res){
            return studies.update_study(req.user_id, +req.params.study_id, req.body)
                .then(() => res.json({}))
                .catch(err=> res.status(err.status || 500).json({message:err.message}));
        });



studiesRouter.route('/:study_id/rename')
    .put(
        function(req, res){
            studies.rename_study(req.user_id, parseInt(req.params.study_id), req.body.study_name)
            .then(()=>res.json({}))
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}));

        });




studiesRouter.route('/:study_id/versions')
    .post(
        function(req, res, next){
            experiments.get_data(req.user_id, parseInt(req.params.study_id), req.body.exp_id,
                req.body.file_format, req.body.file_split, req.body.start_date, req.body.end_date, req.body.version_id)
                .then(function(data){
                    res.json({data_file:data});
                })
                .catch(next);
        });

studiesRouter.route('/:study_id/versions/:version_id')
    .put(
        function(req, res, next){

            versions.change_version_availability(req.user_id, parseInt(req.params.study_id), req.params.version_id, req.body.availability)
                .then(function(data){
                    res.json({data_file:data});
                })
                .catch(next);
        });

studiesRouter.route('/:study_id/statistics')
    .post(
        function(req, res){
            return experiments.get_stat(req.user_id,
                parseInt(req.params.study_id),
                req.body.exp_id,
                req.body.version_id,
                req.body.start_date,
                req.body.end_date,
                req.body.date_size)

                .then(function(stat_data){
                    return res.json({stat_data});
                })
                .catch(err=> {
                    res.status(err.status || 500).json({message: err.message});
                });
        });

studiesRouter.route('/:study_id/restore')
    .post(
        function(req, res){
            versions.restore_version(req.user_id, req.params.study_id, req.body.version_id);

        });


studiesRouter.route('/:study_id/experiments')
    .get(
        function(req, res){
            experiments.get_experiments(req.user_id, parseInt(req.params.study_id))
                .then(function (experiments) {
                    console.log({experiments});
                    res.json({experiments});
                })
                .catch(err=> {
                    res.status(err.status || 500).json({message: err.message});
                });
        })
    .post(
        function(req, res){
            experiments.get_data(req.user_id, parseInt(req.params.study_id), req.body.exp_id, req.body.file_format,
                req.body.file_split, req.body.start_date, req.body.end_date, req.body.version_id)
            .then(function(data){
                res.json({data_file:data});
            })
            .catch(err=> {
                res.status(err.status || 500).json({message: err.message});
            });
        })
    .delete(
        function(req, res){
            experiments.delete_data(req.user_id, parseInt(req.params.study_id), req.body.exp_id,
                                    req.body.start_date, req.body.end_date, req.body.version_id)
                .then(function(data){
                    res.json({data_file:data});
                })
                .catch(err=> {
                    res.status(err.status || 500).json({message: err.message});
                });
        });


studiesRouter.route('/:study_id/data')
    .get(
        function(req, res){
            experiments.get_data_requests(req.user_id, parseInt(req.params.study_id))
                .then(function (requests) {
                    res.json({requests});
                })
                .catch(err=> {
                    res.status(err.status || 500).json({message: err.message});
                });
        })
    .delete(function(req, res){
        experiments.delete_data_request(req.user_id, parseInt(req.params.study_id), req.body.request_id)
            .then(function (requests) {
                res.json({requests});
            })
            .catch(err=> {
                res.status(err.status || 500).json({message: err.message});
            });

    })
;



studiesRouter.route('/:study_id/collaboration')
    .delete(
        function(req, res, next){
            studies.remove_collaboration(req.user_id, parseInt(req.params.study_id), req.body.user_id)
                .then(()=>res.json({}))
                .catch(next);
        })
    .put(
        function(req, res){
            studies.update_collaboration(req.user_id, parseInt(req.params.study_id), req.body)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .get(
        function(req, res){
            studies.get_collaborations(req.user_id, parseInt(req.params.study_id))
                .then(function ({users, study_name, is_public, link}) {
                    const link_str = !link ? '' : config.server_url+ '/dashboard/?/view/'+ link;
                    res.json({users, is_public, link:link_str, study_name
                    });
                })
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .post(
        function(req, res){
            // const server_url =  url.resolve(req.protocol + '://' + req.headers.host, config.relative_path);
            studies.add_collaboration(req.user_id, parseInt(req.params.study_id), req.body.user_name, req.body.permission, req.body.data_permission, config.server_url)
                .then(function(data){
                    res.json({data_file:data});
                })
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });


studiesRouter.route('/:study_id/copy')
    .put(
        function(req, res){
            studies.duplicate_study(req.user_id, parseInt(req.params.study_id), req.body.study_name)
                .then(data=>res.json(data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });


studiesRouter.route('/:study_id/tags')
    .get(
        function(req, res){
            return tags.get_study_tags(req.user_id, parseInt(req.params.study_id))
                .then(tags_data=>res.json(tags_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .put(
        function(req, res){
            return tags.update_study_tags(req.user_id, parseInt(req.params.study_id), req.body.tags)
            .then(tags_data=>res.json(tags_data))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));

        });
