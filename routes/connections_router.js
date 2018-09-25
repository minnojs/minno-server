const express     = require('express');
const users     = require('../users');
const utils = require('../utils');
const connectionsRouter = express.Router();

module.exports = connectionsRouter;


connectionsRouter.get('/is_loggedin',function(req, res){
    if (!req.session || !req.session.user)
        return res.json({isloggedin: false, timeoutInSeconds: 0});
    return res.json({
        isloggedin:true,
        role:req.session.user.role
    });
});


connectionsRouter.post('/connect',function(req, res){
    return users.connect(req.body.username, req.body.password)
        .catch(err=>
            res.status(err.status || 500).json({message:err.message}))
        .then(
            function(user_data) {
                req.session.user = user_data;
                res.json(user_data._id);
            }
        );
});



connectionsRouter.post('/logout',function(req, res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect(req.get('referer'));
        }
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
                return res.redirect('/');
            return users.check_activation_code(req.params.code)
                .then(()=>res.json({}))
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