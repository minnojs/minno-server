import {fetchJson} from 'utils/modelHelpers';
import {poolUrl as url} from 'modelUrls';

export const STATUS_RUNNING = 'R';
export const STATUS_PAUSED = 'P';
export const STATUS_STOP = 'S';

export function createStudy(study){
    let body = Object.assign({
        action:'insertRulesTable',
        creationDate: new Date(),
        studyStatus: STATUS_RUNNING
    }, study);

    return fetchJson(url, {method: 'post', body: body})
        .then(interceptErrors);
}

export function updateStudy(study){
    let body = Object.assign({
        action:'updateRulesTable'
    }, study);

    return  fetchJson(url, {method: 'post',body:body})
        .then(interceptErrors);
}

export function updateStatus(study, status){
    let body = Object.assign({
        action:'updateStudyStatus'
    }, study,{studyStatus: status});

    return  fetchJson(url, {method: 'post',body:body})
        .then(interceptErrors);
}

export function getAllPoolStudies(){
    return fetchJson(url, {method:'post', body: {action:'getAllPoolStudies'}})
        .then(interceptErrors);
}

export function getLast100PoolUpdates(){
    return fetchJson(url, {method:'post', body: {action:'getLast100PoolUpdates'}})
        .then(interceptErrors);
}

export function getStudyId(study){
    let body = Object.assign({
        action:'getStudyId'
    }, study);

    return  fetchJson(url, {method: 'post',body:body});
}

export function resetStudy(study){
    return fetchJson(url, {method:'post', body: Object.assign({action:'resetCompletions'}, study)})
        .then(interceptErrors);
}

function interceptErrors(response){
    if (!response.error){
        return response;
    }

    let errors = {
        1: 'This ID already exists.',
        2: 'The study could not be found.',
        3: 'The rule file could not be found.',
        4: 'The rules file does not fit the "research" schema.'
    };

    return Promise.reject({message: errors[response.error]});
}
