const config        = require('./config');
const urljoin       = require('url-join');
const crypto        = require('crypto');
const studies_comp  = require('./studies');
const join = require('path').join;
const users_comp = require('./users');
const utils        = require('./utils');
const data_server  = require('./data_server/controllers/controller');
const mongo         = require('mongodb-bluebird');
const mongo_url     = config.mongo_url;

const request_promise = require('request-promise');
const path         = require('path');
const fs           = require('fs-extra');
const walk         = require('walkdir');

const auth_link = 'https://www.dropbox.com/oauth2/authorize?response_type=code&client_id='+config.dropbox.client_id+'&redirect_uri='+config.server_url +'/dropbox/set';
const token_url = 'https://api.dropbox.com/1/oauth2/token';


function get_access_token(code){
    const url = 'https://api.dropbox.com/1/oauth2/token';
    const body = {
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: config.server_url +'/dropbox/set',
        client_id: config.dropbox.client_id,
        client_secret: config.dropbox.client_secret
    };
    return request_promise.post(url, {form: body, json: true});
}

function add_user_folder(user_id, access_token){
    return users_comp.set_dbx_token(user_id, access_token)
        .then(()=>users_comp.user_info(user_id)
            .then(function(info){
                const user_name = info.user_name;
                return walk(config.user_folder+'/'+user_name, function(path) {
                    return fs.stat(path).then(data=>{
                        if(!data.isDirectory())
                            return upload_file(access_token, path);
                    });
                });
            }));
}

function get_user_token(user_id){
    return users_comp.user_info(user_id)
            .then(function(info){
                return info.dbx_token;
            });
}

function upload_user_file(user_id, path){
    return get_user_token(user_id)
        .then(access_token=> upload_file(access_token, path));
}



function upload_file(access_token, path){
    const rel_path = path.substring(config.base_folder.length, path.length);
    const readStream = fs.createReadStream(path);
    const params = {path: rel_path,
        mode: 'overwrite',
        autorename: true,
        mute: false};
    const options={
        url: 'https://content.dropboxapi.com/2/files/upload',

        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify(params)
        },
        body: readStream
    };
    return request_promise.post(options)
        .catch(err=>{
            if(err.statusCode==429)
                return upload_file(access_token, path);
            console.log({path:path, err: err.message});
        });
}


function delete_user_file(user_id, path){
    return get_user_token(user_id)
        .then(access_token=> delete_file(access_token, path));
}


function delete_file(access_token, path){
    const rel_path = path.substring(config.base_folder.length, path.length);
    const readStream = fs.createReadStream(path);
    const params = {path: rel_path,
        mode: 'overwrite',
        autorename: true,
        mute: false};
    const options={
        url: 'https://content.dropboxapi.com/2/files/delete_v2',

        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json',
            'Dropbox-API-Arg': JSON.stringify(params)
        },
    body: readStream
    };
    return request_promise.post(options)
        .catch(err=>{
            if(err.statusCode==429)
                return delete_file(access_token, path);
            console.log({path:path, err: err.message});
        });
}

module.exports = {delete_user_file, delete_file, upload_user_file, upload_file, get_access_token, add_user_folder};
