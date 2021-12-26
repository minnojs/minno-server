import {resetClearButtons, showClearOrReset} from './utilities.js';

let textComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    let isTouch = settings.parameters.isTouch;
    let isQualtrics = settings.parameters.isQualtrics;
    let textparameters;
    isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
    return {reset, clear, set, get, rows: rows.slice(0,-2), isTouch, isQualtrics};

    function reset(){
        let valueToSet = isTouch ? defaultSettings.touch_text : defaultSettings.text;
        showClearOrReset(textparameters, valueToSet, 'reset');
    }
    function clear(){
        let valueToSet = isTouch ? rows.slice(-1)[0] :  rows.slice(-2)[0];
        showClearOrReset(textparameters, valueToSet, 'clear');
    }
    function get(name){return textparameters[name];}
    function set(name){return function(value){return textparameters[name] = value;};}
}

function view(ctrl){
    return m('.space' ,[
        ctrl.rows.map(function(row){
            //if touch parameter is chosen, don't show the irrelevant text parameters
            if (ctrl.isTouch === true && row.nameTouch === undefined)
                return;
            if(ctrl.isQualtrics === false && row.name === 'preDebriefingText')
                return;
            return m('.row.line',[
                row.desc ?
                    m('.col-md-4.space',[
                        m('span', [' ', row.label, ' ']),
                        m('i.fa.fa-info-circle.text-muted',{
                            title:row.desc
                        })
                    ])
                    : m('.col-md-4.space', m('span', [' ', row.label])),
                m('.col-sm-8', [
                    m('textarea.form-control',{rows:5, value:ctrl.get(ctrl.isTouch ? row.nameTouch : row.name), oninput:m.withAttr('value', ctrl.set(ctrl.isTouch ? row.nameTouch : row.name))})
                ])
            ]);
        }), resetClearButtons(ctrl.reset, ctrl.clear)
    ]);
}

export default textComponent;
