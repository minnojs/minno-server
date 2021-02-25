import {fetchJson} from 'utils/modelHelpers';
import {PIUrl} from 'modelUrls';


function edit_registration_url()
{
    return `${PIUrl}/edit_registration`;
}


export let get_registration = () => fetchJson(edit_registration_url(), {
    method: 'get'
});

export let update_registration = (study_id, version_id, experiment_id) => fetchJson(edit_registration_url(), {
    body: {study_id, version_id, experiment_id},
    method: 'put'

});
