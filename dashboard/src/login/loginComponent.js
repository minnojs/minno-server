import {login, getAuth} from './authModel';
import fullHeight from 'utils/fullHeight';
export default loginComponent;

let loginComponent = {
    controller(){
        const ctrl = {
            homepage:{
                upper_panel:m.prop(''),
                right_panel:m.prop(''),
            },
            username:m.prop(''),
            password:m.prop(''),
            isloggedin: false,
            loginAction,
            error: m.prop('')
        };
        is_loggedin();
        return ctrl;

        function loginAction(){
            if(ctrl.username() && ctrl.password())
                login(ctrl.username, ctrl.password)
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
                ctrl.homepage.upper_panel(!response.homepage.upper_panel ? '' : response.homepage.upper_panel);
                ctrl.homepage.right_panel(!response.homepage.right_panel ? '' : response.homepage.right_panel);
            })
            .then(m.redraw);
        }
    },
    view(ctrl){
        return m('.container.space.homepage', { config:fullHeight},[
            m('.row', [
                m('.col-md-12',
                    m('',
                        m.trust(ctrl.homepage.upper_panel()))
                )
            ]),
            m('.row.space', {class: !ctrl.homepage.right_panel() ? 'centrify' : ''}, [
                m('.col-md-5.space',
                    m('form.homepage-background', {onsubmit:()=>false}, [
                        m('.space', 'Username / Email'),
                        m('input.form-control', {
                            type:'username',
                            placeholder: 'Username / Email',
                            value: ctrl.username(),
                            name: 'username',
                            autofocus:true,
                            oninput: m.withAttr('value', ctrl.username),
                            onkeydown: (e)=>{(e.keyCode == 13) ? ctrl.loginAction: false;},
                            onchange: m.withAttr('value', ctrl.username),
                            config: getStartValue(ctrl.username)
                        }),
                        m('.space', 'Password'),
                        m('input.form-control', {
                            type:'password',
                            name:'password',
                            placeholder: 'Password',
                            value: ctrl.password(),
                            oninput: m.withAttr('value', ctrl.password),
                            onkeydown: (e)=>{(e.keyCode == 13) ? ctrl.loginAction: false;},
                            onchange: m.withAttr('value', ctrl.password),
                            config: getStartValue(ctrl.password)
                        }),
                        !ctrl.error() ? '' : m('.alert.alert-warning', m('strong', 'Error: '), ctrl.error()),
                        m('button.btn.btn-primary.btn-block', {onclick: ctrl.loginAction},'Sign in'),
                        m('p.text-center',
                            m('small.text-muted',  m('a', {href:'index.html?/recovery'}, 'Lost your password?'))
                        )
                    ])
                ),
                !ctrl.homepage.right_panel()
                    ?
                    ''
                    :
                    m('.col-md-7.space',
                        m('.homepage-background',
                            m.trust(ctrl.homepage.right_panel()))
                    )
            ])
        ]);
    }
};

function getStartValue(prop){
    return (element, isInit) => {// !isInit && prop(element.value);
        if (!isInit) setTimeout(()=>prop(element.value), 30);
    };
}
