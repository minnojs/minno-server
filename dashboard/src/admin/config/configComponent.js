import {get_config, set_gmail_params, unset_gmail_params, set_dbx_params, unset_dbx_params, set_recaptcha_params, unset_recaptcha_params} from './configModel';


export default configComponent;

let configComponent = {
    controller(){
        let ctrl = {
            loaded:m.prop(false),
            gmail: {
                setted: m.prop(false),
                enable: m.prop(false),
                email:m.prop(''),
                password:m.prop(''),
                can_save:m.prop(false),
                error:m.prop('')
            },
            dbx: {
                setted: m.prop(false),
                enable: m.prop(false),
                client_id:m.prop(''),
                client_secret:m.prop(''),
                can_save:m.prop(false),
                error:m.prop('')
            },
            recaptcha: {
                setted: m.prop(false),
                enable: m.prop(false),
                site_key:m.prop(''),
                secret_key:m.prop(''),
                attempts:m.prop('3'),
                can_save:m.prop(false),
                error:m.prop('')
            },

            toggle_visibility,
            set_gmail,
            unset_gmail,
            set_dbx,
            unset_dbx,
            set_recaptcha,
            unset_recaptcha,
            update_gmail_fields,
            update_dbx_fields,
            update_recaptcha_fields
        };


        function set_values(response){
            if(response.config.gmail)
                ctrl.gmail.setted(true) && ctrl.gmail.enable(true) && ctrl.gmail.email(response.config.gmail.email) && ctrl.gmail.password(response.config.gmail.password);
            if(response.config.dbx)
                ctrl.dbx.setted(true) && ctrl.dbx.enable(true) && ctrl.dbx.client_id(response.config.dbx.client_id) && ctrl.dbx.client_secret(response.config.dbx.client_secret);
            if(response.config.recaptcha)
                ctrl.recaptcha.setted(true) && ctrl.recaptcha.enable(true) && ctrl.recaptcha.site_key(response.config.recaptcha.site_key) && ctrl.recaptcha.secret_key(response.config.recaptcha.secret_key) && ctrl.recaptcha.attempts(response.config.recaptcha.attempts);
        }

        function toggle_visibility(variable, state){
            ctrl[variable].error('');
            ctrl[variable].enable(state);
        }

        function load() {
            get_config()
                .then(response => set_values(response))
                .then(()=>ctrl.loaded(true))
                .catch(error => {
                    ctrl.col_error(error.message);
                }).then(m.redraw);
        }


        function set_gmail() {
            ctrl.gmail.error('');
            set_gmail_params(ctrl.gmail.email, ctrl.gmail.password)
                .catch(error => {
                    ctrl.gmail.error(error.message);
                })
                .then(ctrl.gmail.setted(true))
                .then(ctrl.gmail.enable(true))
                .then(m.redraw);
        }

        function unset_gmail() {
            ctrl.gmail.error('');
            unset_gmail_params()
                .catch(error => {
                    ctrl.gmail.error(error.message);
                })
                .then(ctrl.gmail.setted(false))
                .then(ctrl.gmail.enable(false))
                .then(ctrl.gmail.email(''))
                .then(ctrl.gmail.password(''))
                .then(m.redraw);
        }

        function update_gmail_fields(ctrl, fields){
            ctrl.gmail.email(fields.email ? fields.email : ctrl.gmail.email());
            ctrl.gmail.password(fields.password ? fields.password : ctrl.gmail.password());
            ctrl.gmail.can_save(true);
            return m.redraw();
        }

        function set_dbx() {
            ctrl.dbx.error('');
            set_dbx_params(ctrl.dbx.client_id, ctrl.dbx.client_secret)
                .catch(error => {
                    ctrl.dbx.error(error.message);
                })
                .then(ctrl.dbx.setted(true))
                .then(ctrl.dbx.enable(true))
                .then(m.redraw);
        }

        function unset_dbx() {
            unset_dbx_params()
                .catch(error => {
                    ctrl.dbx.error(error.message);
                })
                .then(ctrl.dbx.setted(false))
                .then(ctrl.dbx.enable(false))
                .then(ctrl.dbx.client_id(''))
                .then(ctrl.dbx.client_secret(''))
                .then(m.redraw);
        }


        function update_dbx_fields(ctrl, fields){
            ctrl.dbx.client_id(fields.client_id ? fields.client_id : ctrl.dbx.client_id());
            ctrl.dbx.client_secret(fields.client_secret ? fields.client_secret : ctrl.dbx.client_secret());
            ctrl.dbx.can_save(true);
            return m.redraw();
        }

        function set_recaptcha() {
            ctrl.recaptcha.error('');
            set_recaptcha_params(ctrl.recaptcha.site_key, ctrl.recaptcha.secret_key, ctrl.recaptcha.attempts)
                .catch(error => {
                    ctrl.recaptcha.error(error.message);
                })
                .then(ctrl.recaptcha.setted(true))
                .then(ctrl.recaptcha.enable(true))
                .then(m.redraw);
        }

        function unset_recaptcha() {
            unset_recaptcha_params()
                .catch(error => {
                    ctrl.recaptcha.error(error.message);
                })
                .then(ctrl.recaptcha.setted(false))
                .then(ctrl.recaptcha.enable(false))
                .then(ctrl.recaptcha.site_key(''))
                .then(ctrl.recaptcha.secret_key(''))
                .then(m.redraw);
        }

        function update_recaptcha_fields(ctrl, fields){
            ctrl.recaptcha.site_key(fields.site_key ? fields.site_key : ctrl.recaptcha.site_key());
            ctrl.recaptcha.secret_key(fields.secret_key ? fields.secret_key : ctrl.recaptcha.secret_key());
            ctrl.recaptcha.attempts(fields.attempts ? fields.attempts : ctrl.recaptcha.attempts());
            ctrl.recaptcha.can_save(true);
            return m.redraw();
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
                        m('h3', 'Edit configuration')
                    ])
                ]),

                m('.row.centrify',
                    [m('.card.card-inverse.col-md-5.centrify', [

                        !ctrl.gmail.enable() ?
                            m('a', {onclick: ()=>ctrl.toggle_visibility('gmail', true)},
                                m('button.btn.btn-primary.btn-block', [
                                    m('i.fa.fa-fw.fa-envelope'), ' Enable support with email'
                                ])
                            )
                            :
                            m('.card-block',[
                                m('h4', 'Enter details for Gmail accont'),
                                m('form', [
                                    m('input.form-control', {
                                        type:'input',
                                        placeholder: 'Gmail accont',
                                        value: ctrl.gmail.email(),

                                        // e => update_url(e.target.value)
                                        oninput: (e)=> ctrl.update_gmail_fields(ctrl, {email: e.target.value}),
                                        onchange: (e)=> ctrl.update_gmail_fields(ctrl, {email: e.target.value})
                                    }),

                                    m('input.form-control', {
                                        type:'input',
                                        placeholder: 'password',
                                        value: ctrl.gmail.password(),
                                        oninput: (e)=> ctrl.update_gmail_fields(ctrl, {password: e.target.value}),
                                        onchange: (e)=> ctrl.update_gmail_fields(ctrl, {password: e.target.value})
                                    })
                                ]),
                                ctrl.gmail.setted() ? ''  : m('button.btn.btn-secondery.btn-block', {onclick: ()=>ctrl.toggle_visibility('gmail', false)},'Cancel'),
                                m('button.btn.btn-primary.btn-block', {disabled: !ctrl.gmail.can_save(), onclick: ctrl.set_gmail},'Update'),
                                !ctrl.gmail.setted() ? '' : m('button.btn.btn-danger.btn-block', {onclick: ctrl.unset_gmail},'remove'),
                                !ctrl.gmail.error() ? '' : m('p.alert.alert-danger', ctrl.gmail.error()),
                            ])
                    ])

                    ]),
                m('.row.centrify',
                    m('.card.card-inverse.col-md-5.centrify', [
                        !ctrl.dbx.enable() ?
                            m('a', {onclick: ()=>ctrl.toggle_visibility('dbx', true)},
                                m('button.btn.btn-primary.btn-block', [
                                    m('i.fa.fa-fw.fa-dropbox'), ' Enable support with dropbox'
                                ])
                            )
                            :
                            m('.card-block',[
                                m('h4', 'Enter details for Dropbox application'),
                                m('form', [
                                    m('input.form-control', {
                                        type:'input',
                                        placeholder: 'client id',
                                        value: ctrl.dbx.client_id(),
                                        oninput: (e)=> ctrl.update_dbx_fields(ctrl, {client_id: e.target.value}),
                                        onchange: (e)=> ctrl.update_dbx_fields(ctrl, {client_id: e.target.value})
                                    }),

                                    m('input.form-control', {
                                        type:'input',
                                        placeholder: 'client secret',
                                        value: ctrl.dbx.client_secret(),
                                        oninput: (e)=> ctrl.update_dbx_fields(ctrl, {client_secret: e.target.value}),
                                        onchange: (e)=> ctrl.update_dbx_fields(ctrl, {client_secret: e.target.value})

                                    })
                                ]),
                                ctrl.dbx.setted() ? ''  : m('button.btn.btn-secondery.btn-block', {onclick: ()=>ctrl.toggle_visibility('dbx', false)},'Cancel'),
                                m('button.btn.btn-primary.btn-block', {disabled: !ctrl.dbx.can_save(), onclick: ctrl.set_dbx},'Update'),
                                !ctrl.dbx.setted() ? '' : m('button.btn.btn-danger.btn-block', {onclick: ctrl.unset_dbx},'remove'),
                                !ctrl.dbx.error() ? '' : m('p.alert.alert-danger', ctrl.dbx.error()),
                            ])

                            // <i class="far fa-shield-check"></i>
                    ])
                ),
                m('.row.centrify',
                    m('.card.card-inverse.col-md-5.centrify', [
                        !ctrl.recaptcha.enable() ?
                            m('a', {onclick: ()=>ctrl.toggle_visibility('recaptcha', true)},
                                m('button.btn.btn-primary.btn-block', [
                                    m('i.fa.fa-fw.fa-refresh'), ' Enable support with reCAPTCHA'
                                ])
                            )
                            :
                            m('.card-block',[
                                m('h4', 'Enter details for google reCAPTCHA'),
                                m('form', [
                                    m('input.form-control', {
                                        type:'input',
                                        placeholder: 'Site key',
                                        value: ctrl.recaptcha.site_key(),
                                        oninput: (e)=> ctrl.update_recaptcha_fields(ctrl, {site_key: e.target.value}),
                                        onchange: (e)=> ctrl.update_recaptcha_fields(ctrl, {site_key: e.target.value})

                                    }),

                                    m('input.form-control', {
                                        type:'input',
                                        placeholder: 'Secret key',
                                        value: ctrl.recaptcha.secret_key(),
                                        oninput: (e)=> ctrl.update_recaptcha_fields(ctrl, {secret_key: e.target.value}),
                                        onchange: (e)=> ctrl.update_recaptcha_fields(ctrl, {secret_key: e.target.value})

                                    }),
                                    m('input.form-control', {
                                        type:'number',
                                        min: '0',
                                        placeholder: 'Attempts',
                                        value: ctrl.recaptcha.attempts(),
                                        oninput: (e)=> ctrl.update_recaptcha_fields(ctrl, {attempts: e.target.value}),
                                        onchange: (e)=> ctrl.update_recaptcha_fields(ctrl, {attempts: e.target.value})

                                    })
                                ]),
                                ctrl.recaptcha.setted() ? ''  : m('button.btn.btn-secondery.btn-block', {onclick: ()=>ctrl.toggle_visibility('recaptcha', false)},'Cancel'),
                                m('button.btn.btn-primary.btn-block', {disabled: !ctrl.recaptcha.can_save(), onclick: ctrl.set_recaptcha},'Update'),
                                !ctrl.recaptcha.setted() ? '' : m('button.btn.btn-danger.btn-block', {onclick: ctrl.unset_recaptcha},'remove'),
                                !ctrl.recaptcha.error() ? '' : m('p.alert.alert-danger', ctrl.recaptcha.error()),
                            ])
                    ])
                )
            ]);
    }
};