import messages from 'utils/messagesComponent';
import downloadUrl from 'utils/downloadUrl';
import moveFileComponent from './moveFileComponent';
import copyFileComponent from './copyFileComponent';
import {baseUrl} from 'modelUrls';

export const uploadFiles = (path,study) => (fd, files) => {
    // validation (make sure files do not already exist)
    const filePaths = files.map(file => path === '/' ? file : path + '/' + file);
    const exist = study.files().filter(file => filePaths.includes(file.path)).map(f => f.path);

    if (!exist.length) return upload({force:false});
    else return messages.confirm({
        header: 'Upload Files', 
        content: `The file${exist.length > 1 ? 's' : ''} "${exist.join(', ')}" already exists, do you want to overwrite ${exist.length > 1 ? 'them' : 'it'}?`,
        okText: 'Overwrite'
    })
        .then(response => response && upload({force:true}));

    function upload({force} = {force:false}) {
        return study.uploadFiles({path, fd, force})
            .catch(response => messages.alert({
                header: 'Upload File',
                content: m('p.alert.alert-danger', response.message)
            }))
            .then(m.redraw);
    }
};

export const moveFile = (file, study, notifications) => () => {
    const newPath = m.prop(file.basePath);
    messages.confirm({
        header: 'Move File',
        content: moveFileComponent({newPath, file, study})
    })
    .then(response => {
        const targetPath = newPath().replace(/\/$/, '') + '/' + file.name;

        if (response && newPath() !== file.basePath)
            return moveAction(targetPath, file, study)
                .then(()=>notifications.show_success(`'${file.name}' successfully moved to '${newPath()}'`))
                .catch(response => messages.alert({
                    header: 'Failed to move File',
                    content: m('p.alert.alert-danger', response.message)
                }));
    });
};

export let duplicateFile = (file, study) => () => {
    let newPath = m.prop(file.path);
    return messages.prompt({
        header: 'Duplicate File',
        postContent: m('p.text-muted', 'You can move a file to a specific folder be specifying the full path. For example "images/img.jpg"'),
        prop: newPath
    })
    .then(response => {
        if (response && newPath() !== file.name) return duplicateAction(study, file, newPath);
    });
};

export let copyFile = (file, study, notifications) => () => {
    let filePath = m.prop(file.basePath);
    let study_id = m.prop(study.id);
    let new_study_id = m.prop('');
    let new_study_name = m.prop('');

    messages.confirm({
        header: 'Copy File',
        content: copyFileComponent({new_study_id, new_study_name, study_id})
    })
        .then(response => {
            if (response && study_id() !== new_study_id) return copyAction(filePath() +'/'+ file.name, file, study_id, new_study_id);
        })
        .then(()=>notifications.show_success(`'${file.name}' successfully copied to '${new_study_name()}'`));
};

export let renameFile = (file, study, notifications) => () => {
    let newPath = m.prop(file.path);
    return messages.prompt({
        header: 'Rename File',
        postContent: m('p.text-muted', 'You can move a file to a specific folder be specifying the full path. For example "images/img.jpg"'),
        prop: newPath
    })
    .then(response => {
        if (response && newPath() !== file.name)
            return moveAction(newPath(), file, study)

                .then(()=>notifications.show_success(`'${file.name}' successfully renamed to '${newPath()}'`))
                .then(()=>file.id === m.route.param('fileId') ? m.route(`/editor/${study.id}/file/${encodeURIComponent(encodeURIComponent(newPath()))}`): '')
                .catch(response => messages.alert({
                    header: 'Failed to rename File',
                    content: m('p.alert.alert-danger', response.message)
                }));
    });

};


export let update_experiment = (file, study, notifications, update) => () => {
    let descriptive_id = m.prop(update ? file.exp_data.descriptive_id : file.name.split('.').slice(0, -1).join('.'));

    let error = m.prop('');

    const ask = () =>
        messages.prompt({
            header: 'New Name',
            content: m('div',[
                'Enter Descriptive Id',
                !error() ? '' : m('p.alert.alert-danger', error())
                ]),
                prop: descriptive_id

    }).then(response => response && update_exp(descriptive_id));

    let update_exp = (descriptive_id) => {
        if (!descriptive_id()) {
            error('Error: missing descriptive id');
            return ask();
        }
        if(update)
            return study.update_experiment(file, descriptive_id())
                .then(()=>notifications.show_success(`Experiment '${file.exp_data.descriptive_id}' renamed successfully to '${descriptive_id()}`))
                .then(()=>{file.exp_data.descriptive_id=descriptive_id(); m.redraw();})
                .catch(e => {
                    error(e.message);
                    return ask();
                });
        return study.make_experiment(file, descriptive_id())
            .then(()=>notifications.show_success(`Experiment '${descriptive_id()}' created successfully`))
            .then(()=>m.redraw())
            .catch(e => {
                error(e.message);
                ask();
            });

    };
    ask();
};

export let delete_experiment = (file, study, notifications) => () => {
    messages.confirm({
        header: 'Remove Experiment',
        content: 'Are you sure you want to remove this experiment? This is a permanent change.'
    })
        .then(response => {
            if (response)
                study.delete_experiment(file)
                    .then(() => notifications.show_success(`Experiment '${file.exp_data.descriptive_id}' removed successfully`))
                    .then(() => {
                        delete file.exp_data;
                        m.redraw();
                    })
        });

};

function moveAction(newPath, file, study){
    return study
        .move(newPath, file) // the actual movement
        .then(m.redraw);
}

function copyAction(path, file, study_id, new_study_id){
    let def = file
        .copy(path, study_id, new_study_id) // the actual movement
        .catch(response => messages.alert({
            header: 'Copy File',
            content: m('p.alert.alert-danger', response.message)
        }))
        .then(m.redraw); // redraw after server response

    return def;
}

let playground;
export const play = (file,study) => () => {
    const isSaved = study.files().every(file => !file.hasChanged());
    const isOpenServer = true;
    const open = isOpenServer ? openNew : openOld;
    if (isSaved) open();
    else messages.confirm({
        header: 'Play task',
        content: 'You have unsaved files, the player will use the saved version, are you sure you want to proceed?'
    }).then(response => response && open());

    function openNew(){
        if (playground && !playground.closed) playground.close();

        let url = !file.viewStudy ? `${baseUrl}/play/${study.id}/${file.id}` : `${baseUrl}/view_play/${study.code}/${file.id}`;
        if (study.version)
            url = `${baseUrl}/play/${study.id}/${study.version.version}/${file.id}`;
        playground = window.open(url, 'Playground');
        playground.onload = function(){
            playground.addEventListener('unload', function() {
                window.focus();
            });
            playground.focus();
        };
    }

    function openOld(){
        // this is important, if we don't close the original window we get problems with onload
        if (playground && !playground.closed) playground.close();

        playground = window.open('playground.html', 'Playground');
        playground.onload = function(){
            // first set the unload listener
            playground.addEventListener('unload', function() {
                // get focus back here
                window.focus();
            });

            // then activate the player (this ensures that when )
            playground.activate(file);
            playground.focus();
        };
    }
};

export let save = file => () => {
    file.save()
        .then(m.redraw)
        .catch(err => messages.alert({
            header: 'Error Saving:',
            content: m('p.alert.alert-danger', err.message)
        }));
};


// add trailing slash if needed, and then remove proceeding slash
// return prop
let pathProp = path => m.prop(path.replace(/\/?$/, '/').replace(/^\//, ''));

export let  createFile = (study, name, content) => {
    return study.createFile({name:name(), content:content()})
        .then(response => {
            m.route(`/editor/${study.id}/file/${encodeURIComponent(response.id)}`);
            return response;
        })
        .catch(err => messages.alert({
            header: 'Failed to create file:',
            content: m('p.alert.alert-danger', err.message)
        }));
};


export let  duplicateAction = (study, file, new_path) => {
    study.duplicateFile({study, id:file.id, new_path:new_path(), isDir:file.isDir})
        .then(() => {
            if (!file.isDir)
                m.route(`/editor/${study.id}/file/${encodeURIComponent(encodeURIComponent(new_path()))}`);
            else
                m.redraw();
        })
        .catch(err => messages.alert({
            header: 'Failed to create file:',
            content: m('p.alert.alert-danger', err.message)
        }));
};

export let createDir = (study, path='') => () => {
    let name = pathProp(path);

    messages.prompt({
        header: 'Create Directory',
        content: 'Please insert directory name',
        prop: name
    })
        .then(response => {
            if (response) return study.createFile({name:name(), isDir:true});
        })
        .then(m.redraw)
        .catch(err => messages.alert({
            header: 'Failed to create directory:',
            content: m('p.alert.alert-danger', err.message)
        }));
};

export let createCognitive = (study, path = '') => () => {
    let name = pathProp(path);

    let content = ()=>'';
    messages.prompt({
        header: 'Create cognitive task',
        content: 'Please insert task name:',
        prop: name
    }).then(response => {
        if (response){
            return createFile(study, m.prop(`${name()}.js`), content)
            .then(createFile(study, m.prop(`${name()}.prop`), content));
        }
    });
};


export let createEmpty = (study, path = '') => () => {
    let name = pathProp(path);
    let content = ()=>'';

    messages.prompt({
        header: 'Create file',
        content: 'Please insert the file name:',
        prop: name
    }).then(response => {
        if (response) return createFile(study, name,content);
    });
};


export let deleteFiles = study => () => {
    let chosenFiles = study.getChosenFiles();
    let isFocused = chosenFiles.some(file => file.id === m.route.param('fileId'));

    if (!chosenFiles.length) {
        messages.alert({
            header:'Remove Files',
            content: 'There are no files selected'
        });
        return;
    }

    messages.confirm({
        header: 'Remove Files',
        content: 'Are you sure you want to remove all checked files? This is a permanent change.'
    })
        .then(response => {
            if (response) doDelete();
        });

    function doDelete(){
        study.delFiles(chosenFiles)
            .then(redirect)
            .catch(err => messages.alert({
                header: 'Failed to delete files:',
                content: err.message
            }))
            .then(m.redraw);
    }

    function redirect(response){
        // redirect only if the file is chosen, otherwise we can stay right here...
        if (isFocused) m.route(`/editor/${study.id}`); 
        return response;
    }
};

export const downloadChosenFiles = (study) => () => {
    const chosenFiles = study.getChosenFiles().map(f=>f.path);

    if (!chosenFiles.length) {
        messages.alert({
            header:'Download Files',
            content: 'There are no files selected'
        });
        return;
    }


    study.downloadFiles(chosenFiles, study.version)
        .then(url => {
            const a = document.createElement('a');
            a.href=url;
            return downloadUrl(url, study.name);})
        .catch(err => messages.alert({
            header: 'Failed to download files:',
            content: err.message
        }));
};

export const downloadFile = (study, file) => () => {
    if (!file.isDir) return downloadUrl(file.url, file.name);

    study.downloadFiles([file.path])
        .then(url => downloadUrl(url, study.name))
        .catch(err => messages.alert({
            header: 'Failed to download files:',
            content: err.message
        }));
};

export let resetFile = file => () => file.content(file.sourceContent());