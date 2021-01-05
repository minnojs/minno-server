import {fetchJson} from 'utils/modelHelpers';
import {PIUrl} from 'modelUrls';


function deploy_url(study_id)
{
    return `${PIUrl}/deploy/${encodeURIComponent(study_id)}`;
}

export let get_study_prop = (study_id) => fetchJson(deploy_url(study_id), {
    method: 'get'
});

export let study_removal = (study_id, ctrl) => fetchJson(deploy_url(study_id), {
    method: 'delete',
    body: {study_name: ctrl.study_name, completed_n: ctrl.completed_n, comments: ctrl.comments}
});

export let deploy = (study_id, ctrl) => fetchJson(deploy_url(study_id), {
    method: 'post',
    body: {props:{sets: ctrl.sets, launch_confirmation: ctrl.launch_confirmation, comments: ctrl.comments}}
});

export let update_deploy = (study_id, version_id, {deploy_id, priority, target_number, comments}) => fetchJson(deploy_url(study_id), {
    method: 'put',
    body: {props: {deploy_id, version_id, priority, target_number, comments}}
});

export let Study_change_request = (study_id, ctrl) => fetchJson(deploy_url(study_id), {
    method: 'put',
    body: {file_names: ctrl.file_names, target_sessions: ctrl.target_sessions, status: ctrl.status, comments: ctrl.comments}
});
