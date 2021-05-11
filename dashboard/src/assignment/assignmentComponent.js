import {login, check_connectivity} from './assignmentModel';
import fullHeight from 'utils/fullHeight';
export default assignmentComponent;

let assignmentComponent = {
    controller(){
        const ctrl = {
            loaded:m.prop(false),
            email_address:m.prop(''),
            quest:m.prop(''),
            validity:m.prop(true),
            set_email,
            loginAction,
            error: m.prop('')
        };
        check_connectivity()
            .then(status=>{
                if (status)
                    return window.location.href = '/assign';
                console.log('xoxo');
                ctrl.loaded(true);
                m.redraw()
            });
        return ctrl;

        function loginAction(){
            if(ctrl.email_address())
                login(ctrl.email_address)
                    .then(data => {
                        document.open();
                        document.write(data);
                        document.close();
                    })
                    .catch(response => {
                        ctrl.error(response.message);
                        m.redraw();
                    })
                ;
        }
        function set_email(e){
            ctrl.email_address(e.target.value);
            ctrl.validity(e.target.validationMessage==='');
        }
    },
    view(ctrl){

        return !ctrl.loaded()
            ?
            m('.loader')
            :
        ctrl.quest()? m('', m.trust(ctrl.quest())) :
            m('.container.space.homepage', { config:fullHeight},[
                m('.row.space.centrify', [
                    m('h1', 'Login'),
                    m('.col-md-5.space',
                        m('form.homepage-background', {onsubmit:()=>false}, [
                            m('.space', 'Email address'),
                            m('input.form-control', {
                                type:'email',
                                placeholder: 'Email address',
                                value: ctrl.email_address(),
                                name: 'email_address',
                                autofocus:true,
                                oninput: e=>ctrl.set_email(e),
                                onkeydown: (e)=>{(e.keyCode == 13) ? ctrl.loginAction: false;},
                                config: getStartValue(ctrl.email_address)
                            }),
                            !ctrl.error() ? '' : m('.alert.alert-warning', m('strong', 'Error: '), ctrl.error()),
                            m('button.btn.btn-primary.btn-block.space.double_space', {onclick: ctrl.loginAction},'Login')
                        ])
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
