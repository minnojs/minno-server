import {fetchJson} from 'utils/modelHelpers';
import {baseUrl, collaborationUrl} from 'modelUrls';

const pending_url = `${baseUrl}/pending`;
const updated_requests_url = `${baseUrl}/updates`;

function apiURL(code)
{
    return `${collaborationUrl}/${encodeURIComponent(code)}`;
}

function updateApiURL(id)
{
    return `${baseUrl}/updates/${id}`;
}

export let get_pending_studies = () => fetchJson(pending_url, {
    method: 'get'
});

export let get_updated_requests = () => fetchJson(updated_requests_url, {
    method: 'get'
});


export let use_code = (code) => fetchJson(apiURL(code), {
    method: 'get'
});

export let read_update = (id, creation_date) => fetchJson(updateApiURL(id), {
    method: 'post',
    body:{creation_date}
});
