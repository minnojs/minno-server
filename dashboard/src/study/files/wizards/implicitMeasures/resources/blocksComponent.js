import {showClearOrReset} from '../resources/utilities.js';

let blocksComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    let blocks = settings.blocks;
    return {set, get, rows:rows.slice(0,-1), reset, clear};

    function reset(){showClearOrReset(blocks, defaultSettings.blocks, 'reset');}
    function clear(){showClearOrReset(blocks, rows.slice(-1)[0], 'clear');}
    function get(name){return blocks[name];}
    function set(name, type){
        if (type === 'number') return function(value){return blocks[name] = Math.abs(Math.round(value));};
        return function(value){return blocks[name] = value;};
    }
}
function view(ctrl, settings){
    return m('.container' , [
        //create numbers inputs
        ctrl.rows.map(function(row){
            //if user chooses not to have a prcatice block set it's parameter to 0
            if (row.name === 'nPracticeBlockTrials' && settings.parameters.practiceBlock === false) {
                settings.blocks.nPracticeBlockTrials = 0;
                return;
            }
            return m('.row.space', [
                row.desc ?
                    m('.col-md-4.space',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc]),
                        m('span', [' ', row.label])
                    ])
                    :
                    m('.col-md-4.space', {style:{'padding-left':'2rem'}}, m('span', [' ', row.label])),
                m('.col-8.space',
                    row.options ?
                        m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem'}},[
                        row.options.map(function(option){return m('option', option);})
                        ])
                    : row.name.includes('random') ?
                        m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name,'checkbox')), checked: ctrl.get(row.name)})
                    :
                        m('input[type=number].form-control',{placeholder:'0', style:{width:'4em'},onchange: m.withAttr('value', ctrl.set(row.name, 'number')), value: ctrl.get(row.name), min:0})
                ),
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
                ])
            ])
        ])
    ])
}

export default blocksComponent;
