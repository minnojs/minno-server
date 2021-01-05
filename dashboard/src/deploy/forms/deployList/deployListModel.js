import {fetchJson} from 'utils/modelHelpers';
import {PIUrl} from 'modelUrls';


function deploy_url()
{
    return `${PIUrl}/deploy_list`;
}

function update_url(deploy_id)
{
    return `${PIUrl}/deploy_list/${deploy_id}`;
}

export function update_deploy(deploy_id, priority, pause_rules, status)
{
    return fetchJson(update_url(deploy_id), {
        method: 'put',
        body:{priority, pause_rules, status}
    });
}

export function get_deploys(){
    return fetchJson(deploy_url());
}