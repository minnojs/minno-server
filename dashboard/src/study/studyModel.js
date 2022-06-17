import {fetchJson} from 'utils/modelHelpers';
import {templatesUrl, studyUrl as baseUrl} from 'modelUrls';


function get_url(study_id) {
    return `${baseUrl}/${encodeURIComponent(study_id)}`;
}

function get_duplicate_url(study_id) {
    return `${baseUrl}/${encodeURIComponent(study_id)}/copy`;
}


function get_exps_url(study_id) {
    return `${baseUrl}/${encodeURIComponent(study_id)}/experiments`;
}

function get_stat_url(study_id) {
    return `${baseUrl}/${encodeURIComponent(study_id)}/statistics`;
}

function get_restore_url(study_id) {
    return `${baseUrl}/${encodeURIComponent(study_id)}/restore`;
}


function get_requests_url(study_id) {
    return `${baseUrl}/${encodeURIComponent(study_id)}/data`;
}

function get_lock_url(study_id , lock) {

    if (lock)
        return `${baseUrl}/${encodeURIComponent(study_id)}/lock`;
    return `${baseUrl}/${encodeURIComponent(study_id)}/unlock`;
}


function get_publish_url(study_id) {
    return `${baseUrl}/${encodeURIComponent(study_id)}/publish`;
}

function get_new_version(study_id) {
    return `${baseUrl}/${encodeURIComponent(study_id)}/version`;
}

function get_version_url(study_id, version_id) {
    return `${baseUrl}/${encodeURIComponent(study_id)}/versions/${version_id}`;
}

/*CRUD*/
export let load_studies = () => fetchJson(baseUrl);

export let load_templates = () => fetchJson(templatesUrl);

export let create_study = body => fetchJson(baseUrl, { method: 'post', body });

export let get_exps = (study_id) => fetchJson(get_exps_url(study_id));


export let get_requests = (study_id) => fetchJson(get_requests_url(study_id));


export let delete_request = (study_id, request_id) => fetchJson(get_requests_url(study_id), {
    method: 'delete',
    body: {request_id}

});

export let get_data = (study_id, exp_id, version_id, file_format, file_split, start_date, end_date) => fetchJson(get_exps_url(study_id), {
    method: 'post',
    body: {exp_id, version_id, file_format, file_split, start_date, end_date}
});

export let delete_data = (study_id, exp_id, version_id, start_date, end_date) => fetchJson(get_exps_url(study_id), {
    method: 'delete',
    body: {exp_id, version_id, start_date, end_date}
});


export let get_stat = (study_id, exp_id, version_id, start_date, end_date, date_size) => fetchJson(get_stat_url(study_id), {
    method: 'post',
    body: {exp_id, version_id, start_date, end_date, date_size}
});

export let restore2version = (study_id, version_id) => fetchJson(get_restore_url(study_id), {
    method: 'post',
    body: {version_id}
});

export const update_study = (study_id, body) => fetchJson(get_url(study_id), {
    method: 'put',
    body
});

export const rename_study = (study_id, study_name) => fetchJson(`${get_url(study_id)}/rename`, {
    method: 'put',
    body: {study_name}
});

export let duplicate_study = (study_id, study_name) => fetchJson(get_duplicate_url(study_id), {
    method: 'put',
    body: {study_name}
});

export let lock_study = (study_id, lock) => fetchJson(get_lock_url(study_id, lock), {
    method: 'post'
});

export let publish_study = (study_id, version_name, update_url) => fetchJson(get_publish_url(study_id), {
    method: 'post',
    body: {version_name, update_url}
});

export let create_version = (study_id) => fetchJson(get_new_version(study_id), {
    method: 'post'
});

export let send2archive = (study_id) => fetchJson(get_url(study_id), {method: 'delete'});
export let restore_study = (study_id) => fetchJson(get_url(study_id), {method: 'delete', body: {restore:true}});
export let delete_study = (study_id) => fetchJson(get_url(study_id), {method: 'delete', body: {permanently:true}});

export let change_version_availability = (study_id, version_id, availability) => fetchJson(get_version_url(study_id, version_id), {
    method: 'put',
    body: {availability}
});