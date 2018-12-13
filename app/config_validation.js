const config      = require('../config');
const fs          = require('fs-extra');
const path        = require('path');
const dataFolder = path.join(config.base_folder,config.dataFolder);


[
    {param: 'admin_default_pass', message:`The default password for te admin. For example 'admin123'`},
    {param: 'dataFolder', message: `The folder for saving temporary files. Relative to your "base_url". For example 'tmp'`},
    {param: 'server_url', message: `The path on your domain on which you load the server. For example: '/' It must begin with a '/'.`},
    {param: 'minnojsUrl', message: `The url for loading MinnoJS. For example: '//cdn.jsdelivr.net/gh/minnojs/minno-quest@0.2/dist/'`}
]
    .forEach(function({param, message}){
        if (param in config) return;
        console.log(`
            ====================================
            MinnoJS
            Config: missing parameter "${param}".
            ${message}
            ====================================
        `);
        throw new Error(`Config: missing parameter "${param}".`);
    });

if (config.relative_path[0] !== '/') throw new Error('Config: relative_path must begin with "/"');

if (!fs.existsSync(config.static_path)) throw new Error(`Config: static_path folder does not exist "${path.resolve(config.static_path)}"`);
[config.user_folder, dataFolder, config.logs_folder].forEach( path => fs.ensureDirSync(path) );
