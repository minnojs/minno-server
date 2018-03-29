var mailer = require('express-mailer');
var ejs = require('ejs');
var express = require('express');
var app = express();
var config = require('./config');

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
    app.mailer.send(body, {
        to: to,
        subject: subject,
        data: data

    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
}