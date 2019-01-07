const env = process.env;
module.exports = {

    email_auth: {
        user: '',
        pass: ''
    },
    port: env.PORT,

    /**
     * Absolute path to the server files ???
     **/
    base_folder: env.MINNO_BASE_FOLDER,
    mongo_url: env.MINNO_MONGO_URL,
    server_url:env.MINNO_SERVER_URL,
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
    minnojsUrl: env.MINNO_PLAYER_URL,

    dashboardUrl: env.MINNO_DASHBOARD_URL,
    
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
