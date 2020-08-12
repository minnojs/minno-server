/* eslint no-console:0 */
const config        = require('../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url, {useNewUrlParser:true});
const connection    = Promise.resolve(mongoose.connection);

console.log(`Resetting server to work without certification`);
console.log('=========================');


connection.then(function (db) {
    const config_data = db.collection('config');
    return config_data.updateOne({var: 'server'},
        {$set: {server_data: {http:{}}}}, {upsert: true})
        .then(process.exit.bind(process));
});

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
