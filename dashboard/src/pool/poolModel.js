import {fetchJson} from 'utils/modelHelpers';
import {poolUrl as url} from 'modelUrls';
import {PIUrl} from 'modelUrls';

export const STATUS_RUNNING = 'R';
export const STATUS_PAUSED = 'P';
export const STATUS_STOP = 'S';


function pool_url()
{
    return `${PIUrl}/research_pool`;
}
function pool_study_url(deploy_id)
{
    return `${PIUrl}/research_pool/${deploy_id}`;
}


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
    return fetchJson(pool_url(), {method:'post', body: {action:'getAllPoolStudies'}})
        .then(interceptErrors);
}

export function pause_study(study){
    return fetchJson(pool_study_url(study.deploy_id), {method:'post', body:{status: 'paused'}})
        .then(interceptErrors);
}

export function unpause_study(study){
    return fetchJson(pool_study_url(study._id), {method:'post', body:{status: 'running'}})
        .then(interceptErrors);
}

export function remove_study(study){
    return fetchJson(pool_study_url(study.deploy_id), {method:'delete'})
        .then(interceptErrors);
}

export function get_deploy(study){
    return fetchJson(pool_study_url(study.deploy_id)).then(interceptErrors);
}

export function getLast100PoolUpdates(){
    return fetchJson(pool_url(), {method:'post', body: {action:'getLast100PoolUpdates'}})
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
