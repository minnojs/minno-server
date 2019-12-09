const crypto      = require('crypto');
const config        = require('../config');


function sha1(data) {
    const generator = crypto.createHash('sha1');
    generator.update(data+config.hash_salt);
    return generator.digest('hex');
}

function clean_url(url) {
    return url.replace(/([^:])(\/\/+)/g, '$1/');
}


module.exports = {sha1, clean_url};
