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



function get_auth_link(user_id){
    if ( typeof config.dropbox === 'undefined' )
        return Promise.resolve({});
    const auth_link = 'https://www.dropbox.com/oauth2/authorize?response_type=code&client_id='+config.dropbox.client_id+'&redirect_uri='+config.server_url +'/dropbox/set';

    return get_user_token(user_id)
        .then(access_token => access_token ? {auth_link:'', is_synchronized:true} : {auth_link, is_synchronized:false});

}

function revoke_user(user_id){
    return get_user_token(user_id)
        .then(function(access_token) {
            if(!access_token)
                return;
            const options = {
                url: 'https://api.dropboxapi.com/2/auth/token/revoke',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            };
            return request_promise.post(options)
            .then(()=>users_comp.revoke_dbx_token(user_id));

        });
}


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
    if (!config.dropbox)
        return false;
    return users_comp.user_info(user_id)
            .then(function(info){
                return info.dbx_token;
            });
}


function upload_users_file(user_id, study_id, path){
    return studies_comp.has_read_permission(user_id, study_id)
        .then(data=>
        {
            const users = data.study_data.users.filter(user=>!user.status);
            return users.map(user=>upload_user_file(user.user_id, path));
        });
}

function upload_user_file(user_id, path){
    return get_user_token(user_id)
        .then(function(access_token) {
            if (!access_token)
                return;
            return upload_file(access_token, path)
        });
}



function upload_file(access_token, path){
    const rel_path = path.slice(config.base_folder.length);
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

function rename_users_file(user_id, study_id, path2rename, new_name){
    return studies_comp.has_read_permission(user_id, study_id)
        .then(data=>
        {
            const users = data.study_data.users.filter(user=>!user.status);
            return users.map(user=>rename_user_file(user.user_id, path2rename, new_name));
        });
}

function rename_user_file(user_id, path2rename, new_name){
    return get_user_token(user_id)
        .then(function(access_token) {
            if (!access_token)
                return;
            return rename_file(access_token, path2rename, new_name);
        });
}


function rename_file(access_token, path2rename, new_name){
    path2rename = path.resolve(path2rename).slice(config.base_folder.length);
    new_name = path.resolve(new_name).slice(config.base_folder.length);

    const data = {from_path: path2rename, to_path:new_name};
    const options={
        url: 'https://api.dropboxapi.com/2/files/move_v2',

        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    };
    return request_promise.post(options)
        .catch(err=>{
            if(err.statusCode==429)
                return rename_file(access_token, path2rename);
            console.log({path:path2rename, err: err.message});
        });
}


function delete_users_file(user_id, study_id, path){
    return studies_comp.has_read_permission(user_id, study_id)
        .then(data=>
        {
            const users = data.study_data.users.filter(user=>!user.status);
            return users.map(user=>delete_user_file(user.user_id, path));
        });
}
function delete_user_file(user_id, path){
    return get_user_token(user_id)
        .then(function(access_token) {
            if (!access_token)
                return;
            return delete_file(access_token, path);
        });
}


function delete_file(access_token, path2delete){

    path2delete = path.resolve(path2delete).slice(config.base_folder.length);
    const rel_path = {path: path2delete};
    const options={
        url: 'https://api.dropboxapi.com/2/files/delete_v2',

        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rel_path)

    };

    return request_promise.post(options)
        .catch(err=>{
            if(err.statusCode==429)
                return delete_file(access_token, path2delete);
            console.log({path:path2delete, err: err.message});
        });
}

module.exports = {get_auth_link, rename_users_file, rename_user_file, rename_file, delete_users_file, delete_user_file, delete_file, upload_user_file, upload_users_file, upload_file, get_access_token, revoke_user, add_user_folder};
