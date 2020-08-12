import {get_homepage, update_homepage} from './homepageModel';
import {createNotifications} from 'utils/notifyComponent';


export default homepageComponent;

let homepageComponent = {
    controller(){
        let ctrl = {
            loaded:m.prop(false),
            upper_panel:m.prop(''),
            right_panel:m.prop(''),
            mode:m.prop('edit'),
            notifications: createNotifications(),
            do_update_homepage,
        };

        function set_values(response){
            ctrl.upper_panel(!response.upper_panel ? '' : response.upper_panel );
            ctrl.right_panel(!response.right_panel ? '' : response.right_panel);
            return m.redraw();
        }

        function load() {
            get_homepage()
                .then(response => set_values(response))
                .then(()=>ctrl.loaded(true))
                .catch(error => {
                    ctrl.loaded(true);
                    show_fail_notification(error.message);
                }).then(m.redraw);
        }

        function show_success_notification(res) {
            if(res)
                ctrl.notifications.show_success(res);
        }

        function show_fail_notification(res) {
            ctrl.notifications.show_danger(res);
        }

        function do_update_homepage(){
            m.redraw();
            update_homepage(ctrl.upper_panel, ctrl.right_panel)
                .then((res)=> {
                    show_success_notification(res);
                    return get_homepage()
                        .then(response => set_values(response));
                })
                .catch((error) => show_fail_notification(error.message))
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
            m('.container.space', [
                m('.row.space',[
                    m('.col-md-10', m('h3', 'Homepage')),
                    m('.col-md-2', [
                        m('.btn-group.btn-group-md.pull-md-right', [
                            m('a.btn.btn-secondary', {onclick: ()=>ctrl.mode('view'), class: ctrl.mode() === 'view' ? 'active' : ''}, [
                                m('strong', 'View' )
                            ]),
                        ]),
                        m('.btn-group.btn-group-md.pull-md-right', [
                            m('a.btn.btn-secondary', {onclick: ()=>ctrl.mode('edit'), class: ctrl.mode() === 'edit' ? 'active' : ''}, [
                                m('strong', 'Edit' )
                            ]),
                        ]),
                    ])
                ]),

                m('.row.space', [
                    m('.col-md-12',
                        m('',
                            ctrl.mode()==='edit'
                                ?
                                m('textarea.form-control.fixed_textarea', { rows:6, value: ctrl.upper_panel(), onchange: m.withAttr('value', ctrl.upper_panel)})
                                :
                                m.trust(ctrl.upper_panel())
                        )
                    )
                ]),
                m('.row.space', {class: ctrl.mode() ==='view' && !ctrl.right_panel() ? 'centrify' : ''}, [
                    m('.space.col-md-5',
                        m('.homepage-background', [
                            m('.card-block',[
                                m('form.space.disable_properties', [
                                    m('.space', 'Username / Email'),
                                    m('input.form-control', {placeholder: 'Username / Email'}),
                                    m('.space', 'Password'),
                                    m('input.form-control', {type:'password', placeholder: 'Password'})
                                ]),
                                m('.space', m('button.btn.btn-primary.btn-block', {disabled:true}, 'Sign in')),
                                m('p.text-center',
                                    m('small.text-muted',  m('a', {href:'#'}, 'Lost your password?'))
                                )
                            ])
                        ])
                    ),
                    ctrl.mode()==='view' && !ctrl.right_panel() ? '' :
                        m('.col-md-7.space',
                            m('.homepage-background',
                                ctrl.mode()==='edit'
                                    ?
                                    m('textarea.form-control.fixed_textarea', { rows:15, value: ctrl.right_panel(), onchange: m.withAttr('value', ctrl.right_panel)})
                                    :
                                    m.trust(ctrl.right_panel())
                            )
                        )
                ]),

                m('.row.text-xs-right.space', [
                    m('.col-md-12', m('button.btn.btn-primary', {onclick: ctrl.do_update_homepage}, 'Save'))
                ]),
                m('div', ctrl.notifications.view()),

            ]);
    }
};