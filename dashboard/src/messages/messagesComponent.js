import {get_pending_studies, use_code} from './messagesModel';

import sharingRequestComponent from './sharingRequestsComponent';

export default messagesComponent;

let messagesComponent = {
    controller(){
        const ctrl = {
            has_messages: m.prop(false),
            pendings: m.prop(''),
            loaded: false,
            error: m.prop(''),
            do_use_code
        };
        get_pending_studies()
            .then((response) => {

                ctrl.pendings(response.studies);
                ctrl.has_messages(ctrl.pendings() && ctrl.pendings().length>0);
                ctrl.loaded = true;
            })
            .catch(response => {
                ctrl.error(response.message);
            })
            .then(m.redraw);
        function do_use_code(code){
            use_code(code)
                .then(()=>ctrl.pendings(ctrl.pendings().filter(study=>study.accept!==code && study.reject!==code)))
                .then(()=>ctrl.has_messages(ctrl.pendings() && ctrl.pendings().length>0))
                .then(m.redraw);
        }

        return ctrl;
    },
    view(ctrl){
        return !ctrl.loaded
            ?
            m('.loader')
            :
            !ctrl.has_messages()
                ?
                m('.container',
                    m('.row.p-t-1', [
                        m('.col-sm-4', [
                            m('h3', 'There are no messages...')
                        ])
                    ])
                )
                :
                m('.container', [
                    m.component(sharingRequestComponent, {ctrl})
                ]);
    }
};
