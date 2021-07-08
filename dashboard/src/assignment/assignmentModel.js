import {baseUrl} from 'modelUrls';
import {fetchJson, fetchText} from '../utils/modelHelpers';

const assignmentUrl = `${baseUrl}/assignment`;
console.log(assignmentUrl);
export let login = (email_address) => fetchText(assignmentUrl, {
    method: 'post',
    body: {email_address}
});

export let check_connectivity = () => fetchJson(assignmentUrl, {

    method: 'get'
});