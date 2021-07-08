import {baseUrl} from 'modelUrls';
import {fetchJson, fetchText} from '../utils/modelHelpers';

const assignmentUrl = `../assignment`;
console.log(baseUrl);
export let login = (email_address) => fetchText(assignmentUrl, {
    method: 'post',
    body: {email_address}
});

export let check_connectivity = () => fetchJson(assignmentUrl, {
    method: 'get'
});