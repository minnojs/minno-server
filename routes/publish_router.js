const versions   = require('../versions');
const express    = require('express');
const dateFormat = require('dateformat');
const router     = express.Router();

module.exports   = router;

router.route('/studies/:study_id/publish')
    .get(
        function(req, res){
            let sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            versions.get_versions(sess.user.id, parseInt(req.params.study_id))
                .then(data=>res.end(JSON.stringify(data)));

        })
    .post(
        function(req, res){
            let sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            var version_type = req.body.publish ? 'Published' : 'Develop';
            var update_url   = req.body.update_url;

            var now = new Date();
            return versions.insert_new_version(sess.user.id, parseInt(req.params.study_id),
                dateFormat(now, "yyyymmdd.HHMMss"),
                version_type, update_url)
                .then(version_data=>res.end(JSON.stringify(version_data)));
        });
