let httpServer = null;
let httpsServer = null;
//const Greenlock = require('greenlock-express');
const glx=require("greenlock-express");
let   glxServers=null;
const config = require('../config');
//const configDb = require('./config_db');
const sslChecker 			= require('ssl-checker');

exports.startupGreenlock = async function(app, greenlock_data) {
	await exports.shutdownHttps();	
	await exports.shutdownHttp();
	await exports.shutdownGreenlock();
	if(greenlock_data==null)
		{
			greenlock_data={owner_email: config.owner_email, domains:config.domains}
		}
   await glx.init(() => {
       const pkg = require('../data/greenlock/package.json');
       const greenlock = require('@root/greenlock').create({
         // name & version for ACME client user agent
         packageAgent: pkg.name + '/' + pkg.version,
		  configDir: "../data/greenlock/config/greenlock.d",

         // contact for security and critical bug notices
         maintainerEmail: greenlock_data.owner_email,

         // where to find .greenlockrc and set default paths
         packageRoot: './data/greenlock'
       });
       greenlock.manager.defaults({
         subscriberEmail: greenlock_data.owner_email,
         agreeToTerms: true
       });
       greenlock.sites.add({
         subject: greenlock_data.domains[0],
		   altnames: greenlock_data.domains
       });
       return {
         greenlock,
		   configDir: "../data/greenlock/config/greenlock.d",
         // whether or not to run at cloudscale
         cluster: false
       };
     }).ready(async function(glExpress) {
  
		 await glExpress.serveApp(app);
		 glxServers=glExpress;
		
    })  //.ready(glx => glx.serveApp(app));
/*   
    glx.init(function getConfig() {
        // Greenlock Config
  return {greenlock: require("../data/greenlock/greenlock.js"),

            // whether or not to run at cloudscale
		cluster: false}
        /* return {
			packageRoot: "./data/greenlock",
            package: { name: "minno-server", version: "0.1",packageRoot: "../data/greenlock",sites: [
    {
      subject: "implicit.cf",
      altnames: [
        "www.implicit.cf"
      ],
      renewAt: 1
    }
  ] },
            maintainerEmail: "andy.dzik@gmail.com",
            cluster: false,
  sites: [
      {
        subject: "implicit.cf",
        altnames: [
          "www.implicit.cf"
        ],
        renewAt: 1
      }
    ]
        };
    }) .ready(function(glExpress) {
  
        glExpress.serveApp(app);
    })  */
	

};
exports.shutdownGreenlock = async function()
{
	if(glxServers!=null){
		console.log(glxServers);
	let greenlockHttp=glxServers.httpServer();
    if (greenlockHttp != null) {
		console.log('Closing Greenlock HTTP Server');
        await greenlockHttp.close();
	}
	let greenlockHttps=glxServers.httpsServer();
    if (greenlockHttps != null) {
		console.log('Closing Greenlock HTTPS Server');
        await greenlockHttps.close();
	}
}
	glxServers=null;
	
}
exports.startupHttp = async function(app) {
    await exports.shutdownHttps();
	await exports.shutdownGreenlock();
    await exports.shutdownHttp();
    httpServer = await app.listen(config.port, function() {
        console.log('Minno-server Started on PORT ' + config.port);
    });
};

exports.shutdownHttp = async function() {
    if (httpServer != null) {
        await httpServer.close();
        httpServer = null;
		console.log('shutdown http server');
    }
};

exports.startupHttps = async function(app, server_data) {
	await exports.shutdownHttps();	
	await exports.shutdownHttp();
	await exports.shutdownGreenlock();
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
exports.startServer = async function(app,serverConfig)
	{
		let serverType=null;
		//const serverConfig=await configDb.get_config();
		const server_data=serverConfig.server_data;
		try{
		if( typeof server_data !== 'undefined' && server_data )
		{
	    if(server_data.https)
			{await exports.startupHttps(app, server_data.https);}
	    if(server_data.greenlock)
			{

				await exports.startupGreenlock(app, server_data.greenlock);
				try{
					await exports.testSSL(server_data.greenlock.domains[0])}
					catch(err)
					{
						console.log(err);
						await exports.shutdownHttps(app);
						await exports.startupHttp(app);
					}
			}
		if(!server_data.https && !server_data.greenlock)
		{
			await exports.startupHttp(app);
		}
		}
		else{
	
	    if(config.server_type==='greenlock')
			{

				await exports.startupGreenlock(app, server_data.greenlock);
				try{
					await exports.testSSL(server_data.greenlock.domains[0])}
					catch(err)
					{
						console.log(err);
						await exports.shutdownHttps(app);
						await exports.startupHttp(app);
					}
			}
		else
		{
	    if(config.server_type==='https'){
	        exports.startupHttps(app);}
		else{
	        exports.startupHttp(app);}
	}
	    }
	}
	catch(e)
	{
		await exports.startupHttp(app);
		console.log(e);
	}
	}	
	
