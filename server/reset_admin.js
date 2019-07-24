/* eslint no-console:0 */
require('./config_validation');
const config        = require('../config');
const {set_password, update_role} = require('./users');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo_url, {useNewUrlParser:true});
const connection    = Promise.resolve(mongoose.connection);


console.log(`Resetting admin rule (su) and password (${config.admin_default_pass})`);
console.log('=========================');
Promise.resolve()
    .then(update_admin_role)
    .then(process.exit.bind(process));



function update_admin_role(){
    return connection
        .then(function (db) {
            const users = db.collection('users');
            return users
                .findOne({user_name: 'admin'})
                .then(admin_data => update_role(admin_data._id, 'su')
                                    .then(()=>set_password(admin_data._id, config.admin_default_pass,config.admin_default_pass, true)));
        });

}



process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
