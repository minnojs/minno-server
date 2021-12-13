import tabsComponent from '../resources/tabsComponent.js';
import defaultSettings from './epDefaultSettings.js';
import tabs from './epTabs.js';
import {clone} from '../resources/utilities.js';
import {save, saveToJS} from '../../../../generator/implicitMeasuresGeneratorModel';
import {createNotifications} from '../../../../../utils/notifyComponent.js';
import {toString, validityCheck} from './epOutputComponent.js';
import messages from '../../../../../utils/messagesComponent';

export default ep;

const ep = (args, external) => m.component(biatComponent, args, external);

let biatComponent = {
    controller: controller,
    view: view
};

function controller({file, study}, external = false){
    let ctrl = {
        study: study ? study : null,
        file : file ? file : null,
        err : m.prop([]),
        loaded : m.prop(false),
        notifications : createNotifications(),
        settings : clone(defaultSettings(external)),
        defaultSettings : clone(defaultSettings(external)),
        external: external,
        is_locked:m.prop(study ? study.is_locked : null),
        show_do_save,
        is_settings_changed
    }

    ctrl.settings.external = ctrl.external

    function load() {
        return ctrl.file.get()
            .catch(ctrl.err)
            .then(() => {
                if (ctrl.file.content() !== '') {
                    ctrl.settings = JSON.parse(ctrl.file.content());
                    ctrl.prev_settings = clone(ctrl.settings);
                }
                ctrl.loaded(true);
            })
            .then(m.redraw);
    }

    function show_do_save(){
        let error_msg = []
        error_msg = validityCheck(error_msg, ctrl.settings)
        if(error_msg.length !== 0) {
            return messages.confirm({
                header: 'Some problems were found in your script, it\'s recommended to fix them before saving:',
                content:
                    m('div',[
                        m('.alert alert-danger', [
                            m('ul', [
                                error_msg.map(function (err) {
                                    return m('li', err);
                                })
                            ])
                        ]),
                        m('strong','Do you want to save anyway?')
                    ])
            })
                .then(response => {
                    if (response) do_save();
                }).catch(error => messages.alert({
                    content: m('p.alert.alert-danger', error.message)
                }))
                .then(m.redraw());
        }
        else do_save();

    }
    function do_save(){
        ctrl.err([]);
        let studyId  =  m.route.param('studyId');
        let fileId = m.route.param('fileId');
        let jsFileId =  fileId.split('.')[0]+'.js';
        save('biat', studyId, fileId, ctrl.settings)
            .then (() => saveToJS('biat', studyId, jsFileId, toString(ctrl.settings, ctrl.external)))
            .then(ctrl.study.get())
            .then(() => ctrl.notifications.show_success(`EP Script successfully saved`))
            .then(m.redraw)
            .catch(err => ctrl.notifications.show_danger('Error Saving:', err.message));
        ctrl.prev_settings = clone(ctrl.settings)
        m.redraw();
    }

    function is_settings_changed(){
        return JSON.stringify(ctrl.prev_settings) !== JSON.stringify(ctrl.settings);
    }

    external ? null : load();
    return ctrl;
}
function view(ctrl){
    if(!ctrl.external) {
        return !ctrl.loaded()
            ?
            m('.loader')
            :
            m('.container.space',[
                m('div', ctrl.notifications.view()),
                m('div.space',[
                    ctrl.is_locked() ? '' :
                        m('button.btn btn btn-primary', {
                            title: 'Update the script file (the .js file).\nThis will override the current script file.',
                            onclick: () => ctrl.show_do_save(),
                            disabled: !ctrl.is_settings_changed(),
                            style: {float: 'right', 'margin-top': '7px', 'margin-left': '15px'}
                        }, 'Save'),
                ]),
                m.component(tabsComponent, tabs, ctrl.settings, ctrl.defaultSettings, ctrl.external)
            ])
    }
    return m('.container',
        m('div', ctrl.notifications.view()),
        m('h1.display-4', ' Create my Evaluative Priming script'),
        m.component(tabsComponent, tabs, ctrl.settings, ctrl.defaultSettings, ctrl.external)
    );
}
