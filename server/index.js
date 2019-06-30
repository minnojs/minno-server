const express     = require('express');
const session     = require('express-session');
const config      = require('../config');
const files       = require('./files');
const dateFormat  = require('dateformat');



const launch_router         = require('./routes/launch_router');
const connections_router    = require('./routes/connections_router');
const lock_router           = require('./routes/lock_router');
const publish_router        = require('./routes/publish_router');
const studies_router        = require('./routes/studies_router');
const tags_router           = require('./routes/tags_router');
const files_router          = require('./routes/files_router');
const sharing_router        = require('./routes/sharing_router');
const settings_router       = require('./routes/settings_router');
const messages_router       = require('./routes/messages_router');
const users_router          = require('./routes/users_router');
const config_router         = require('./routes/config_router');
const dropbox_router        = require('./routes/dropbox_router');
const collaboration_router  = require('./routes/collaboration_router');
const Fingerprint = require('express-fingerprint');
const Greenlock = require('greenlock-express')

const mongoose   = require('mongoose');
const urljoin    = require('url-join');
const bodyParser = require('body-parser');
const app        = express();




module.exports = {app};

const cors = require('cors');
const day  = dateFormat(new Date(), 'yyyy-mm-dd');
require('./config_validation');

SimpleNodeLogger = require('simple-node-logger'),
opts = {
    logFilePath:`${config.logs_folder}/${day}.log`,
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
},
log = SimpleNodeLogger.createSimpleLogger( opts );

app.use(cors({
    credentials: true, origin: true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'Access-Control-Allow-Credentials': true,
    'optionsSuccessStatus': 204
}));

app.use(Fingerprint({
    parameters:[
        // Defaults
        Fingerprint.useragent,
        Fingerprint.acceptHeaders,
        Fingerprint.geoip

        // Additional parameters
        /*function(next) {
            // ...do something...
            next(null,{
            'param1':'value1'
            })
        },*/
    ]
}))

app.use(session({secret: config.session_secret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const basePathRouter = express.Router();

app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(config.relative_path, basePathRouter);

require('./data_server/models/dataSchema'); // @TODO: does this have side effect or can it be removed?

/*****         data            *****/


const data_controller = require('./data_server/controllers/controller');

basePathRouter.route('/data')
    .put(data_controller.insertData)
    .get(data_controller.getData);

// setup client side
basePathRouter.get('/',(req,res) => res.redirect(urljoin(config.relative_path, 'dashboard/')));
basePathRouter.use('/dashboard/static', express.static('./dashboard/dist'));
basePathRouter.use('/dashboard', (req,res) => res.render('dashboard', config));
basePathRouter.use('/static', express.static(config.static_path));



basePathRouter.use('/users', express.static(config.user_folder));
basePathRouter.use(launch_router);


basePathRouter.use(connections_router);
basePathRouter.use(messages_router);
basePathRouter.use(settings_router);
basePathRouter.use('/files' ,files_router);
basePathRouter.use('/tags' ,tags_router);

basePathRouter.use('/studies' ,studies_router);
basePathRouter.use('/studies', publish_router);
basePathRouter.use('/studies', lock_router);
basePathRouter.use('/studies', sharing_router);
basePathRouter.use('/collaboration', collaboration_router);

basePathRouter.use('/users', users_router);
basePathRouter.use('/config', config_router);
basePathRouter.use('/dropbox', dropbox_router);

let sess;

/********************************************/

basePathRouter.route('/download').get(
    function(req, res){
        sess = req.session;
        if(!sess.user){
            res.statusCode = 403;
            return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        }
        files.download_zip(req.query.path, res);
    }
);

basePathRouter.route('/download_data')
    .get(function(req, res){
        sess = req.session;
        if(!sess.user){
            res.statusCode = 403;
            return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        }
        files.download_data(req.session.user.id, req.query.path, res);
    })

;


mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url, {useNewUrlParser:true});
mongoose.connection.once('open', function() {
    // All OK - fire (emit) a ready event so that express can start
    app.emit('ready');
});

app.on('ready', function() {
    if(config.server_type==='greenlock')
        startupGreenlock();
    if(config.server_type==='http')
        startupHttp();
    if(config.server_type==='https')
        startupHttps();


    /*app.listen(config.port,function(){
        console.log('Minno-server Started on PORT '+config.port);
    });*/
});

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
function startupGreenlock() {
    const greenlock = Greenlock.create({
        // Let's Encrypt v2 is ACME draft 11
        version: 'draft-11',
        server: 'https://acme-v02.api.letsencrypt.org/directory',
        // Note: If at first you don't succeed, stop and switch to staging
        //server: "https://acme-staging-v02.api.letsencrypt.org/directory",
        // You MUST change this to a valid email address
        email: config.owner_email,
        // You MUST NOT build clients that accept the ToS without asking the user
        agreeTos: true,
        // You MUST change these to valid domains
        // NOTE: all domains will validated and listed on the certificate
        approvedDomains: config.domains,
        // You MUST have access to write to directory where certs are saved
        // ex: /home/foouser/acme/etc
        configDir: '~/.config/acme/', // MUST have write access
        // Get notified of important updates and help me make greenlock better
        communityMember: true,
        debug: true
    });
    const redirectHttps = require('redirect-https')();
    const acmeChallengeHandler = greenlock.middleware(redirectHttps);
    require('http')
        .createServer(acmeChallengeHandler)
        .listen(config.port, function() {
            console.log('Listening for ACME http-01 challenges on', this.address());
        });

    ////////////////////////
    // http2 via SPDY h2  //
    ////////////////////////

    // spdy is a drop-in replacement for the https API
    const spdyOptions = Object.assign({}, greenlock.tlsOptions);
    spdyOptions.spdy = { protocols: ['h2', 'http/1.1'], plain: false };
    const myApp = require('./index.js');
    const server = require('spdy').createServer(spdyOptions, myApp.app);
    server.on('error', function(err) {
        console.error(err);
    });
    server.on('listening', function() {
        console.log('Minno-server Started and listening for SPDY/http2/https requests on', this.address());
    });
    server.listen(config.sslport);
}
function startupHttp(){
    app.listen(config.port,function(){
        console.log('Minno-server Started on PORT '+config.port);
    });
}

function startupHttps() {
    const fs = require('fs');
    const http = require('http');
    const https = require('https');
    const privateKey  = fs.readFileSync(config.certFile, 'utf8');
    const certificate = fs.readFileSync(config.keyFile, 'utf8');

    const credentials = {key: privateKey, cert: certificate};
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);
    httpServer.listen(config.port);
    httpsServer.listen(config.sslport);
    console.log('Minno-server Started on PORT '+config.port +'and '+config.sslport);
}