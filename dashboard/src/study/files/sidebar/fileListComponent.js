import folderComponent from './folderComponent';
import classNames from 'utils/classNames';
import {uploadConfig} from 'utils/uploader';
import {uploadFiles} from './fileActions';
export default filesList;

let filesList = ({study}) => {
    let folderHash = parseFiles(study.files());
    let config = uploadConfig({onchange:uploadFiles('/', study)});
    let chooseState = getCurrentState(study); 

    return m('.sidebar-files', {config}, [
        m('h5', [
            m('small', [
                m('i.fa.fa-fw', {
                    onclick: choose(chooseState, study),
                    class: classNames({
                        'fa-check-square-o': chooseState === 1,
                        'fa-square-o': chooseState === 0,
                        'fa-minus-square-o': chooseState === -1
                    })
                })
            ]),
            m('a.no-decoration', {href:`/editor/${study.id}`, config:m.route}, study.name)
        ]),
        study.isUploading
            ? m('div', [
                m('.loader'),
                m('.text-sm-center', [
                    m('strong', 'UPLOADING...')
                ])
            ])
            : folderComponent({path:'/',folderHash, study})
    ]);
};

const parseFiles = files => files.reduce((hash, file)=>{
    const path = file.basePath;
    if (!hash[path]) hash[path] = [];
    hash[path].push(file);
    return hash;
}, {});

function choose(currentState, study){
    return () => study.files().forEach(file => study.vm(file.id).isChosen(currentState === 1 ? 0 : 1));
}

function getCurrentState(study){
    const vm = study.vm;
    const filesCount = study.files().length;
    const chosenCount = study.files().reduce((result, file) => vm(file.id).isChosen() ? result + 1 : result, 0);
    return !chosenCount ? 0 : filesCount === chosenCount ? 1 : -1;
}
