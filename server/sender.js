const config_db = require('./config_db');
const config = require('../config');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

function render(body, data) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(config.base_folder + '/server/views/' + body, {data}, (err, html) => {
            if (err)
                return reject(err);
            resolve(html);
        });
    });
}

exports.send_mail = async function (to, subject, body, data) {
    const gmail_details = await config_db.get_gmail();
    if (!gmail_details)
        return false;

    if (config.debug_mode)
        to = gmail_details.email;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {user: gmail_details.email, pass: gmail_details.password}
    });

    try {
        const html = await render(body, data);
        await transporter.sendMail({
            from: gmail_details.email,
            to,
            subject,
            html
        });
        return true;
    } finally {
        transporter.close();
    }
};