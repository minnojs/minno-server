var express = require('express');
var session = require('express-session');
var connect = require('./connect');
var studies = require('./studies');
var tags = require('./tags');
var config = require('./config');
var experiments = require('./experiments');

var users = require('./users');

var files   = require('./files');
var sender  = require('./sender');

var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

app.use('/users', express.static('users'));
app.use('/static', express.static(config.static_path));
app.use('/dist', express.static('player'));


app.use(cors({
    credentials: true, origin: true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    'Access-Control-Allow-Credentials': true,
    "optionsSuccessStatus": 204

}));

app.use(session({secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

var sess;


/*****         data            *****/
var mongoose = require('mongoose'),
    Data = require('./data_server/models/dataSchema');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url);

var data_controller = require('./data_server/controllers/controller');
//
app.route('/data')
    .put(data_controller.insertData);
app.route('/data')
    .get(data_controller.getData);
// app.route('/study/start/:studyId')
//     .get(data_controller.newStudyInstance);

/********************************************/

app.get('/',function(req,res){
    sess = req.session;
    if(sess.user)
        res.redirect('/studies');
    else
        res.render('index.html');
});

app.get('/is_loggedin',function(req,res){
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


app.post('/connect',function(req, res){
        sess = req.session;
        connect.check(req.body.username, req.body.password, res, function(user_data){
            sess.user = user_data;
            res.end(JSON.stringify(user_data._id));
        });
    });

app.route('/download').get(
    function(req, res){
        sess = req.session;
        if(!sess.user){
            res.statusCode = 403;
            return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        }
        files.download_zip(req.query.path, res);
    }

);

app.route('/files/:study_id').get(
    function(req, res){
        sess = req.session;
        if(!sess.user){
            res.statusCode = 403;
            return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        }
        var server = req.protocol+'://'+req.headers.host;

        files.get_study_files(sess.user.id, parseInt(req.params.study_id), server, res);
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

app.route('/files/:study_id/upload/')
    .post(
        function(req, res){
            files.upload(sess.user.id, parseInt(req.params.study_id), req, res);
        });


app.route('/files/:study_id/upload/:folder_id')
    .post(
        function(req, res){
            files.upload(sess.user.id, parseInt(req.params.study_id), req, res);
        });

app.route('/files/:study_id/file/')

    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            var server = req.protocol+'://'+req.headers.host;
            if(req.body.isDir)
                return files.create_folder(sess.user.id, parseInt(req.params.study_id), req.body.name, server, res);

            files.update_file(sess.user.id, parseInt(req.params.study_id), req.body.name, req.body.content, server, res);
        });

app.route('/files/:study_id/file/:file_id')
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
            var server = req.protocol+'://'+req.headers.host;

            files.update_file(sess.user.id, parseInt(req.params.study_id), req.params.file_id, req.body.content, server, res);
        });

app.route('/files/:study_id/file/:file_id/move')
    .put(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            var server = req.protocol+'://'+req.headers.host;

            files.rename_file(sess.user.id, parseInt(req.params.study_id), req.params.file_id, req.body.path, server, res);
        });

app.route('/files/:study_id/file/:file_id/copy')
    .put(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            files.copy_file(sess.user.id, parseInt(req.params.study_id), req.params.file_id, parseInt(req.body.new_study_id), res);

        });


app.route('/files/:study_id/file/:file_id/experiment')
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


app.route('/studies/:study_id/copy')
    .put(
        function(req, res){
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            studies.duplicate_study(sess.user.id, parseInt(req.params.study_id), req.body.study_name, res);
        });


app.route('/studies/:study_id/tags')
    .get(
        function(req, res){
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            tags.get_study_tags(sess.user.id, parseInt(req.params.study_id), res);
        })
    .put(
        function(req, res){
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            tags.update_study_tags(sess.user.id, parseInt(req.params.study_id), req.body.tags, res);
        });


app.route('/studies')
    .get(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            studies.get_studies(sess.user.id, res);
        })
    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            studies.create_new_study(sess.user.id, req.body.study_name, res)

        });


app.route('/studies/:study_id')
    .delete(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            studies.delete_study(sess.user.id, parseInt(req.params.study_id), res)})
    .put(
        function(req, res){

            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            studies.rename_study(sess.user.id, parseInt(req.params.study_id), req.body.study_name, res);
        });



app.route('/tags')
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
        })
   ;


app.route('/tags/:tag_id')
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

app.route('/change_email')
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


app.route('/add_user')
    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user || sess.user.role!='su') {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            users.insert_new_user(req, res);

        });

app.route('/change_password')
    .post(
        function(req, res){
            sess = req.session;
            if(!sess.user) {
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            }
            users.set_password(sess.user.id, req.body.password, req.body.confirm, res);

        });


app.route('/activation/:code')
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

app.post('/logout',function(req, res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });

});

app.get('/launch/:exp_id',function(req, res){
    app.set('view engine', 'ejs');
    return experiments.get_experiment_url(req).then(function(exp_data) {
        // console.log(exp_data);
        res.render('launch', {sessionId:exp_data.session_id, url: exp_data.url, studyId:exp_data.study_id});
    });
});

app.listen(3001,function(){
    console.log("App Started on PORT 3000");
});