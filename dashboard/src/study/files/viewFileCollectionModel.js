import {fetchFullJson, fetchJson} from 'utils/modelHelpers';
import fileFactory from './fileModel';
import {baseUrl} from 'modelUrls';


function flattenFiles(files){
    if (!files) return [];
    return files
        .map(spreadFile)
        .reduce((result, fileArr) => result.concat(fileArr),[]);
}

function assignStudyId(id){
    return f => Object.assign(f, {studyId: id});
}
function assignVersionId(version_id){
    return f => Object.assign(f, {version_id: version_id});
}

function assignViewStudy(){
    return f => Object.assign(f, {viewStudy: true});
}

// create an array including file and all its children
function spreadFile(file){
    return [file].concat(flattenFiles(file.files));
}

let studyPrototype = {
    apiURL(path = ''){
        return `${baseUrl}/view_files/${encodeURIComponent(this.code)}${path}`;
    },

    apiVersionURL(version){
        return `${baseUrl}/view_files/${encodeURIComponent(this.code)}/version/${encodeURIComponent(version)}`;
    },

    get4version(version){
        return fetchJson(this.apiVersionURL(version))
            .then(study => {
                this.version = study.versions.filter(version_obj=>version_obj.id === parseInt(version))[0];
                let files = flattenFiles(study.files)
                    .map(assignStudyId(this.id))
                    .map(assignViewStudy())
                    .map(assignVersionId(version))
                    .map(fileFactory);
                this.loaded = true;
                this.isReadonly = true;
                this.istemplate = study.is_template;
                this.is_locked = true;
                this.is_published = study.is_published;
                this.is_public = study.is_public;
                this.has_data_permission = false;
                this.description = study.description;
                this.version_id = version;
                this.name = study.study_name;
                this.type = study.type || 'minno02';
                this.base_url = study.base_url;
                this.versions = study.versions ? study.versions : [];

                this.files(files);
                this.sort();
            })
            .catch(reason => {
                this.error = true;
                return Promise.reject(reason); // do not swallow error
            });
    },

    get(){
        return fetchJson(this.apiURL())
            .then(study => {
                // const files = this.parseFiles(study.files);
                let files = flattenFiles(study.files)
                    .map(assignStudyId(this.id))
                    .map(assignViewStudy())
                    .map(fileFactory);
                this.loaded = true;
                this.isReadonly = study.is_readonly;
                this.istemplate = study.is_template;
                this.is_locked = study.is_locked || study.is_published;
                this.is_published = study.is_published;
                this.is_public = study.is_public;
                this.has_data_permission = study.has_data_permission;
                this.description = study.description;

                this.name = study.study_name;
                this.type = study.type || 'minno03';
                this.base_url = study.base_url;
                this.versions = study.versions ? study.versions : [];
                this.files(files);
                this.sort();

            })
            .catch(reason => {
                this.error = true;
                throw(reason);
                // if(reason.status==404)
                //
                // console.log(reason.status);
                //
                // return Promise.reject(reason); // do not swallow error
            });

    },

    getFile(id){
        return this.files().find(f => f.id === id);
    },

    // makes sure not to return both a folder and its contents.
    // This is important mainly for server side clarity (don't delete or download both a folder and its content)
    // We go recurse through all the files, starting with those sitting in root (we don't have a root node, so we need to get them manually).
    getChosenFiles(){
        let vm = this.vm;
        let rootFiles = this.files().filter(f => f.basePath === '/');
        return getChosen(rootFiles);

        function getChosen(files){
            return files.reduce((response, file) => {
                // a chosen file/dir does not need sub files to be checked
                if (vm(file.id).isChosen() === 1) response.push(file);
                // if not chosen, we need to look deeper
                else response = response.concat(getChosen(file.files || []));
                return response;
            }, []);
        }
    },

    addFile(file){
        this.files().push(file);
        // update the parent folder
        let parent = this.getParents(file).reduce((result, f) => result && (result.path.length > f.path.length) ? result : f , null); 
        if (parent) {
            parent.files || (parent.files = []);
            parent.files.push(file);
        }
    },
    parseFiles(files){
        const study = this;

        return ensureArray(files)
            .map(fileFactory)
            .map(spreadFile)
            .reduce(flattenDeep, [])
            .map(assignStudyId);

        function ensureArray(arr){ return arr || []; }
        function assignStudyId(file){ return Object.assign(file, {studyId: study.id}); }
        function flattenDeep(acc, val) { return Array.isArray(val) ? acc.concat(val.reduce(flattenDeep,[])) : acc.concat(val); }

        // create an array including file and all its children
        function spreadFile(file){
            const children = ensureArray(file.files).map(spreadFile);
            return [file].concat(children);
        }
    },
    createFile({name, content='',isDir}){
        // validation (make sure there are no invalid characters)
        // eslint-disable-next-line no-useless-escape
        if(/[^\/-_.A-Za-z0-9]/.test(name)) return Promise.reject({message: `The file name "${name}" is not valid`});

        // validation (make sure file does not already exist)
        let exists = this.files().some(file => file.path === name);
        if (exists) return Promise.reject({message: `The file "${name}" already exists`});

        // validateion (make sure direcotry exists)
        let basePath = (name.substring(0, name.lastIndexOf('/'))).replace(/^\//, '');
        let dirExists = basePath === '' || this.files().some(file => file.isDir && file.path === basePath);
        if (!dirExists) return Promise.reject({message: `The directory "${basePath}" does not exist`});
        return fetchJson(this.apiURL('/file'), {method:'post', body: {name, content, isDir}})
            .then(response => {
                Object.assign(response, {studyId: this.id, content, path:name, isDir});
                let file = fileFactory(response);
                file.loaded = true;
                this.addFile(file);
                return response;
            })
            .then(this.sort.bind(this));
    },
    sort(response){
        let files = this.files().sort(sort);
        this.files(files);
        return response;

        function sort(a,b){
            // sort by isDir then name
            let nameA= +!a.isDir + a.name.toLowerCase(), nameB=+!b.isDir + b.name.toLowerCase();
            if (nameA < nameB) return -1;//sort string ascending
            if (nameA > nameB) return 1;
            return 0; //default return value (no sorting)
        }
    },


    /*
     * @param files [Array] a list of file.path to download
     * @returns url [String] the download url
     */
    downloadFiles(files){
        return fetchJson(this.apiURL(), {method: 'post', body: {files}})
            .then(response => `${baseUrl}/download?path=${response.zip_file}&study=_PATH`);
    },


    getParents(file){
        return this.files().filter(f => f.isDir && file.basePath.indexOf(f.path) === 0);
    },

    // returns array of children for this file, including itself
    getChildren(file){
        return children(file);
       
        function children(file){
            if (!file.files) return [file];
            return file.files
                .map(children) // harvest children
                .reduce((result, files) => result.concat(files), [file]); // flatten
        }
    }
};

let studyFactory =  code =>{
    let study = Object.create(studyPrototype);
    Object.assign(study, {
        code    : code,
        id      : study.id,
        view    : true,
        files   : m.prop([]),
        loaded  : false,
        error   :false,
        vm      : viewModelMap({
            isOpen: m.prop(false),
            isChanged: m.prop(false),
            isChosen: m.prop(0)
        })
    });

    return study;
};

// http://lhorie.github.io/mithril-blog/mapping-view-models.html
let viewModelMap = function(signature) {
    let map = {};
    return function(key) {
        if (!map[key]) {
            map[key] = {};
            for (let prop in signature) map[key][prop] = m.prop(signature[prop]());
        }
        return map[key];
    };
};


export default studyFactory;
