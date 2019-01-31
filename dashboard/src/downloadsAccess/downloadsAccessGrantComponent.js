import messages from 'utils/messagesComponent';
import classNames from 'utils/classNames';
export default grantMessage;

let grantMessage = args => messages.custom({
    content: m.component(grantComponent, Object.assign({close:messages.close}, args)),
    wide: true
});

let grantComponent = {
    controller({output, close}){
        let downloadAccess ={
            studyId: m.prop(''),
            username: m.prop('')
        };

        // export study to calling component
        output(downloadAccess);


        let ctrl = {
            downloadAccess,
            submitAttempt: false,
            validity(){
                let response = {
                    studyId: downloadAccess.studyId(),
                    username: downloadAccess.username()
                };
                return response;
            },
            ok(){
                ctrl.submitAttempt = true;
                let response = ctrl.validity();
                let isValid = Object.keys(response).every(key => response[key]);

                if (isValid) close(true);
            },
            cancel() {
                close(null);
            }
        };

        return ctrl;
    },
    view(ctrl){
        let downloadAccess = ctrl.downloadAccess;
        let validity = ctrl.validity();
        let validationView = (isValid, message) => isValid || !ctrl.submitAttempt ? '' : m('small.text-muted', message);
        let groupClasses = valid => !ctrl.submitAttempt ? '' : classNames({
            'has-danger': !valid,
            'has-success' : valid
        });
        let inputClasses = valid => !ctrl.submitAttempt ? '' : classNames({
            'form-control-danger': !valid,
            'form-control-success': valid
        });

        return m('div',[
            m('h4', 'Grant Data Access'),
            m('.card-block', [
                m('.form-group', {class:groupClasses(validity.studyId)}, [
                    m('label', 'Study Id'),
                    m('input.form-control', {
                        config: focusConfig,
                        placeholder:'Study Id',
                        value: downloadAccess.studyId(),
                        oninput: m.withAttr('value', downloadAccess.studyId),
                        class:inputClasses(validity.studyId)
                    }),
                    m('label', 'Username'),
                    m('input.form-control', {
                        config: focusConfig,
                        placeholder:'Username',
                        value: downloadAccess.username(),
                        oninput: m.withAttr('value', downloadAccess.username),
                        class:inputClasses(validity.username)
                    }),
                    validationView(validity.studyId, 'The study ID is required in order to grant access.'),
                    validationView(validity.username, 'The username is required in order to grant access.')
                ])
                
                
            ]),
            m('.text-xs-right.btn-toolbar',[
                m('a.btn.btn-secondary.btn-sm', {onclick:ctrl.cancel}, 'Cancel'),
                m('a.btn.btn-primary.btn-sm', {onclick:ctrl.ok}, 'OK')
            ])
        ]);
    }
};

let focusConfig = (element, isInitialized) => {
    if (!isInitialized) element.focus();
};

