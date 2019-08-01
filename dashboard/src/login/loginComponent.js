import {login, getAuth} from './authModel';
import fullHeight from 'utils/fullHeight';
export default loginComponent;

let loginComponent = {
    controller(){
        const ctrl = {
            username:m.prop(''),
            password:m.prop(''),
            isloggedin: false,
            recaptcha_site_key:m.prop(''),
            reCaptcha:m.prop(''),
            sent:m.prop(false),
            loginAction,
            error: m.prop('')
        };
        is_loggedin();

        function loginAction(){
            ctrl.error('');
            const reCaptcha = ctrl.reCaptcha();//!ctrl.recaptcha_site_key() ? '' : document.getElementsByClassName('g-recaptcha-response')[0].value;
            if (!reCaptcha)
                return;
            ctrl.sent(true);

            if(ctrl.username() && ctrl.password())
                login(ctrl.username, ctrl.password, reCaptcha)
                    .then(() => {
                        m.route(!location.hash ? './' : decodeURIComponent(location.hash).substring(1));
                    })
                    .catch(response => {
                        ctrl.error(response.message);
                        ctrl.recaptcha_site_key(response.reCaptcha);

                        reload_captcha();
                        ctrl.sent(false);

                        m.redraw();

                    })
                ;
        }

        function reload_captcha(){
            ctrl.sent(true);

            let script = document.createElement('script');
            script.onload = function () {
                //do stuff with the script
            };
            script.src = "https://www.google.com/recaptcha/api.js?render="+ctrl.recaptcha_site_key();


            document.head.appendChild(script);
            ctrl.sent(false);

            setTimeout(function(){
                grecaptcha.ready(function() {
                    grecaptcha.execute(ctrl.recaptcha_site_key(), {action: 'login'}).then(function(token) {
                        ctrl.reCaptcha(token);
                    });
                })

        }, 500);

            return;
            setTimeout(function(){
                const captcha_dom = document.getElementById('g-recaptcha');
                if(captcha_dom && captcha_dom.children.length === 0)
                    grecaptcha.render('g-recaptcha');

                if(captcha_dom && captcha_dom.children.length > 0)
                    grecaptcha.reset();

            }, 500);

        }


        function is_loggedin(){
            getAuth().then((response) => {
                if(response.isloggedin)
                    m.route('./');
                    ctrl.recaptcha_site_key(response.reCaptcha);
                    reload_captcha();
                m.redraw();
            });
        }
        return ctrl;
    },
    view(ctrl){

        return m('.login.centrify', {config:fullHeight},[
            m('.card.card-inverse.col-md-4', [
                m('.card-block',[
                    m('h4', 'Please sign in'),

                    m('form', {onsubmit:ctrl.loginAction}, [
                        m('input.form-control', {
                            type:'username',
                            placeholder: 'Username / Email',
                            value: ctrl.username(),
                            name: 'username',
                            autofocus:true,
                            oninput: m.withAttr('value', ctrl.username),
                            onkeydown: (e)=>{(e.keyCode == 13) ? ctrl.loginAction(): false;},
                            onchange: m.withAttr('value', ctrl.username),
                            config: getStartValue(ctrl.username)
                        }),
                        m('input.form-control', {
                            type:'password',
                            name:'password',
                            placeholder: 'Password',
                            value: ctrl.password(),
                            oninput: m.withAttr('value', ctrl.password),
                            onkeydown: (e)=>{(e.keyCode == 13) ? ctrl.loginAction(): false;},
                            onchange: m.withAttr('value', ctrl.password),
                            config: getStartValue(ctrl.password)
                        }),
                        !ctrl.recaptcha_site_key() ? '' : m('.g-recaptcha#g-recaptcha', {
                            'data-sitekey':ctrl.recaptcha_site_key()
                        }),
                    ]),
                    !ctrl.error() ? '' : m('.alert.alert-warning', m('strong', 'Error: '), ctrl.error()),
                    m('button.btn.btn-primary.btn-block', {disabled:ctrl.sent(), onclick: ctrl.loginAction},'Sign in'),
                    m('p.text-center',
                        m('small.text-muted',  m('a', {href:'index.html?/recovery'}, 'Lost your password?'))
                    )

                ])
            ])
        ]);
    }
};

function getStartValue(prop){
    return (element, isInit) => {// !isInit && prop(element.value);
        if (!isInit) setTimeout(()=>prop(element.value), 30);
    };
}
