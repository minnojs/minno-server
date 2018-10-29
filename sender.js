const mailer = require('express-mailer');
const express = require('express');
const app = express();
const config = require('./config');

mailer.extend(app, {
    from: config.email_auth.user,
    secureConnection: true, // use SSL

    host: 'smtp.gmail.com', // hostname
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: config.email_auth
});

app.set('view engine', 'ejs');

exports.send_mail = function (to, subject, body, data) {
    if(config.debug_mode)
        to = config.email_auth.user;
    return app.mailer.send(body, { to, subject, data }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
};
