import {fetchJson} from 'utils/modelHelpers';
import {baseUrl, collaborationUrl} from 'modelUrls';

const pending_url = `${baseUrl}/pending`;
const reviewed_requests_url = `${baseUrl}/reviewed`;

function apiURL(code)
{
    return `${collaborationUrl}/${encodeURIComponent(code)}`;
}

function reviewApiURL(id)
{
    return `${baseUrl}/reviewed/${id}`;
}

export let get_pending_studies = () => fetchJson(pending_url, {
    method: 'get'
});

export let get_reviewed_requests = () => fetchJson(reviewed_requests_url, {
    method: 'get'
});


export let use_code = (code) => fetchJson(apiURL(code), {
    method: 'get'
});

export let read_review = (id) => fetchJson(reviewApiURL(id), {
    method: 'post'
});
