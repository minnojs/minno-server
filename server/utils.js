const crypto      = require('crypto');
const config        = require('../config');
const urljoin     = require('url-join');


function sha1(data) {
    const generator = crypto.createHash('sha1');
    generator.update(data+config.hash_salt);
    return generator.digest('hex');
}

function clean_url(url) {
    return url.replace(/([^:])(\/\/+)/g, '$1/');
}

function get_server_url() {
    return urljoin(config.server_type+'://'+ config.server_url, config.relative_path);

}

module.exports = {sha1, clean_url};
