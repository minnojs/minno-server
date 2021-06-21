const express     = require('express');
const files       = require('../files');
const studies     = require('../studies');
const config      = require('../../config');
const viewRouter  = express.Router();
const utils       = require('../utils');

module.exports = viewRouter;


viewRouter.route('/:link_id')
    .get(
        function(req, res){
            // todoR: const server_url =  req.protocol + '://' + req.headers.host+config.relative_path;

            const link = req.params.link_id;
            return studies.get_id_with_link(link)
                .then(function(study){
                    if(!study)
                        return res.status(400).json('Error: code doesn\'t exist');
                    const owner_id = study.users.filter(user=>user.permission==='owner')[0].user_id;
                    return files.get_study_files(owner_id, parseInt(study._id), config.server_url)
                            .then(function(response){
                                response.is_readonly = true;
                                response.permission  = 'read only';
                                response.has_data_permission =  false;
                                return res.json(response);
                            })
                            .catch(function(err){
                                res.status(err.status || 500).json({message:err.message});
                            });
                });
        })
    .post(
        function(req, res){
            // todoR: const server_url =  req.protocol + '://' + req.headers.host+config.relative_path;
            const link = req.params.link_id;
            return studies.get_id_with_link(link)
                .then(function (study) {
                    if(!study)
                        return res.status(400).json('Error: code doesn\'t exist2');
                    const owner_id = study.users.filter(user => user.permission === 'owner')[0].user_id;
                    return files.download_files(owner_id, study._id, req.body.files)
                        .then(response=>res.json(response))
                        .catch(function(err){
                            res.status(err.status || 500).json({message:err.message});
                        });
                });

        });

viewRouter.route('/:link_id/file/:file_id')
    .get(
        function(req, res) {
            // todoR: const server_url =  req.protocol + '://' + req.headers.host+config.relative_path;
            const link = req.params.link_id;
            return studies.get_id_with_link(link)
                .then(function (study) {
                    if(!study)
                        return res.status(400).json('Error: code doesn\'t exist');
                    const owner_id = study.users.filter(user => user.permission === 'owner')[0].user_id;
                    return files.get_file_content(owner_id, study._id, req.params.file_id)
                        .then(tags_data => res.json(tags_data))
                        .catch(err => res.status(err.status || 500).json({message: err.message}));
                });
        });
