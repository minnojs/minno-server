const mailer = require('express-mailer');
const express = require('express');
const app = express();
const config = require('./config');

mailer.extend(app, {
    from: 'implicit.dashboard@gmail.com',
    secureConnection: true, // use SSL

    host: 'smtp.gmail.com', // hostname
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: config.email_auth
});

app.set('view engine', 'ejs');

exports.send_mail = function (to, subject, body, data) {
    return app.mailer.send(body, { to, subject, data }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
};
