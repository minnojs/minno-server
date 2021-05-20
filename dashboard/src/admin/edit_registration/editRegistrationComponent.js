import {load_studies} from '../../study/studyModel';
import {testUrl} from 'modelUrls';
import {createNotifications} from 'utils/notifyComponent';

export default editRegistration;

import {update_registration, get_registration} from './editRegistrationModel';


let editRegistration = {
    controller(){
        let ctrl = {
            studies: m.prop(),
            notifications: createNotifications(),

            study: m.prop(''),
            study_id: m.prop(''),
            version:m.prop(),
            version_id: m.prop(''),
            experiment:m.prop(),
            experiment_id: m.prop(''),

            loaded: m.prop(false),
            error: m.prop('')
        };


        function load() {
            return load_studies()
                .then(response =>
                {
                    ctrl.studies(response.studies);
                    ctrl.studies(ctrl.studies().filter(study=>study.has_data_permission));
                })
                .then(()=>
                    get_registration()
                    .then((registration)=>
                    {
                        if(registration)
                        {
                            select_study(ctrl, registration.study_id);
                            select_version(ctrl, registration.version_id);
                            select_experiment(ctrl, registration.experiment_id);
                        }
                    })
                )
            .then(()=>ctrl.loaded(true))
            .then(m.redraw);
        }
        load();
        return {ctrl, submit};

        function submit(){
            return !ctrl.experiment_id() ? false :
                update_registration(ctrl.study_id, ctrl.version_id, ctrl.experiment_id)
                    .then(()=>ctrl.notifications.show_success('Registration successfully updated!'))
                    .catch(response => {
                        ctrl.error(response.message);
                    })

        .then(m.redraw);
        }
    },
    view({ctrl, submit}){
        if (ctrl.sent) return m('.deploy.centrify',[
            m('i.fa.fa-thumbs-up.fa-5x.m-b-1'),
            m('h5', ['The Deploy form was sent successfully ', m('a', {href:'/properties/'+ctrl.study.id, config: m.route}, 'Back to study')]),
        ]);
        return !ctrl.loaded()
            ?
            m('.loader')
            :
            m('.deploy.container', [
                m('h2', 'Registration page'),
                m('p', 'Here you are able to edit the experiment that will be used as the registration questioner'),
                m('.row',[
                    m('.col-sm-2',  m('strong', 'Study name')),
                    m('.col-sm-2', [
                        m('select.c-select.form-control',{onchange: e => select_study(ctrl, e.target.value)}, [
                            m('option', {disabled:true, selected:!ctrl.study()}, 'Select Study'),
                            ctrl.studies().map(study=> m('option', {value:study.id, selected:study.id===ctrl.study_id()} , `${study.name} ${study.permission!=='deleted' ? '' : '(deleted study)' }`))
                        ])
                    ])
                ]),
                !ctrl.study() ? '' :
                    ctrl.study().versions.length===0 ?
                        'There are no published versions'
                        :
                        m('.row',[
                            m('.col-sm-2',  m('strong', 'Version')),
                            m('.col-sm-2', [
                                m('select.c-select.form-control',{onchange: e => select_version(ctrl, e.target.value)}, [
                                    ctrl.study().versions.length===1 ?
                                        [
                                            select_version(ctrl, ctrl.study().versions[0].hash),
                                            m('option', {value:ctrl.study().versions[0].hash} , `V${ctrl.study().versions[0].id}`)
                                        ]
                                        :
                                        [
                                            m('option', {disabled:true, selected:ctrl.version_id() === ''}, 'Select Versions'),
                                            ctrl.study().versions.map(version=> m('option', {value:version.hash, selected:version.hash===ctrl.version_id()} , `V${version.id}`))
                                        ]
                                ])
                            ])
                        ]),
                !ctrl.version_id() ? '' :
                    ctrl.version().experiments.length===0 ?
                        'This version has no experiments yet'
                        :
                        m('.row',[
                            m('.col-sm-2',  m('strong', 'Experiment')),
                            m('.col-sm-2', [
                                m('select.c-select.form-control',{onchange: e => select_experiment(ctrl, e.target.value)}, [
                                    ctrl.version().experiments.length===1 ?
                                        [
                                            select_experiment(ctrl, ctrl.version().experiments[0].id),
                                            m('option', {value:ctrl.version().experiments[0].id} , ctrl.version().experiments[0].descriptive_id)
                                        ]
                                        :
                                        [
                                            m('option', {disabled:true, selected:ctrl.experiment_id() === ''}, 'Select Experiment'),
                                            ctrl.version().experiments.map(exp=> m('option', {value:exp.id, selected:exp.id===ctrl.experiment_id()} , exp.descriptive_id))
                                        ]
                                ])
                            ])
                        ]),
                !ctrl.experiment_id() ? '' : m('p', m('a.fab-button', {title:'Test the study', target:'_blank',  href:`${testUrl}/${ctrl.experiment_id()}/${ctrl.version_id()}`}, 'Test it')),

                !ctrl.error() ? '' : m('.alert.alert-danger', m('strong', 'Error: '), ctrl.error()),
                m('.row.space',[
                    m('.col-sm-12.text-sm-right',[
                        m('button.btn.btn-secondary', {onclick:()=>m.route( './')}, 'Cancel'),
                        m('button.btn.btn-primary', {disabled: !ctrl.experiment_id(), onclick: submit}, 'Save'),
                        ctrl.experiment_id() ? '' : m('p.small.text-danger.font-weight-bold', 'All parameters have to be chosen')
                    ])
                ]),
                m('div', ctrl.notifications.view())

            ]);
    }
};


function select_study(ctrl, study_id){

    ctrl.study_id(parseInt(study_id));
    ctrl.study(ctrl.studies().find(study=>study.id===ctrl.study_id()));
    ctrl.study().versions = ctrl.study().versions.filter(version=>version.state==='Published');
    ctrl.version_id('');
    ctrl.experiment_id('');
}

function select_version(ctrl, version_id){
    ctrl.version_id(version_id);
    ctrl.version(ctrl.study().versions.find(version=>version.hash===version_id));
    ctrl.experiment_id('');

}
function select_experiment(ctrl, experiment_id){
    ctrl.experiment_id(experiment_id);
    ctrl.experiment(ctrl.version().experiments.find(exp=>exp.id===experiment_id));
}