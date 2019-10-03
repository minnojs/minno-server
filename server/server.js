let httpServer = null;
let httpsServer = null;
const Greenlock = require('greenlock-express');
const config = require('../config');
const configDb = require('./config_db');
const sslChecker 			= require('ssl-checker');

exports.startupGreenlock = async function(app, greenlock_data) {
    //await exports.startupHttp(app);
   await exports.shutdownHttp();
   await exports.shutdownHttps();	
	if(greenlock_data==null)
	{
		greenlock_data={owner_email: config.owner_email, domains:config.domains}
	}
	var glx = Greenlock.create({
	    server: "https://acme-v02.api.letsencrypt.org/directory",
	    // Note: If at first you don't succeed, stop and switch to staging:
	    // https://acme-staging-v02.api.letsencrypt.org/directory
	    version: "draft-11", // Let's Encrypt v2 (ACME v2)
        email: greenlock_data.owner_email,
        // You MUST NOT build clients that accept the ToS without asking the user
        agreeTos: true,
	    // If you wish to replace the default account and domain key storage plugin
	    store: require("le-store-certbot").create({
	        configDir: '~/.config/acme/',
	        webrootPath: "'~/.config/acmeweb/'"
	    }),
 
	    // Contribute telemetry data to the project
	    telemetry: false,
 
	    // the default servername to use when the client doesn't specify
	    // (because some IoT devices don't support servername indication)
	    servername: greenlock_data.domains[0],
 
	    approveDomains: greenlock_data.domains
	});	
httpServer=require("http")
    .createServer(glx.middleware(require("redirect-https")()));
    httpServer.listen(80, function() {
        console.log("Listening for ACME http-01 challenges on", this.address());
    });

    ////////////////////////
    // http2 via SPDY h2  //
    ////////////////////////
httpsServer=await require("https")
    .createServer(glx.httpsOptions, app);
	httpsServer.listen(config.sslport, function() {
        console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
    });

   
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
	await exports.shutdownHttps();	
	await exports.shutdownHttp();
   //await exports.startupHttp(app);	
httpServer=await require("http")
    .createServer(function (req, res) {
});
httpServer.listen(config.port);
 console.log('Minno-server HTTPS redirect Started on PORT ' + config.port);

	httpServer.on('request', require('redirect-https')({
  port: config.sslport
, body: '<!-- Hello! Please use HTTPS instead -->'
, trustProxy: true // default is false
}));
    const https = require('https');
    if(server_data==null)
        server_data = {privateKey:config.keyFile, certificate:config.certFile, port:config.sslport}
	console.log( JSON.stringify(server_data));
    const credentials = {
        key: server_data.privateKey,
        cert: server_data.certificate
    };

    try{
        httpsServer = await https.createServer(credentials, app);
        httpsServer.listen(config.sslport);
        console.log(server_data);
        console.log('Minno-server Started on PORT ' + config.sslport);
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
exports.testSSL= async function(domain){
	await sslChecker(domain,'HEAD',443).then(console.log).catch((err) => {
	  if (err.code === 'ENOTFOUND') {
	    throw("Domain invalid.  Please make sure that DNS is configured correctly");
	  } else {
	    throw("The error is"+err);
	  }
	});
	return true;
	
}
