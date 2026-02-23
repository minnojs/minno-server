
import {get_collaborations, remove_collaboration, add_collaboration, update_permission, make_pulic, add_link, revoke_link, get_all_users} from './sharingModel';
import messages from 'utils/messagesComponent';

// export default collaborationComponent;

let sharing_dialog = {
    controller({study_id, close}){
        let ctrl = {
            users:m.prop(),
            all_users:m.prop(),

            is_public:m.prop(),

            link:m.prop(''),
            study_name:m.prop(),
            user_name:m.prop(''),
            permission:m.prop('can edit'),
            data_permission:m.prop('visible'),
            loaded:false,
            col_error:m.prop(''),
            pub_error:m.prop(''),
            share_error:m.prop(''),
            remove,
            do_update_permission,
            do_add_collaboration,
            do_add_link,
            do_revoke_link,
            do_make_public
        };

        function load() {
            get_all_users()
                .then(response =>{ctrl.all_users(response.users)})
                .then(()=>get_collaborations(study_id)
                .then(response =>{ctrl.users(response.users);
                    ctrl.is_public(response.is_public);
                    ctrl.study_name(response.study_name);
                    ctrl.link(response.link);
                    ctrl.loaded = true;}))
                .catch(error => {
                    ctrl.col_error(error.message);
                }).then(m.redraw);


        }
        function remove(user_id){
            messages.confirm({header:'Delete collaboration', content:'Are you sure?'})
                .then(response => {
                    if (response)
                        remove_collaboration(m.route.param('studyId'), user_id)
                            .then(()=> {
                                load();
                            })
                            .catch(error => {
                                ctrl.col_error(error.message);
                            })
                            .then(m.redraw);
                });
        }

        function do_update_permission(collaborator_id, {permission, data_permission}){
            update_permission(m.route.param('studyId'), collaborator_id, {permission, data_permission})
                .then(()=>load())
                .then(m.redraw);
        }

        function check_permission(ctrl){
            return ctrl.data_permission(ctrl.permission() === 'invisible' ? 'visible' : ctrl.data_permission());
        }

        function do_add_collaboration()
        {
            messages.confirm({
                header:'Add a Collaborator',
                content:

                    m.component({view: () => m('p', [
                    m('p', 'Select collaborator:'),
                    m('select.form-control', {value:ctrl.user_name(), onchange: m.withAttr('value',ctrl.user_name)},
                        [m('option', {selected:true, value:'', disabled: true}, 'Select collaborator'),

                        ctrl.all_users().filter(user=> !ctrl.users().map(user=>user.user_name).includes(user.user_name)).map(user=> m('option', {value:user.user_name,} , `${user.first_name} ${user.last_name} - ${user.user_name}`))
                        ]
                    ),
                    m('p.space', 'Select user\'s study file access:'),
                    m('select.form-control', {value:ctrl.permission(), onchange: m.withAttr('value',ctrl.permission)}, [
                        m('option',{value:'can edit', selected: ctrl.permission() === 'can edit'}, 'Edit'),
                        m('option',{value:'read only', selected: ctrl.permission() === 'read only'}, 'Read only'),
                        m('option',{value:'invisible', selected: ctrl.permission() === 'invisible'}, 'No access'),
                    ]),
                    m('p.space', 'Select data visibility:'),
                    m('select.form-control', {value:check_permission(ctrl), onchange: m.withAttr('value',ctrl.data_permission)}, [
                        m('option',{value:'visible', selected: ctrl.data_permission() === 'visible' }, 'Full'),
                        m('option',{value:'invisible', disabled: ctrl.permission() === 'invisible', selected: ctrl.data_permission() === 'invisible'}, 'No access')
                    ]),
                    m('p', {class: ctrl.col_error()? 'alert alert-danger' : ''}, ctrl.col_error())
                ])})
            })
            .then(response => {
                if (response){

                    if(!ctrl.user_name())
                    {
                        ctrl.col_error('ERROR: user name is missing');
                        return do_add_collaboration();

                    }
                    add_collaboration(m.route.param('studyId'), ctrl.user_name, ctrl.permission, ctrl.data_permission)
                        .then(()=>{
                            ctrl.col_error('');
                            load();
                        })
                        .catch(error => {
                            ctrl.col_error(error.message);
                            do_add_collaboration();
                        })
                        .then(m.redraw);
                }
            });
        }

        function do_add_link() {
            add_link(m.route.param('studyId'))
                .then(response =>{ctrl.link(response.link);})
                .catch(error => {
                    ctrl.col_error(error.message);
                }).then(m.redraw);
        }

        function do_revoke_link() {
            revoke_link(m.route.param('studyId'))
                .then(() =>{ctrl.link('');})
                .catch(error => {
                    ctrl.col_error(error.message);
                }).then(m.redraw);
        }

        function do_make_public(is_public){
            messages.confirm({okText: ['Yes, make ', is_public ? 'public' : 'private'], cancelText: ['No, keep ', is_public ? 'private' : 'public' ], header:'Are you sure?', content:m('p', [m('p', is_public
                ?
                'Making the study public will allow everyone to view the files. It will NOT allow others to modify the study or its files.'
                :
                'Making the study private will hide its files from everyone but you.'),
            m('span', {class: ctrl.pub_error()? 'alert alert-danger' : ''}, ctrl.pub_error())])})
                .then(response => {
                    if (response) make_pulic(m.route.param('studyId'), is_public)
                        .then(()=>{
                            ctrl.pub_error('');
                            load();
                        })
                        .catch(error => {
                            ctrl.pub_error(error.message);
                            do_make_public(is_public);
                        })
                        .then(m.redraw);
                });

        }
        load();
        return {ctrl, close};
    },
    view({ctrl, close}){
        return  !ctrl.loaded
            ?
            m('.loader')
            :
            m('.container.sharing-page', [
                m('.row',[
                    m('.col-sm-7', [
                        m('h3', [ctrl.study_name(), ' (Sharing Settings)'])
                    ]),
                    m('.col-sm-5', [
                        m('button.btn.btn-secondary.btn-sm.m-r-1', {onclick:ctrl.do_add_collaboration, title: ctrl.users().length<ctrl.all_users().length? '' :  'There are no available users', disabled: ctrl.users().length===ctrl.all_users().length}, [
                            m('i.fa.fa-plus'), '  Add a new collaborator'
                        ]),
                        m('button.btn.btn-secondary.btn-sm', {onclick:function() {ctrl.do_make_public(!ctrl.is_public());}}, ['Make ', ctrl.is_public() ? 'Private' : 'Public'])
                    ])
                ]),
                m('.row.row-centered.space', [
                    m('th.col-xs-7', 'User name'),
                    m('th.col-xs-3', 'Permission'),
                    m('th.col-xs-2', 'Remove')
                ]),


                ctrl.users().map(user =>
                    m('.row.space', [
                        m('hr'),
                        m('.col-xs-6',
                            [user.user_name, user.status ? ` (${user.status})` : '']
                        ),
                        m('.col-xs-4',[
                            m('.row.row-centered', [
                                m('.col-xs-5',  'files'),
                                m('.col-xs-5', 'data'),
                            ]),
                            m('.row', [
                                m('.col-xs-5',
                                    m('select.form-control', {value:user.permission, onchange : function(){ctrl.do_update_permission(user.user_id, {permission: this.value});  }}, [
                                        m('option',{value:'can edit', selected: user.permission === 'can edit'},  'Edit'),
                                        m('option',{value:'read only', selected: user.permission === 'read only'}, 'Read only'),
                                        m('option',{value:'invisible', selected: user.permission === 'invisible'}, 'No access')
                                    ])),
                                m('.col-xs-5',
                                    m('select.form-control', {value:user.data_permission, onchange : function(){ctrl.do_update_permission(user.user_id, {data_permission: this.value});  }}, [
                                        m('option',{value:'visible', selected: user.data_permission === 'visible'}, 'Full'),
                                        m('option',{value:'invisible', selected: user.data_permission === 'invisible'}, 'No access')
                                    ])),
                            ])
                        ]),
                        m('.col-xs-2',
                            m('button.btn.btn-danger', {onclick:function() {ctrl.remove(user.user_id);}}, 'Remove')
                        )

                    ])),
                /**********/
                m('.row.space',
                    m('.col-sm-12', [
                        m('button.btn.btn-secondary.btn-sm.m-r-1', {onclick:ctrl.do_add_link},
                            [m('i.fa.fa-plus'), '  Create / Re-create public link']
                        ),
                        m('button.btn.btn-secondary.btn-sm.m-r-1', {onclick:ctrl.do_revoke_link},
                            [m('i.fa.fa-fw.fa-remove'), '  Revoke public link']
                        ),
                        m('label.input-group.space',[
                            m('.input-group-addon', {onclick: function() {copy(getAbsoluteUrl(ctrl.link()));}}, m('i.fa.fa-fw.fa-copy')),
                            m('input.form-control', { value: !ctrl.link() ? '' : getAbsoluteUrl(ctrl.link()), onchange: m.withAttr('value', ctrl.link)})
                        ])
                    ])
                ),

                m('.text-xs-right.btn-toolbar',[
                    m('a.btn.btn-secondary.btn-sm', {onclick:()=>{close(null);}}, 'Close')
                ])

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
        input.select();

        try {
            document.execCommand('copy');
        } catch(err){
            reject(err);
        }

        input.parentNode.removeChild(input);
    });
}

export default args => m.component(sharing_dialog, args);
