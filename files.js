const config = require('./config');
const crypto       = require('crypto');
const zipFolder    = require('zip-folder');

const fs           = require('fs-extra');
const formidable   = require('formidable');
const urlencode    = require('urlencode');
const path         = require('path');
const   studies_comp = require('./studies');
const   experiments  = require('./experiments');
const have_permission = studies_comp.have_permission;


function mysha1( data ) {
    var generator = crypto.createHash('sha1');
    generator.update( data );
    return generator.digest('hex')
}


function walkSync(full_path, rel_dir, filelist) {
    if (!fs.existsSync(full_path)) {
        return console.error('Folder doesn\'t exist');
    }
    var path = path || require('path');
    var files = fs.readdirSync(full_path);
    filelist = filelist || [];
    files.forEach(function(file) {
        var file_str = rel_dir +  file;
        if (fs.statSync(path.join(full_path, file)).isDirectory()) {
            var nested_filelist = walkSync(path.join(full_path, file), rel_dir  + file + '/', []);
            filelist.push({id:urlencode(file_str),
                           isDir:true,
                           path:file_str,
                           url:file_str,
                           files:nested_filelist
                          });
        }
        else {
            var file_id= '../'+full_path+'/'+file;
            var file_url = config.server_url+'/'+full_path+'/'+file;
            filelist.push({id:urlencode(file_str),
                            isDir:false,
                            path:file_str,
                            url:file_url
            });
        }
    });
    return filelist;
};

 function get_study_files(user_id, study_id, res) {
    have_permission(user_id, study_id)
        .then(function(user_data){
            studies_comp.study_info(study_id)
            .then(function(study_data){
                const folderName = path.join(config.user_folder,user_data.user_name,study_data.folder_name);
                let files = [];
                walkSync(folderName, '', files);
                files = files.map(function(file){
                    var exp_data = study_data.experiments.filter(function (exp) {
                        var eq = exp.file_id == file.id;
                        return exp.file_id == file.id});
                    return{id:file.id, isDir:file.isDir, path: file.path, url:file.url, files:file.files, exp_data:exp_data?exp_data[0]:[]}});
                return res.send(JSON.stringify({study_name:study_data.name,
                                                is_published: study_data.versions && study_data.versions.length>1 && study_data.versions[study_data.versions.length-1].state==='Published',
                                                is_locked: study_data.locked,
                                                versions: study_data.versions,
                                                files: files,
                                                base_url: user_data.user_name+'/'+study_data.folder_name}));
            })
        })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};

function create_folder(user_id, study_id, folder_id, res) {
    have_permission(user_id, study_id)
        .then(function(user_data){
            studies_comp.study_info(study_id)
                .then(function(study_data){
                    folder_id = urlencode.decode(folder_id);
                    var folder_path = path.join(config.user_folder,user_data.user_name,study_data.folder_name,folder_id);
                    if (!fs.existsSync(folder_path))
                        fs.mkdirSync(folder_path);

                    var file_url = '../'+folder_path;

                    return studies_comp.update_modify(study_id)
                        .then(function(){
                            return res.send(JSON.stringify({id: folder_id, url: file_url}))});

                })
        })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};

function update_file(user_id, study_id, file_id, content, res) {
    have_permission(user_id, study_id)
        .then(function(user_data){
            studies_comp.study_info(study_id)
            .then(function(study_data){
                file_id = urlencode.decode(file_id);
                fs.writeFile(path.join(config.user_folder,user_data.user_name,study_data.folder_name,file_id), content, 'utf8', function (err, content) {
                    if (err) {
                        res.statusCode = 500;
                        return res.send(JSON.stringify({message: 'ERROR: internal error'}));
                    }
                    var file_url = path.join('..',config.user_folder,user_data.user_name,study_data.folder_name,file_id);

                    return studies_comp.update_modify(study_id)
                        .then(function(){
                            return res.send(JSON.stringify({id: file_id, content: content, url: file_url}))});
                })
            })
        })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};



function get_file_content(user_id, study_id, file_id, res) {
    have_permission(user_id, study_id)
        .then(function(user_data){
            studies_comp.study_info(study_id)
                .then(function(study_data){
                    file_id = urlencode.decode(file_id);
                    fs.readFile(path.join(config.user_folder,user_data.user_name,study_data.folder_name,file_id), 'utf8', function (err,content) {
                        if (err) {
                            res.statusCode = 500;
                            return res.send(JSON.stringify({message: 'ERROR: internal error'}));
                        }
                        return res.send(JSON.stringify({id: file_id, content: content}))
                    });
                })
        })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};

function delete_files(user_id, study_id, files, res) {
    return have_permission(user_id, study_id)
        .then(function(user_data){
            studies_comp.study_info(study_id)
                .then(function(study_data){
                    files.forEach(function(file) {
                        var delPath = path.join(config.user_folder , user_data.user_name , study_data.folder_name , file);
                        try {
                            fs.removeSync(delPath);
                            experiments.delete_experiment(user_id, study_id, file);

                        } catch (err) {
                            res.statusCode = 500;
                            return res.send(JSON.stringify({message: 'ERROR: internal error'}));
                        }
                    });
                    return studies_comp.update_modify(study_id)
                            .then(function(){
                                return res.send(JSON.stringify({}))
                            });
                })
        })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};

function download_zip(pth, res) {
    res.download(path.join(config.base_folder , config.dataFolder,pth), pth, function(err){
        if (err) {
            console.log('can not download..')
        } else {
            fs.removeSync(path.join(config.base_folder , config.dataFolder,pth));
        }
    });

};

function download_files(user_id, study_id, files, res) {
    var zip_name = mysha1(user_id+'*'+Math.floor(Date.now() / 1000));
    var zip_path = config.base_folder + config.dataFolder + zip_name;
    var zip_file = zip_path+'.zip';
    return have_permission(user_id, study_id)
        .then(function(user_data){
            studies_comp.study_info(study_id)
                .then(function(study_data){
                    files.forEach(function(file) {
                        var path = path.join(config.user_folder , user_data.user_name, study_data.folder_name,file);
                        fs.copySync(path, zip_path+'/'+file);
                    });

                    zipFolder(zip_path, zip_file, function(err) {
                        if(err)
                            return console.log('oh no!', err);
                            fs.removeSync(zip_path);

                            res.send(JSON.stringify({zip_file: zip_name+'.zip'}));

                    });


                })
        })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};

function rename_file(user_id, study_id, file_id, new_path, res) {
    file_id = urlencode.decode(file_id);
    return have_permission(user_id, study_id)
        .then(function(user_data){
            studies_comp.study_info(study_id)
                .then(function(study_data){
                    var new_file_path = path.join(config.user_folder,user_data.user_name,study_data.folder_name,new_path);
                    var exist_file_path = path.join(config.user_folder,user_data.user_name,study_data.folder_name,file_id);
                    fs.rename(exist_file_path, new_file_path, function (err) {
                        if (err){
                            res.statusCode = 500;
                            return res.send(JSON.stringify({message: 'ERROR: internal error'}));
                        }
                        return studies_comp.update_modify(study_id)
                            .then(function(){
                                var file_url = '../'+new_file_path;
                                experiments.update_file_id(user_id, study_id, file_id, new_path, res);

                                return res.send(JSON.stringify({id: urlencode.encode(new_path), url:file_url}));

                            });
                    });
                })
        })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};

function copy_file(user_id, study_id, file_id, new_study_id, res) {
    file_id = urlencode.decode(file_id);
    return have_permission(user_id, study_id)
        .then(function(user_data){
             studies_comp.study_info(study_id)
                .then(function(study_data){

                    return studies_comp.study_info(new_study_id)
                        .then(function(new_study_data){
                            console.log(new_study_data);
                            // console.log({user_id, study_id, file_id, new_study_id});
                            var new_file_path = path.join(config.user_folder,user_data.user_name,new_study_data.folder_name,file_id);
                            var exist_file_path = path.join(config.user_folder,user_data.user_name,study_data.folder_name,file_id);

                            fs.copySync(exist_file_path, new_file_path);
                                return studies_comp.update_modify(new_study_id)
                                    .then(function(){
                                        return res.send(JSON.stringify({}));
                                    });
                            });
                        });
        })
        .catch(function(err){
            res.statusCode = 403;
            res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
        });
};

function upload(user_id, study_id, req, res) {
    var form = new formidable.IncomingForm();
    form.maxFileSize = config.maxFileSize;

    form.parse(req, function (err, fields, files) {
        if (err)
            log.error(`20180607 | error with uploading: ${err}`);
        return have_permission(user_id, study_id)
            .then(function(user_data){
                studies_comp.study_info(study_id)

                    .then(function(study_data){


                        var filelist =  [];
                        var prefix = !req.params.folder_id ? '' : req.params.folder_id +'/';

                        Object.keys(files).forEach(function(key){

                            var oldpath = files[key].path;

                            var file_id = urlencode.decode(prefix+files[key].name);

                            var file_url = path.join('..',config.user_folder,user_data.user_name,study_data.folder_name,file_id);

                            var exp_data = study_data.experiments.filter(function (exp) {
                                return exp.file_id == file_id});
                            filelist.push({id: file_id,
                                exp_data:exp_data?exp_data[0]:[],
                                path:file_id,
                                url:file_url,
                                isDir:false
                            });
                            var study_path = path.join(config.user_folder,user_data.user_name,study_data.folder_name,prefix);
                            var file_path = study_path + files[key].name;
                            log.info(`201804201330 | upload_file. oldpath:${oldpath}, file_path:${file_path}`);
                            fs.copy(oldpath, file_path, function (err, files_arr) {
                                if (err){
                                    log.error(`201804201343 | failed to upload_file: ${err}`);

                                    console.log(err);
                                    res.statusCode = 500;
                                    return res.send(JSON.stringify({message: 'ERROR: internal error'}));
                                }
                                fs.remove(oldpath);
                            });
                        });
                        return studies_comp.update_modify(study_id)
                        .then(function(){
                            return res.send(JSON.stringify(filelist))
                        });
                    })

            })
            .catch(function(err){
                res.statusCode = 403;
                return res.send(JSON.stringify({message: 'ERROR: Permission denied!'}));
            });

    });
};

module.exports = {get_study_files, create_folder, update_file, get_file_content, delete_files, download_files, download_zip, rename_file, copy_file, upload};
