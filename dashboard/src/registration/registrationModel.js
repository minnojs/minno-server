import {baseUrl} from 'modelUrls';
import {fetchText} from '../utils/modelHelpers';

const registrationUrl = `${baseUrl}/registration`;

export let registration = (email_address) => fetchText(registrationUrl, {
    method: 'post',
    body: {email_address}
});