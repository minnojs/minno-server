import {fetchJson} from 'utils/modelHelpers';
import {baseUrl} from 'modelUrls';


function homepage_url()
{
    return `${baseUrl}/config/homepage`;
}


export let get_homepage = () => fetchJson(homepage_url(), {
    method: 'get'
});

export let update_homepage = (upper_panel, right_panel) => fetchJson(homepage_url(), {
    body: {upper_panel, right_panel},
    method: 'put'

});
