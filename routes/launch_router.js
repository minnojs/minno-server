const config        = require('../config');
const experiments   = require('../experiments');
const express       = require('express');
const fs            = require('fs-extra');
const urljoin       = require('url-join');

const router        = express.Router();
const readFile = promisify(fs.readFile);

module.exports = router;

router.get('/launch/:exp_id/:version_id',function(req, res){
    return experiments
        .get_experiment_url(req)
        .then(displayExperiment(req.query, res))
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
        .then(displayExperiment(req.query, res))
        .catch(displayErrorPage(res));
});

function displayExperiment(params, res){
    return function(exp_data){
        const render = promisify(res.render,res);
        const dataUrl = urljoin(config.relative_path, 'data');

        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');

        let vars = {
            descriptiveId: exp_data.descriptive_id, 
            sessionId:exp_data.session_id, 
            studyId:exp_data.exp_id
        };
        vars = Object.assign(params, vars);


        if (exp_data.version_data) Object.assign(vars, {
            versionId:exp_data.version_data.id,
            version:exp_data.version_data.version,
            state:exp_data.version_data.state
        });

        if (exp_data.type === 'html') return readFile(exp_data.path, 'utf8')
            .then(transformHtml(exp_data,vars))
            .then(res.send.bind(res));
            
        return render(exp_data.type || 'minno02', {
            isDev: vars.state === 'Develop',
            minnojsUrl: config.minnojsUrl,
            errorception: config.errorception,
            url: exp_data.url, 
            dataUrl,
            vars
        })
            .then(res.send.bind(res))
            .catch(err => Promise.reject({status:500,message:err.message}));
    };
}

function transformHtml(exp_data,vars){
    const dataUrl = urljoin(config.relative_path, 'data');
    const minno = {dataUrl,vars};

    return html => html
        .replace('<!-- os:base -->', `<base href="${exp_data.base_url}">`)
        .replace('<!-- os:vars -->', create_os_script(minno));

    function create_os_script(minno){
        return `<script> 
        (function(){
            var minno = window.minno = ${JSON.stringify(minno,null,2)};
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
