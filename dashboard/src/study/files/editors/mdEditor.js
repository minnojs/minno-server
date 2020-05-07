export default mdEditor;
import marked from 'marked';

const mdEditor = args => m.component(textEditorComponent, args);

const textEditorComponent = {
    controller: function({file}){
        const err = m.prop();
        file.loaded || file.get()
            .catch(err)
            .then(m.redraw);

        const ctrl = {mode:m.prop('edit'), err};

        return ctrl;
    },

    view: function(ctrl, {file, study}){
        const {observer, err, mode} = ctrl;

        if (!file.loaded) return m('.loader');

        if (file.error) return m('div', {class:'alert alert-danger'}, [
            m('strong',{class:'glyphicon glyphicon-exclamation-sign'}),
            `The file "${file.path}" was not found (${err() ? err().message : 'please try to refresh the page'}).`
        ]);

        return m('div.blockquote.md', [
            m.trust(marked(file.content()))
        ]);
    }
};