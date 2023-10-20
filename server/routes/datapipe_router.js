const express     = require('express');
const datapipe  = express.Router();
const connection    = Promise.resolve(require('mongoose').connection);
const config_file = require.main.require('../config');

module.exports = datapipe;

datapipe.route('/:token')
    .get(
        function(req, res){
            const token = config_file.datapipe_salt.concat(req.params.token).split('').map(v=>v.charCodeAt(0)).reduce((a,v)=>a+((a<<7)+(a<<3))^v).toString(16);
            return connection.then(function (db) {
                const datapipe   = db.collection('datapipe');
                return datapipe.findOne({_id:token})
                    .then(function(token_data){
                        if(!token_data)
                            return datapipe.insertOne({_id:token, uses:1}).then(()=>res.json({}));
                        return datapipe.updateOne({_id:token},
                            {$set:{uses: token_data.uses+1}}
                        ).then(()=>res.json({}));
                    });
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
