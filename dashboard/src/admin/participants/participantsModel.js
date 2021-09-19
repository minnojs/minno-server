import {fetchJson} from 'utils/modelHelpers';
import {baseUrl} from 'modelUrls';


function participants_url()
{
    return `${baseUrl}/PI/participants`;
}

function users_url()
{
    return `${baseUrl}/users`;
}
/* should be removed */
export let get_users = () => fetchJson(users_url(), {
    method: 'get'
});

export let remove_user = (user_id) => fetchJson(users_url(), {
    body: {user_id},
    method: 'delete'
});

export let update_role = (user_id, role) => fetchJson(users_url(), {
    body: {user_id, role},
    method: 'put'
});

export let change_user_password = (user_id, password) => fetchJson(users_url(), {
    body: {user_id, password},
    method: 'put'
});
export let get_participants = (file_format, pertains_to, start_date, end_date) => fetchJson(participants_url(), {
    method: 'post',
    body: {file_format, pertains_to, start_date, end_date}
});
