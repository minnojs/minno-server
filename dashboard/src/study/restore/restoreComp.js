export default args => m.component(restore_dialog, args);

import {restore2version} from '../studyModel';

let restore_dialog = {
    controller({study_id, versions, close}){
        const ctrl = {
            study_id,
            versions: m.prop([]),
            version_id: m.prop(''),
            error: m.prop('')
        };

        ctrl.versions(versions.sort((a, b) => b.version-a.version).slice(0, -1));
        ctrl.version_id(ctrl.versions().length<1 ? '' : ctrl.versions()[0].id);

        return {ctrl, close};
    },
    view: ({ctrl, close}) => m('div', [
        m('.card-block', [
            m('.col-sm-6', [
                m('.input-group', [m('strong', 'Version'),
                    ctrl.versions().length<1
                        ?
                        m('.alert.alert-info', 'There are no versions')
                        :
                        m('select.c-select.form-control',{onchange: e => ctrl.version_id(e.target.value)}, [
                            ctrl.versions().map(version=> m('option', {value:version.id}, `${version.version} (${version.state})`))
                        ])
                ])
            ])
        ]),
        ctrl.error() ? m('.alert.alert-warning', ctrl.error()): '',
        m('.text-xs-right.btn-toolbar',[
            m('a.btn.btn-secondary.btn-sm', {onclick:()=>{close(null);}}, 'Close'),
            m('a.btn.btn-primary.btn-sm', {onclick:()=>{do_restore(ctrl); }}, 'Restore')
        ])
    ])
};


function do_restore(ctrl){
    ctrl.error('');

    return restore2version(ctrl.study_id, ctrl.version_id())
        .then(response => {
            const version = response.version;
            if (version == null) return Promise.reject('There was a problem restore your study, please contact your administrator');
            ctrl.stat_data(response.stat_data);
        })
        .catch(err=>ctrl.error(err.message))
        .then(m.redraw);
}