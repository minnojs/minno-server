export default collaborationComponent;

import messages from 'utils/messagesComponent';
import studyFactory from '../files/fileCollectionModel';
import {delete_study, publish_study, update_study, rename_study, lock_study, duplicate_study, change_version_availability} from '../studyModel';
import formatDate from 'utils/formatDate_str';
import deployDialog from '../../deploy/deployComponent';
import sharing_dialog from '../sharing/sharingComponent';
import {createNotifications} from 'utils/notifyComponent';
import oldDeploysComponent from '../../deploy/oldDeploysComponent';
import data_dialog from '../../downloads/dataComp';
import stat_dialog from '../open_statistics/statComp';

const notifications= createNotifications();

let collaborationComponent = {
    controller(){
        let ctrl = {
            notifications,
            study_name:m.prop(),
            description:m.prop(),
            users:m.prop(),
            is_public:m.prop(),
            link:m.prop(''),
            user_name:m.prop(''),
            permission:m.prop('can edit'),
            data_permission:m.prop('visible'),
            loaded:m.prop(false),
            col_error:m.prop(''),
            pub_error:m.prop(''),
            share_error:m.prop(''),
            study,
            show_deploy,
            deploy2show:m.prop(''),
            present_deploys,
            save,
            lock,
            show_data,
            show_statistics,
            show_sharing,
            show_duplicate,
            show_publish,
            show_delete,
            show_change_availability
        };

        function show_change_availability(study, version_id, availability){
            study.versions.map(version=>version.availability = version.hash === version_id ? !version.availability : version.availability);
            m.redraw();
            change_version_availability(m.route.param('studyId'), version_id, availability);
        }
        function save(){
            if (ctrl.study.name!==ctrl.study_name())
                rename_study(m.route.param('studyId'), ctrl.study_name())
                    .then(ctrl.notifications.show_success('Details were successfully updated'));
            if (ctrl.study.description!==ctrl.description())
                update_study(m.route.param('studyId'), {description:ctrl.description()})
                    .then(ctrl.notifications.show_success('Details were successfully updated'));
        }

        function lock(){
            return lock_study(ctrl.study.id, !ctrl.study.is_locked)
                .then(() => ctrl.study.is_locked = !ctrl.study.is_locked)
                .then(m.redraw);
        }

        function show_delete(){
            return messages.confirm({header:'Delete study', content:'Are you sure?'})
                .then(response => {
                    if (response) delete_study(ctrl.study.id)
                        .then(()=>ctrl.study.deleted=true)
                        .catch(error => messages.alert({header: 'Delete study', content: m('p.alert.alert-danger', error.message)}))
                        .then(m.redraw)
                        .then(m.route('./'))
                    ;
                });
        }


        function show_sharing() {
            let study_id = ctrl.study.id;
            let close = messages.close;
            messages.custom({header: 'Statistics', wide: true, content: sharing_dialog({study_id, close})});
        }

        function show_data() {
            let study_id = ctrl.study.id;
            let versions = ctrl.study.versions;
            let exps  = m.prop([]);

            let close = messages.close;
            messages.custom({header:'Data download', content: data_dialog({exps, study_id, versions, close})})
                .then(m.redraw);
        }

        function show_statistics() {
            let study_id = ctrl.study.id;
            let versions = ctrl.study.versions;
            let close = messages.close;
            messages.custom({header:'Statistics', wide: true, content: stat_dialog({study_id, versions, close})})
                .then(m.redraw);
        }

        function show_publish(){
            let error = m.prop('');
            let update_url = m.prop('update');
            let version_name = m.prop('');
            let ask = () => messages.confirm({okText: ['Yes, ', ctrl.study.is_published ? 'Republish' : 'Publish' , ' the study'], cancelText: 'Cancel', header:[ctrl.study.is_published ? 'Republish' : 'Publish', ' the study?'],
                content:m('p',
                    [m('p', [
                        m('p', 'This will create a link that participants can use to launch the study.'),
                        m('p', 'Publishing locks the study for editing to prevent you from modifying the files while participants take the study. To make changes to the study, you will be able to unpublish it later.'),
                        m('p', 'Although it is strongly not recommended, you can also unlock the study after it is published by using Unlock Study in the Study menu.'),
                        m('p', 'After you publish the study, you can obtain the new launch URL by right clicking on the experiment file and choosing Experiment options->Copy Launch URL'),
                        m('.input-group.space', [
                            m('select.c-select.form-control.space',{onchange: e => update_url(e.target.value)}, [
                                m('option', {value:'update', selected:true}, 'Create a new launch URL'),
                                ctrl.study.versions.length<2 ? '' : m('option', {value:'keep'}, 'Use the launch URL from the previous version')
                            ])
                        ])
                    ]),
                    !error() ? '' : m('p.alert.alert-danger', error())])
            })

            .then(response => {
                return  response && publish();
            });

            let publish= () => publish_study(ctrl.study.id, version_name, update_url)
                .then(res=>ctrl.study.versions.push(res))
                .then(()=>ctrl.study.is_published = true)
                // .then(()=>ctrl.study.is_locked = ctrl.study.is_published || ctrl.study.is_locked)

                .catch(e => {
                    error(e.message);
                    ask();
                })
                .then(m.redraw);
            ask();
        }


        function show_deploy(){
            let study = ctrl.study;
            let close = messages.close;
            messages.custom({header:'Deploy', preventEnterSubmits: true, wide: true, content: deployDialog({study, close})})
                .then(m.redraw);
        }

        function present_deploys(deploy2show, version_id){
            let close = messages.close;
            return messages.custom({header:'Old deploys',
                preventEnterSubmits: true,
                wide: true,
                content: oldDeploysComponent({deploy2show, version_id, close})})
            .then(m.redraw);
        }

        function show_duplicate(){
            let study_name = m.prop(ctrl.study.name);
            let error = m.prop('');

            let ask = () => messages.confirm({
                header:'New Name',
                content: m('div', [
                    m('input.form-control', {placeholder: 'Enter Study Name', config: focus_it,value: study_name(), onchange: m.withAttr('value', study_name)}),
                    !error() ? '' : m('p.alert.alert-danger', error())
                ])
            }).then(response => response && duplicate());

            let duplicate= () => duplicate_study(ctrl.study.id, study_name)
                .then(response => m.route( `/editor/${response.study_id}`))
                .then(m.redraw)
                .catch(e => {
                    error(e.message);
                    ask();
                });
            ask();
        }

        let study;
        function load() {
            ctrl.study = studyFactory(m.route.param('studyId'));
            return ctrl.study.get()
                .then(()=>{
                    ctrl.study_name(ctrl.study.name);
                    ctrl.description(ctrl.study.description);
                    ctrl.loaded(true);
                })

                .then(m.redraw);

        }
        load();

        return ctrl;
    },
    view(ctrl){
        return  !ctrl.loaded()
            ?
            m('.loader')
            :
            m('.container.sharing-page', [
                m('div', ctrl.notifications.view()),

                m('.row',[
                    m('.col-sm-12', [
                        m('h3', [ctrl.study_name(), ': properties'])
                    ])
                ]),
                m('.row.space',
                    m('.col-sm-2.space',  m('strong', 'Study name:')),
                    m('.col-sm-10',
                        m('input.form-control', { value: ctrl.study_name(), oninput: m.withAttr('value', ctrl.study_name)}))
                ),
                m('.row.space',
                    m('.col-sm-2.space',  m('strong', 'Description:')),
                    m('.col-sm-10',
                        m('textarea.form-control.fixed_textarea', { rows:10, value: ctrl.description(), onchange: m.withAttr('value', ctrl.description)}))
                ),

                m('.row.space',
                    m('.col-sm-12.space',
                        m('.text-xs-right.btn-toolbar',
                            m('button.btn.btn-primary.btn-sm', {onclick:ctrl.save}, 'Save')
                        )
                    )
                ),
                m('.row.space',
                    m('.col-sm-12.space',  m('h4', 'Versions'))
                ),

                ctrl.study.versions .map((version, id)=>
                    m('.row', [
                        m('.col-sm-3.space',  [m('strong', ['v', version.id]), ` (${formatDate(version.creation_date)})`]),
                        m('.col-xs-1.space',  m('button.btn.btn-primary.btn-block.btn-sm', {onclick: function(){m.route(`/editor/${ctrl.study.id}/${ctrl.study.versions.length===id+1 ? '': version.id}`);}}, ctrl.study.versions.length===id+1 ? 'Edit' : 'Review')),
                        m('.col-xs-1.space',  m('button.btn.btn-primary.btn-block.btn-sm', {onclick: ()=>ctrl.show_change_availability(ctrl.study, version.hash, !version.availability)}, version.availability ? 'Active' : 'Inactive')),
                        m('.col-xs-2.space',
                            !version.deploys ? '' :
                                m('button.btn.btn-primary.btn-block.btn-sm', {onclick: ()=>ctrl.present_deploys(version.deploys, version.id)}, 'Deploy requests')
                        ),
                        m('.col-xs-3.space',
                            !version.deploy2show ? '' : version.deploy2show
                        )
                    ])
                ),

                m('.row.space',
                    m('.col-sm-2.space',  m('h4', 'Actions'))
                ),

                m('.row.frame.space',
                    m('.col-sm-12', [
                        m('.row.',
                            m('.col-sm-10.space',[
                                m('strong', 'Duplicate study'),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-2.space.text-sm-right',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_duplicate}, 'Duplicate')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10.space',[
                                m('strong', 'Share study'),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-2.space.text-sm-right',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_sharing}, 'Sharing')
                            )
                        ),
                        m('.row.space',
                            m('.col-sm-4.space',  m('h4', 'Project Implicit Actions'))
                        ),
                        m('.row',
                            m('.col-sm-12', [
                                m('.row',
                                    m('.col-sm-9.space',[
                                        m('strong', 'Request deploy'),
                                        m('.small', 'This will allows you to...')
                                    ]),
                                    m('.col-sm-3.space.text-sm-right',[
                                        m('button.btn.btn-primary.btn-sm', {onclick:()=>m.route( `/deploy/${ctrl.study.id}`)}, 'Deploy')])
                                )
                            ])
                        ),

                        m('.row.',
                            m('.col-sm-10.space',[
                                m('strong', 'Data'),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-2.space.text-sm-right',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_data}, 'Data')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10.space',[
                                m('strong', 'Statistics'),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-2.space.text-sm-right',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_statistics}, 'Statistics')
                            )
                        ),
                    ])
                ),

                m('.row.space',
                    m('.col-sm-12',  m('h4', 'Danger zone'))

                ),

                m('.row.danger_zone.space',
                    m('.col-sm-12', [
                        m('.row.',
                            m('.col-sm-11.space',[
                                m('strong', 'Publish and create a new version'),
                            ]),
                            m('.col-sm-1.space',
                                m('button.btn.btn-danger.btn-sm', {onclick:ctrl.show_publish}, 'Publish')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-11.space',[
                                m('strong', 'Lock study'),
                                m('.small', 'This will prevent you from modifying the study until you unlock the study again. When a study is locked, you cannot add files, delete files, rename files, edit files, rename the study, or delete the study.'),
                                m('.small', 'However, if the study is currently published so you might want to make sure participants are not taking it. We recommend unlocking a published study only if you know that participants are not taking it while you modify the files, or if you know exactly what you are going to change and you are confident that you will not make mistakes that will break the study.')
                            ]),

                            m('.col-sm-1.space',
                                m('label.switch', [m('input[type=checkbox].input_switch', {checked:ctrl.study.is_locked, onclick:ctrl.lock}), m('span.slider.round')])
                            )
                        ),
                        m('.row.space',
                            m('.col-sm-11.space',  m('strong', 'Delete study')),
                            m('.col-sm-1.space',
                                m('button.btn.btn-danger.btn-sm', {onclick:ctrl.show_delete}, 'Delete')
                            )
                        ),
                    ])
                )

            ]);
    }
};

const focus_it = (element, isInitialized) => {
    if (!isInitialized) setTimeout(() => element.focus());};
