import fullHeight from 'utils/fullHeight';
import imgEditor from './editors/imgEditor';
import pdfEditor from './editors/pdfEditor';
import unknowEditor from './editors/unknownEditor';
import textEditor from './editors/textEditor';
import propEditor from './editors/propEditor';

export default fileEditorComponent;

let editors = {
    js: textEditor,
    jsp: textEditor,
    json: textEditor,
    html: textEditor,
    htm: textEditor,
    jst: textEditor,
    txt: textEditor,
    m: textEditor,
    c: textEditor,
    cs: textEditor,
    css: textEditor,
    sass: textEditor,
    scss: textEditor,
    h: textEditor,
    py: textEditor,
    xml: textEditor,
    md: textEditor,

    jpg: imgEditor,
    jpeg: imgEditor,
    bmp: imgEditor,
    png: imgEditor,
    gif: imgEditor,

    pdf: pdfEditor,

    prop: propEditor

};

let fileEditorComponent = {
    controller: function({study}) {
        return {study};
    },

    view: ({study}, args = {}) => {
        const id = m.route.param('fileId');
        const file = study.getFile(id);
        let editor = file && editors[file.type] || unknowEditor;
        return m('div', {config:fullHeight}, [
            file
                ? editor({file, study,  settings: args.settings, key:file.id})
                : m('.centrify', [
                    m('i.fa.fa-smile-o.fa-5x'),
                    m('h5', 'Please select a file to start working')
                ])
        ]);
    }
};
