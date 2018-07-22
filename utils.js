const crypto      = require('crypto');
var config        = require('./config');


function sha1(data) {
    var generator = crypto.createHash('sha1');
    generator.update(data+config.hash_salt);
    return generator.digest('hex')
}


module.exports = {sha1};
