import {deleteFiles, downloadChosenFiles} from './fileActions';
import fileContext from './fileContext';
import {uploadFiles} from './fileActions';
import {uploadonchange} from 'utils/uploader';

export default sidebarButtons;

const sidebarButtons = ({study}, notifications) => {
    const readonly = study.isReadonly || study.is_published;
    return m('.sidebar-buttons.btn-toolbar', [


         m('.btn-group.btn-group-sm', [
            m('a.btn.btn-secondary.btn-sm', {class: study.code ? 'disabled' : '', onclick: ()=>m.route(`/properties/${study.id}`), title: `Study properties`}, [
                m('i.fa.fa-gear')
            ]),

            // dropdown({toggleSelector:'a.btn.btn-secondary.btn-sm.dropdown-menu-right', toggleContent: m('i.fa.fa-bars'), elements: [
            //     draw_menu(study, notifications)
            // ]})
        ]),
        m('.btn-group.btn-group-sm', [
            m('a.btn.btn-secondary.btn-sm', {class: readonly ? 'disabled' : '', onclick: readonly || fileContext(null, study, notifications), title: 'Create new files'}, [
                m('i.fa.fa-plus')
            ]),
            m('a.btn.btn-secondary.btn-sm', {class: readonly ? 'disabled' : '', onclick: readonly || deleteFiles(study), title: 'Delete selected files'}, [
                m('i.fa.fa-close')
            ]),
            m('a.btn.btn-secondary.btn-sm', {onclick: downloadChosenFiles(study), title: 'Download selected files'}, [
                m('i.fa.fa-download')
            ]),
            m('label.btn.btn-secondary.btn-sm', {class: readonly ? 'disabled' : '', title: 'Drag files over the file list in order to upload easily'}, [
                m('i.fa.fa-upload'),
                readonly ? '' : m('input[type="file"]', {style: 'display:none', multiple:'true', onchange: uploadonchange({onchange:uploadFiles('/', study)})})
            ])
        ])
    ]);
};
