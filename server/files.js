const config = require('../config');
const zipFolder = require('zip-a-folder');

const fs           = require('fs-extra');
const formidable   = require('formidable');
const urlencode    = require('urlencode');
const path         = require('path');
const studies_comp = require('./studies');
const experiments  = require('./experiments');
const dropbox      = require('./dropbox');
const utils        = require('./utils');
const {has_read_permission, has_write_permission, has_read_data_permission} = studies_comp;
const urljoin       = require('url-join');
const url = require('url');
const connection    = Promise.resolve(require('mongoose').connection);

function walk(server_url, folder_path, exps, base_path = folder_path){
    const full_path = path.join(config.user_folder,folder_path);
    const file_path = full_path.slice(path.join(config.user_folder,base_path).length+1);
    const file_url = urljoin(server_url, '//users', folder_path);
    return fs.stat(full_path)
        .then(res => res.isDirectory() ? dir(exps) : file(exps));

    function dir(exps){
        return fs.readdir(full_path)
            .then(files => files.map(file=>getFiles(server_url, file, exps)))
            .then(Promise.all.bind(Promise))
            .then(files => ({
                id:urlencode(file_path),
                isDir:true,
                path:file_path,
                url:file_url,
                files
            }));
    }

    function getFiles(server_url, file, exps){
        return walk(server_url, path.join(folder_path, file), exps, base_path);
    }

    function file(exps){
        const exp_data = exps.filter(exp => exp.file_id === file_path && !exp.inactive);

        return {
            id:urlencode(file_path),
            isDir:false,
            path:file_path,
            url: file_url,
            exp_data:exp_data?exp_data[0]:[]
        };
    }
}

function get_study_files(user_id, study_id, server_url, version_id='') {
    return has_read_permission(user_id, study_id)
    .then(function({study_data, can_write}){
        if (!version_id)
            version_id = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;
        const experiments = study_data.versions.filter(version=>version.id === version_id)[0].experiments;

        const folder_path = path.join(study_data.folder_name, 'v' + version_id);
        return walk(server_url, folder_path, experiments)
        .then(files => {
            const study_user = study_data.users.find(user=>user.user_id===user_id);
            return {
                study_name:study_data.name,
                is_published: study_data.versions && study_data.versions.length>1 && study_data.versions[study_data.versions.length-1].state==='Published',
                is_locked: study_data.locked,
                type: study_data.type,
                is_public: study_data.is_public,
                is_readonly: !can_write,
                versions: study_data.versions,
                description: study_data.description,
                permission: study_user ? study_user.permission :'read only',
                has_data_permission: study_user && (study_user.permission === 'owner' || study_user.data_permission === 'visible'),
                files: files.files,
                base_url: urljoin(server_url, 'users', folder_path)
            };
        });
    });
}

function create_folder(user_id, study_id, folder_id) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}){
        folder_id = urlencode.decode(folder_id);
        const version_id = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;

        const folder_path = path.join(config.user_folder, study_data.folder_name, 'v'+version_id, folder_id);
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
        const version_id = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;
        file_id = urlencode.decode(file_id);
        const path2write = path.join(config.user_folder, study_data.folder_name, 'v'+version_id, file_id);
        return fs.writeFile(path2write, content, 'utf8')
        .then(function(){
            const file_url = path.join('..', config.user_folder, study_data.folder_name, 'sandbox', file_id);
            return studies_comp.update_modify(study_id)
                .then(dropbox.upload_users_file(user_id, study_id, path.resolve(path2write)))
                .then(()=>({id: file_id, content: content, url: file_url}));
        });
    });
}

function get_file_content(user_id, study_id, file_id, version_id = '') {
    return has_read_permission(user_id, study_id)
    .then(function({study_data}){
        file_id = urlencode.decode(file_id);
        if (!version_id)
            version_id = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;

        const folder_path = path.join(study_data.folder_name, 'v'+version_id);

        return fs.readFile(path.join(config.user_folder, folder_path, file_id), 'utf8')
        .then(content=>({id: file_id, content}));
    });
}

function delete_files(user_id, study_id, files, server_url) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}){
        return files.map(function(file) {
            const delPath = path.join(config.user_folder,  study_data.folder_name, 'sandbox', file);

            return Promise.all([
                fs.remove(delPath),
                experiments.delete_experiment(user_id, study_id, file),
                dropbox.delete_users_file(user_id, study_id, delPath),
                studies_comp.update_modify(study_id)
            ]);
        });
    })
    // must happen after all delete stuff
    .then(() => get_study_files(user_id, study_id, server_url))
    .then(study => study.files);
}

function download_zip(pth, res) {
    const full_path = path.join(config.base_folder , config.zip_folder, pth);

    return fs.pathExists(full_path)
        .then(exist=>
            !exist ?
                res.status(500).json({message: 'File doesn\'t exist'})
                :
                res.download(full_path, pth, function (err) {
                    if (err) {
                        return res.status(err.status || 500).json({message: err.message});
                    } else {
                        // fs.remove(path.join(config.base_folder, config.zip_folder, pth));
                    }
                })
        );
}


function download_data(user_id, pth, res) {
    const full_path = path.join(config.base_folder, config.dataFolder, pth);
    return connection.then(function (db) {
        const data_requests = db.collection('data_requests');
        return data_requests.findOne({path: pth})
            .then(request => {
                return !request ?
                    res.status(500).json({message: 'File doesn\'t exist'})
                    :
                    has_read_data_permission(user_id, request.study_id)
                    .then(()=>
                        fs.pathExists(full_path)
                            .then(exist=>
                                !exist
                                    ?
                                    res.status(500).json({message: 'File doesn\'t exist'})
                                    :
                                    fs.createReadStream(full_path).pipe(res)
                            )
                    );
            })
            .catch(err=>res.status(err.status || 500).json(err.message));
    });
}

function download_files(user_id, study_id, version_id, files) {
    const zip_name = utils.sha1(user_id+'*'+Math.floor(Date.now() / 1000));
    const zip_path = config.base_folder + config.zip_folder + zip_name;
    const zip_file = zip_path+'.zip';
    return has_read_permission(user_id, study_id)
        .then(function({study_data}){
            if (version_id==='latest')
                version_id = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;

            return Promise.all(files.map(function(file) {
                const path2copy = path.join(config.user_folder, study_data.folder_name, 'v'+version_id, file);
                return fs.copy(path2copy, zip_path + '/' + file);
            }));
        })
        .then(() => new Promise(function(resolve, reject) {
            zipFolder.zipFolder(zip_path, zip_file, function (err) {
                if (err)
                    return reject(err);
                resolve();
            });
        }))
        .then(function(){
            // fs.remove(zip_path);
            return ({zip_file: zip_name + '.zip'});
        });
}

function rename_file(user_id, study_id, file_id, new_path, server_url) {
    return has_write_permission(user_id, study_id)
    .then(function({study_data}){
        const fid = urlencode.decode(file_id);
        const version_id = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;
        const new_file_path = path.join(config.user_folder, study_data.folder_name, 'v'+version_id, new_path);
        const exist_file_path = path.join(config.user_folder, study_data.folder_name, 'v'+version_id, fid);

        return Promise.all([
            fs.rename(exist_file_path, new_file_path),
            studies_comp.update_modify(study_id),
            experiments.update_file_id(user_id, study_id, fid, new_path),
            dropbox.rename_users_file(user_id, study_id, exist_file_path, new_file_path)
        ]);
    })
    .then(() => get_study_files(user_id, study_id, server_url))
    .then(study => study.files);
}

function copy_file(user_id, study_id, file_id, new_study_id, version_id = '') {
    return has_read_permission(user_id, study_id)
    .then(function({study_data}){
        if (!version_id)
            version_id = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;
        return has_write_permission(user_id, new_study_id)
        .then(function({study_data:new_study_data}){
            const latest_version_id = new_study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;
            file_id = urlencode.decode(file_id);
            const exist_file_path = path.join(config.user_folder,study_data.folder_name, 'v'+version_id, file_id);
            const new_file_path = path.join(config.user_folder,new_study_data.folder_name, 'v'+latest_version_id, file_id);
            return fs.copy(exist_file_path, new_file_path)
                .then(()=> studies_comp.update_modify(new_study_id))
                .then(()=>({}));

        });
    });
}


function duplicate_file(user_id, study_id, file_id, new_file_id, server_url) {
    return has_write_permission(user_id, study_id)
        .then(function({study_data:study_data}){

            file_id = urlencode.decode(file_id);
            const version_id = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;
            const new_file_path = path.join(config.user_folder,study_data.folder_name, 'v'+version_id, new_file_id);
            const exist_file_path = path.join(config.user_folder,study_data.folder_name, 'v'+version_id, file_id);
            return fs.copy(exist_file_path, new_file_path)
                .then(()=> studies_comp.update_modify(study_id))
                .then(()=>studies_comp.update_modify(study_id))
                .then(()=>
                    fs.stat(new_file_path)
                        .then(() => {
                            return get_study_files(user_id, study_id, server_url)
                                .then(study => study.files);



                            // walk(path.join(study_data.folder_name,new_file_id), [], path.join(config.user_folder, study_data.folder_name))
                            //     .then(data=>({id: new_file_id, url:new_file_id, files:data.files}));
                        })

                );
        });
}

function upload(user_id, study_id, req) {
    const form = new formidable.IncomingForm();
    const server_url =  url.resolve(req.protocol + '://' + req.headers.host, config.relative_path);

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
                const version_id = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;

                const study_path = path.join(config.user_folder,  study_data.folder_name, 'v'+version_id, prefix);

                const create_file_promises = uploadedFiles
                .map(function(file){
                    const oldpath = file.path;
                    const file_path = path.join(study_path, file.name);

                    return fs.copy(oldpath, file_path)
                        .then(() => fs.remove(oldpath))
                        .then(dropbox.upload_users_file(user_id, study_id, path.resolve(file_path)));
                });
                return Promise.all(create_file_promises);
            })
            .then(() => Promise.all([

                get_study_files(user_id, study_id, server_url),
                studies_comp.update_modify(study_id)
            ]))
            .then(function([study_data]){ return study_data.files; })
            .then(resolve)
            .catch(reject);
        });
    });
}

module.exports = {get_study_files, create_folder, update_file, get_file_content, delete_files, download_files, download_zip, download_data, rename_file, copy_file, duplicate_file, upload};
