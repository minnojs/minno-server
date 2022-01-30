module.exports = {
    static_path: 'static',
    admin_default_pass: 'admin123',
    debug_mode: false,

    port: 3000,
    
    session_secret: 'mooooo',
    hash_salt: 'meeeee',

    server_type:'http', //'http', 'https', or 'greenlock'


    mongo_url: 'mongodb://localhost:27017/minno',

    server_url:'http://localhost:3000/relative_path',

    base_folder: '/base_folder_here',
    relative_path: '/relative_path_here/',

    zip_folder:'/tmp/',
    dataFolder:'/data_files/',
    user_folder:'users/',

    maxFileSize: 100*1024*1024,
    logs_folder: 'logs',
    minnojsDevUrl: '//cdn.jsdelivr.net/gh/minnojs/minno-quest@0.3/dist/',
    minnojsUrl: '//cdn.jsdelivr.net/gh/minnojs/minno-quest@0.3/dist/'
};
