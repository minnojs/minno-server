import {fetchJson} from 'utils/modelHelpers';
import {baseUrl} from 'modelUrls';


function datapipe_url()
{
    return `${baseUrl}/datapipe`;
}


export let get_tokens = () => fetchJson(datapipe_url(), {
    method: 'get'
});

export let remove_token = (token_id) => fetchJson(datapipe_url()+'/'+token_id, {
    method: 'delete'
});

