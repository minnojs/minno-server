export default updatedRequestsComponent;
import formatDate from 'utils/formatDate_str';

let updatedRequestsComponent = {
    controller({ctrl}){


        return ctrl;
    },
    view(ctrl){
        return m('.container', [
            m('.row.p-t-1', [
                m('.col-sm-4', [
                    m('h3', 'Reviewed Requests')
                ])]),
            m('.card.studies-card', [
                m('.card-block', [
                    m('.row', {key: '@@notid@@'}, [
                        m('.col-sm-2', [
                            m('.form-control-static',[
                                m('strong', 'Creation date   ')
                        ])]),
                        m('.col-sm-3', [
                            m('.form-control-static',[
                                m('strong', 'Study name ')
                        ])]),
                        m('.col-sm-2', [
                            m('.form-control-static',[
                                m('strong', 'Status ')
                            ])
                        ]),

                        m('.col-sm-3', [
                            m('.form-control-static',[
                                m('strong', 'Reviewer Comments ')
                            ])
                        ]),
                        m('.col-sm-2', [
                            m('.form-control-static',[
                                m('strong', 'Action ')
                            ])
                        ])
                    ]),
                    ctrl.updated_requests().map(request =>
                        m('.row.study-row.space', [
                            m('.col-sm-2.space', [
                                formatDate(request.creation_date)
                            ]),
                            m('.col-sm-3.space', [
                                m('a', {href: '', onclick:function() {ctrl.do_read(request.study_id, request.deploy_id, request.creation_date);}}, m('.study-text', `${request.study_name} (v${request.version_id}) - ${request.file_name}`))
                            ]),
                            m('.col-sm-2.space', [
                                m('.study-text', [
                                    request.status !== 'accept' ? '' : m('strong.text-success', 'Accept'),
                                    request.status !== 'reject' ? '' : m('strong.text-danger', 'Reject')
                                ])
                            ]),
                            m('.col-sm-3.space', [
                                m('.study-text', request.reviewer_comments ? request.reviewer_comments : 'None')
                            ]),
                            m('.col-sm-2', [
                                m('.study-text', m('button.btn.btn-secondary', {onclick:function() {ctrl.do_ignore(request.study_id, request.deploy_id, request.creation_date);}},  m('i.fa.fa-envelope-open'), 'Delete message'))
                            ]),
                        ]))
                ])
            ])
        ]);
    }
};
