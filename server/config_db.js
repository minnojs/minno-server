const connection    = Promise.resolve(require('mongoose').connection);
const Validator = require('node-input-validator');
const Server				= require('./server.js');
const url = require('url');
const config = require('../config');
const sslCertificate = require('get-ssl-certificate')

function get_config () {
    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.find({}).toArray().then(data=>{
            let fingerprint = data.find(vars=>vars.var==='fingerprint');
            if(fingerprint)
                fingerprint = {use_fingerprint: fingerprint.use_fingerprint};

            let gmail = data.find(vars=>vars.var==='gmail');
            if(gmail)
                gmail = {email: gmail.email, password: gmail.password};
            let dbx = data.find(vars=>vars.var==='dbx');
            if(dbx)
                dbx = {client_id: dbx.client_id, client_secret: dbx.client_secret};
            let server_data = data.find(vars=>vars.var==='server');
            if(server_data)
                server_data = server_data.server_data;
            return ({gmail, dbx, server_data, fingerprint});
        });
    });
}

function get_fingerprint () {
    return get_config ()
        .then(config=>config.fingerprint);
}

function get_gmail () {
    return get_config ()
        .then(config=>config.gmail);
}

function get_server_data () {
    return get_config ()
        .then(config=>config.server_data);
}

function update_gmail (gmail) {
    if(!gmail.updated)
        return;
    if(!gmail.enable)
        return unset_gmail();
    return set_gmail(gmail.email, gmail.password);
}

function update_fingerprint (fingerprint) {
    if(!fingerprint.updated)
        return;
    if(!fingerprint.enable)
        return unuse_fingerprint();
    return use_fingerprint();
}

function update_dbx (dbx) {
    if(!dbx.updated)
        return;
    if(!dbx.enable)
        return unset_dbx();
    return set_dbx(dbx.app_key, dbx.app_secret);
}

async function update_server(server_data, host, app) {
    if(!server_data.updated)
        return;
    let server_data_obj = {http:{}};
	if (server_data.type==='http'){
		await Server.startupHttp(app);
		return update_config_db(server_data_obj);
	}
	let is_crashed = false;
    if (server_data.type==='https'){
        server_data_obj = {https: server_data.https};
		try{
            const server_url =  url.resolve(host, config.relative_path);
            await Server.startupHttps(app, server_data_obj);

            await sslCertificate.get(server_url).then(function (certificate) {
                const subjectaltname = certificate.subjectaltname;
                let valid_certification = false;
                certificate.subjectaltname.split(",").map(a=> {
                    if(a.includes(server_url))
                        valid_certification = true;});
                is_crashed = !valid_certification;
            })
                .catch(()=> {
                    is_crashed = true;
            });
			
		}
		catch(e)
		{
			curConfig=await get_config();
			await Server.startServer(app,curConfig);
			return Promise.reject({status: 400, message: e});
		}
	    if(is_crashed)
	    {
	        await Server.startupHttp(app);
	        return Promise.reject({server:{status: 400, message: 'Error: wrong certifications'}});
	    }
		else
		{
			return update_config_db(server_data_obj);
		}
	}

    if (server_data.type==='greenlock') {
        const email = server_data.greenlock.owner_email;
        let validator = new Validator({email},
            {email: 'required|email'});
        return validator.check()
            .then(function (){
                if (Object.keys(validator.errors).length !== 0)
                    return Promise.reject({server:{status: 400, message: validator.errors.email.message}});
                return Promise.all(
                    server_data.greenlock.domains.map(function (domain) {
                        let url_validator = new Validator({domain}, {domain: 'required|url'});
                        return url_validator.check()
                            .then(function () {
                                if (Object.keys(url_validator.errors).length !== 0)
                                    return Promise.reject({server:{status: 400, message: url_validator.errors.domain.message}});
                            });
                        })
                    )
                    .then(async ()=>
                    {
						try{
							Server.greenlockError=false;
                        server_data_obj = {greenlock: server_data.greenlock};
					    await Server.startupGreenlock(app,server_data.greenlock);
						try{
							await Server.testSSL(server_data.greenlock.domains[0]);
							return update_config_db(server_data_obj);
						
						}
							catch(err)
							{
								console.log(err);
								Server.greenlockError=true;
								await Server.shutdownGreenlock();
								await Server.shutdownHttps(app);
								curConfig=await get_config();
								await Server.startServer(app,curConfig);
								return Promise.reject({status: 400, message: "Error updating to Greenlock: "+err})
							}
					}
					catch(e)
					{
						console.log(e);
						Server.greenlockError=true;
						await Server.shutdownGreenlock();
						await Server.shutdownHttps(app);
						//await server.startupHttp(app);
						curConfig=await get_config();
						await Server.startServer(app,curConfig);
						return Promise.reject({status: 400, message: e});
					}
                    })
            });
    }
    //return update_config_db(server_data_obj);
}


function update_config_db(server_data_obj){
    return connection.then(function (db) {
        const config_data = db.collection('config');
        return config_data.updateOne({var: 'server'},
            {$set: {server_data: server_data_obj}}, {upsert: true})
            .then(() => ('Server successfully updated'));
    });

}

function set_gmail (email, password) {
    if(!password)
        return Promise.reject({gmail:{status:400, message: 'ERROR: Missing Gmail password'}});
    let validator = new Validator({email},
        {email: 'required|email'});
    return validator.check()
        .then(function () {
            if (Object.keys(validator.errors).length !== 0)
                return Promise.reject({gmail:{status: 400, message: 'ERROR: Invalid Gmail email address'}});

            return connection.then(function (db) {
                const config_data = db.collection('config');
                return config_data.updateOne({var: 'gmail'},
                    {$set: {email: email, password: password}}, {upsert: true})
                    .then(() => ('Gmail successfully updated'));
            });
        });
}


function unset_gmail () {
    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.deleteOne({var: 'gmail'})
            .then(() => ('Gmail successfully removed')).catch(err=>console.log(err));
    });
}


function unuse_fingerprint () {
    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.deleteOne({var: 'fingerprint'})
            .then(() => ('Fingerprint successfully removed')).catch(err=>console.log(err));
    });
}

function use_fingerprint () {
    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.updateOne({var: 'fingerprint'},
            {$set: {use_fingerprint: true}}, {upsert: true})
            .then(() => ('Fingerprint successfully added'));

    });
}

function set_dbx(client_id, client_secret) {
    if(!client_id || !client_secret)
        return Promise.reject({status:400, message: 'ERROR: Missing Dropvox parameters'});

    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.updateOne({var: 'dbx'},
            {$set: {client_id, client_secret}}, { upsert : true })
            .then(() => ('Dropbox successfully updated')).catch(err=>console.log(err));
    });
}

function unset_dbx() {
    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.deleteOne({var: 'dbx'})
            .then(() => ('Dropbox successfully removed')).catch(err=>console.log(err));
    });
}


function get_dbx() {
    return get_config ()
        .then(config=>config.dbx);
}


function get_homepage () {
    return connection.then(function (db) {
        const config_data = db.collection('config');
        return config_data.find({}).toArray().then(data=>{
            let homepage = data.find(vars=>vars.var==='homepage');
            return {upper_panel:homepage.upper_panel, right_panel:homepage.right_panel};
            });
    });
}

function update_homepage (upper_panel, right_panel) {

    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.updateOne({var: 'homepage'},
            {$set: {upper_panel, right_panel}}, { upsert : true })
            .then(() => ('Homepage successfully updated'));
    });

}

module.exports = {get_config, update_gmail, set_gmail, unset_gmail, get_gmail, update_dbx, set_dbx, unset_dbx, get_dbx, get_server_data, update_server, update_fingerprint, get_fingerprint, get_homepage, update_homepage};