const express     = require('express');
const users        = require('../users');

const usersRouter = express.Router();

module.exports = usersRouter;

usersRouter
    .use(function is_logged_in(req, res, next){
        if (!req.session || !req.session.user || req.session.user.role!=='su') return res.status(403).json({message: 'ERROR: Permission denied!'});
        req.user_id = req.session.user.id;
        next();
    });

usersRouter.route('')
    .get(function(req, res){
        return users.get_users()
            .then(user_data=>res.json({users:user_data.filter(user=>user.id!==req.user_id)}))
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}));
    })
    .delete(function(req, res){
        return users.remove_user(req.body.user_id)
            .then(user_data=>res.json({users:user_data}))
            .catch(err=>
                res.status(err.status || 500).json({message:err.message}));
    })
    .put(function(req, res){
        if (req.body.role)
            return users.update_role(req.body.user_id, req.body.role)
                .then(user_data=>res.json({users:user_data}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
        return users.set_password(req.body.user_id, req.body.password, req.body.password)
                .then(user_data=>res.json({users:user_data}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
    });


usersRouter.route('/add_user')
    .post(
        function(req, res){

            return users.insert_new_user(req.body)
                .then((data)=> data  ? res.json(data) : res.json({}))
                .catch(err=>
                    res.status(err.status || 500).json({message:err.message}));
        });
