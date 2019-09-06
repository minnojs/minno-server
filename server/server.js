let httpServer = null;
let httpsServer = null;
const Greenlock = require('greenlock-express');
const config = require('../config');
const configDb = require('./config_db');


exports.startupGreenlock = async function(app, greenlock_data) {
    await exports.startupHttp(app);	
	if(greenlock_data==null)
	{
		greenlock_data={owner_email: config.owner_email, domains:config.domains}
	}
	console.log(greenlock_data);
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
   /* const redirectHttps = require('redirect-https')();
    const acmeChallengeHandler = greenlock.middleware(redirectHttps);
    httpServer = require('http')
        .createServer(acmeChallengeHandler);
    httpServer.listen(config.port, function() {
        console.log('Listening for ACME http-01 challenges on', this.address());
    });*/

    ////////////////////////
    // http2 via SPDY h2  //
    ////////////////////////

    // spdy is a drop-in replacement for the https API
    const spdyOptions = Object.assign({}, greenlock.tlsOptions);
    spdyOptions.spdy = {
        protocols: ['h2', 'http/1.1'],
        plain: false
    };
    httpsServer = await require('spdy').createServer(spdyOptions, app);
    httpsServer.on('error', function(err) {
		console.log(err);
        throw(err);
    });
    httpsServer.on('listening', function() {
        console.log('Minno-server Started and listening for SPDY/http2/https requests on', this.address());
    });
    httpsServer.listen(config.sslport);
};

exports.startupHttp = async function(app) {
    await exports.shutdownHttps();
    await exports.shutdownHttp();
    httpServer = await app.listen(config.port, function() {
        console.log('Minno-server Started on PORT ' + config.port);
    });
};

exports.shutdownHttp = async function() {
    if (httpServer != null) {
        await httpServer.close();
        httpServer = null;
    }
};

exports.startupHttps = async function(app, server_data) {
    await exports.startupHttp(app);	
    const https = require('https');
    if(server_data==null)
        server_data = {privateKey:config.keyFile, certificate:config.certFile, port:config.sslport}

    const credentials = {
        key: server_data.https.privateKey,
        cert: server_data.https.certificate
    };

    try{
        httpsServer = await https.createServer(credentials, app);
        httpsServer.listen(server_data.https.port);
        console.log(server_data);
        console.log('Minno-server Started on PORT ' + server_data.https.port);
    }
    catch(e){
		console.log(e);
        throw e;
    }
};


exports.shutdownHttps = async function() {
	if (httpsServer != null) {
		await httpsServer.close();
		httpsServer = null;
	}
}
