import {fetchJson} from 'utils/modelHelpers';
import {studyUrl} from 'modelUrls';


function url(study_id, file_id)
{
    return `${studyUrl}/${encodeURIComponent(study_id)}/generator/${encodeURIComponent(file_id)}`;
}


export let save = (study_id, file_id, responses, stimuli, conditions, constants) => fetchJson(url(study_id, file_id), {
    method: 'put',
    body: {responses, stimuli, conditions, constants}
});