const express     = require('express');
const datapipe  = express.Router();
const connection    = Promise.resolve(require('mongoose').connection);
const config_file = require.main.require('../config');
const utils         = require('../utils');
const dateFormat = require('dateformat');

module.exports = datapipe;

datapipe.route('/debug/:token')
    .get(
        function(req, res){
            const origin_url = req.get('origin');
            const token =  utils.sha1(config_file.datapipe_salt + req.params.token);
            return connection.then(function (db) {
                const datapipe   = db.collection('datapipe');
                return datapipe.findOne({_id:token})
                    .then(function(token_data){
                        if(!token_data)
                            return datapipe.insertOne({_id:token, uses:1, domain:origin_url, first_use:dateFormat(new Date(), 'yyyy-mm-dd HH.MM.ss'), last_use:dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'), debug:true}).then(()=>res.json({}));
                        return datapipe.updateOne({_id:token},
                            {$set:{uses: token_data.uses+1, domain:origin_url, last_use:dateFormat(new Date(), 'yyyy-mm-dd HH.MM.ss'), debug:true}}
                        ).then(()=>res.json({}));
                    });
            });
        });


datapipe.route('/:token')
    .get(
        function(req, res){
            const origin_url = req.get('origin');
            const token =  utils.sha1(config_file.datapipe_salt + req.params.token);
            return connection.then(function (db) {
                const datapipe   = db.collection('datapipe');
                return datapipe.findOne({_id:token})
                    .then(function(token_data){
                        if(!token_data)
                            return datapipe.insertOne({_id:token, domain:origin_url, uses:1, first_use:dateFormat(new Date(), 'yyyy-mm-dd HH:MM.ss'), last_use:dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')}).then(()=>res.json({}));
                        return datapipe.updateOne({_id:token},
                            {$set:{uses: token_data.uses+1, domain:origin_url, last_use:dateFormat(new Date(), 'yyyy-mm-dd HH.MM.ss')}}
                        ).then(()=>res.json({}));
                    });
            });

        })
    .delete(
        function(req, res){
            const token =  req.params.token;
            return connection.then(function (db) {
                const datapipe   = db.collection('datapipe');
                return datapipe.deleteOne({_id: token})
                    .then(user_data=>res.json({users:user_data}))
                    .catch(err=>
                        res.status(err.status || 500).json({message:err.message}));
            });

        });
datapipe.route('')
    .get(
        function(req, res){
            if (!req.session || !req.session.user || req.session.user.role!=='su')
                return res.status(403).json({});
            return connection.then(function (db) {
                const datapipe   = db.collection('datapipe');
                return datapipe.find({}).toArray()
                    .then(function(tokens){return res.json({tokens});
                    });
            });
        });
