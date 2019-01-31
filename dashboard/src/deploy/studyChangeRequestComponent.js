import {formFactory, textInput, radioInput} from 'utils/formHelpers';
import {Study_change_request, get_study_prop} from 'deploy/deployModel';

export default studyChangeRequestComponent;
const ASTERIX = m('span.text-danger', '*');

let studyChangeRequestComponent = {
    controller(){
        const studyId = m.route.param('studyId');
        let form = formFactory();
        let ctrl = {
            sent:false,
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
        get_study_prop(studyId)
            .then(response =>{
                ctrl.researcher_name(response.researcher_name);
                ctrl.researcher_email(response.researcher_email);
                ctrl.user_name(response.user_name);
                ctrl.study_name(response.study_name);
            })
            .catch(response => {
                ctrl.error(response.message);
            })
            .then(m.redraw);

        function submit(){
            form.showValidation(true);
            if (!form.isValid())
            {
                ctrl.error('Missing parameters');
                return;
            }
            Study_change_request(studyId, ctrl)
                .then(() => {
                    ctrl.sent = true;
                })
                .catch(response => {
                    ctrl.error(response.message);
                }).then(m.redraw);
        }
        return {ctrl, form, submit, studyId};
    },
    view({form, ctrl, submit}){
        let study_showfiles_link = document.location.origin + '/implicit/showfiles.jsp?user=' + ctrl.user_name() + '&study=' + ctrl.study_name();

        if (ctrl.sent) return m('.deploy.centrify',[
            m('i.fa.fa-thumbs-up.fa-5x.m-b-1'),
            m('h5', ['The change request form was sent successfully ', m('a', {href:'/changeRequestList', config: m.route}, 'View change request  requests')])
        ]);
            
        return m('.StudyChangeRequest.container', [
            m('h3', [
                'Study Change Request ',
                m('small', ctrl.study_name())
            ]),

            m('.row', [
                m('.col-sm-3', m('strong', 'Researcher Name: ')),
                m('.col-sm-9', ctrl.researcher_name())
            ]),
            m('.row', [
                m('.col-sm-3', m('strong', 'Researcher Email Address: ')),
                m('.col-sm-9', ctrl.researcher_email())
            ]),
            m('.row.m-b-1', [
                m('.col-sm-3', m('strong', 'Study showfiles link: ')),
                m('.col-sm-9', m('a', {href:study_showfiles_link, target: '_blank'}, study_showfiles_link))
            ]),


            textInput({label: m('span', ['Target number of additional sessions (In addition to the sessions completed so far)', m('span.text-danger', ' *')]),  placeholder: 'Target number of additional sessions', prop: ctrl.target_sessions, form, required:true, isStack:true}),

            radioInput({
                label: m('span', ['What\'s the current status of your study?', ASTERIX]),
                prop: ctrl.status,
                values: {
                    'Currently collecting data and does not need to be unpaused': 'Currently collecting data and does not need to be unpaused',
                    'Manually paused and needs to be unpaused' : 'Manually paused and needs to be unpaused',
                    'Auto-paused due to low completion rates or meeting target N.' : 'Auto-paused due to low completion rates or meeting target N.'
                },
                form, required:true, isStack:true
            }),
            textInput({isArea: true, label: m('span', ['Change Request', m('span.text-danger', ' *')]), help: 'List all file names involved in the change request. Specify for each file whether file is being updated or added to production.)',  placeholder: 'Change Request', prop: ctrl.file_names, form, required:true, isStack:true}),
            textInput({isArea: true, label: m('span', 'Additional comments'),  placeholder: 'Additional comments', prop: ctrl.comments, form, isStack:true}),
            !ctrl.error() ? '' : m('.alert.alert-warning', m('strong', 'Error: '), ctrl.error()),
            m('button.btn.btn-primary', {onclick: submit}, 'Submit')
        ]);
    }
};
