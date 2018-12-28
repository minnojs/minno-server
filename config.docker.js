module.exports = {
    /**
     * Absolute path to dashboard repository.
     * Install using 
     * git clone -b node https://github.com/ProjectImplicit/researchDashboard.git
     **/
    //static_path: '/usr/src/minnoserver/researchDashboard/',
    static_path: '/usr/src/minnoserver/researchDashboard/',

    email_auth: {
        user: '',
        pass: ''
    },
    port: 8000,

    /**
     * Absolute path to the server files ???
     **/
    base_folder: '/usr/src/minnoserver',
    mongo_url: 'mongodb://database:27017/minnodb',
    server_url: 'http://localhost:8000',
    maxFileSize: 20*1024*1024,

    /**
     * The password that admin gets initially
     **/
    admin_default_pass: 'admin123',

    /*
     * For creating temporary files
     **/
    dataFolder:'data/tmp/',

    /**
     * Folder for server logs, relative to the server files
     **/
    logs_folder: 'data/logs',

    /**
     * The folder for all user data ???
     **/
    user_folder: './data/users',

    relative_path: '/',
    
    /**
     * Url of minnojs dist folder
     * For example:
     * // //cdn.jsdelivr.net/gh/minnojs/minno-quest@0.2/dist/
     **/
    minnojsUrl: '//cdn.jsdelivr.net/gh/minnojs/minno-quest@0.2/dist/',
    
    /**
     * secrets for hashing
     **/
    hash_salt: '',
    session_secret: 'shshshshshshshsh',

    /**
     * The user code for errorception
     * https://errorception.com/
     * You can extract your code from the settings within your profile
     * If it is not set, errorception will simply not be activated
     **/
    errorception: '',

    dropbox: {
        client_id: '',
        client_secret: ''
    }
};
