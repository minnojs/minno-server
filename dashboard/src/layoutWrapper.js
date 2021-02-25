import contextMenu from 'utils/contextMenuComponent';
import messages from 'utils/messagesComponent';
import spinner from 'utils/spinnerComponent';
import {getAuth, logout} from 'login/authModel';

export default layout;

let timer = 0;
let countdown = 0;
let role = '';
let isloggedin = true;
let new_msgs = false;

let layout = route => {
    return {
        controller(){
            const ctrl = {
                isloggedin,
                first_admin_login: m.prop(false),
                role: m.prop(role),
                new_msgs: m.prop(new_msgs),
                present_templates: m.prop(false),
                doLogout,
                timer:m.prop(0)
            };
            is_loggedin();
            function is_loggedin(){
                getAuth().then((response) => {
                    role = ctrl.role(response.role);
                    new_msgs = ctrl.new_msgs(response.new_msgs);

                    isloggedin = ctrl.isloggedin = response.isloggedin;
                    ctrl.present_templates(response.present_templates);
                    ctrl.first_admin_login(response.first_admin_login);
                    let is_view = (m.route() === `/view/${m.route.param('code')}` || m.route() === `/view/${m.route.param('code')}/version/${m.route.param('version_id')}` || m.route() === `/view/${m.route.param('code')}/file/${encodeURIComponent(m.route.param('fileId'))}` ||  m.route() === `/view/${m.route.param('code')}/version/${m.route.param('version_id')}/file/${encodeURIComponent(m.route.param('fileId'))}`);

                    if(ctrl.role()==='ro' && !is_view)
                        return doLogout();
                    let is4su   = (m.route() === `/users` || m.route() === `/config` || m.route() === `/homepage`);

                    if(ctrl.role()!=='su' && is4su)
                        m.route('./');

                    if(ctrl.role()==='du' && m.route() !== '/deployList' && m.route() !== '/autupauseruletable' )
                        return m.route('/deployList');

                    if(ctrl.role()!=='du' && ctrl.role()!=='su'  && m.route() === '/deployList')
                        return m.route('./');

                    if (!is_view &&  !ctrl.isloggedin  && m.route() !== '/login' && m.route() !== '/recovery' && m.route() !== '/activation/'+ m.route.param('code') && m.route() !== '/change_password/'+ m.route.param('code')  && m.route() !== '/reset_password/'+ m.route.param('code')){
                        let url = m.route();
                        m.route('/login');
                        location.hash = encodeURIComponent(url);
                    }
                    if(ctrl.role()==='CU' && m.route() !== '/studies')
                        m.route('/downloads');

                    if(ctrl.first_admin_login() && m.route() !== '/settings')
                        m.route('/settings');


                    timer = response.timeoutInSeconds;
                    run_countdown();
                    m.redraw();
                });
            }

            function run_countdown(){
                clearInterval(countdown);
                countdown = setInterval(function () {
                    if(timer<=0)
                        return;
                    if(timer<10) {
                        messages.close();
                        doLogout();
                    }
                    if(timer==70)
                        messages.confirm({header:'Timeout Warning', content:'The session is about to expire. Do you want to keep working?',okText:'Yes, stay signed-in', cancelText:'No, sign out'})
                            .then(response => {
                                if (!response)
                                    return doLogout();
                                return is_loggedin();
                            });
                    timer--;
                }, 1000);
            }
            return ctrl;

            function doLogout(){
                clearInterval(countdown);
                logout().then(() =>{
                    let url = m.route();
                    m.route('/login');
                    location.hash = encodeURIComponent(url);
                });
            }
        },
        view(ctrl){

            const settings = {
                'studies':[],
                // 'data':['downloads', 'downloadsAccess', 'statistics'],
                // 'pool':[],
                'tags':[],
                'pi':['rules', 'pool'],
                'admin':['deployList', 'registration',/* 'removalList', 'changeRequestList', 'addUser', */'users', 'config', 'homepage'/*, 'massMail'*/]
            };

            const settings_hash = {
                'studies':{text: 'Studies', href:'/studies', sub:[]},
                'data':{text: 'Data', href:false,
                    subs: {
                        'downloads': {text: 'downloads', href: '/downloads'},
                        'downloadsAccess': {text: 'Downloads Access', href: '/downloadsAccess'},
                        'statistics': {text: 'Statistics', href: '/statistics'}
                    }},


                'pool':{text: 'Pool', href:'/pool', sub:[]},
                'tags':{text: 'Tags', href:'/tags', sub:[]},
                'pi':{text: 'PI', href:false,
                    subs: {

                        'pool': {text: m('i.fa.fa-calendar', ' Research Pool'), href: '/pool'},
                        'rules': {text: m('i.fa.fa-gavel', ' Rules'), href: '/ruletable'}
                    }},
                'admin':{text: 'Admin', href:false,
                    su:true,
                    subs:{'deployList': {text: m('i.fa.fa-list', ' Deploy List'), href: '/deployList'},
                        'registration': {text: m('i.fa.fa-sign-in', ' Registration page'), href: '/edit_registration'},
                        'removalList': {text: 'Removal List', href:'/removalList'},
                        'changeRequestList': {text:'Change Request List', href: '/changeRequestList'},
                        'addUser': {text:'Add User', href: '/addUser'},
                        'config': {text: m('i.fa.fa-gear', ' Edit Configuration') , href: '/config'},
                        'homepage': {text: m('i.fa.fa-home', ' Edit Homepage'), href: '/homepage'},
                        'massMail': {text: 'Send MassMail', href: '/massMail'},
                        'users': {text: m('i.fa.fa-users', ' Users Management'), href: '/users'}
                    }}

            };


            return  m('.dashboard-root', {class: window.top!=window.self ? 'is-iframe' : ''}, [
                !ctrl.isloggedin || ctrl.role()=='ro'
                    ?
                    ''
                    :
                    m('nav.navbar.navbar-dark', [
                        m('a.navbar-brand', {href:'', config:m.route}, 'Dashboard'),
                        m('ul.nav.navbar-nav',[
                            ctrl.role()==='du' ? '' :
                                Object.keys(settings).map(comp=>
                                    settings_hash[comp].su && ctrl.role() !=='su' ? '' :
                                        settings[comp].length==0 ?
                                            m('li.nav-item',[
                                                m('a.nav-link',{href:settings_hash[comp].href, config:m.route}, settings_hash[comp].text)

                                            ])
                                            :
                                            m('li.nav-item', [
                                                m('.dropdown', [
                                                    m('a.nav-link', settings_hash[comp].text),
                                                    m('.dropdown-menu', [
                                                        settings[comp].map(sub_comp=>
                                                            m('a.dropdown-item',{href:settings_hash[comp].subs[sub_comp].href, config:m.route}, settings_hash[comp].subs[sub_comp].text)
                                                        )
                                                    ])
                                                ])
                                            ])
                                ),
                            !ctrl.new_msgs() ? '' : m('li.nav-item.pull-xs-right', [
                                m('a',{href:'/messages', config:m.route},
                                    m('span.fa-stack', [
                                        m('i.fa.fa-envelope.fa-lg.fa-stack-3x', {style:{color:'white'}}),
                                        m('i.fa.fa-circle.fa-lg.fa-stack-1x', {style:{color:'red', 'margin-top': '-5px', 'margin-right': '-5px'}}),
                                        m('span.fa-stack-1x', {style:{color:'white', 'margin-top': '-5px', 'margin-right': '-5px'}}, ctrl.new_msgs() <10 ? ctrl.new_msgs() : '9+' )
                                    ])
                                ),
                            ]),

                            m('li.nav-item.pull-xs-right', [
                                m('a.nav-link',{href:'/settings', config:m.route},m('i.fa.fa-cog.fa-lg'))
                            ]),
                            !ctrl.isloggedin ? '' : m('li.nav-item.pull-xs-right',[
                                m('button.btn.btn-info', {onclick:ctrl.doLogout}, [
                                    m('i.fa.fa-sign-out'), '  Logout'
                                ])
                            ])
                        ])
                    ]),

                m('.main-content.container-fluid', [
                    route,

                    m.component(contextMenu), // register context menu
                    m.component(messages), // register modal
                    m.component(spinner) // register spinner
                ])

            ]);
        }
    };

};
