import {showClearOrReset} from './utilities.js';

let parametersComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    var parameters = settings.parameters;
    var external = settings.external
    var qualtricsParameters = ['leftKey', 'rightKey', 'fullscreen', 'showDebriefing']

    return {reset, clear, set, get, rows, qualtricsParameters, external};

    function reset(){showClearOrReset(parameters, defaultSettings.parameters, 'reset');}
    function clear(){showClearOrReset(parameters, rows.slice(-1)[0],'clear');}

    function get(name){
        if (name === 'isTouch')
            if(parameters[name] === true) return 'Touch'
            else return 'Keyboard';
        if (name === 'isQualtrics')
            if (parameters[name] === true) return 'Qualtrics'
            else return 'Regular';
        return parameters[name];
    }
    function set(name){ return function(value){
        if (name === 'isTouch')
            if(value === 'Keyboard') return parameters[name] = false;
            else return parameters[name] = true;
        if (name === 'isQualtrics')
            if (value === 'Regular') return parameters[name] = false;
            else return parameters[name] = true;
        return parameters[name] = value;
    }}
}

function view(ctrl, settings){
    return m('.container' ,[
        ctrl.rows.slice(0,-1).map((row) => {
            if(!ctrl.external && row.name === 'isQualtrics') return;
            if ((ctrl.qualtricsParameters.includes(row.name)) && ctrl.get('isQualtrics') === 'Regular') return;
            if(settings.parameters.isTouch && row.name.toLowerCase().includes('key')) return;

            return m('.div',[
                m('.row.space', [
                    m('.col-sm-4.space',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc]),
                        m('span', [' ', row.label])
                    ]),
                    row.name.toLowerCase().includes('key') ?  //case of keys parameters
                        m('.col-sm-8',
                            m('input[type=text].form-control',{style: {width:'3rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))}))
                        : row.options ? //case of isTouch and isQualtrics
                        m('.col-sm-8',
                            m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem', height:'2.8rem'}},[
                                row.options.map(function(option){return m('option', option);})
                            ]))
                        :
                        m('.col-sm-8',
                            m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)}))
                ]),
                    m('hr')
                ])
        }),
        m('.row.space', [
            m('.col-sm-4',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header',{style:{width: '500px'}}, ['If your task has any images, enter here the path to that images folder. It can be a full url, or a relative URL to the folder that will host this script']),
                m('span', [' ', 'Image\'s URL'])
            ]),
            m('.col-sm-8',
                m('input[type=text].form-control',{style: {width: '30rem'}, value:ctrl.get('base_url'), onchange:m.withAttr('value', ctrl.set('base_url'))}))
        ]),
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
