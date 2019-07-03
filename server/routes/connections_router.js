const express     = require('express');
const users     = require('../users');
const connectionsRouter = express.Router();

module.exports = connectionsRouter;


connectionsRouter.get('/is_loggedin',function(req, res){
    if (!req.session || !req.session.user)
        return res.json({isloggedin: false, timeoutInSeconds: 0});

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
    // req.connection.remoteAddress will provide IP address of connected user.

    const recaptcha = req.body.recaptcha;
    const remoteAddress = req.connection.remoteAddress;

    return users.connect(req.body.username, req.body.password, recaptcha, remoteAddress)
        .catch(err=>
            res.status(err.status || 500).json({message:err.message}))
        .then(
            function(user_data) {
                req.session.user = user_data;
                res.json(user_data._id);
            }
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
