import {fetchJson} from 'utils/modelHelpers';
import {studyUrl} from 'modelUrls';


function url(study_type, study_id, file_id)
{
    return `${studyUrl}/${encodeURIComponent(study_id)}/${study_type}_generator/${encodeURIComponent(file_id)}`;
}

export let save = (study_type, study_id, file_id, settings) => fetchJson(url(study_type, study_id, file_id), {
    method: 'put',
    body: {settings}
});