import elementComponent from './elementComponent.js';
import biatElementComponent from '../BIAT/biatElementComponent.js';
import epPrimeComponent from '../EP/epPrimeComponent.js';
import epPrimeDesignComponent from '../EP/epPrimeDesignComponent.js';
import {showClearOrReset} from './utilities.js';


let categoriesComponent = {
    controller:controller,
    view:view
};

let btnWidthTypes = {
    attribute: '20.3em',
    category:'20.7em',
    practiceCategory:'29.85em',
    single:'7em', //for SPF
    ep: '32.5em'
};

function controller(settings, defaultSettings, clearElement, subTabs, taskType){

    let curr_tab = subTabs[0].value; // set default tab
    let buttonWidth = curr_tab.toLowerCase().includes('attribute') ? btnWidthTypes.attribute:
        curr_tab.toLowerCase().includes('practice') ? btnWidthTypes.practiceCategory : btnWidthTypes.category;
    subTabs.length === 1 ? buttonWidth = btnWidthTypes.single : ''; //for SPF which have one category
    taskType === 'EP' ? buttonWidth = btnWidthTypes.ep : ''; //for EP which have addtional subtab (primeDesignCss)

    return {reset, clear, subTabs, curr_tab, buttonWidth};

    function reset(){showClearOrReset(settings[this.curr_tab], defaultSettings[this.curr_tab],'reset');}
    function clear(){
        this.curr_tab === 'primeStimulusCSS' ? showClearOrReset(settings[this.curr_tab], {color:'#000000','font-size':'0em'}, 'clear')
            : showClearOrReset(settings[this.curr_tab], clearElement[0], 'clear');
    }
}

function view(ctrl, settings, defaultSettings, clearElement, subTabs, taskType) {
    return m('.container.space', [
        m('.subtab',{style:{width: ctrl.buttonWidth}}, ctrl.subTabs.map(function(tab){
            return m('button',{
                class: ctrl.curr_tab === tab.value ? 'active' : '',
                onclick:function(){
                    ctrl.curr_tab = tab.value;
                }},tab.text);
        })),
        m('.div',
            taskType === 'BIAT' ?
                m.component(biatElementComponent,{key:ctrl.curr_tab}, settings,
                    defaultSettings[ctrl.curr_tab].stimulusMedia, defaultSettings[ctrl.curr_tab].title.startStimulus)
                : ctrl.curr_tab === 'primeStimulusCSS' ? //in EP there is additional subtab called Prime Design, it needs differnet component.
                    m.component(epPrimeDesignComponent, settings)
                : taskType === 'EP' ?
                    m.component(epPrimeComponent, {key:ctrl.curr_tab}, settings, defaultSettings[ctrl.curr_tab].mediaArray)
                    :
                    m.component(elementComponent, {key:ctrl.curr_tab}, settings, defaultSettings[ctrl.curr_tab].stimulusMedia)
        ),
        m('.row.space',[
            m('.col.space',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    m('button.btn btn btn-secondary',
                        {title:'Reset all current fields to default values', onclick: () => ctrl.reset()},
                        m('i.fa.fa-undo.fa-sm'), ' Reset'),
                    m('button.btn btn btn-danger',
                        {title:'Clears all current values',onclick:() => ctrl.clear()},
                        m('i.fa.fa-trash.fa-sm'), ' Clear'),
                ]),
            ]),
        ])
    ]);
}

export default categoriesComponent;
