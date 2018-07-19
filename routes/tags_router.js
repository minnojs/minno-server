const express     = require('express');
const tags        = require('../tags');

const tagsRouter = express.Router();

module.exports = tagsRouter;

tagsRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });


tagsRouter.route('')
    .get(
        function(req, res){
            return tags.get_tags(req.user_id)
            .then(tags_data=>res.json(tags_data))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
    .post(
        function(req, res){
            return tags.insert_new_tag(req.user_id, req.body.tag_text, req.body.tag_color)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));

        });

tagsRouter.route('/:tag_id')
    .delete(function(req, res){
            return tags.delete_tag(req.user_id, req.params.tag_id)
                .then(()=>res.json({}))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));

    })
    .put(function(req, res){
        return tags.update_tag(req.user_id, {id: req.params.tag_id, text: req.body.tag_text, color:req.body.tag_color})
            .then(()=>res.json({}))
            .catch(err=>res.status(err.status || 500).json({message:err.message}));

    });