import {baseUrl} from 'modelUrls';
import {fetchText} from '../utils/modelHelpers';

const assignmentUrl = `${baseUrl}/assignment`;

export let login = (email_address) => fetchText(assignmentUrl, {
    method: 'post',
    body: {email_address}
});