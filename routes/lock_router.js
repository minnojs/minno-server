const studies = require('../studies');
const express = require('express');
const router  = express.Router();

module.exports = router;

router.post('/studies/:study_id/lock',function(req, res){
    return change_lock_state(req, res, true);
});

router.post('/studies/:study_id/unlock',function(req, res){
    return change_lock_state(req, res, false);
});

function change_lock_state(req, res, status) {
    sess = req.session;
    if(!sess.user) {
        res.statusCode = 403;
        return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
    }
    return studies.set_lock_status(sess.user.id, parseInt(req.params.study_id), status, res);
}