import {get_pending_studies, get_updated_requests, use_code, read_update} from './messagesModel';

import sharingRequestComponent from './sharingRequestsComponent';
import updatedRequestsComponent from './updatedRequestsComponent';

export default messagesComponent;

let messagesComponent = {
    controller(){
        const ctrl = {
            has_messages: m.prop(false),
            updated_requests: m.prop(''),
            pendings: m.prop(''),
            loaded: false,
            loaded2: false,
            error: m.prop(''),
            do_use_code,
            do_read,
            do_ignore
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
            .then(()=>get_updated_requests())
            .then((response) => {

                ctrl.updated_requests(response.updated_requests);
                ctrl.has_messages(ctrl.updated_requests() && ctrl.updated_requests().length>0);
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

        function do_read(study_id, deploy_id, creation_date){
            read_update(deploy_id, creation_date)
            .then(m.route(`/deploy/${study_id}/${deploy_id}`));
        }
        function do_ignore(study_id, deploy_id, creation_date){
            read_update(deploy_id, creation_date)
                .then(()=>ctrl.updated_requests(ctrl.updated_requests().filter(study=>study.deploy_id!==deploy_id)))
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
                    !ctrl.pendings() ? '' : m.component(sharingRequestComponent, {ctrl}),
                    m.component(updatedRequestsComponent, {ctrl}),

                ]);
    }
};
