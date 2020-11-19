import {fetchJson} from 'utils/modelHelpers';
import {PIUrl} from 'modelUrls';


function rules_url() {
    return `${PIUrl}/rules`;
}

function rule_url(set_name) {
    return `${PIUrl}/rules/${set_name}`;
}

export let get_rules = () => fetchJson(rules_url(), {
    method: 'get'
});

export let save_new_set = (rules) =>
    fetchJson(rules_url(), {
        method: 'post',
        body: {rules}
    });


export let update_set = (rules) =>
    fetchJson(rules_url(), {
        method: 'put',
        body: {rules}
    });


export let remove_set = (set_id) =>
    fetchJson(rule_url(set_id), {
        method: 'delete',
    });
