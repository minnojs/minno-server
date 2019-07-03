import {login, getAuth} from './authModel';
import fullHeight from 'utils/fullHeight';
export default loginComponent;

let loginComponent = {
    controller(){
        const ctrl = {
            username:m.prop(''),
            password:m.prop(''),
            isloggedin: false,
            loginAction,
            error: m.prop('')
        };
        is_loggedin();

        setTimeout(function(){
            const captcha_dom = document.getElementById('g-recaptcha');
            if(captcha_dom.children.length === 0) {
                grecaptcha.render('g-recaptcha');
            }
        }, 500);

        return ctrl;

        function loginAction(){
            const recaptcha = document.getElementsByClassName('g-recaptcha-response')[0].value;

            if(ctrl.username() && ctrl.password())
                login(ctrl.username, ctrl.password, recaptcha)
                    .then(() => {
                        m.route(!location.hash ? './' : decodeURIComponent(location.hash).substring(1));
                    })
                    .catch(response => {
                        ctrl.error(response.message);
                        m.redraw();
                    })
                ;
        }

        function is_loggedin(){
            getAuth().then((response) => {
                if(response.isloggedin)
                    m.route('./');
            });
        }
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
                        m('.g-recaptcha#g-recaptcha', {
                            'data-sitekey':'6Lfo-6oUAAAAAPNqAYcmbiqTQnN8QzEINfDiajY7'
                        }),
                    ]),
                    !ctrl.error() ? '' : m('.alert.alert-warning', m('strong', 'Error: '), ctrl.error()),
                    m('button.btn.btn-primary.btn-block', {onclick: ctrl.loginAction},'Sign in'),
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
