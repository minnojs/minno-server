var httpServer = null;
var httpsServer = null;
const Greenlock = require('greenlock-express')
const config = require('../config');

exports.startupGreenlock = function(app) {
	exports.shutdownHttps();
	const greenlock = Greenlock.create({
		// Let's Encrypt v2 is ACME draft 11
		version: 'draft-11',
		server: 'https://acme-v02.api.letsencrypt.org/directory',
		// Note: If at first you don't succeed, stop and switch to staging
		//server: "https://acme-staging-v02.api.letsencrypt.org/directory",
		// You MUST change this to a valid email address
		email: config.owner_email,
		// You MUST NOT build clients that accept the ToS without asking the user
		agreeTos: true,
		// You MUST change these to valid domains
		// NOTE: all domains will validated and listed on the certificate
		approvedDomains: config.domains,
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
}

exports.startupHttp = function(app) {
	exports.shutdownHttps();
	httpServer = app.listen(config.port, function() {
		console.log('Minno-server Started on PORT ' + config.port);
	});
}

exports.shutdownHttp = function() {
	if (httpServer != null) {
		httpServer.close();
		httpServer = null;
	}
}

exports.startupHttps = function(app) {
	exports.shutdownHttps();
	const fs = require('fs');
	const http = require('http');
	const https = require('https');
	const privateKey = fs.readFileSync(config.keyFile, 'utf8');
	const certificate = fs.readFileSync(config.certFile, 'utf8');

	const credentials = {
		key: privateKey,
		cert: certificate
	};
	httpServer = http.createServer(app);
	httpsServer = https.createServer(credentials, app);
	httpServer.listen(config.port);
	httpsServer.listen(config.sslport);
	console.log('Minno-server Started on PORT ' + config.port + 'and ' + config.sslport);
}

exports.shutdownHttps = function() {
	if (httpServer != null) {
		httpServer.close();
		httpServer = null;
	}
	if (httpsServer != null) {
		httpsServer.close();
		httpsServer = null;
	}
}
