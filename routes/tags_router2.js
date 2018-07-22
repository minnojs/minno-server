const express     = require('express');
const tags        = require('../tags');

const tagsRouter2 = express.Router();

module.exports = tagsRouter2;

tagsRouter2
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });


tagsRouter2.route('/files/:study_id')
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
