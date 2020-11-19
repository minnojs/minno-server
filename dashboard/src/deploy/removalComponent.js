export default args => m.component(removalDialog, args);

import {formFactory, textInput, radioInput} from 'utils/formHelpers';
import {study_removal, get_study_prop} from 'deploy/deployModel';

const ASTERIX = m('span.text-danger', '*');
const ASTERISK = m('span.text-danger.font-weight-bold', '*');

let removalDialog = {
    controller({study, close}){
        let form = formFactory();
        let ctrl = {
            study,
            sent:false,
            researcher_name: m.prop(''),
            researcher_email: m.prop(''),
            global_study_name: m.prop(''),
            study_name: m.prop(''),
            study_names: m.prop(''),
            completed_n: m.prop(''),
            comments: m.prop(''),
            error: m.prop('')
        };

        function submit(){
            form.showValidation(true);
            if (!form.isValid())
            {
                ctrl.error('Missing parameters');
                return;
            }
            study_removal(studyId, ctrl)
                .then(() => {
                    ctrl.sent = true;
                })
                .catch(response => {
                    ctrl.error(response.message);
                })
                .then(m.redraw);
        }
        return {ctrl, form, submit};
    },
    view({form, ctrl, submit}){
        const exps = ctrl.study.files().filter(file=>file.exp_data);

        return ctrl.sent
            ?
            m('.deploy.centrify',[
                m('i.fa.fa-thumbs-up.fa-5x.m-b-1'),
                m('h5', ['The removal form was sent successfully ', m('a', {href:'/removalList', config: m.route}, 'View removal requests')])
            ])
            :
            m('.StudyRemoval.container', [

                m('.row',[
                    m('.col-sm-12', [
                        m('h3', [
                            'Study Removal Request ',
                            m('small', ctrl.study.name)
                        ]),
                    ])
                ]),

                m('.row.space',[
                    m('.col-sm-3',[
                        ASTERISK, ' Name of Experiment File'
                    ])
                ]),

                m('.row.space',[
                    m('.col-sm-3',[
                        m('select.c-select.form-control.space',{onchange: e => {}}, [
                            exps.length===1 ? exps[0].name :
                                m('option', {value:'', selected:ctrl.study_name()==='', disabled:true}, 'Select experiment file'),
                            exps.map(file=>
                                m('option', {value:file.name, selected:ctrl.study_name()===file.name}, file.name)
                            )
                        ])
                    ])
                ]),
                m('.row',[
                    m('.col-sm-12',[
                        m('small.text-muted', 'This is the name you submitted to the RDE (e.g., colinsmith.elmcogload)')
                    ])
                ]),

                m('.row.space',[
                    m('.col-sm-5',[
                        ASTERISK, ' Please enter your completed n below'
                    ])
                ]),

                m('.row',[
                    m('.col-sm-5',[
                        m('input.form-control', {value: ctrl.completed_n(), onchange:  m.withAttr('value', ctrl.completed_n), onkeyup: m.withAttr('value', ctrl.completed_n), placeholder:'Completed n'})
                    ])
                ]),
                m('.row',[
                    m('.col-sm-12',[
                        m('small.text-muted', m('span', ['you can use the following link: ', m('a', {href:'https://app-prod-03.implicit.harvard.edu/implicit/research/pitracker/PITracking.html#3'}, 'https://app-prod-03.implicit.harvard.edu/implicit/research/pitracker/PITracking.html#3')]))
                    ])
                ]),
                m('.row.space',[
                    m('.col-sm-12',[
                        'Additional comments'
                    ])
                ]),

                m('.row',[
                    m('.col-sm-12',[
                        m('textarea.form-control', {value: ctrl.comments(), onchange:  m.withAttr('value', ctrl.comments), onkeyup: m.withAttr('value', ctrl.comments), placeholder:'Additional comments'})
                    ])
                ]),
                m('.row',[
                    m('.col-sm-12',[
                        m('small.text-muted', '(e.g., anything unusual about the data collection, consistent participant comments, etc.)')
                    ])
                ]),

                !ctrl.error() ? '' : m('.alert.alert-warning', m('strong', 'Error: '), ctrl.error()),
                m('.row.space',[
                    m('.col-sm-12.text-sm-right',[
                        m('button.btn.btn-primary', {onclick: submit}, 'Submit')
                    ])
                ]),
            ]);
    }
};
