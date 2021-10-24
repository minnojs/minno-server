import tabsComponent from '../resources/tabsComponent.js';
import defaultSettings from './biatDefaultSettings.js';
import tabs from './biatTabs.js';
import {clone} from '../resources/utilities.js';
import {save} from '../../../../generator/implicitMeasuresGeneratorModel';
import {createNotifications} from '../../../../../utils/notifyComponent.js';
import {updateSettings} from './biatImportComponent.js'
import {toString, validityCheck} from './biatOutputComponent.js';
import messages from "../../../../../utils/messagesComponent";

export default biat;

const biat = (args, external) => m.component(biatComponent, args, external);

let biatComponent = {
    controller: controller,
    view: view
};

function controller({file, study}, external = null){
    let ctrl = {
        study: study ? study : null,
        file : file ?file : null,
        err : m.prop([]),
        loaded : m.prop(false),
        notifications : createNotifications(),
        settings : clone(defaultSettings),
        external: external,
        is_locked:m.prop(study ? study.is_locked : null),
        first_save: m.prop(true),
        show_do_save,
        is_settings_changed
    }

    ctrl.settings.external = ctrl.external

    function load(ctrl) {
        return ctrl.file.get()
            .catch(ctrl.err)
            .then(() => {
                if (ctrl.file.content() !== '') {
                    let input = JSON.parse(ctrl.file.content());
                    ctrl.settings = updateSettings(ctrl.settings, input);
                    ctrl.prev_settings = clone(ctrl.settings);
                }
                ctrl.loaded(true);
            })
            .then(m.redraw);
    }

    function show_do_save(){
        let error_msg = []
        let blocksObject = tabs[6].rowsDesc //blockDesc inside output attribute
        error_msg = validityCheck(error_msg, ctrl.settings, blocksObject)
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
                    if (response) {
                        if(ctrl.first_save()) {
                            messages.alert({
                                header: 'Saving', content: m('p.alert.alert-info',
                                    'Saving in JS file, if you edit the JS file the changes will be lost')
                            });
                            ctrl.first_save(false);
                        }
                        do_save();
                    }
                }).catch(error => messages.alert({
                    content: m('p.alert.alert-danger', error.message)
                }))
                .then(m.redraw());
        }
        else {
            if(ctrl.first_save()) { //show the message only in the first saving
                messages.alert({
                    header: 'Saving', content: m('p.alert.alert-info',
                        'Saving in JS file, if you edit the JS file the changes will be lost')
                });
                ctrl.first_save(false);
            }
            do_save()
        }

    }
    function do_save(){
        ctrl.err([]);
        ctrl.settings.output = toString(ctrl.settings); // the server takes the data from here
        save('biat', m.route.param('studyId'), m.route.param('fileId'), ctrl.settings)
            .then(ctrl.study.get())
            .then(() => ctrl.notifications.show_success(`BIAT Script successfully saved`))
            .then(m.redraw)
            .catch(err => ctrl.notifications.show_danger('Error Saving:', err.message));
        delete ctrl.settings.output; //for updating the prev_settings without the output
        ctrl.prev_settings = clone(ctrl.settings)
        m.redraw();
    }

    function is_settings_changed(){
        return JSON.stringify(ctrl.prev_settings) !== JSON.stringify(ctrl.settings);
    }

    external ? null : load(ctrl);
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
                            onclick: () => ctrl.show_do_save(),
                            disabled: !ctrl.is_settings_changed(),
                            style: {float: 'right', 'margin-top': '7px', 'margin-left': '15px'}
                        }, 'Save'),
                ]),
                m.component(tabsComponent, tabs, ctrl.settings, defaultSettings, ctrl.external)
            ])
    }
    return m('.container',
        m('div', ctrl.notifications.view()),
        m('h1.display-4', 'Create my BIAT script'),
        m.component(tabsComponent, tabs, ctrl.settings, defaultSettings, ctrl.external)
    );
}
