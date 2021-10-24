const config = require('../config');
const fs           = require('fs-extra');
const path         = require('path');
const dropbox      = require('./dropbox');

const {get_file_content}   = require('./files');
const studies_comp = require('./studies');
const {has_write_permission} = studies_comp;

function get_properties(user_id, study_id, file_id) {
    return get_file_content(user_id, study_id, file_id);
}
function save_file(user_id, study_id, file_id, settings) {
    return has_write_permission(user_id, study_id)
        .then(function({study_data}){
            const output = updateSettings(settings);
            //const path2write = path.join(config.user_folder, study_data.folder_name, 'v'+version_id, file_id);
            const latest_version = study_data.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current);
            if (latest_version.state === 'Published')
                return Promise.reject({status:500, message: 'Published version cannot be edited'})
            const version_id = latest_version.id;
            fs.writeFile(path.join(config.user_folder, study_data.folder_name,'v'+version_id, file_id), JSON.stringify(output), 'utf8');
            const output_file = `${path.parse(file_id).name}.js`;
            const js_file = settings.output;
            return fs.writeFile(path.join(config.user_folder, study_data.folder_name, 'v'+version_id, output_file), js_file, 'utf8')
                .then(function(){
                    const file_url = path.join('..',config.user_folder,study_data.folder_name, 'v'+version_id, output_file);
                    return studies_comp.update_modify(study_id)
                        .then(dropbox.upload_users_file(user_id, study_id, path.resolve(path.join(config.user_folder,study_data.folder_name, 'v'+version_id, output_file))))
                        .then(()=>({id: output_file, content: output, url: file_url}));
                });
        });

    function updateSettings(settings){
        let output={
            objectCat1: settings.objectCat1,
            objectCat2: settings.objectCat2,
            attribute1: settings.attribute1,
            attribute2: settings.attribute2,
        };
        Object.assign(output, settings.parameters);
        Object.assign(output, settings.blocks);
        Object.assign(output, settings.text);
        return output;
    }
}

module.exports = {get_properties, save_file};
