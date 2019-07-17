let httpServer = null;
let httpsServer = null;
const Greenlock = require('greenlock-express');
const config = require('../config');

exports.startupGreenlock = function(app, greenlock_data) {
    exports.shutdownHttps();
    const greenlock = Greenlock.create({
        // Let's Encrypt v2 is ACME draft 11
        version: 'draft-11',
        server: 'https://acme-v02.api.letsencrypt.org/directory',
        // Note: If at first you don't succeed, stop and switch to staging
        //server: "https://acme-staging-v02.api.letsencrypt.org/directory",
        // You MUST change this to a valid email address
        email: greenlock_data.owner_email,
        // You MUST NOT build clients that accept the ToS without asking the user
        agreeTos: true,
        // You MUST change these to valid domains
        // NOTE: all domains will validated and listed on the certificate
        approvedDomains: greenlock_data.domains,
        // You MUST have access to write to directory where certs are saved
        // ex: /home/foouser/acme/etc
        configDir: '~/.config/acme/', // MUST have write access
        // Get notified of important updates and help me make greenlock better
        communityMember: true,
        debug: true
    });
    const redirectHttps = require('redirect-https')();
    const acmeChallengeHandler = greenlock.middleware(redirectHttps);
    httpServer = require('http')
        .createServer(acmeChallengeHandler);
    httpServer.listen(config.port, function() {
        console.log('Listening for ACME http-01 challenges on', this.address());
    });

    ////////////////////////
    // http2 via SPDY h2  //
    ////////////////////////

    // spdy is a drop-in replacement for the https API
    const spdyOptions = Object.assign({}, greenlock.tlsOptions);
    spdyOptions.spdy = {
        protocols: ['h2', 'http/1.1'],
        plain: false
    };
    httpsServer = require('spdy').createServer(spdyOptions, app);
    httpsServer.on('error', function(err) {
        console.error(err);
    });
    httpsServer.on('listening', function() {
        console.log('Minno-server Started and listening for SPDY/http2/https requests on', this.address());
    });
    httpsServer.listen(config.sslport);
};

exports.startupHttp = function(app) {
    exports.shutdownHttps();
    httpServer = app.listen(config.port, function() {
        console.log('Minno-server Started on PORT ' + config.port);
    });
};

exports.shutdownHttp = function() {
    if (httpServer != null) {
        httpServer.close();
        httpServer = null;
    }
};

exports.startupHttps = function(app, server_data) {
    exports.shutdownHttps();
    const fs = require('fs');
    const http = require('http');
    const https = require('https');
    const privateKey = server_data.private_key;
    const certificate = server_data.certificate;

    const credentials = {
        key: privateKey,
        cert: certificate
    };
    httpServer = http.createServer(app);
    httpServer.listen(config.port);

    try{
        httpsServer = https.createServer(credentials, app);
        httpsServer.listen(server_data.port);
        console.log('Minno-server Started on PORT ' + config.port + ' and ' + server_data.port);
    }
    catch(e){
		console.log(e);
        return this.startupHttp(app);
    }
};

exports.shutdownHttps = function() {
    if (httpServer != null) {
        httpServer.close();
        httpServer = null;
    }
    if (httpsServer != null) {
        httpsServer.close();
        httpsServer = null;
    }
};
