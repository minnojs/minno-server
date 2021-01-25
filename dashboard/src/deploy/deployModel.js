import {fetchJson} from 'utils/modelHelpers';
import {PIUrl} from 'modelUrls';


function deploy_url(study_id)
{
    return `${PIUrl}/deploy/${encodeURIComponent(study_id)}`;
}

export let deploy = (study_id, ctrl) => fetchJson(deploy_url(study_id), {
    method: 'post',
    body: {props:{version_id:ctrl.version_id, sets: ctrl.sets, launch_confirmation: ctrl.launch_confirmation, planned_procedure: ctrl.planned_procedure, sample_size:ctrl.sample_size, comments: ctrl.comments}}
});


export let Study_change_request = (study_id, ctrl) => fetchJson(deploy_url(study_id), {
    method: 'put',
    body: {file_names: ctrl.file_names, target_sessions: ctrl.target_sessions, status: ctrl.status, comments: ctrl.comments}
});
