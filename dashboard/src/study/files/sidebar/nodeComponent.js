import folder from './folderComponent';
import classNames from 'utils/classNames';
import fileContext from './fileContext';
import {uploadConfig} from 'utils/uploader';
import {uploadFiles} from './fileActions';

export default node;

let node = (args) => m.component(nodeComponent, args);

let nodeComponent = {
    view: (ctrl, {file,folderHash, study, notifications}) => {
        const vm = study.vm(file.id); // vm is created by the studyModel
        const hasChildren = !!(file.isDir && file.files && file.files.length);

        return m('li.file-node',
            {

                key: file.id,
                class: classNames({
                    open : vm.isOpen()
                }),
                onclick: file.isDir ? toggleOpen(vm) : select(file, study),
                oncontextmenu: fileContext(file, study, notifications),
                config: file.isDir ? uploadConfig({onchange:uploadFiles(file.path, study)}) : null
            },
            [
                m('a.wholerow', {
                    unselectable:'on',
                    class:classNames({
                        'current': m.route.param('fileId') === file.id
                    })
                }, m.trust('&nbsp;')),
                m('i.fa.fa-fw', {
                    class: classNames({
                        'fa-caret-right' : hasChildren && !vm.isOpen(),
                        'fa-caret-down': hasChildren && vm.isOpen()
                    })
                }),

                m('a', {class:classNames({'text-primary': file.exp_data && !file.exp_data.inactive})}, [
                    // checkbox
                    m('i.fa.fa-fw', {
                        onclick: choose({file,study}),
                        class: classNames({
                            'fa-check-square-o': vm.isChosen() === 1,
                            'fa-square-o': vm.isChosen() === 0,
                            'fa-minus-square-o': vm.isChosen() === -1
                        })
                    }),

                    // icon
                    m('i.fa.fa-fw.fa-file-o', {
                        class: classNames({
                            'fa-file-code-o': /(js)$/.test(file.type) && !file.isDir,
                            'fa-file-text-o': /(jst|html|xml)$/.test(file.type) && !file.isDir,
                            'fa-file-image-o': /(jpg|png|bmp)$/.test(file.type) && !file.isDir,
                            'fa-file-pdf-o': /(pdf)$/.test(file.type) && !file.isDir,
                            'fa-folder-o': file.isDir
                        })
                    }),

                    // file name
                    m('span',{class:classNames({'font-weight-bold':file.hasChanged()})},` ${file.name}`),

                    // children
                    hasChildren && vm.isOpen() ? folder({path: file.path + '/', folderHash, study, notifications}) : ''
                ])
            ]
        );
    }
};

const toggleOpen = vm => e => {
    vm.isOpen(!vm.isOpen());
    e.preventDefault();
    e.stopPropagation();
};

// select specific file and display it
const select = (file, study) => e => {
    e.stopPropagation();
    e.preventDefault();
    if (study.version)
        if (file.viewStudy)
            m.route(`/view/${m.route.param('code')}/version/${study.version_id}/file/${encodeURIComponent(file.id)}`);
        else
            m.route(`/editor/${file.studyId}/${study.version.id}/file/${encodeURIComponent(file.id)}`);
    else {
        if (file.viewStudy)
            m.route(`/view/${m.route.param('code')}/file/${encodeURIComponent(file.id)}`);
        else
            m.route(`/editor/${file.studyId}/file/${encodeURIComponent(file.id)}`);
    }
    m.redraw.strategy('diff'); // make sure that the route change is diffed as opposed to redraws
};

// checkmark a file/folder
const choose = ({file, study}) => e => {
    e.stopPropagation();
    e.preventDefault();

    const currentState = isChosen(file)();
    const newState = currentState === 1 ? 0 : 1;

    // mark decendents (and the file itself
    study
        .getChildren(file)
        .forEach(f => isChosen(f)(newState)); // update vm for each child

    study
        .getParents(file)
        .forEach(file => {
            const checked = study
                .getChildren(file)
                .filter(f => f !== file)
                .map(f => isChosen(f)())
                .reverse();

            const state = checked.every(v => v === 0)
                ? 0
                : checked.every(v => v === 1)
                    ? 1
                    : -1;

            isChosen(file)(state);
        });

    function isChosen(file){
        return study.vm(file.id).isChosen;
    }
};
