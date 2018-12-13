const config = require('../config');
const zipFolder    = require('zip-folder');

const fs           = require('fs-extra');
const formidable   = require('formidable');
const urlencode    = require('urlencode');
const path         = require('path');
const studies_comp = require('./studies');
const experiments  = require('./experiments');
const dropbox      = require('./dropbox');
const utils        = require('./utils');
const {has_read_permission, has_write_permission} = studies_comp;
const urljoin       = require('url-join');

function walk(full_path, base_path = full_path){
    const file_path = full_path.slice(base_path.length+1);
    const file_url = urljoin(config.server_url, full_path);

    return fs.stat(full_path)
        .then(res => res.isDirectory() ? dir() : file());

    function dir(){
        return fs.readdir(full_path)
            .then(files => files.map(getFiles))
            .then(Promise.all.bind(Promise))
            .then(files => ({
                id:urlencode(file_path),
                isDir:true,
                path:file_path,
                url:file_url,
                files
            }));
    }

    function getFiles(file){
        return walk(path.join(full_path, file), base_path);
    }

    function file(){
        return {
            id:urlencode(file_path),
            isDir:false,
            path:file_path,
            url: file_url
        };
    }
}

function get_study_files(user_id, study_id) {
    return has_read_permission(user_id, study_id)
    .then(function({study_data, can_write}){
        const folderName = path.join(config.user_folder,study_data.folder_name);
        return walk(folderName)
        .then(files => {

            return {
                study_name:study_data.name,
                is_published: study_data.versions && study_data.versions.length>1 && study_data.versions[study_data.versions.length-1].state==='Published',
                is_locked: study_data.locked,
                type: study_data.type,
                is_public: study_data.is_public,
                is_readonly: !can_write,
                versions: study_data.versions,
                permission: study_data.users.find(user=>user.user_id===user_id) ? study_data.users.find(user=>user.user_id===user_id).permission :'read only',
                files: files.files
                // TODO: this applies only to root. should add this to deep files as well.
                .map(function(file){
                    const exp_data = study_data.experiments.filter(exp => exp.file_id === file.id && !exp.inactive);
                    return {id:file.id, isDir:file.isDir, path: file.path, url:file.url, files:file.files, exp_data:exp_data?exp_data[0]:[]};
                }),
                base_url: urljoin(config.server_url, config.user_folder, study_data.folder_name, '/images/')
            };
        });
    });
}

function create_folder(user_id, study_id, folder_id) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}){
        folder_id = urlencode.decode(folder_id);
        const folder_path = path.join(config.user_folder,study_data.folder_name,folder_id);

        return fs.pathExists(folder_path)
        .then(existing => existing
            ? Promise.reject({status:500, message: 'ERROR: folder aleady exists in FS!'})
            : fs.mkdirp(folder_path))
            .then(function(){
                const file_url = path.join('../', folder_path);
                return studies_comp.update_modify(study_id)
                .then(function(){
                    return ({id: folder_id, url: file_url});
                });
            });
    });
}

function update_file(user_id, study_id, file_id, content) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}){
        file_id = urlencode.decode(file_id);
        return fs.writeFile(path.join(config.user_folder,study_data.folder_name,file_id), content, 'utf8')
        .then(function(){
            const file_url = path.join('..',config.user_folder,study_data.folder_name,file_id);
            return studies_comp.update_modify(study_id)

                .then(dropbox.upload_users_file(user_id, study_id, path.resolve(path.join(config.user_folder,study_data.folder_name,file_id))))
            .then(()=>({id: file_id, content: content, url: file_url}));
        });
    });
}

function get_file_content(user_id, study_id, file_id) {
    return has_read_permission(user_id, study_id)
    .then(function({study_data}){
        file_id = urlencode.decode(file_id);
        return fs.readFile(path.join(config.user_folder,study_data.folder_name,file_id), 'utf8')
        .then((content)=>({id: file_id, content: content}));
    });
}

function delete_files(user_id, study_id, files) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}){
        return files.map(function(file) {
            const delPath = path.join(config.user_folder,  study_data.folder_name, file);
            return Promise.all([
                fs.remove(delPath),
                experiments.delete_experiment(user_id, study_id, file),
                dropbox.delete_users_file(user_id, study_id, delPath),
                studies_comp.update_modify(study_id)
            ]);
        });
    })
    // must happen after all delete stuff
    .then(() => get_study_files(user_id, study_id))
    .then(study => study.files);
}

function download_zip(pth, res) {
    return res.download(path.join(config.base_folder , config.dataFolder,pth), pth, function(err){
        if (err) {
            return res.status(err.status || 500).json({message:err.message});
        } else {
            fs.remove(path.join(config.base_folder , config.dataFolder,pth));
        }
    });

}

function download_files(user_id, study_id, files) {
    const zip_name = utils.sha1(user_id+'*'+Math.floor(Date.now() / 1000));
    const zip_path = config.base_folder + config.dataFolder + zip_name;
    const zip_file = zip_path+'.zip';
    return has_read_permission(user_id, study_id)
        .then(function({study_data}){
            return Promise.all(files.map(function(file) {
                const path2copy = path.join(config.user_folder, study_data.folder_name, file);
                return fs.copy(path2copy, zip_path + '/' + file);
            }));
        })
        .then(() => new Promise(function(resolve, reject) {
            zipFolder(zip_path, zip_file, function (err) {
                if (err)
                    return reject(err);
                resolve();
            });
        }))
        .then(function(){
            fs.remove(zip_path);
            return ({zip_file: zip_name + '.zip'});
        });
}

function rename_file(user_id, study_id, file_id, new_path) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}){
        const fid = urlencode.decode(file_id);
        const new_file_path = path.join(config.user_folder, study_data.folder_name, new_path);
        const exist_file_path = path.join(config.user_folder, study_data.folder_name, fid);

        return Promise.all([
            fs.rename(exist_file_path, new_file_path),
            studies_comp.update_modify(study_id),
            experiments.update_file_id(user_id, study_id, fid, new_path),
            dropbox.rename_users_file(user_id, study_id, exist_file_path, new_file_path)
        ]);
    })
    .then(() => get_study_files(user_id, study_id))
    .then(study => study.files);
}

function copy_file(user_id, study_id, file_id, new_study_id) {
    return has_read_permission(user_id, study_id)
    .then(function({study_data}){
        return has_write_permission(user_id, new_study_id)
        .then(function({study_data:new_study_data}){

            file_id = urlencode.decode(file_id);
            const new_file_path = path.join(config.user_folder,new_study_data.folder_name,file_id);
            const exist_file_path = path.join(config.user_folder,study_data.folder_name,file_id);

            return fs.copy(exist_file_path, new_file_path)
                .then(()=> studies_comp.update_modify(new_study_id))
                .then(()=>({}));

        });
    });
}

function upload(user_id, study_id, req) {
    const form = new formidable.IncomingForm();
    form.maxFileSize = config.maxFileSize;
    form.multiples = true;
    return new Promise(function(resolve, reject){
        return form.parse(req, function (err, fields, files) {
            if (err)
                return reject({status:500, message: `${err}`});
            return has_write_permission(user_id, study_id)
            .then(function({study_data}){
                const uploadedFiles = Array.isArray(files['files[]']) ? files['files[]'] : [files['files[]']];
                const prefix = !req.params.folder_id ? '' : req.params.folder_id +'/';
                const study_path = path.join(config.user_folder,  study_data.folder_name, prefix);

                const create_file_promises = uploadedFiles
                .map(function(file){
                    const oldpath = file.path;
                    const file_path = path.join(study_path, file.name);

                    log.info(`201804201330 | upload_file. oldpath:${oldpath}, file_path:${file_path}`);

                    return fs
                    .copy(oldpath, file_path)
                    .then(() => fs.remove(oldpath))
                    .then(dropbox.upload_users_file(user_id, study_id, path.resolve(file_path)));
                });
                return Promise.all(create_file_promises);
            })
            .then(() => Promise.all([
                get_study_files(user_id, study_id),
                studies_comp.update_modify(study_id)
            ]))
            .then(function([study_data]){ return study_data.files; })
            .then(resolve)
            .catch(reject);
        });
    });
}

module.exports = {get_study_files, create_folder, update_file, get_file_content, delete_files, download_files, download_zip, rename_file, copy_file, upload};
