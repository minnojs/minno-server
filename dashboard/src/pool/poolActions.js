import {updateStudy, pause_study, unpause_study, remove_study, createStudy, updateStatus, getStudyId, resetStudy, STATUS_RUNNING} from './poolModel';
import messages from 'utils/messagesComponent';
import spinner from 'utils/spinnerComponent';
import editMessage from './poolEditComponent';
import createMessage from './poolCreateComponent';


export function play(study){
    return messages.confirm({
        header: 'Continue Study:',
        content: `Are you sure you want to continue "${study.studyId}"?`
    })
        .then(response => {
            if(response) {
                studyPending(study, true)();
                return updateStatus(study, STATUS_RUNNING)
                    .then(()=>study.studyStatus = STATUS_RUNNING)
                    .catch(reportError('Continue Study'))
                    .then(studyPending(study, false));
            }
        });
}

export function pause(study){
    return messages.confirm({
        header: 'Pause Study:',
        content: `Are you sure you want to pause "${study.study_name}"?`
    })
        .then(response => {
            if(response) {
                studyPending(study, true)();
                return pause_study(study)
                    .then(()=>study.study_status = 'paused')
                    .catch(reportError('Pause Study'))
                    .then(studyPending(study, false));
            }
        });
}
export function unpause(study){
    return messages.confirm({
        header: 'Unpause Study:',
        content: `Are you sure you want to unpause "${study.study_name}"?`
    })
        .then(response => {
            if(response) {
                studyPending(study, true)();
                return unpause_study(study)
                    .then(()=>study.study_status = 'running')
                    .catch(reportError('Unpause Study'))
                    .then(studyPending(study, false));
            }
        });
}

export let remove  = (study) => {
    return messages.confirm({
        header: 'Remove Study:',
        content: `Are you sure you want to remove "${study.study_name}" from the pool?`
    })
        .then(response => {
            if(response) {
                studyPending(study, true)();
                return remove_study(study, 'deleted')
                    .then(()=>study.study_status = 'removed')
                    .catch(reportError('Remove Study'))
                    .then(studyPending(study, false));
            }
        });
};

export let edit  = (input) => {
    let output = m.prop();
    return editMessage({input, output})
        .then(response => {
            if (response) {
                studyPending(input, true)();
                let study = Object.assign({}, input, unPropify(output()));
                return updateStudy(study)
                    .then(() => Object.assign(input, study)) // update study in view
                    .catch(reportError('Study Editor'))
                    .then(studyPending(input, false));
            }
        });
};

export let create = (list) => {
    let output = m.prop();
    return createMessage({output})
        .then(response => {
            if (response) {
                spinner.show();
                getStudyId(output())
                    .then(response => Object.assign(unPropify(output()), response)) // add response data to "newStudy"
                    .then(spinner.hide)
                    .then(editNewStudy);
            }
        });

    function editNewStudy(input){
        let output = m.prop();
        return editMessage({input, output})
            .then(response => {
                if (response) {
                    let study = Object.assign({
                        startedSessions: 0,
                        completedSessions: 0,
                        creationDate:new Date(),
                        studyStatus: STATUS_RUNNING
                    }, input, unPropify(output()));
                    return createStudy(study)
                        .then(() => list().push(study))
                        .then(m.redraw)
                        .catch(reportError('Create Study'));
                }
            });
    }
};

export let reset = study => {
    messages.confirm({
        header: 'Restart study',
        content: 'Are you sure you want to restart this study? This action will reset all started and completed sessions.'
    }).then(response => {
        if (response) {
            let old = {
                startedSessions: study.startedSessions,
                completedSessions: study.completedSessions
            };
            study.startedSessions = study.completedSessions = 0;
            m.redraw();
            return resetStudy(study)
                .catch(response => {
                    Object.assign(study, old);
                    return Promise.reject(response);
                })
                .catch(reportError('Restart study'));
        }
    });
};

let reportError = header => err => messages.alert({header, content: err.message});

let studyPending = (study, state) => () => {
    study.$pending = state;
    m.redraw();
};

let unPropify = obj => Object.keys(obj).reduce((result, key) => {
    result[key] = obj[key]();
    return result;
}, {});