const connection    = Promise.resolve(require('mongoose').connection);
const evalidator  = require('email-validator');

function get_config () {
    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.find({}).toArray().then(data=>{
            let gmail = data.find(vars=>vars.var==='gmail');
            if(gmail)
                gmail = {email: gmail.email, password: gmail.password};
            let dbx = data.find(vars=>vars.var==='dbx');
            if(dbx)
                dbx = {client_id: dbx.client_id, client_secret: dbx.client_secret};
            return ({gmail, dbx});
        });
    });
}

function get_gmail () {
    return get_config ()
        .then(config=>config.gmail);
}
function set_gmail (email, password) {
    if(!password)
        return Promise.reject({status:400, message: 'ERROR: Missing password'});
    if (!evalidator.validate(email))
        return Promise.reject({status:400, message: 'ERROR: Invalid email address'});

    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.update({var: 'gmail'},
            {$set: {email: email, password:password}}, { upsert : true })
            .then(() => ({})).catch(err=>console.log(err));
    });
}


function unset_gmail () {
    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.remove({var: 'gmail'})
            .then(() => ({})).catch(err=>console.log(err));
    });
}




function set_dbx(client_id, client_secret) {
    if(!client_id || !client_secret)
        return Promise.reject({status:400, message: 'ERROR: Missing parameteters'});

    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.update({var: 'dbx'},
            {$set: {client_id: client_id, client_secret:client_secret}}, { upsert : true })
            .then(() => ({})).catch(err=>console.log(err));
    });
}

function unset_dbx() {
    return connection.then(function (db) {
        const config_data   = db.collection('config');
        return config_data.remove({var: 'dbx'})
            .then(() => ({})).catch(err=>console.log(err));
    });
}


module.exports = {get_config, set_gmail, unset_gmail, get_gmail, set_dbx, unset_dbx};