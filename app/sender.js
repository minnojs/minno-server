const config_db = require('./config_db');
const config = require('../config');
const {promisify} = require('util');

exports.send_mail = function (to, subject, body, data) {
    const app = require('./route').app;
    return config_db.get_gmail().then(function (gmail_details) {
        if (!gmail_details)
            return false;
        if (config.debug_mode)
            to = gmail_details.email;
        const auth = {user: gmail_details.email, pass: gmail_details.password};
        return promisify(app.mailer.update)(auth)
            .then(()=>promisify(app.mailer.send)(body, {to, subject, data}))
            .then(()=>true);
    });
};
