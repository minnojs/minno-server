const express     = require('express');
const session     = require('express-session');
const connect     = require('./connect');
const config      = require('./config');
const users       = require('./users');
const files       = require('./files');
const experiments = require('./experiments');
const path        = require('path');

const dateFormat  = require('dateformat');
const tags        = require('./tags');
const fs          = require('fs-extra');

const launch_router = require('./routes/launch_router');
const lock_router   = require('./routes/lock_router');
const publish_router   = require('./routes/publish_router');
const studies_router = require('./routes/studies_router');
const tags_router = require('./routes/tags_router');


const sender      = require('./sender');

const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const day = dateFormat(new Date(), "yyyy-mm-dd");

if (!fs.existsSync(config.logs_folder))
    fs.mkdirSync(config.logs_folder);

SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:`${config.logs_folder}/${day}.log`,
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
    log = SimpleNodeLogger.createSimpleLogger( opts );

app.use(cors({
    credentials: true, origin: true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    'Access-Control-Allow-Credentials': true,
    "optionsSuccessStatus": 204
}));

app.use(session({secret: config.session_secret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const  basePathRouter = express.Router();

app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(config.relative_path, basePathRouter);

const dataFolder = path.join(config.base_folder,config.dataFolder)
if (!fs.existsSync(config.static_path)) throw new Error(`Config: static_path folder does not exist "${config.static_path}"`);
if (!fs.existsSync(config.user_folder)) throw new Error(`Config: user_folder folder does not exist "${config.user_folder}"`);
if (!fs.existsSync(dataFolder)) throw new Error(`Config: dataFolder folder does not exist "${dataFolder}"`);
if (typeof config.server_url !== 'string') throw new Error(`Config: server_url is not set`);

basePathRouter.use('/static', express.static(config.static_path));
basePathRouter.use('/users', express.static(config.user_folder));
basePathRouter.use(launch_router);
basePathRouter.use(lock_router);
basePathRouter.use(publish_router);
basePathRouter.use('/tags' ,tags_router);
basePathRouter.use('/studies' ,studies_router);

let sess;

require('./data_server/models/dataSchema'); // @TODO: does this have side effect or can it be removed?

/*****         data            *****/
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url);


var data_controller = require('./data_server/controllers/controller');

basePathRouter.route('/data')
    .put(data_controller.insertData);

basePathRouter.route('/data')
    .get(data_controller.getData);
/********************************************/

basePathRouter.get('/',function(req,res){
    res.redirect('/static');
});

basePathRouter.get('/is_loggedin',function(req,res){
    sess = req.session;
    if (sess.user)
        return res.end(JSON.stringify({
            isloggedin:true,
            role:sess.user.role
        }));
    else
        return res.end(JSON.stringify({
            isloggedin: false, timeoutInSeconds: 0
        }));
});


basePathRouter.post('/connect',function(req, res){
        sess = req.session;
        connect.check(req.body.username, req.body.password, res, function(user_data){
            sess.user = user_data;
            res.end(JSON.stringify(user_data._id));
        });
    });

basePathRouter.route('/download').get(
    function(req, res){
        sess = req.session;
        if(!sess.user){
            res.statusCode = 403;
            return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        }
        console.log(req.query.path);
        files.download_zip(req.query.path, res);
    }
);

basePathRouter.route('/files/:study_id').get(
    function(req, res){
        sess = req.session;
        if(!sess.user){
            res.statusCode = 403;
            return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        }
        files.get_study_files(sess.user.id, parseInt(req.params.study_id), res);
    })
    .delete(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            files.delete_files(sess.user.id, parseInt(req.params.study_id), req.body.files, res);
        })
    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            files.download_files(sess.user.id, parseInt(req.params.study_id), req.body.files, res);
        });

basePathRouter.route('/files/:study_id/upload/')
    .post(
        function(req, res){
            files.upload(sess.user.id, parseInt(req.params.study_id), req, res);
        });


basePathRouter.route('/files/:study_id/upload/:folder_id')
    .post(
        function(req, res){
            files.upload(sess.user.id, parseInt(req.params.study_id), req, res);
        });

basePathRouter.route('/files/:study_id/file/')

    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            if(req.body.isDir)
                return files.create_folder(sess.user.id, parseInt(req.params.study_id), req.body.name, res);

            files.update_file(sess.user.id, parseInt(req.params.study_id), req.body.name, req.body.content, res);
        });

basePathRouter.route('/files/:study_id/file/:file_id')
    .get(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            files.get_file_content(sess.user.id, parseInt(req.params.study_id), req.params.file_id, res);
        })
    .put(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }

            files.update_file(sess.user.id, parseInt(req.params.study_id), req.params.file_id, req.body.content, res);
        });

basePathRouter.route('/files/:study_id/file/:file_id/move')
    .put(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            files.rename_file(sess.user.id, parseInt(req.params.study_id), req.params.file_id, req.body.path, res);
        });

basePathRouter.route('/files/:study_id/file/:file_id/copy')
    .put(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            files.copy_file(sess.user.id, parseInt(req.params.study_id), req.params.file_id, parseInt(req.body.new_study_id), res);

        });

basePathRouter.route('/files/:study_id/file/:file_id/experiment')
    .post(
        function(req, res){
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            experiments.insert_new_experiment(sess.user.id, parseInt(req.params.study_id), req.params.file_id, req.body.descriptive_id, res);
        })

    .delete(
        function(req, res){
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }

            experiments.delete_experiment(sess.user.id, parseInt(req.params.study_id), req.params.file_id, res);
        })
    .put(
        function(req, res){
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            experiments.update_descriptive_id(sess.user.id, parseInt(req.params.study_id), req.params.file_id, req.body.descriptive_id, res);
        });

basePathRouter.route('/tags')
    .get(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            tags.get_tags(sess.user.id, res);
        })
    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            tags.insert_new_tag(sess.user.id, req.body.tag_text, req.body.tag_color, res);
        });

basePathRouter.route('/tags/:tag_id')
    .delete(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            tags.delete_tag(sess.user.id, req.params.tag_id, res);
        })
    .put(function(req, res){
        tags.update_tag(sess.user.id, {id: req.params.tag_id, text: req.body.tag_text, color:req.body.tag_color}, res);
    });

basePathRouter.route('/change_email')
    .get(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            users.get_email(sess.user.id, res);

        })
    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            users.set_email(sess.user.id, req.body.email, res);

        });

basePathRouter.route('/add_user')
    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user || sess.user.role!='su') {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            users.insert_new_user(req, res);

        });

basePathRouter.route('/change_password')
    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            users.set_password(sess.user.id, req.body.password, req.body.confirm, res);
        });


basePathRouter.route('/activation/:code')
    .get(
        function(req, res){
            sess = req.session;
            if(sess.user) {
                res.redirect('/');
                return;
            }
            users.check_activation_code(req.params.code, res);
        })
    .post(
        function(req, res){
            users.set_user_by_activation_code(req.params.code, req.body.password, req.body.confirm, res);
        });

basePathRouter.post('/logout',function(req, res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });

});
basePathRouter.get('/users',function(req, res){
    var sess = req.session;

    if(!sess.user || sess.user.role!='su') {
        return;
    }
    return users.get_users(res);

});

app.listen(config.port,function(){
    console.log("App Started on PORT "+config.port);
});
