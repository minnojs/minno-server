import {fetchJson} from 'utils/modelHelpers';
import {PIUrl} from 'modelUrls';


function rules_url(id = '') {
    if (id==='')
        return `${PIUrl}/rules`;
    return `${PIUrl}/rules/${id}`;

}
function deployer_rules_url(id = '') {
    if (id==='')
        return `${PIUrl}/deployer_rules`;
    return `${PIUrl}/deployer_rules/${id}`;

}



export let get_rules = () => fetchJson(rules_url(), {
    method: 'get'
});


export let get_deployer_rules = () => fetchJson(deployer_rules_url(), {
    method: 'get'
});

export let save_new_set = (rules, deployer = false) =>
    fetchJson(deployer ? deployer_rules_url()  : rules_url(), {
        method: 'post',
        body: {rules}
    });


export let update_set = (rules, deployer = false) =>
    fetchJson(deployer ? deployer_rules_url()  : rules_url(), {
        method: 'put',
        body: {rules}
    });


export let remove_set = (set_id, deployer = false) =>
    fetchJson(deployer ? deployer_rules_url(set_id)  : rules_url(set_id), {
        method: 'delete',
    });
