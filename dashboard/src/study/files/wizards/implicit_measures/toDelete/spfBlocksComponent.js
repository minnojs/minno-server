import {showClearOrReset} from '../resources/utilities.js';

let blocksComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    let blocks = settings.blocks;
    return {reset, clear, set, get, rows};
    
    function reset(){showClearOrReset(blocks, defaultSettings.blocks, 'reset');}
    function clear(){showClearOrReset(blocks, rows.slice(-1)[0], 'clear');}
    function get(name){return blocks[name]; }
    function set(name, type){ 
        if (type === 'number') 
            return function(value){return blocks[name] = Math.abs(Math.round(value));};
        return function(value){ return blocks[name] = value; };
    }
}
function view(ctrl){
    return m('.container.space' ,[
        //create numbers inputs
        ctrl.rows.slice(0,2).map(function(row) {
            return m('div',[
                m('.row', [
                    m('.col-sm-5',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc]),
                        m('span', [' ', row.label])
                    ]),
                    m('.col-7',
                        m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set(row.name, 'number')), value: ctrl.get(row.name), min:0}))
                ]),
                m('hr')
            ]);
        }),
        //create select inputs
        ctrl.rows.slice(2,-1).map(function(row) {
            return m('div',[
                m('.row', [
                    m('.col-sm-5',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc]),
                        m('span', [' ', row.label])
                    ]),
                    m('.col-7',
                        m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem'}},[
                            row.options.map(function(option){return m('option', option);})
                        ]))
                ]),
                m('hr')
            ]);
            // return m('.row.space', [
            //     m('.col-xs-1.space',[
            //         m('i.fa.fa-info-circle'),
            //         m('.card.info-box.card-header', [row.desc])
            //     ]),
            //     m('.col-3.space', row.label),
            //     m('.col-8.space',
            //         m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem'}},[
            //             row.options.map(function(option){return m('option', option);})
            //         ]))
            // ]);
        }),
        m('.row.space',[
            m('.col',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    m('button.btn btn-secondary', 
                        {title:'Reset all current fields to default values', onclick: () => ctrl.reset()},
                        m('i.fa.fa-undo.fa-sm'), ' Reset'),
                    m('button.btn btn-danger',
                        {title:'Clears all current values',onclick:() => ctrl.clear()},
                        m('i.fa.fa-trash.fa-sm'), ' Clear')
                ]),
            ]),
        ])
    ]);
}

export default blocksComponent;
