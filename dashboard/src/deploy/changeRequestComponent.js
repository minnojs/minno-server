import {formFactory, textInput, radioInput} from 'utils/formHelpers';
import {Study_change_request, get_study_prop} from 'deploy/deployModel';

const ASTERISK = m('span.text-danger.font-weight-bold', '*');
export default args => m.component(changeRequestDialog, args);

let changeRequestDialog = {
    controller({study, close}){
        let form = formFactory();
        let ctrl = {
            sent:false,
            study,
            user_name: m.prop(''),
            researcher_name: m.prop(''),
            researcher_email: m.prop(''),
            study_name: m.prop(''),
            target_sessions: m.prop(''),
            status: m.prop(''),
            file_names: m.prop(''),
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
            Study_change_request(study, ctrl)
                .then(() => {
                    ctrl.sent = true;
                })
                .catch(response => {
                    ctrl.error(response.message);
                }).then(m.redraw);
        }
        return {ctrl, form, submit};
    },
    view({form, ctrl, submit}){

        if (ctrl.sent) return m('.deploy.centrify',[
            m('i.fa.fa-thumbs-up.fa-5x.m-b-1'),
            m('h5', ['The change request form was sent successfully ', m('a', {href:'/changeRequestList', config: m.route}, 'View change request  requests')])
        ]);
        return m('.StudyChangeRequest.container', [
            m('.row',[
                m('.col-sm-12', [
                    m('h3', [
                        'Study Change Request ',
                        m('small', ctrl.study.name)
                    ]),
                ])
            ]),
            m('.row.space',[
                m('.col-sm-12',[
                    ASTERISK, ' Target number of additional sessions (In addition to the sessions completed so far)'
                ])
            ]),

            m('.row',[
                m('.col-sm-5',[
                    m('input.form-control', {value: ctrl.target_sessions(), onchange:  m.withAttr('value', ctrl.target_sessions), onkeyup: m.withAttr('value', ctrl.target_sessions), placeholder:'Target number of additional sessions'})
                ])
            ]),


            m('.row.space',[
                m('.col-sm-12',[
                    ASTERISK, ' What is the current status of your study? '
                ])
            ]),

            m('.row',[
                m('.col-sm-6',[
                    m('select.c-select.form-control.space',{onchange: m.withAttr('value', ctrl.status)}, [
                        m('option', {value:'', selected:ctrl.status()==='', disabled:true}, 'Select status'),
                        m('option', {value:'Currently collecting data and does not need to be unpaused', selected:ctrl.status()==='Currently collecting data and does not need to be unpaused'}, 'Currently collecting data and does not need to be unpaused'),
                        m('option', {value:'Manually paused and needs to be unpaused', selected:ctrl.status()==='Manually paused and needs to be unpaused'}, 'Manually paused and needs to be unpaused'),
                        m('option', {value:'Auto-paused due to low completion rates or meeting target N', selected:ctrl.status()==='Auto-paused due to low completion rates or meeting target N'}, 'Auto-paused due to low completion rates or meeting target N')
                    ])
                ])
            ]),

            m('.row.space',[
                m('.col-sm-12',[
                    ASTERISK, ' Change Request'
                ])
            ]),

            m('.row',[
                m('.col-sm-12',[
                    m('textarea.form-control', {value: ctrl.file_names(), onchange:  m.withAttr('value', ctrl.file_names), onkeyup: m.withAttr('value', ctrl.file_names), placeholder:'Change Request'})
                ])
            ]),
            m('.row',[
                m('.col-sm-12',[
                    m('small.text-muted', 'List all file names involved in the change request. Specify for each file whether file is being updated or added to production.)')
                ])
            ]),


            // textInput({isArea: true, label: m('span', ['Change Request', m('span.text-danger', ' *')]), help: 'List all file names involved in the change request. Specify for each file whether file is being updated or added to production.)',  placeholder: 'Change Request', prop: ctrl.file_names, form, required:true, isStack:true}),

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
            !ctrl.error() ? '' : m('.alert.alert-warning', m('strong', 'Error: '), ctrl.error()),
            m('.row.space',[
                m('.col-sm-12.text-sm-right',[
                    m('button.btn.btn-primary', {onclick: submit}, 'Submit')
                ])
            ])

        ]);
    }
};
