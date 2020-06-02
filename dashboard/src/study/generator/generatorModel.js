import {fetchJson} from 'utils/modelHelpers';
import {studyUrl} from 'modelUrls';


function url(study_id)
{
    return `${studyUrl}/${encodeURIComponent(study_id)}/generator`;
}


export let save = (study_id, responses, stimuli, conditions) => fetchJson(url(study_id), {
    method: 'put',
    body: {responses, stimuli, conditions}
});