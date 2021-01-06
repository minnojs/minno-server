export default sharingRequestComponent;

let sharingRequestComponent = {
    controller({ctrl}){

        return ctrl;
    },
    view(ctrl){
        return m('.container', [
            m('.row.p-t-1', [
                m('.col-sm-4', [
                    m('h3', 'Sharing Invitations')
                ])]),
            m('.card.studies-card', [
                m('.card-block', [
                    m('.row', {key: '@@notid@@'}, [
                        m('.col-sm-3', [
                            m('.form-control-static',[
                                m('strong', 'Owner ')
                            ])
                        ]),
                        m('.col-sm-4', [
                            m('.form-control-static',[
                                m('strong', 'Study name ')
                            ])]),
                        m('.col-sm-2', [
                            m('.form-control-static',[
                                m('strong', 'Permission ')
                            ])
                        ]),
                        m('.col-sm-3', [
                            m('.form-control-static',[
                                m('strong', 'Action ')
                            ])
                        ])
                    ]),
                    ctrl.pendings().map(study =>
                        m('.row.study-row', [
                            m('.col-sm-3', [
                                m('.study-text', study.owner_name)
                            ]),
                            m('.col-sm-4', [
                                m('.study-text', study.study_name)
                            ]),
                            m('.col-sm-2', [
                                m('.study-text', study.permission)
                            ]),
                            m('.col-sm-3', [
                                m('.study-text', m('button.btn.btn-primary', {onclick:function() {ctrl.do_use_code(study.accept);}}, 'Accept'), ' | ',
                                    m('button.btn.btn-danger', {onclick:function() {ctrl.do_use_code(study.reject);}}, 'Reject'))
                            ]),
                        ]))
                ])
            ])
        ]);
    }
};
