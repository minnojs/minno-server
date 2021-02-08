import messages from 'utils/messagesComponent';
import studyFactory from '../files/fileCollectionModel';
import {delete_study, publish_study, create_version, update_study, rename_study, lock_study, duplicate_study, change_version_availability} from '../studyModel';
import formatDate from 'utils/formatDate_str';


import sharing_dialog from '../sharing/sharingComponent';
import {createNotifications} from 'utils/notifyComponent';
import data_dialog from '../../downloads/dataComp';
import stat_dialog from '../open_statistics/statComp';
import studyTagsComponent from '../../tags/studyTagsComponent';
import {update_tags_in_study} from '../../tags/tagsModel';

export default propertiesComponent;
const notifications= createNotifications();

let propertiesComponent = {
    controller(){
        let ctrl = {
            notifications,
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
            col_error:m.prop(''),
            pub_error:m.prop(''),
            share_error:m.prop(''),
            study,
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
            //
            // let study_id = ctrl.study.id;
            // let versions = ctrl.study.versions;
            // let exps  = m.prop([]);
            //
            // let close = messages.close;
            // messages.custom({header:'Data download', content: data_dialog({exps, study_id, versions, close})})
            //     .then(m.redraw);
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
                .then(res=>ctrl.study.versions.push(res))
                .then(()=>ctrl.study.is_published = false)
                .then(()=>ctrl.under_develop(true))
                .catch(e => {
                    error(e.message);
                    ask();
                })
                .then(m.redraw);
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
                .then(()=>ctrl.study.versions[ctrl.study.versions.length-1].state='Published')
                .then(()=>ctrl.study.is_published = true)
                .then(()=>ctrl.under_develop(false))

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
                    if(ctrl.study.invisible)
                        ctrl.study.isReadonly = true;
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
                        m('h3', [ctrl.study_name(), ': Properties'])
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
                        m('.col-sm-12.space',  m('h4', 'Versions'))
                    ),
                    m('.row.space',
                        m('.col-sm-7.space',
                            m('table.table',
                                ctrl.study.versions.map((version, id)=>
                                    m('tr', [
                                        m('td',  [m('strong', {class:version.availability ? '' : 'text-muted'}, ['v', version.id]), ` (${formatDate(version.creation_date)})`]),
                                        m('td', m('button.btn.btn-primary.btn-sm', {onclick: function(){m.route(`/editor/${ctrl.study.id}/${ctrl.study.versions.length===id+1 ? '': version.id}`);}}, version.state==='Develop' && !ctrl.study.isReadonly ? 'Edit' : 'Review')),
                                        ctrl.study.isReadonly ? ''     :
                                            m('td', m('button.btn.btn-primary.btn-sm', {onclick: ()=>ctrl.show_change_availability(ctrl.study, version.hash, !version.availability)}, version.availability ? 'Active' : 'Inactive')),
                                        version.state!=='Develop' ? '' :
                                            m('td', m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_publish}, 'Publish'))
                                    ])
                                )
                            )
                        )
                    )
                ],

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
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_duplicate, disabled: ctrl.study.invisible}, 'Duplicate')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10.space',[
                                m('strong', 'Share study'),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-2.space.text-sm-right',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_sharing, disabled:ctrl.study.isReadonly}, 'Sharing')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10.space',[
                                m('strong', 'Study\'s tags' ),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-2.space.text-sm-right',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_tags, disabled:ctrl.study.isReadonly}, 'Tags')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10.space',[
                                m('strong', 'Data'),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-2.space.text-sm-right',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_data, disabled:!ctrl.study.has_data_permission}, 'Data')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-10.space',[
                                m('strong', 'Statistics'),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-2.space.text-sm-right',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_statistics, disabled:!ctrl.study.has_data_permission}, 'Statistics')
                            )
                        ),
                    ])
                ),
                ctrl.study.isReadonly ? '' : [
                    m('.row.space',
                        m('.col-sm-12',  m('h4', 'Danger zone'))
                    ),
                    m('.row.danger_zone.space',
                        m('.col-sm-12', [

                            ctrl.under_develop() ? '' :
                                m('.row.',
                                    m('.col-sm-11.space',[
                                        m('strong', 'Create a new version'),
                                    ]),
                                    m('.col-sm-1.space.text-sm-right',
                                        m('button.btn.btn-danger.btn-sm', {onclick:ctrl.show_create_version}, 'Create')
                                    )
                                ),
                            // m('.row.',
                            //     m('.col-sm-11.space',[
                            //         m('strong', 'Lock study'),
                            //         m('.small', 'This will prevent you from modifying the study until you unlock the study again. When a study is locked, you cannot add files, delete files, rename files, edit files, rename the study, or delete the study.')
                            //     ]),
                            //
                            //     m('.col-sm-1.space.text-sm-right',
                            //         m('label.switch', [m('input[type=checkbox].input_switch', {checked:ctrl.study.is_locked, onclick:ctrl.lock}), m('span.slider.round')])
                            //     )
                            // ),
                            m('.row.space',
                                m('.col-sm-11.space',  m('strong', 'Delete study')),
                                m('.col-sm-1.space.text-sm-right',
                                    m('button.btn.btn-danger.btn-sm', {onclick:ctrl.show_delete}, 'Delete')
                                )
                            ),
                        ])
                    )
                ]
            ]);
    }
};

const focus_it = (element, isInitialized) => {
    if (!isInitialized) setTimeout(() => element.focus());};
