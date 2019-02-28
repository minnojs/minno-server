import fileListComponent from './fileListComponent';
import sidebarButtons from './sidebarButtons';
import {createNotifications} from 'utils/notifyComponent';

export default sidebarComponent;
const notifications= createNotifications();

const sidebarComponent = {
    view: (ctrl , {study}) => {
        return m('.sidebar', {config}, [
            m('div', notifications.view()),

            sidebarButtons({study}, notifications),
            fileListComponent({study}, notifications)
        ]);
    }
};

function config(el, isInitialized, ctx){
    if (!isInitialized) el.addEventListener('scroll', listen, false);
    el.scrollTop = ctx.scrollTop || 0;

    function listen(){
        ctx.scrollTop = el.scrollTop;
    }
}
