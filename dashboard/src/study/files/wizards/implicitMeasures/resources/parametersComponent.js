import {showClearOrReset, showRestrictions, editStimulusObject} from './utilities.js';

let parametersComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows) {
    var parameters = settings.parameters;
    var external = settings.external
    var qualtricsParameters = ['leftKey', 'rightKey', 'fullscreen', 'showDebriefing']
    return {reset, clear, set, get, rows, qualtricsParameters, external};

    function reset() {
        showClearOrReset(parameters, defaultSettings.parameters, 'reset');
    }

    function clear() {
        showClearOrReset(parameters, rows.slice(-1)[0], 'clear');
    }

    function get(name, object, parameter) {
        if (name === 'base_url')
            return parameters[name][object]
        if (name === 'isTouch')
            if (parameters[name] === true) return 'Touch'
            else return 'Keyboard';
        if (name === 'isQualtrics')
            if (parameters[name] === true) {
                return 'Qualtrics'
            } else return 'Regular';
        if (object && parameter) {
            if (parameter === 'font-size')
                return parseFloat((parameters[name][object][parameter].replace("em", "")));
            return parameters[name][object][parameter]
        }
        return parameters[name];
    }

    function set(name, object, parameter) {
        return function (value) {
            if (name === 'base_url')
                return parameters[name][object] = value
            if (name === 'isTouch')
                if (value === 'Keyboard') return parameters[name] = false;
                else return parameters[name] = true;
            if (name === 'isQualtrics')
                if (value === 'Regular') return parameters[name] = false;
                else return parameters[name] = true;
            if (name.includes('Duration')) return parameters[name] = Math.abs(value)
            if (object && parameter) {
                if (parameter === 'font-size') {
                    value = Math.abs(value);
                    if (value === 0) {
                        showRestrictions('error', 'Font\'s size must be bigger than 0.', 'Error')
                        return parameters[name][object][parameter];
                    }
                    return parameters[name][object][parameter] = value + "em";
                }
                return parameters[name][object][parameter] = value
            }
            return parameters[name] = value;
        }
    }

}
function update_base_url(ctrl, value){
    ctrl.parameters.base_url.image = value;
    console.log('update_base_url');
}

function view(ctrl, settings){
    return m('.container' ,[
        ctrl.rows.slice(0,-1).map((row) => {
            if(!ctrl.external && row.name === 'isQualtrics') return;
            if ((ctrl.qualtricsParameters.includes(row.name)) && ctrl.get('isQualtrics') === 'Regular') return;
            if(settings.parameters.isTouch && row.name.toLowerCase().includes('key')) return;

            return m('div',[
                    m('.row.space', [
                        row.desc ?
                        m('.col-sm-4', [
                            m('i.fa.fa-info-circle'),
                            m('.card.info-box.card-header', [row.desc]),
                            m('span', [' ', row.label])
                        ])
                        :
                        m('.col-sm-4',{style:{'padding-left':'2rem'}}, m('span', [' ', row.label])),
                        row.name === ('base_url') ?
                            m('.col-8',
                                m('input[type=text].form-control',{style: {width: '30rem'}, value:ctrl.get('base_url','image'), oninput: m.withAttr('value', ctrl.set(row.name, 'image'))}))
                        : row.name.toLowerCase().includes('key') ? //case of keys parameters
                        m('.col-8',
                            m('input[type=text].form-control',{style: {width:'3rem'}, value:ctrl.get(row.name), oninput:m.withAttr('value', ctrl.set(row.name))}))
                        : row.options ? //case of isTouch and isQualtrics
                        m('.col-8',
                            m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem', height:'2.8rem'}},[
                                row.options.map(function(option){return m('option', option);})
                            ]))
                        : row.name.includes('Duration') ? //case of duration parameter
                            m('.col-8',
                                m('input[type=number].form-control',{placeholder:'0', min:0, style: {width:'5rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))}))
                            : (row.name === 'fixationStimulus') ||  (row.name === 'deadlineStimulus' || row.name === 'maskStimulus') ?
                                editStimulusObject(row.name, ctrl.get, ctrl.set)
                                : (row.name === 'sortingLabel1' || row.name === 'sortingLabel2' || row.name === 'targetCat') ?
                                    m('.col-8',
                                        m('input[type=text]', {style: {'border-radius':'3px','border':'1px solid #E2E3E2',height:'2.5rem',width:'15rem'}, value:ctrl.get(row.name) ,oninput:m.withAttr('value', ctrl.set(row.name))}))
                                    : m('.col-8',
                                        m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)}))
                ]),
                m('hr')
            ])
        }),
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
    ])
}

export default parametersComponent;
