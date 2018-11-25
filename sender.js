const mailer = require('express-mailer');
const express = require('express');
const app = express();
const config_db = require('./config_db');
const config = require('./config');

app.set('view engine', 'ejs');

let extended = false;
exports.send_mail = function (to, subject, body, data) {
    return new Promise(function(resolve, reject) {
        config_db.get_gmail().then(function (gmail_details) {
            if (!gmail_details)
                return resolve(false);

            if (config.debug_mode)
                to = gmail_details.email;
            if (!extended) {
                mailer.extend(app, {
                    secureConnection: true,
                    host: 'smtp.gmail.com',
                    port: 465,
                    auth: {user: gmail_details.email, pass: gmail_details.password}
                });
                extended = true;
            }
        })
        .then(() => {
            app.mailer.send(body, {to, subject, data}, function (err) {
                if (err)
                    return reject(err);
                return resolve(true);
            });
        })
        .then(data => (data));
    });
};
