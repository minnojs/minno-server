const config_db = require('./config_db');
const config = require('../config');

const mailer = require('nodemailer-promise');

const ejs = require('ejs');
exports.send_mail = function (to, subject, body, data) {

    return config_db.get_gmail().then(function (gmail_details) {
        if (!gmail_details)
            return false;
        const sendEmail = mailer.config({
            host: 'smtp.gmail.com',
            auth: {user: gmail_details.email, pass: gmail_details.password}
        });

        if (config.debug_mode)
            to = gmail_details.email;
        new Promise(function(resolve, reject) {
            ejs.renderFile(config.base_folder+'/server/views/' + body, {data}, function (err, html) {
                if (err)
                    return reject(err);
                resolve(html);
            });
        })
        .then(html=>{
            const message = {
                from: gmail_details.email,
                to,
                subject,
                html
            };

            sendEmail(message)
                .then(()=>true);
        });
    });
};
