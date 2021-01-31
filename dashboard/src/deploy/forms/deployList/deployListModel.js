import {fetchJson} from 'utils/modelHelpers';
import {PIUrl} from 'modelUrls';


function deploys_url()
{
    return `${PIUrl}/deploy_request`;
}

function deploy_url(deploy_id)
{
    return `${PIUrl}/deploy_request/${deploy_id}`;
}

function edit_deploy_url(study_id)
{
    return `${PIUrl}/deploy/${study_id}`;
}

export function update_deploy(deploy_id, priority, pause_rules, reviewer_comments, status)
{
    return fetchJson(deploy_url(deploy_id), {
        method: 'put',
        body:{priority, pause_rules, reviewer_comments, status}
    });
}
export let edit_deploy = (study_id, version_id, {deploy_id, priority, target_number, comments, changed}) => fetchJson(edit_deploy_url(study_id), {
    method: 'put',
    body: {props: {deploy_id, version_id, priority, target_number, comments, changed}}
});



export function get_deploy(deploy_id)
{
    return fetchJson(deploy_url(deploy_id));
}

export function get_deploys(){
    return fetchJson(deploys_url());
}