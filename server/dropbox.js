const { Dropbox } = require('dropbox');
const fs = require('fs-extra');
const path = require('path');
const urljoin = require('url-join');
const config = require('../config');
const config_db = require('./config_db');
const studies_comp = require('./studies');
const users_comp = require('./users');
const fetch = require('node-fetch'); // Only needed if Node <18

// Create a Dropbox instance
const dbx = new Dropbox({ accessToken: config.dropbox_token, fetch });

// --------------------------- Helper Functions ---------------------------

/**
 * Get Dropbox access token for a user
 */
async function get_user_token(user_id){
    const dbx_details = await config_db.get_dbx();
    if(!dbx_details) return false;
    const info = await users_comp.user_info(user_id);
    return info.dbx_token;
}

// --------------------------- OAuth Functions ---------------------------

/**
 * Get authorization link for a user
 */
async function get_auth_link(user_id, server_url){
    const dbx_details = await config_db.get_dbx();
    if(!dbx_details) return {};
    const back_path = urljoin(server_url, '/dropbox/set');
    const auth_link = `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${dbx_details.client_id}&redirect_uri=${back_path}`;
    const access_token = await get_user_token(user_id);
    return access_token ? {auth_link: '', is_synchronized: true} : {auth_link, is_synchronized: false};
}

/**
 * Revoke Dropbox token for a user
 */
async function revoke_user(user_id){
    const access_token = await get_user_token(user_id);
    await users_comp.revoke_dbx_token(user_id);
    if(!access_token) return;
    await dbx.authTokenRevoke({ token: access_token });
}

/**
 * Exchange OAuth code for access token
 */
async function get_access_token(code, server_url){
    const dbx_details = await config_db.get_dbx();
    if(!dbx_details) throw new Error('Dropbox config missing');
    const back_path = urljoin(server_url, '/dropbox/set');
    const result = await dbx.auth.getAccessTokenFromCode('authorization_code', code, back_path, dbx_details.client_id, dbx_details.client_secret);
    return result.result.access_token;
}

// --------------------------- File Upload ---------------------------

/**
 * Upload a single file to Dropbox
 */
async function upload_file(access_token, local_path){
    const rel_path = local_path.slice(config.base_folder.length);
    const contents = fs.readFileSync(local_path);
    const dropbox_path = `/${rel_path.replace(/\\/g, '/')}`;
    const temp_dbx = new Dropbox({ accessToken: access_token, fetch });

    try {
        await temp_dbx.filesUpload({
            path: dropbox_path,
            contents,
            mode: 'overwrite',
            autorename: true,
            mute: false
        });
        return { path: dropbox_path };
    } catch(err){
        if(err.status === 429) return upload_file(access_token, local_path); // retry on rate limit
        throw err;
    }
}

/**
 * Upload a file for a single user
 */
async function upload_user_file(user_id, local_path){
    const access_token = await get_user_token(user_id);
    if(!access_token) return;
    return upload_file(access_token, local_path);
}

/**
 * Upload a file for all users in a study
 */
async function upload_users_file(user_id, study_id, local_path){
    const data = await studies_comp.has_read_permission(user_id, study_id);
    const users = data.study_data.users.filter(u=>!u.status);
    return Promise.all(users.map(u => upload_user_file(u.user_id, local_path)));
}

/**
 * Upload all files in a user's folder to Dropbox
 */
async function add_user_folder(user_id, local_path){
    const access_token = await get_user_token(user_id);
    if(!access_token) return;
    await users_comp.set_dbx_token(user_id, access_token);
    const info = await users_comp.user_info(user_id);
    const user_name = info.user_name;
    const files = await fs.readdir(path.join(config.user_folder, user_name));
    return Promise.all(files.map(file => {
        const full_path = path.join(config.user_folder, user_name, file);
        return fs.stat(full_path).then(stat => !stat.isDirectory() ? upload_file(access_token, full_path) : null);
    }));
}

// --------------------------- Rename Files ---------------------------

/**
 * Rename a file on Dropbox
 */
async function rename_file(access_token, path2rename, new_name){
    const from_path = path2rename.slice(config.base_folder.length).replace(/\\/g,'/');
    const to_path = new_name.slice(config.base_folder.length).replace(/\\/g,'/');
    const temp_dbx = new Dropbox({ accessToken: access_token, fetch });

    try {
        await temp_dbx.filesMoveV2({
            from_path,
            to_path,
            autorename: true
        });
        return { from: from_path, to: to_path };
    } catch(err){
        if(err.status === 429) return rename_file(access_token, path2rename, new_name); // retry on rate limit
        throw err;
    }
}

/**
 * Rename a file for a single user
 */
async function rename_user_file(user_id, path2rename, new_name){
    const access_token = await get_user_token(user_id);
    if(!access_token) return;
    return rename_file(access_token, path2rename, new_name);
}

/**
 * Rename a file for all users in a study
 */
async function rename_users_file(user_id, study_id, path2rename, new_name){
    const data = await studies_comp.has_read_permission(user_id, study_id);
    const users = data.study_data.users.filter(u=>!u.status);
    return Promise.all(users.map(u => rename_user_file(u.user_id, path2rename, new_name)));
}

// --------------------------- Delete Files ---------------------------

/**
 * Delete a file on Dropbox
 */
async function delete_file(access_token, path2delete){
    const dropbox_path = path2delete.slice(config.base_folder.length).replace(/\\/g,'/');
    const temp_dbx = new Dropbox({ accessToken: access_token, fetch });

    try {
        await temp_dbx.filesDeleteV2({ path: dropbox_path });
        return { path: dropbox_path };
    } catch(err){
        if(err.status === 429) return delete_file(access_token, path2delete); // retry on rate limit
        throw err;
    }
}

/**
 * Delete a file for a single user
 */
async function delete_user_file(user_id, path2delete){
    const access_token = await get_user_token(user_id);
    if(!access_token) return;
    return delete_file(access_token, path2delete);
}

/**
 * Delete a file for all users in a study
 */
async function delete_users_file(user_id, study_id, path2delete){
    const data = await studies_comp.has_read_permission(user_id, study_id);
    const users = data.study_data.users.filter(u=>!u.status);
    return Promise.all(users.map(u => delete_user_file(u.user_id, path2delete)));
}

// --------------------------- Exports ---------------------------

module.exports = {
    get_auth_link,
    revoke_user,
    get_access_token,
    add_user_folder,
    upload_file,
    upload_user_file,
    upload_users_file,
    rename_file,
    rename_user_file,
    rename_users_file,
    delete_file,
    delete_user_file,
    delete_users_file
};