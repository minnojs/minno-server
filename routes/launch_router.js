const config        = require('../config');
const experiments   = require('../experiments');
const express       = require('express');
const router        = express.Router();

module.exports = router;

router.get('/launch/:exp_id/:version_id',function(req, res){
    return experiments
        .get_experiment_url(req)
        .then(displayExperiment(res))
        .catch(displayErrorPage(res));
});

router.get('/play/:study_id/:file_id',function(req, res){
    const sess = req.session;

    if(!sess.user) return displayErrorPage(res)({
        status: 401,
        message: 'You must be logged in to access this page'
    });

    return experiments
        .get_play_url(sess.user.id, req.params.study_id, req.params.file_id)
        .then(displayExperiment(res))
        .catch(displayErrorPage(res));
});

function displayExperiment(res){
    return function(exp_data){
        res.render('launch', {
            minnojsUrl: config.minnojsUrl,
            descriptiveId: exp_data.descriptive_id, 
            sessionId:exp_data.session_id, 
            url: exp_data.url, 
            studyId:exp_data.exp_id,
            versionId:exp_data.version_data.id,
            version:exp_data.version_data.version,
            state:exp_data.version_data.state
        });
    };
}

function displayErrorPage(res){
    return function(err){
        res.statusCode = err.status || 500;
        res.render('error', {
            status: err.status || 'Error',
            message: err.message || 'An error has occured'
        });
    };
}
