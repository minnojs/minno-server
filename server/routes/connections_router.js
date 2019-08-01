const express   = require('express');
const users     = require('../users');
const requests     = require('../requests');
const config_db = require('../config_db');
const connectionsRouter = express.Router();

module.exports = connectionsRouter;



connectionsRouter.get('/is_loggedin',function(req, res){
    if (!req.session || !req.session.user){
        let user_object = {
            isloggedin: false, timeoutInSeconds: 0};
        return requests.get_requests(req.connection.remoteAddress)
            .then(function(ip_data) {
                const reqs = ip_data.reqs;
                return config_db.get_reCaptcha()
                    .then(function (reCaptcha_details){
                        if (reCaptcha_details && reqs>=reCaptcha_details.attempts) {
                            req.session.reCaptcha = reCaptcha_details.site_key;
                            user_object.reCaptcha = req.session.reCaptcha;
                            return res.json(user_object);
                        }
                        return res.json(user_object);

                    });
            });
    }

    return users.new_msgs(req.session.user._id).then(new_msgs=>{
        let user_object = {new_msgs: new_msgs,
            isloggedin: true,
            role: req.session.user.role};
        if (req.session.user.first_admin_login)
            user_object.first_admin_login = true;
        return res.json(user_object);
    });
});


connectionsRouter.post('/connect',function(req, res){
    const reCaptcha     = req.body.reCaptcha;
    const local_address = req.get('host');
    const use_captcha   = req.session.reCaptcha;
    return users.connect(req.body.username, req.body.password, use_captcha, reCaptcha, local_address)
        .then(
            function(user_data){
                req.session.reCaptcha = false;
                req.session.user      = user_data;
                return requests.reset_requests(req.connection.remoteAddress)
                    .then(()=>res.json(user_data._id));
            }
        )
        .catch(err=>
            requests.add_requests(req.connection.remoteAddress)
                .then(function(ip_data){
                    const reqs = ip_data.reqs;
                    return config_db.get_reCaptcha()
                        .then(function (reCaptcha_details){
                            if (reCaptcha_details && reqs>=reCaptcha_details.attempts){
                                req.session.reCaptcha = reCaptcha_details.site_key;
                                return res.status(err.status || 500).json({message: err.message, reCaptcha: reCaptcha_details.site_key});
                            }
                            return res.status(err.status || 500).json({message: err.message});
                        });
                })
        );
});

connectionsRouter.post('/logout',function(req, res) {
    req.session.destroy(function (err) {
        if (err)
            return res.status(err.status || 500).json({message: err.message});
        return res.redirect(req.get('referer'));
    });
});


connectionsRouter.post('/recovery',function(req, res){
    return users.reset_password_request(req.body.username)
        .then(()=>res.json({}))
        .catch(err=>
            res.status(err.status || 500).json({message:err.message}));
});

connectionsRouter.route('/change_password/:reset_code')
    .get(function(req, res){
        return users.check_reset_code(req.params.reset_code)
            .then(()=>res.json({}))
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}));

    })
    .post(function(req, res){
        return users.reset_password(req.params.reset_code, req.body.password, req.body.confirm)
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}))
            .then(()=>res.json({}));
    });



connectionsRouter.route('/activation/:code')
    .get(
        function(req, res){
            if(req.session.user)
                return res.status(400).json({message:'user already logged in. Please logout and try again'});
            return users.check_activation_code(req.params.code)
                .then(data=>res.json(data))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
        })
    .post(
        function(req, res){
            if(req.session.user)
                return res.redirect('/');
            return users.set_user_by_activation_code(req.params.code, req.body.password, req.body.confirm)
                .then(()=>res.json({}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));


        });
