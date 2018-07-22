const studies = require('../studies');
const express = require('express');
const lockRouter  = express.Router();


module.exports   = lockRouter;

lockRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user) return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });

lockRouter.post('/:study_id/lock',function(req, res){
    return change_lock_state(req, res, true);
});

lockRouter.post('/:study_id/unlock',function(req, res){
    return change_lock_state(req, res, false);
});

function change_lock_state(req, res, status) {
    return studies.set_lock_status(req.user_id, parseInt(req.params.study_id), status)
    .then(res.json({}));

}