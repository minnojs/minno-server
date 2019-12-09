const config = require.main.require('../config');
const experiments   = require('../experiments');
const express       = require('express');
const fs            = require('fs-extra');
const urljoin       = require('url-join');
const config_db     = require('../config_db');
const data_server   = require('../data_server/controllers/controller');
const studies       = require('../studies');


const router        = express.Router();
const readFile = promisify(fs.readFile);
module.exports = router;

router.get('/launch/:exp_id/:version_id',function(req, res){
    return experiments
        .get_experiment_url(req)
        .then(displayExperiment(req.query, res,req.fingerprint))
        .catch(displayErrorPage(res));
});



router.get('/view_play/:link_id/:file_id',function(req, res){
    return studies.get_id_with_link('/dashboard/?/view/'+req.params.link_id)
        .then(function(study) {
            const owner_id = study.users.filter(user => user.permission === 'owner')[0].user_id;

            return experiments
                .get_play_url(owner_id, study._id, req.params.file_id)
                .then(displayExperiment(req.query, res, req.fingerprint))
                .catch(displayErrorPage(res));
        });
});


router.get('/play/:study_id/:file_id',function(req, res){
    const sess = req.session;

    if(!sess.user) return displayErrorPage(res)({
        status: 401,
        message: 'You must be logged in to access this page'
    });

    return experiments
        .get_play_url(sess.user.id, req.params.study_id, req.params.file_id)
        .then(displayExperiment(req.query, res, req.fingerprint))
        .catch(displayErrorPage(res));
});

function displayExperiment(params, res, fingerprint){
    return function(exp_data){
        return config_db.get_fingerprint()
            .then(use_fingerprint=>{
                if(!use_fingerprint)
                    fingerprint = ['{useragent:"null"}'];

                const render = promisify(res.render,res);
                const dataUrl = urljoin(config.relative_path, 'data');
                const {version_data = {}} = exp_data;

                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.header('Expires', '-1');
                res.header('Pragma', 'no-cache');

                const postAlways = {
                    sessionId:exp_data.session_id,
                    studyId:exp_data.exp_id,
                    versionId:version_data.id
                };
                const postOnce = Object.assign({}, params, {
                    descriptiveId: exp_data.descriptive_id,
                    version:version_data.version,
                    state:version_data.state
                }, postAlways); // post the post always stuff too - so that we can connect them...
                const experimentSessionData=
                {
                    descriptiveId: exp_data.descriptive_id,
                    version:version_data.version,
                    state:version_data.state,
                    sessionId:exp_data.session_id,
                    taskName:"_session_data",
                    studyId:exp_data.exp_id,
                    versionId:version_data.id,
                    data:[fingerprint]
                };
                data_server.insertExperimentSession(experimentSessionData);
                if (exp_data.type === 'html') return readFile(exp_data.path, 'utf8')
                    .then(transformHtml(exp_data,postOnce,postAlways))
                    .then(res.send.bind(res));

                return render(exp_data.type || 'minno02', {
                    isDev: postOnce.state === 'Develop' || postOnce.state === undefined,
                    minnojsUrl: config.minnojsUrl,
                    minnojsDevUrl: config.minnojsDevUrl,
                    errorception: config.errorception,
                    url: exp_data.url,
                    base_url: exp_data.base_url,
                    dataUrl,
                    postOnce,
                    postAlways
                })
                .then(res.send.bind(res))
                .catch(err => Promise.reject({status:500,message:err.message}));
        })
    };
}

function transformHtml(exp_data, postOnce, postAlways){
    const dataUrl = urljoin(config.relative_path, 'data');
    const minno = {dataUrl, $postOnce:postOnce, $meta:postAlways};

    return html => html
        .replace('<!-- os:base -->', `<base href="${exp_data.base_url}">`)
        .replace('<!-- os:vars -->', create_os_script(minno));

    function create_os_script(minno){
        return `<script> 
        (function(){
            var minno = window.minno = ${JSON.stringify(minno,null,2)};
            log(minno.$postOnce);

            minno.log = log;
                
            function log(data, cb){
                var request = new XMLHttpRequest();
                cb || (cb = function(){});
                
                if (!data) return cb(null);
                if (!Array.isArray(data)) throw new Error('Minno: data must be an array')
                if (!data.length) return cb(null);
                
                var body = {data:data};
                for (var k in minno.vars) body[k] = minno.vars[k];
                
                request.open('PUT', minno.dataUrl, true);
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                request.onreadystatechange = function() {
                    if (request.readyState === 4) {
                        if (request.status >= 200 && request.status < 400) cb(request.responseText);
                        else throw new Error('Failed sending to: "' + minno.dataUrl + '". ' + request.statusText + ' (' + request.status +')');
                    }
                };
                request.send(JSON.stringify(body));
            }
        })();

        </script>`;
    }
}

function displayErrorPage(res){
    return function(err){
        //console.log(err)
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
