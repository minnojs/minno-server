const express     = require('express');
const session     = require('express-session');
const config      = require('../config');
const files       = require('./files');
const dateFormat  = require('dateformat');

const launch_router     = require('./routes/launch_router');
const connections_router     = require('./routes/connections_router');
const lock_router       = require('./routes/lock_router');
const publish_router    = require('./routes/publish_router');
const studies_router    = require('./routes/studies_router');
const tags_router       = require('./routes/tags_router');
const files_router      = require('./routes/files_router');
const sharing_router    = require('./routes/sharing_router');
const settings_router   = require('./routes/settings_router');
const messages_router   = require('./routes/messages_router');
const users_router      = require('./routes/users_router');
const config_router      = require('./routes/config_router');
const dropbox_router    = require('./routes/dropbox_router');
const collaboration_router    = require('./routes/collaboration_router');
const mongoose = require('mongoose');
const urljoin       = require('url-join');

const bodyParser = require('body-parser');
const app = express();

const mailer = require('express-mailer');

mailer.extend(app, {
    secureConnection: true,
    host: 'smtp.gmail.com',
    port: 465
});

module.exports = {app};

const cors = require('cors');
const day = dateFormat(new Date(), 'yyyy-mm-dd');
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


mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url);
mongoose.connection.once('open', function() { 
    // All OK - fire (emit) a ready event so that express can start
    app.emit('ready'); 
});

app.on('ready', function() { 
    app.listen(config.port,function(){
        console.log('Minno-server Started on PORT '+config.port);
    });
}); 

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
