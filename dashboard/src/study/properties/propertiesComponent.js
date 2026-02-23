import messages from 'utils/messagesComponent';
import studyFactory from '../files/fileCollectionModel';
import {
    delete_study,
    restore_study,
    publish_study,
    create_version,
    update_study,
    rename_study,
    lock_study,
    duplicate_study,
    change_version_availability, send2archive
} from '../studyModel';
import formatDate from 'utils/formatDate_str';


import sharing_dialog from '../sharing/sharingComponent';
import {createNotifications} from 'utils/notifyComponent';
import data_dialog from '../../downloads/dataComp';
import stat_dialog from '../open_statistics/statComp';
import studyTagsComponent from '../../tags/studyTagsComponent';
import {update_tags_in_study} from '../../tags/tagsModel';
import dropdown from 'utils/dropdown';

const notifications= createNotifications();

let propertiesComponent = {
    controller(){
        let ctrl = {
            notifications,
            presented_version:m.prop(),
            study_name:m.prop(),
            under_develop:m.prop(false),
            description:m.prop(),
            users:m.prop(),
            is_public:m.prop(),
            link:m.prop(''),
            user_name:m.prop(''),
            permission:m.prop('can edit'),
            data_permission:m.prop('visible'),
            loaded:m.prop(false),
            err:m.prop(''),
            study,
            update_presented_version,
            save,
            lock,
            show_tags,
            show_data,
            show_statistics,
            show_sharing,
            show_duplicate,
            show_publish,
            show_create_version,
            show_delete,
            show_restore,
            show_delete_data,
            show_change_availability,
            show_archive
        };

        function show_change_availability(study, version_id, availability){
            if (study.isReadonly)
                return false;
            if (study.versions.find(version =>  version.hash === version_id && version.availability === availability))
                return false;

            return messages.confirm({header:'Are you sure?', content:
                availability
                    ?
                    'This will reactivate the launch link. Anyone with that link will be able to start the study.'

                    :
                    'This will inactivate the launch link. It will be impossible to launch the study from that link. You can re-activate the link later.'

            })
                .then(response => {
                    if (response) {

                        study.versions.map(version => version.availability = version.hash === version_id ? availability : version.availability);
                        m.redraw();
                        change_version_availability(m.route.param('studyId'), version_id, availability);
                    }});

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

        function show_restore(){
            return messages.confirm({header:'Restore study', content:
                    m('strong', 'Are you sure? This will make your study available again.')})
                .then(response => {
                    if (response) restore_study(ctrl.study.id)
                        .then(()=>ctrl.study.archive=false)
                        .catch(error => messages.alert({header: 'Restore study', content: m('p.alert.alert-danger', error.message)}))
                        .then(()=> window.location.reload(true))
                        // .then(m.route('./'))
                    ;
                });
        }
        function show_archive(){
            return messages.confirm({header:'Send study to archive', content:
                    m('strong', 'Are you sure? This will make the study unavailable. Note: you will still have an access to the study’s data')})
                .then(response => {
                    if (response) send2archive(ctrl.study.id)
                        .then(()=>ctrl.study.archive=true)
                        .catch(error => messages.alert({header: 'Send study to archive', content: m('p.alert.alert-danger', error.message)}))
                        .then(()=> window.location.reload(true))
                        // .then(m.route('./'))
                    ;
                });
        }
        function show_delete(){
            return messages.confirm({header:'Delete study', content:
                    m('strong', 'Are you sure? This will delete the study and all its files permanently. You will no longer have access to the study’s data')})
                .then(response => {
                    if (response) delete_study(ctrl.study.id)
                        .then(()=>ctrl.study.archive=true)
                        .catch(error => messages.alert({header: 'Delete study', content: m('p.alert.alert-danger', error.message)}))
                        .then(m.redraw)
                        .then(m.route('./'))
                    ;
                });
        }


        function show_delete_data(){
            let study_id = ctrl.study.id;
            let versions = ctrl.study.versions;
            let exps  = m.prop([]);

            let close = messages.close;
            return messages.custom({header:'Data download', content: data_dialog({exps, study_id, versions, close, delete_data:true, notifications:ctrl.notifications})})
                .then(m.redraw);

        }

        function show_sharing() {
            let study_id = ctrl.study.id;
            let close = messages.close;
            messages.custom({header:'Statistics', wide: true, content: sharing_dialog({study_id, close})})
                .then(m.redraw);
        }

        function show_tags() {

            const study_id = ctrl.study.id;
            const filter_tags = ()=>{return tag => tag.changed;};
            const tags = m.prop([]);
            messages.confirm({header:'Tags', content: studyTagsComponent({tags, study_id})})
                .then(function (response) {
                    if (response){
                        const new_tags = tags().filter(tag=> tag.used);
                        ctrl.study.tags = new_tags;
                        tags(tags().filter(filter_tags()).map(tag=>(({text: tag.text, id: tag.id, used: tag.used}))));
                        return update_tags_in_study(study_id, tags);
                    }
                })
                .then(m.redraw);
        }

        function show_data() {
            let study_id = ctrl.study.id;
            let versions = ctrl.study.versions;
            let exps  = m.prop([]);

            let close = messages.close;
            messages.custom({header:'Data download', content: data_dialog({exps, study_id, versions, close})})
                .then(m.redraw);
        }


        function update_presented_version(version_id) {
            ctrl.presented_version(ctrl.study.versions.find(version=>version.id===parseInt(version_id)));
        }


        function show_statistics() {
            let study_id = ctrl.study.id;
            let versions = ctrl.study.versions;
            let close = messages.close;
            messages.custom({header:'Statistics', wide: true, content: stat_dialog({study_id, versions, close})})
                .then(m.redraw);
        }
        function show_create_version(){
            let error = m.prop('');
            let ask = () => messages.confirm({okText: ['Yes, create a new version'], cancelText: 'Cancel', header:'Create a new version?',
                content:m('p', [
                    m('p', [
                        m('p', 'This will create a new version...')
                    ]),
                    !error() ? '' : m('p.alert.alert-danger', error())
                ])
            })
            .then(response => {
                return  response && create();
            });

            let create= () => create_version(ctrl.study.id)
                .then(()=> window.location.reload(true))
                .catch(e => {
                    error(e.message);
                    ask();
                });
            ask();
        }


        function show_publish(){
            let error = m.prop('');
            let update_url = m.prop('update');
            let version_name = m.prop('');
            let ask = () => messages.confirm({okText: ['Yes, publish this version'], cancelText: 'Cancel', header:'Publish this version?',
                content:m('p',
                    [m('p', [
                        m('p', 'This will create a URL that launches this study version.'),
                        m('p', 'You will not be able to edit the study files of this version.'),
                        m('p', 'After publishing the study, you can obtain the new launch URL by right clicking on the experiment file and choosing Experiment options->Copy Launch URL'),
                        m('p', 'To modify the files after publishing, you can create a new version ("Create a new version" button will be added below), modify files and publish the new version to replace this version.'),
                        // m('.input-group.space', [
                        //     m('select.c-select.form-control.space',{onchange: e => update_url(e.target.value)}, [
                        //         m('option', {value:'update', selected:true}, 'replace this version'),
                        //         ctrl.study.versions.length<2 ? '' : m('option', {value:'keep'}, 'Use the launch URL from the previous version')
                        //     ])
                        // ])
                    ]),
                    !error() ? '' : m('p.alert.alert-danger', error())])
            })

            .then(response => {
                return  response && publish();
            });

            let publish= () => publish_study(ctrl.study.id, version_name, update_url)
                .then(()=> window.location.reload(true))
                .catch(e => {
                    error(e.message);
                    ask();
                })
                .then(m.redraw);
            ask();
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
                    ctrl.under_develop(ctrl.study.versions[ctrl.study.versions.length-1].state==='Develop');
                    ctrl.description(ctrl.study.description);
                    ctrl.study.invisible = ctrl.study.permission === 'invisible';
                    ctrl.presented_version(ctrl.study.versions[ctrl.study.versions.length-1]);
                    if(ctrl.study.invisible)
                        ctrl.study.isReadonly = true;

                })
                .catch(err=>ctrl.err(err.message))
                .then(()=>ctrl.loaded(true))
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
            ctrl.err() ? m('p.alert.alert-danger', ctrl.err()) :
            m('.container.sharing-page', [
                m('div', ctrl.notifications.view()),
                m('.row',[
                    m('.col-sm-12', [

                        m('h3', {class:ctrl.study.permission!=='archive' ? '' : 'text-danger'}, [ctrl.study_name(), ctrl.study.permission!=='archive' ? '' : ' (archive)', ': Properties'])
                    ])
                ]),
                m('.row.space',[
                    m('.col-sm-12', [

                        m('h4', 'Study details')
                    ])
                ]),
                m('.row',
                    m('.col-sm-2',  m('strong', 'Study name:')),
                    m('.col-sm-10',
                        ctrl.study.isReadonly ? ctrl.study_name() :
                            m('input.form-control', { value: ctrl.study_name(), oninput: m.withAttr('value', ctrl.study_name)}))
                ),
                m('.row.space',
                    m('.col-sm-2',  m('strong', 'Description:')),
                    m('.col-sm-10',
                        ctrl.study.isReadonly ? ctrl.description() :
                            m('textarea.form-control.fixed_textarea', { rows:5, value: ctrl.description(), onchange: m.withAttr('value', ctrl.description)}))
                ),
                ctrl.study.isReadonly ? '' : m('.row.space', [
                    m('.col-sm-2', ''),
                    m('.col-sm-10',
                        m('.btn-toolbar',
                            m('button.btn.btn-primary.btn-sm', {onclick:ctrl.save}, 'Save Study Details')
                        )
                    )
                ]),
                ctrl.study.invisible ? '' : [
                    m('.row.space',
                        m('.col-sm-12',  m('h4', 'Versions'))
                    ),
                    m('.row.space',
                        m('.col-sm-3',
                            m('select.c-select.form-control',{onchange: e => ctrl.update_presented_version(e.target.value)}, [
                                ctrl.study.versions.sort((e1, e2)=> e2.id-e1.id).map((version, id)=>
                                    m('option', {value:version.id}, ['v', version.id, ` (${formatDate(version.creation_date)})`]))
                            ])
                        ),
                        m('.col-sm-1',
                            m('button.btn.btn-primary.btn-md.btn-block.space',
                                {
                                    title: ctrl.presented_version().state==='Develop' && !ctrl.study.isReadonly ? 'Edit the study files' : 'View the study files',
                                    onclick: function(){m.route(`/editor/${ctrl.study.id}/${ctrl.study.versions.length===ctrl.presented_version().id ? '': ctrl.presented_version().id}`);}
                                },
                                ctrl.presented_version().state==='Develop' && !ctrl.study.isReadonly ? 'Edit' : 'View'
                            )
                        ),


                        ctrl.presented_version().state!=='Develop' || ctrl.study.isReadonly? '' :
                            m('.col-sm-2',
                                m('button.btn.btn-primary.btn-md.btn-block.space', {onclick:ctrl.show_publish}, 'Publish')
                        ),
                        m('.col-sm-2',
                            dropdown({toggleSelector:'button.btn.btn-md.btn-block.btn-secondary.dropdown-toggle', toggleContent: [ctrl.presented_version().availability ? m('i.fa.fa-check') : m('i.fa.fa-ban'), ctrl.presented_version().availability ? ' Active' : ' Inactive'], elements:[
                                    m('h2.dropdown-header', 'Activate / Inactivate this version'),
                                    m('button.dropdown-item.dropdown-onclick', {class: ctrl.study.isReadonly || ctrl.presented_version().availability ? 'disabled' : ''},[
                                        m('', { onclick: ()=>ctrl.show_change_availability(ctrl.study, ctrl.presented_version().hash, true)}, [
                                            m('strong', 'Active'),
                                            m('strong.pull-right', m('i.fa.fa-check', {style: {color:'green'}})),
                                            m('.small', 'Activate the launch link')
                                        ])
                                    ]),
                                    m('button.dropdown-item.dropdown-onclick', {class: ctrl.study.isReadonly || !ctrl.presented_version().availability ? 'disabled' : ''},[
                                        m('', {onclick: ()=>ctrl.show_change_availability(ctrl.study, ctrl.presented_version().hash, false)}, [
                                            m('strong', 'Inactive'),
                                            m('strong.pull-right', m('i.fa.fa-ban', {style: {color:'red'}})),
                                            m('.small', 'Terminate the launch link')
                                        ])
                                    ])
                                ]})
                        )
                    )
                ],

                m('.row.space',
                    m('.col-sm-2.space',  m('h4', 'Study Actions'))
                ),

                m('.row.frame.space',
                    m('.col-sm-12', [
                        m('.row.',
                            m('.col-sm-2.space',
                                m('button.btn.btn-primary.btn-block.btn-md', {onclick:ctrl.show_duplicate, disabled: ctrl.study.invisible}, 'Duplicate Study'))
                        ),
                        m('.row.',
                            m('.col-sm-10',
                                m('.small', 'Duplicate the files and folder of the most recent version to create a new study')
                            )
                        ),

                        m('.row.',
                            m('.col-sm-2.space',
                                m('button.btn.btn-primary.btn-md.btn-block', {onclick:ctrl.show_sharing, disabled:ctrl.study.isReadonly}, 'Share study')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10',
                                m('.small', 'Share the study with other users, or make the study public')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-2.space',
                                m('button.btn.btn-primary.btn-md.btn-block', {onclick:ctrl.show_data, disabled:!ctrl.study.has_data_permission}, 'Data')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10',
                                m('.small', 'Download the study data')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-2.space',
                                m('button.btn.btn-primary.btn-md.btn-block', {onclick:ctrl.show_statistics, disabled:!ctrl.study.has_data_permission}, 'Statistics')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10',
                                m('.small', 'Get information about study completion')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-2.space',
                                m('button.btn.btn-primary.btn-md.btn-block', {onclick:ctrl.show_tags, disabled:ctrl.study.isReadonly}, 'Study\'s tags')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10',
                                m('.small', 'Add tags to identify the study')
                            )
                        ),
                    ])
                ),

                ctrl.study.permission!=='archive' ? '' : [
                    m('.row.space',
                        m('.col-sm-12',  m('h4', 'Danger zone'))
                    ),
                    m('.row.danger_zone.space',
                        m('.col-sm-12', [
                            m('.row',
                                m('.col-sm-2.space',
                                    m('button.btn.btn-md.btn-block', {onclick:ctrl.show_restore}, 'Restore study')
                                )
                            ),

                            m('.row',
                                m('.col-sm-10',
                                    m('.small', 'Make the study available again')
                                )
                            ),
                            m('.row',
                                m('.col-sm-2.space',
                                    m('button.btn.btn-danger.btn-md.btn-block', {onclick:ctrl.show_delete}, 'Delete study')
                                )
                            ),

                            m('.row',
                                m('.col-sm-10',
                                    m('.small', 'Delete the study and the study data permanently')
                                )
                            )

                        ])
                    )
                ],

                ctrl.study.isReadonly ? '' : [
                    m('.row.space',
                        m('.col-sm-12',  m('h4', 'Danger zone'))
                    ),
                    m('.row.danger_zone.space',
                        m('.col-sm-12', [
                            m('.row',
                                m('.col-sm-2.space',
                                    m('button.btn.btn-md.btn-block', {onclick:ctrl.show_archive}, 'Send to archive')
                                )
                            ),

                            m('.row',
                                m('.col-sm-10',
                                    m('.small', 'Make the study unavailable')
                                )
                            ),
                            ctrl.under_develop() ? '' :
                                [
                                    m('.row.',
                                        m('.col-sm-2.space',
                                            m('button.btn.btn-danger.btn-md.btn-block', {onclick:ctrl.show_create_version}, 'New Version')
                                        )
                                    ),
                                    m('.row.',
                                        m('.col-sm-10',
                                            m('.small', 'Create a new version, to allow editing the study further')
                                        )
                                    ),
                            ],
                            m('.row',
                                m('.col-sm-2.space',
                                    m('button.btn.btn-danger.btn-md.btn-block', {onclick:ctrl.show_delete_data}, 'Delete data')
                                )
                            ),
                            m('.row',
                                m('.col-sm-10',
                                    m('.small', 'Delete study data permanently')
                                )
                            )
                        ])
                    )
                ]

                /**/

            ]);


    }
};

const focus_it = (element, isInitialized) => {
    if (!isInitialized) setTimeout(() => element.focus());};


export default propertiesComponent;
