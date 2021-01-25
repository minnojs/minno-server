export default reviewedRequestsComponent;

let reviewedRequestsComponent = {
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
                        m('.col-sm-4', [
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
                        m('.col-sm-3', [
                            m('.form-control-static',[
                                m('strong', 'Action ')
                            ])
                        ])
                    ]),
                    ctrl.reviewed_requests().map(request =>
                        m('.row.study-row.space', [
                            m('.col-sm-4', [
                                m('.study-text', `${request.study_name} (v${request.version_id}) - ${request.file_name}`)
                            ]),
                            m('.col-sm-2', [
                                m('.study-text', [
                                    request.status !== 'accept' ? '' : m('strong.text-success', 'Accept'),
                                    request.status !== 'reject' ? '' : m('strong.text-danger', 'Reject')
                                ])
                            ]),
                            m('.col-sm-3', [
                                m('.study-text', request.reviewer_comments)
                            ]),
                            m('.col-sm-3', [
                                m('.study-text', m('button.btn.btn-primary', {onclick:function() {ctrl.do_read(request.study_id, request.deploy_id);}},  m('i.fa.fa-envelope-open'), 'Mark as read')),
                            ]),
                        ]))
                ])
            ])
        ]);
    }
};
