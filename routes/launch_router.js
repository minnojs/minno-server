const config        = require('../config');
const experiments   = require('../experiments');
const express       = require('express');
const fs            = require('fs');

const router        = express.Router();
const readFile = promisify(fs.readFile);

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
        const render = promisify(res.render,res);

        if (exp_data.type === 'html') return readFile(exp_data.path, 'utf8')
            .then(transformHtml(exp_data))
            .then(res.send.bind(res))
            .catch(displayErrorPage(res));
            
        render(exp_data.type || 'minno02', {
            minnojsUrl: config.minnojsUrl,
            descriptiveId: exp_data.descriptive_id, 
            sessionId:exp_data.session_id, 
            studyId:exp_data.exp_id,
            url: exp_data.url, 
            versionId:exp_data.version_data.id,
            version:exp_data.version_data.version,
            state:exp_data.version_data.state
        })
            .then(res.send.bind(res))
            .catch(err => Promise.reject({status:500,message:err.message}))
            .catch(displayErrorPage(res));
    };
}

function transformHtml(exp_data){
    return html => html
        .replace('<!-- os:base -->', `<base href="${exp_data.base_url}">`)
        .replace('<!-- os:vars -->', create_os_script(exp_data));

    function create_os_script(exp_data){
        return `<script>
            window.osVars = {
                sessionId:"${exp_data.session_id}",
                studyId:"${exp_data.exp_id}",
                descriptiveId:"${exp_data.descriptive_id}"
            }
        </script>`;
    }
}

function displayErrorPage(res){
    return function(err){
        return res
            .status(err.status || 500)
            .render('error', {
                status: err.status || 'Error',
                message: err.message || 'An error has occured'
            });
    };
}

function promisify( fn, context ) {
    return function () {
        const slice = [].slice;
        const args = slice.call( arguments );

        return new Promise( function ( fulfil, reject ) {
            const callback = function ( err ) {
                if ( err ) return reject( err );
                fulfil.apply( null, slice.call( arguments, 1 ) );
            };

            args.push( callback );
            fn.apply( context, args );
        });
    };
}
