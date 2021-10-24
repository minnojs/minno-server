import iat from './iat.js';
import {clone} from '../resources/utilities.js';
import defaultSettings from './iatDefaultSettings.js';

// export default iatEditor;
//
// const iatEditor = args => m.component(iatEditorComponent, args);
//
// const iatEditorComponent = {
//     controller: function(file){
//         let settings = clone(defaultSettings);
//         return {settings:settings};
//     },
// };
m.mount(document.getElementById('dashboard'), iat(settings));
