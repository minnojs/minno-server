import {get_collaborations, remove_collaboration, add_collaboration, update_permission, make_pulic, add_link, revoke_link} from './propertiesModel';
import messages from 'utils/messagesComponent';
import {copyUrl} from 'utils/copyUrl';
import studyFactory from '../files/fileCollectionModel';
import {publish_study, update_study, rename_study, lock_study, duplicate_study} from '../studyModel';
import formatDate from 'utils/formatDate_str';


import {stop_gdrive_sync} from "../../settings/settingsActions";
import sharing_dialog from "../sharing/sharingComponent";

export default collaborationComponent;

let collaborationComponent = {
    controller(){
        let ctrl = {
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
            save,
            lock,
            show_sharing,
            show_duplicate,
            show_publish
        };
        function save(){
            if (ctrl.study.name!==ctrl.study_name())
                rename_study(m.route.param('studyId'), ctrl.study_name());
            if (ctrl.study.description!==ctrl.description())
                update_study(m.route.param('studyId'), {description:ctrl.description()});
        }
        function lock(){
            return lock_study(ctrl.study.id, !ctrl.study.is_locked)
                .then(() => ctrl.study.is_locked = !ctrl.study.is_locked)
                .then(m.redraw);
        }

        function show_sharing() {
            let study_id = ctrl.study.id;
            let close = messages.close;
            messages.custom({header:'Statistics', wide: true, content: sharing_dialog({study_id, close})})
                .then(m.redraw);
        }

        function show_publish(){
            let error = m.prop('');
            let update_url = m.prop('update');
            let version_name = m.prop('');
            let ask = () => messages.confirm({okText: ['Yes, ', ctrl.study.is_published ? 'Unpublish' : 'Publish' , ' the study'], cancelText: 'Cancel', header:[ctrl.study.is_published ? 'Unpublish' : 'Publish', ' the study?'],
                content:m('p',
                    [m('p', ctrl.study.is_published
                        ?
                        'The launch URL participants used to run the study will be removed. Participants using this link will see an error page. Use it if you completed running the study, or if you want to pause the study and prevent participants from taking it for a while. You will be able to publish the study again, if you want.'
                        :
                        [
                            m('p', 'This will create a link that participants can use to launch the study.'),
                            m('p', 'Publishing locks the study for editing to prevent you from modifying the files while participants take the study. To make changes to the study, you will be able to unpublish it later.'),
                            m('p', 'Although it is strongly not recommended, you can also unlock the study after it is published by using Unlock Study in the Study menu.'),
                            m('p', 'After you publish the study, you can obtain the new launch URL by right clicking on the experiment file and choosing Experiment options->Copy Launch URL'),
                            m('input.form-control', {placeholder: 'Enter Version Name', config: focus_it,value: version_name(), onchange: m.withAttr('value', version_name)}),
                            m('.input-group.space', [

                                m('select.c-select.form-control.space',{onchange: e => update_url(e.target.value)}, [
                                    m('option', {value:'update', selected:true}, 'Update the launch URL'),
                                    m('option', {value:'keep'}, 'Keep the launch URL'),
                                    ctrl.study.versions.length<2 ? '' : m('option', {value:'reuse'}, 'Use the launch URL from the previous published version')
                                ])
                        ])
                        ]),
                        !error() ? '' : m('p.alert.alert-danger', error())])
            })

                .then(response => response && publish());

            let publish= () => publish_study(ctrl.study.id, !ctrl.study.is_published, update_url)
                .then(res=>ctrl.study.versions.push(res))
                .then(ctrl.study.is_published = !ctrl.study.is_published)
                // .then(()=>notifications.show_success(`'${ctrl.study.name}' ${ctrl.study.is_published ? 'published' : 'unpublished'} successfully`))
                .then(ctrl.study.is_locked = ctrl.study.is_published || ctrl.study.is_locked)

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
                    .catch(err => study.err = err.message)
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
                    m('.col-sm-2.space',  m('button.btn.btn-primary.btn-block.btn-sm', {onclick: function(){m.route(`/editor/${ctrl.study.id}`)}}, 'View files'))


            ),


                ctrl.study.versions.length === 1 ? ''
                :[
                    m('.row.space',
                        m('.col-sm-12.space',  m('h4', 'Previous published versions'))
                    ),
                ctrl.study.versions.filter(version=> version.state === 'Published').map((version, id)=>id==0 && ctrl.study.versions.length === 1 ? '' :

                    m('.row',
                        ctrl.study.versions.length===id+1 ? '' : [
                            m('.col-sm-3.space',  `(${formatDate(version.version)})`),
                            m('.col-xs-1.space',  m('button.btn.btn-primary.btn-block.btn-sm', {onclick: function(){m.route(`/editor/${ctrl.study.id}/${ctrl.study.versions.length===id+1 ? '': version.version}`)}}, 'View')),
                            m('.col-xs-1.space',  m('button.btn.btn-primary.btn-block.btn-sm', {onclick: function(){m.route(`/editor/${ctrl.study.id}/${ctrl.study.versions.length===id+1 ? '': version.version}`)}}, 'Active'))
                        ]
                    )
                )],
                m('.row.space',
                    m('.col-sm-5.space.text-xs-right',
                        m('button.btn.btn-secondary', {onclick:ctrl.show_publish}, [m('i.fa.fa-plus-circle'), ' Develop a new version']))
                ),


                m('.row.space',
                    m('.col-sm-2.space',  m('h4', 'Actions'))
                ),

                m('.row.frame.space',
                    m('.col-sm-12', [
                        m('.row.',
                            m('.col-sm-11.space',[
                                m('strong', 'Duplicate study'),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-1.space',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_duplicate}, 'Duplicate')
                            )
                        ),
                        m('.row.',
                            m('.col-sm-11.space',[
                                m('strong', 'Share study'),
                                m('.small', 'This will allows you to...')
                            ]),
                            m('.col-sm-1.space',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_sharing}, 'Sharing')
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
                                    m('strong', 'Publish study'),
                                ]),
                            m('.col-sm-1.space',
                                m('button.btn.btn-primary.btn-sm', {onclick:ctrl.show_publish}, ctrl.study.is_published ? 'Unpublish' : 'Publish')
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
                                m('button.btn.btn-danger.btn-sm', {onclick:ctrl.save}, 'Delete')
                            )
                        ),
                    ])
                )

            ]);
    }
};

const focus_it = (element, isInitialized) => {
    if (!isInitialized) setTimeout(() => element.focus());};

function getAbsoluteUrl(url) {
    const a = document.createElement('a');
    a.href=url;
    return a.href;
}

function copy(text){
    return new Promise((resolve, reject) => {
        let input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select(); s

        try {
            document.execCommand('copy');
        } catch(err){
            reject(err);
        }

        input.parentNode.removeChild(input);
    });
}
