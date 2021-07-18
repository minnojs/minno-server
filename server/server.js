let httpServer = null;
let httpsServer = null;
//const Greenlock = require('greenlock-express');
const glx = require('greenlock-express');
const fs = require('fs-extra');
let glxServers = null;
const config = require('../config');
const Path = require('path');
const logger = require('./logger');
const autoPause=require('./researchautopause')
exports.greenlockError = false;
//const configDb = require('./config_db');
const sslChecker = require('ssl-checker');
autoPause.startAutopause();
let keepAliveTimeout = config.keepAliveTimeout;
if (typeof keepAliveTimeout == 'undefined') {
    keepAliveTimeout = 1800000;
}

exports.startupGreenlock = async function(app, greenlock_data) {
    await exports.shutdownHttps();
    await exports.shutdownHttp();
    await
    exports.shutdownGreenlock();
    deleteFolderRecursive(config.base_folder + '/data/greenlock/'); //delete settings from previous uses
    if (greenlock_data == null) {
        greenlock_data = {
            owner_email: config.owner_email,
            domains: config.domains
        };
    }
    if (!fs.existsSync(config.base_folder + '/data/greenlock/package.json')) {
        let greenlockFileData = {
            'name': 'minnoserver',
            'version': '1.0.0',
            'description': '',
            'main': 'index.js',
            'scripts': {
                'test': 'echo "Error: no test specified" && exit 1'
            },
            'author': '',
            'license': 'ISC',
            'dependencies': {
                'greenlock-express': '^4.0.3'
            }
        };
        fs.outputFileSync(config.base_folder + '/data/greenlock/package.json', JSON.stringify(greenlockFileData), function(err) {
            if (err) return logger.error({message:err});
        });
        fs.outputFileSync(config.base_folder + '/data/greenlock/.greenlockrc', '{}', function(err) {
            if (err) return logger.error({message:err});
        });
    }
    await glx.init(() => {
        const pkg = require(config.base_folder + '/data/greenlock/package.json');
        const greenlock = require('@root/greenlock').create({
            // name & version for ACME client user agent
            packageAgent: pkg.name + '/' + pkg.version,
            configDir: config.base_folder + '/data/greenlock/greenlock.d',

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
            configDir: '../data/greenlock/config/greenlock.d',
            // whether or not to run at cloudscale
            cluster: false
        };
    }).ready(async function(glExpress) {

        if (exports.greenlockError) {
            return;
        }
        await glExpress.serveApp(app);
        glxServers = glExpress;
        let greenlockHttp = glxServers.httpServer();
        if (greenlockHttp != null) {
            greenlockHttp.keepAliveTimeout = keepAliveTimeout;
        }
        let greenlockHttps = glxServers.httpsServer();
        if (greenlockHttps != null) {
            greenlockHttps.keepAliveTimeout = keepAliveTimeout;
        }
        if (exports.greenlockError) {
            await exports.shutdownGreenlock();
        }

    }); //.ready(glx => glx.serveApp(app));
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
exports.shutdownGreenlock = async function() {
    if (glxServers != null) {
        let greenlockHttp = glxServers.httpServer();
        if (greenlockHttp != null) {
            logger.info({message:'Closing Greenlock HTTP Server'});
            await greenlockHttp.close();
        }
        let greenlockHttps = glxServers.httpsServer();
        if (greenlockHttps != null) {
            logger.info({message:'Closing Greenlock HTTPS Server'});
            await greenlockHttps.close();
        }
    }
    glxServers = null;

};
exports.startupHttp = async function(app) {
    await exports.shutdownHttps();
    await exports.shutdownGreenlock();
    await exports.shutdownHttp();
    httpServer = await app.listen(config.port, function() {
        logger.info({message:'Minno-server Started on PORT ' + config.port});
    });
    httpServer.keepAliveTimeout = keepAliveTimeout;
};

exports.shutdownHttp = async function() {
    if (httpServer != null) {
        await httpServer.close();
        httpServer = null;
        logger.info({message:'shutdown http server'});
    }
};

exports.startupHttps = async function(app, server_data) {
    await exports.shutdownHttps();
    await exports.shutdownHttp();
    await exports.shutdownGreenlock();
    //await exports.startupHttp(app);
    httpServer = await require('http')
		.createServer(function(/*req, res*/) {});
    httpServer.keepAliveTimeout = keepAliveTimeout;
    httpServer.listen(config.port);
    logger.info({message:'Minno-server HTTPS redirect Started on PORT ' + config.port});

    httpServer.on('request', require('redirect-https')({
        port: config.sslport,
        body: '<!-- Hello! Please use HTTPS instead -->',
        trustProxy: true // default is false
    }));
    const https = require('https');
    if (server_data == null)
        server_data = {
            privateKey: config.keyFile,
            certificate: config.certFile,
            port: config.sslport
        };
    const credentials = {
        key: server_data.privateKey,
        cert: server_data.certificate
    };

    try {
        httpsServer = await https.createServer(credentials, app);
        httpsServer.listen(config.sslport);
        httpsServer.keepAliveTimeout = keepAliveTimeout;
        logger.info({message:'Minno-server Started on PORT ' + config.sslport});
    } catch (e) {
        logger.error({message:e});
        throw e;
    }
};


exports.shutdownHttps = async function() {
    if (httpsServer != null) {
        await httpsServer.close();
        httpsServer = null;
    }
};
exports.testSSL = async function(domain) {
    await sslChecker(domain, 'HEAD', 443).then().catch((err) => {
        if (err.code === 'ENOTFOUND') {
            throw ('Domain invalid.  Please make sure that DNS is configured correctly');
        } else {
            throw ('The error is' + err);
        }
    });
    return true;
};
exports.startServer = async function(app, serverConfig) {
    //const serverConfig=await configDb.get_config();
    const server_data = serverConfig.server_data;
    try {
        if (typeof server_data !== 'undefined' && server_data) {
            if (server_data.https) {
                await exports.startupHttps(app, server_data.https);
            }
            if (server_data.greenlock) {
                try {
                    await exports.startupGreenlock(app, server_data.greenlock);
                    await exports.testSSL(server_data.greenlock.domains[0]);
                } catch (err) {
                    logger.error({message:err});
                    await exports.shutdownHttps(app);
                    await exports.startupHttp(app);
                }
            }
            if (!server_data.https && !server_data.greenlock) {
                await exports.startupHttp(app);
            }
        } else {

            if (config.server_type === 'greenlock') {
                try {
                    await exports.startupGreenlock(app, server_data.greenlock);
                    await exports.testSSL(server_data.greenlock.domains[0]);
                } catch (err) {
                    logger.error({message:err});
                    await exports.shutdownHttps(app);
                    await exports.startupHttp(app);
                }
            } else {
                if (config.server_type === 'https') {
                    exports.startupHttps(app);
                } else {
                    exports.startupHttp(app);
                }
            }
        }
    } catch (e) {
        await exports.startupHttp(app);
        logger.error({message:e});
    }
};
const deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            const curPath = Path.join(path, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
