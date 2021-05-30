const express     = require('express');
const files       = require('../files');
const experiments = require('../experiments');
const config      = require('../../config');
const url         = require('url');
const filesRouter = express.Router();

module.exports = filesRouter;

filesRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });

filesRouter.route('/:study_id').get(
    function(req, res){
        // todoR: const server_url =  req.protocol + '://' + req.headers.host+config.relative_path;
        files.get_study_files(req.user_id, parseInt(req.params.study_id), config.server_url)
             .then(response => res.json(response))
             .catch(function(err){
                 res.status(err.status || 500).json({message:err.message});
             });
    })
    .delete(
        function(req, res){
            // todoR: const server_url =  req.protocol + '://' + req.headers.host+config.relative_path;
            files.delete_files(req.user_id, parseInt(req.params.study_id), req.body.files, config.server_url)
            .then(response => res.json(response))
            .catch(function(err){
                res.status(err.status || 500).json({message:err.message});
            });

        })
    .post(
        function(req, res){
            return files.download_files(req.user_id, parseInt(req.params.study_id), req.body.files)
            .then(response=>res.json(response))
            .catch(function(err){
                res.status(err.status || 500).json({message:err.message});
            });

        });

filesRouter.route('/:study_id/upload/')
    .post(
        function(req, res){
            return files.upload(req.user_id, parseInt(req.params.study_id), req)
                .then(files => res.json(files))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });


filesRouter.route('/:study_id/upload/:folder_id')
    .post(
        function(req, res){
            return files.upload(req.user_id, parseInt(req.params.study_id), req)
                .then(files => res.json(files))
                .catch(() => res.status(403).json({message: 'ERROR: Permission denied!'}));
        });

filesRouter.route('/:study_id/file/')
    .post(
        function(req, res){
            if(req.body.isDir)
                return files.create_folder(req.user_id, parseInt(req.params.study_id), req.body.name)
                    .then(tags_data=>res.json(tags_data))
                    .catch(err=>res.status(err.status || 500).json({message:err.message}));
            return files.update_file(req.user_id, parseInt(req.params.study_id), req.body.name, req.body.content)
                .then(tags_data=>res.json(tags_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));

        });

filesRouter.route('/:study_id/file/:file_id')
    .get(
        function(req, res){
            return files.get_file_content(req.user_id, parseInt(req.params.study_id), req.params.file_id)
                .then(tags_data=>res.json(tags_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .put(
        function(req, res){
            return files.update_file(req.user_id, parseInt(req.params.study_id), req.params.file_id, req.body.content)
                .then(tags_data=>res.json(tags_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));

        });

filesRouter.route('/:study_id/file/:file_id/move')
    .put(
        function(req, res){
            // todoR: const server_url =  url.resolve(req.protocol + '://' + req.headers.host, config.relative_path);
            return files.rename_file(req.user_id, parseInt(req.params.study_id), req.params.file_id, req.body.path, config.server_url)
                .then(file_data=>res.json(file_data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));

        });

filesRouter.route('/:study_id/file/:file_id/duplicate')
    .post(
        function(req, res){
            // const server_url =  url.resolve(req.protocol + '://' + req.headers.host, config.relative_path);
            return files.duplicate_file(req.user_id, parseInt(req.params.study_id), req.params.file_id, req.body.new_path, config.server_url)
                .then(data=>res.json(data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });


filesRouter.route('/:study_id/file/:file_id/copy')
    .put(
        function(req, res){
            return files.copy_file(req.user_id, parseInt(req.params.study_id), req.params.file_id, parseInt(req.body.new_study_id))
                .then(data=>res.json(data))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });

filesRouter.route('/:study_id/file/:file_id/experiment')
    .post(
        function(req, res){
            return experiments.insert_new_experiment(req.user_id, parseInt(req.params.study_id), req.params.file_id, req.body.descriptive_id)
                .then(result=>res.json(result))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));

        })

    .delete(
        function(req, res){
            return experiments.delete_experiment(req.user_id, parseInt(req.params.study_id), req.params.file_id)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .put(
        function(req, res){
            return experiments.update_descriptive_id(req.user_id, parseInt(req.params.study_id), req.params.file_id, req.body.descriptive_id)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        });
