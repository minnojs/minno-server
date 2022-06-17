import {get_config, update_config} from './configModel';
import {createNotifications} from 'utils/notifyComponent';


export default configComponent;

let configComponent = {
    controller(){
        let ctrl = {
            loaded:m.prop(false),
            donot_update:m.prop(false),
            notifications: createNotifications(),
            given_conf:m.prop(''),
            gmail: {
                enable: m.prop(false),
                email:m.prop(''),
                password:m.prop(''),
                show_password:m.prop(false),
                updated: m.prop(false),
                error:m.prop('')
            },
            fingerprint: {
                enable: m.prop(false),
                updated: m.prop(false),
                error:m.prop('')
            },
            usage: m.prop(''),
            show_data_per_user: m.prop(false),
            dbx: {
                enable: m.prop(false),
                app_key:m.prop(''),
                app_secret:m.prop(''),
                updated: m.prop(false),
                error:m.prop('')
            },
            server_data: {
                type:m.prop(''),
                https:{
                    private_key:m.prop(''),
                    certificate:m.prop(''),
                    port:m.prop('443')
                },
                greenlock:{
                    owner_email:m.prop(''),
                    domains:m.prop([])
                },
                updated: m.prop(false),
                error:m.prop('')
            },

            toggle_visibility,
            toggle_data_per_user,
            update_gmail_fields,
            show_gmail_password,
            update_dbx_fields,
            update_server_type_fields,
            do_update_config,
        };

        function set_values(response){
            ctrl.usage(response.config.usage);

            ctrl.given_conf(response.config);

            ctrl.fingerprint.enable(!!(response.config.fingerprint && response.config.fingerprint.use_fingerprint));
            if(response.config.gmail)
                ctrl.gmail.enable(true) && ctrl.gmail.email(response.config.gmail.email) && ctrl.gmail.password(response.config.gmail.password);
            if(response.config.dbx)
                ctrl.dbx.enable(true) && ctrl.dbx.app_key(response.config.dbx.client_id) && ctrl.dbx.app_secret(response.config.dbx.client_secret);
            if(response.config.server_data) {
                if(response.config.server_data.http)
                    ctrl.server_data.type('http');
                if(response.config.server_data.https){
                    ctrl.server_data.type('https');
                    ctrl.server_data.https.private_key(response.config.server_data.https.private_key);
                    ctrl.server_data.https.certificate(response.config.server_data.https.certificate);
                    ctrl.server_data.https.port(response.config.server_data.https.port);
                }
                if(response.config.server_data.greenlock){
                    ctrl.server_data.type('greenlock');
                    ctrl.server_data.greenlock.owner_email(response.config.server_data.greenlock.owner_email);
                    ctrl.server_data.greenlock.domains(response.config.server_data.greenlock.domains);
                }
            }
            return m.redraw();

        }

        function toggle_visibility(varable, state){
            if(ctrl[varable].enable() === state)
                return;
            ctrl[varable].error('');
            ctrl[varable].enable(state);
            ctrl[varable].updated(true);
        }
        function toggle_data_per_user(){
            ctrl.show_data_per_user(!ctrl.show_data_per_user());
        }

        function show_gmail_password(ctrl){
            ctrl.gmail.show_password(true);
            return m.redraw();

        }
        function load() {
            get_config()
                .then(response => set_values(response))
                .then(()=>ctrl.loaded(true))
                .catch(error => {
                    ctrl.loaded(true);
                    show_fail_notification(error.message);
                }).then(m.redraw);
        }

        function update_gmail_fields(ctrl, fields){
            ctrl.gmail.show_password(true);
            if(fields.hasOwnProperty('email'))
                ctrl.gmail.email(fields.email);
            if(fields.hasOwnProperty('password'))
                ctrl.gmail.password(fields.password);
            ctrl.gmail.enable(!!ctrl.gmail.email() || !!ctrl.gmail.password());

            let updated = (ctrl.given_conf().hasOwnProperty('gmail') && !ctrl.gmail.enable()) ||
                (!ctrl.given_conf().hasOwnProperty('gmail') && ctrl.gmail.email() && ctrl.gmail.password()) ||
                ctrl.given_conf().hasOwnProperty('gmail') &&
                ((ctrl.gmail.enable() && ctrl.gmail.email() !== ctrl.given_conf().gmail.email) ||
                (ctrl.gmail.enable() && ctrl.gmail.password() !== ctrl.given_conf().gmail.password));
            ctrl.gmail.updated(updated);
            return m.redraw();
        }

        function update_dbx_fields(ctrl, fields){
            if(fields.hasOwnProperty('app_key'))
                ctrl.dbx.app_key(fields.app_key);
            if(fields.hasOwnProperty('app_secret'))
                ctrl.dbx.app_secret(fields.app_secret);
            ctrl.dbx.enable(!!ctrl.dbx.app_key() || !!ctrl.dbx.app_secret());

            let updated = (ctrl.given_conf().hasOwnProperty('dbx') && !ctrl.dbx.enable()) ||
                (!ctrl.given_conf().hasOwnProperty('dbx') && ctrl.dbx.app_key() && ctrl.dbx.app_secret()) ||
                ctrl.given_conf().hasOwnProperty('dbx') &&
                ((ctrl.dbx.app_key() !== ctrl.given_conf().dbx.client_id) ||
                    (ctrl.dbx.app_secret() !== ctrl.given_conf().dbx.client_secret));
            ctrl.dbx.updated(updated);
            return m.redraw();
        }

        function update_server_type_fields(ctrl, fields){

            if(fields.hasOwnProperty('type'))
                ctrl.server_data.type(fields.type);

            if(fields.hasOwnProperty('https')){
                if(fields.https.hasOwnProperty('private_key'))
                    ctrl.server_data.https.private_key(fields.https.private_key);
                if(fields.https.hasOwnProperty('certificate'))
                    ctrl.server_data.https.certificate(fields.https.certificate);
                if(fields.https.hasOwnProperty('port'))
                    ctrl.server_data.https.port(fields.https.port);
            }
            if(fields.hasOwnProperty('greenlock')){
                if(fields.greenlock.hasOwnProperty('owner_email'))
                    ctrl.server_data.greenlock.owner_email(fields.greenlock.owner_email);
                if(fields.greenlock.hasOwnProperty('domain'))
                {
                    let domains = ctrl.server_data.greenlock.domains().slice();
                    if(fields.greenlock.hasOwnProperty('id')){
                        if (fields.greenlock.id >= 0) {
                            domains[fields.greenlock.id] = fields.greenlock.domain;
                        }
                        if (fields.greenlock.id < 0)
                            domains.push(fields.greenlock.domain);
                    }
                    ctrl.server_data.greenlock.domains(domains);
                }
                if(fields.greenlock.hasOwnProperty('remove')){
                    let domains = ctrl.server_data.greenlock.domains().slice();
                    domains.splice(fields.greenlock.remove, 1);
                    ctrl.server_data.greenlock.domains(domains);
                }
            }
            let updated = (ctrl.server_data.type() === 'http' && !ctrl.given_conf().server_data.http)
                ||
                (ctrl.server_data.type() === 'https' &&
                    ((ctrl.server_data.https.private_key() && ctrl.server_data.https.certificate()) &&
                    ((!ctrl.given_conf().server_data || !ctrl.given_conf().server_data.https) ||
                    (ctrl.given_conf().server_data.https.private_key !== ctrl.server_data.https.private_key() ||
                    ctrl.given_conf().server_data.https.port !== ctrl.server_data.https.port() ||
                        ctrl.given_conf().server_data.https.certificate !== ctrl.server_data.https.certificate())))
                )
                ||
                (ctrl.server_data.type() === 'greenlock' &&
                    ((ctrl.server_data.greenlock.owner_email() && ctrl.server_data.greenlock.domains().some(domain => !!domain)) &&
                        ((!ctrl.given_conf().server_data || !ctrl.given_conf().server_data.greenlock) ||
                            (ctrl.given_conf().server_data.greenlock.owner_email !== ctrl.server_data.greenlock.owner_email() ||
                                (ctrl.given_conf().server_data.greenlock.domains.length !== ctrl.server_data.greenlock.domains().filter(domain => !!domain).length ||
                                    !(ctrl.server_data.greenlock.domains().slice().sort().every(function(value, index) { return value === ctrl.given_conf().server_data.greenlock.domains.slice().sort()[index];}))
                                )
                            )
                        )
                    )
                );
            ctrl.server_data.updated(updated);
            return m.redraw();
        }

        function show_success_notification(res) {
            if(res)
                ctrl.notifications.show_success(res.filter(mes=>!!mes).join(' | '));
        }

        function show_fail_notification(res) {
            ctrl.notifications.show_danger(res);
        }

        function do_update_config(){
            ctrl.donot_update(true);
            m.redraw();
            update_config(ctrl.fingerprint, ctrl.gmail, ctrl.dbx, ctrl.server_data)
                .then((res)=> {
                    ctrl.donot_update(false);

                    show_success_notification(res);
                    ctrl.fingerprint.updated(false);
                    ctrl.gmail.updated(false);
                    ctrl.dbx.updated(false);
                    ctrl.server_data.updated(false);

                    return get_config()
                        .then(response => set_values(response));
                })
                .catch((error) => {ctrl.donot_update(false); return show_fail_notification(error.message);})
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
                    m('.col-sm-10', [
                        m('h3', 'Configuration')
                    ])
                ]),
                m('.row', [
                    m('.col-sm-3', m('strong', 'Disk usage:')),
                    m('.col-sm-8',[
                        m('table.table', [
                            m('tr', [
                                m('th', 'Filesystem'),
                                m('th', 'Type'),
                                m('th', 'Size'),
                                m('th', 'Used'),
                                m('th', 'Avail'),
                                m('th', 'Use%'),
                                m('th', 'Mounted on')
                            ]),
                            m('tr', [
                                m('td', ctrl.usage().Filesystem),
                                m('td', ctrl.usage().Type),
                                m('td', ctrl.usage().Size),
                                m('td', ctrl.usage().Used),
                                m('td', ctrl.usage().Avail),
                                m('td', ctrl.usage().Use),
                                m('td', ctrl.usage().MountedOn)
                            ])
                        ]),
                        m('a', {href:'javascript:void(0)', onclick: ()=>ctrl.toggle_data_per_user()},[
                            'Data per user ',
                            ctrl.show_data_per_user() ? m('i.fa.fa-folder-open') : m('i.fa.fa-folder')
                        ]),
                        !ctrl.show_data_per_user() ? '' :
                            m('table.table', [
                            m('tr.tr', [
                                m('th', 'Username'),
                                m('th', 'Size')
                            ]),
                            ctrl.usage().data_per_user.map(user=>

                                m('tr', [
                                    m('td', user.user),
                                    m('td', user.size)
                                ]))
                        ])
                    ]),
                ]),


                m('hr'),
                m('.row', [
                    m('.col-sm-3', [ m('strong', 'Fingerprint:'),
                        m('.text-muted', ['Configuring your fingerprint preferences ', m('i.fa.fa-info-circle')]),
                        m('.card.info-box.card-header', ['Fingerprint is a method of identifying unique browsers and tracking online activity ', m('a', {href:'#'}, 'Read more here'), '.']),
                    ]),
                    m('.col-sm-6',[
                        m('div', m('label.c-input.c-radio', [
                            m('input[type=radio]', {
                                onclick: ()=>ctrl.toggle_visibility('fingerprint', false),
                                checked: !ctrl.fingerprint.enable(),
                            }), m('span.c-indicator'), ' Disable Fingerprint'
                        ])),
                        m('div', m('label.c-input.c-radio', [
                            m('input[type=radio]', {
                                onclick: ()=>ctrl.toggle_visibility('fingerprint', true),
                                checked: ctrl.fingerprint.enable(),
                            }), m('span.c-indicator'), ' Enable Fingerprint'
                        ]))
                    ])
                ]),
                m('hr'),

                m('.row', [
                    m('.col-sm-3', [ m('strong', 'Gmail:'),

                        m('.text-muted', ['Gmail account is used for email sending ', m('i.fa.fa-info-circle')]),
                        m('.card.info-box.card-header', ['Gmail account allows you to send emails (e.g., activation & reset password) in the system. ', m('a', {href:'#'}, 'Read more here'), '.']),


                    ]),
                    m('.col-sm-8',[
                        m('div', m('label.c-input.c-radio', [
                            m('input[type=radio]', {
                                onclick: ()=>ctrl.toggle_visibility('gmail', false),
                                checked: !ctrl.gmail.enable(),
                            }), m('span.c-indicator'), ' Disable Gmail'
                        ])),
                        m('div', m('label.c-input.c-radio', [
                            m('input[type=radio]', {
                                onclick: ()=>ctrl.toggle_visibility('gmail', true),
                                checked: ctrl.gmail.enable(),
                            }), m('span.c-indicator'), ' Enable Gmail'
                        ])),

                        m('.form-group.row', [
                            m('.col-sm-2', [
                                m('label.form-control-label', 'Email')
                            ]),
                            m('.col-sm-5', [
                                m('input.form-control', {
                                    type:'input',
                                    autocomplete: 'off',
                                    placeholder: 'Email',
                                    value: ctrl.gmail.email(),
                                    oninput: (e)=> ctrl.update_gmail_fields(ctrl, {email: e.target.value}),
                                    onchange: (e)=> ctrl.update_gmail_fields(ctrl, {email: e.target.value})
                                })
                            ])
                        ]),
                        m('.form-group.row', [
                            m('.col-sm-2', [
                                m('label.form-control-label', 'Password')
                            ]),

                            m('.col-sm-5', [
                                !ctrl.gmail.show_password() && ctrl.gmail.password()?

                                    m('a', {href:'javascript:void(0)', onclick: ()=>ctrl.show_gmail_password(ctrl)},'Show password')  :

                                    m('input.form-control', {
                                        type:'input',
                                        placeholder: 'Password',
                                        value: ctrl.gmail.password(),
                                        oninput: (e)=> ctrl.update_gmail_fields(ctrl, {password: e.target.value}),
                                        onchange: (e)=> ctrl.update_gmail_fields(ctrl, {password: e.target.value})
                                    })
                            ])
                        ])
                    ])
                ]),
                m('hr'),
                m('.row', [
                    m('.col-sm-3', [ m('strong', 'Dropbox:'),
                        m('.text-muted', ['Dropbox application is used to synchronize file with Dropbox ', m('i.fa.fa-info-circle')]),
                        m('.card.info-box.card-header', ['Dropbox application allows your user to synchronize their files with their Dropbox account. ', m('a', {href:'#'}, 'Read more here'), '.']),
                    ]),m('.col-sm-8',[
                        m('div', m('label.c-input.c-radio', [
                            m('input[type=radio]', {
                                onclick: ()=>ctrl.toggle_visibility('dbx', false),
                                checked: !ctrl.dbx.enable(),
                            }), m('span.c-indicator'), ' Disable Dropbox synchronization'
                        ])),
                        m('div', m('label.c-input.c-radio', [
                            m('input[type=radio]', {
                                onclick: ()=>ctrl.toggle_visibility('dbx', true),
                                checked: ctrl.dbx.enable(),
                            }), m('span.c-indicator'), ' Enable Dropbox synchronization'
                        ])),

                        m('.form-group.row', [
                            m('.col-sm-2', [
                                m('label.form-control-label', 'App key')
                            ]),
                            m('.col-sm-5', [
                                m('input.form-control', {
                                    type:'input',
                                    placeholder: 'App key',
                                    value: ctrl.dbx.app_key(),
                                    oninput: (e)=> ctrl.update_dbx_fields(ctrl, {app_key: e.target.value}),
                                    onchange: (e)=> ctrl.update_dbx_fields(ctrl, {app_key: e.target.value})
                                })
                            ])
                        ]),
                        m('.form-group.row', [
                            m('.col-sm-2', [
                                m('label.form-control-label', 'App secret')
                            ]),
                            m('.col-sm-5', [
                                m('input.form-control', {
                                    type:'input',
                                    placeholder: 'App secret',
                                    value: ctrl.dbx.app_secret(),
                                    oninput: (e)=> ctrl.update_dbx_fields(ctrl, {app_secret: e.target.value}),
                                    onchange: (e)=> ctrl.update_dbx_fields(ctrl, {app_secret: e.target.value})
                                })
                            ])
                        ]),
                    ])
                ]),
                m('hr'),

                m('.row', [
                    m('.col-sm-3', [ m('strong', 'Server type:'),
                        m('.text-muted', ['Certifications details for the server ', m('i.fa.fa-info-circle')]),
                        m('.card.info-box.card-header', ['Her you can define what will be the type of the server and the kind of certifications it will be included. ', m('a', {href:'#'}, 'Read more here'), '.']),
                    ]),
                    m('.col-sm-4',[
                        m('.input-group', [m('strong', 'Server type'),
                            m('select.c-select.form-control',{onchange: (e)=> ctrl.update_server_type_fields(ctrl, {type: e.target.value})}, [
                                m('option', {selected:ctrl.server_data.type()==='http', value:'http'}, 'Http'),
                                m('option', {selected:ctrl.server_data.type()==='https', value:'https'}, 'Https'),
                                m('option', {selected:ctrl.server_data.type()==='greenlock', value:'greenlock'}, 'Greenlock'),
                            ])
                        ])
                    ]),
                    m('.col-sm-8',[
                        ctrl.server_data.type()!=='https' ? '':
                            [
                                m('.form-group.row.space', [
                                    m('.col-sm-2', [
                                        m('label.form-control-label', 'Private key')
                                    ]),
                                    m('.col-sm-5', [
                                        m('textarea.form-control',  {
                                            value: ctrl.server_data.https.private_key(),
                                            oninput: (e)=> ctrl.update_server_type_fields(ctrl, {https:{private_key: e.target.value}}),
                                            onchange: (e)=> ctrl.update_server_type_fields(ctrl, {https:{private_key: e.target.value}})
                                        })
                                    ])
                                ]),
                                m('.form-group.row.space', [
                                    m('.col-sm-2', [
                                        m('label.form-control-label', 'Certificate')
                                    ]),
                                    m('.col-sm-5', [
                                        m('textarea.form-control',  {value: ctrl.server_data.https.certificate(),
                                            oninput: (e)=> ctrl.update_server_type_fields(ctrl, {https:{certificate: e.target.value}}),
                                            onchange: (e)=> ctrl.update_server_type_fields(ctrl, {https:{certificate: e.target.value}})                                })
                                    ])
                                ]),
                                m('.form-group.row.space', [
                                    m('.col-sm-2', [
                                        m('label.form-control-label', 'Port')
                                    ]),
                                    m('.col-sm-5', [
                                        m('input.form-control', {
                                            type:'input',
                                            placeholder: 'Port',
                                            value: ctrl.server_data.https.port(),
                                            oninput: (e)=> ctrl.update_server_type_fields(ctrl, {https:{port: e.target.value}}),
                                            onchange: (e)=> ctrl.update_server_type_fields(ctrl, {https:{port: e.target.value}})                                })
                                    ])
                                ]),
                            ],
                        ctrl.server_data.type()!=='greenlock' ? '' : [
                            m('.form-group.row.space', [
                                m('.col-sm-2', [
                                    m('label.form-control-label', 'Owner email')
                                ]),
                                m('.col-sm-6', [
                                    m('input.form-control', {
                                        type:'input',
                                        placeholder: 'Owner email',
                                        value: ctrl.server_data.greenlock.owner_email(),
                                        oninput: (e)=> ctrl.update_server_type_fields(ctrl, {greenlock:{owner_email: e.target.value}}),
                                        onchange: (e)=> ctrl.update_server_type_fields(ctrl, {greenlock:{owner_email: e.target.value}})                                })
                                ])
                            ]),
                            m('.form-group.row.space', [
                                m('.col-sm-2', [
                                    m('label.form-control-label', 'Domains')
                                ]),
                                m('.col-sm-9',
                                    ctrl.server_data.greenlock.domains().map((domain, id)=>
                                        m('.form-group.row', [
                                            m('.col-sm-8',
                                                m('input.form-control', {
                                                    type:'input',
                                                    placeholder: `Domain ${id+1}`,
                                                    value: domain,
                                                    oninput: (e)=> ctrl.update_server_type_fields(ctrl, {greenlock:{domain: e.target.value, id}}),
                                                    onchange: (e)=> ctrl.update_server_type_fields(ctrl, {greenlock:{domain: e.target.value, id}})
                                                })
                                            ),
                                            m('.col-sm-1',
                                                m('button.btn.btn-primary', {onclick: ()=>ctrl.update_server_type_fields(ctrl, {greenlock:{remove:id}})},'X')
                                            )
                                        ])),
                                    ctrl.server_data.greenlock.domains().some(domain=> domain==='') ? '' :
                                        m('.form-group.row', [
                                            m('.col-sm-8',
                                                m('input.form-control', {
                                                    type:'input',
                                                    placeholder: `Domain ${ctrl.server_data.greenlock.domains().length+1}`,
                                                    value: '',
                                                    oninput: (e)=> ctrl.update_server_type_fields(ctrl, {greenlock:{domain: e.target.value, id:-1}}),
                                                    onchange: (e)=> ctrl.update_server_type_fields(ctrl, {greenlock:{domain: e.target.value, id:-1}})
                                                })
                                            )
                                        ])
                                )]),
                        ],
                    ])
                ]),

                m('.row.central_panel', [
                    m('.col-sm-2', m('button.btn.btn-primary', {disabled: ctrl.donot_update() || (!ctrl.fingerprint.updated() && !ctrl.gmail.updated() && !ctrl.dbx.updated() && !ctrl.server_data.updated()), onclick: ctrl.do_update_config},'Save'))
                ]),
                m('div', ctrl.notifications.view()),

            ]);
    }
};