import {clone, showRestrictions } from "../resources/utilities";
import messages from "../../../../../utils/messagesComponent";

let blocksComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    var blocks = settings.trialsByBlock;
    let addFlag =  m.prop(blocks.length < 30 ? 'visible' : 'hidden');
    let removeFlag = m.prop('hidden');
    let chooseFlag = m.prop('hidden');
    let choosenBlocksList = [];
    let chooseClicked = m.prop(false);
    let clearBlock = rows.slice(-1)[0];
    
    return {showReset, showClear, set, get, blocks, getParameters, setParameters, addFlag, removeFlag, 
        chooseFlag, addBlock, showRemoveBlocks, choosenBlocksList, updateChoosenBlocks, chooseBlocks, rows};

    function beforeClearReset(action, func){
        let msg_text = {
            'reset':{text:'This will delete all current properties and reset them to default values.',title:'Reset?'},
            'clear':{text: 'This will delete all current properties.', title: 'Clear?'}
        };
        return messages.confirm({header: msg_text[action].title, content:
                m('strong', msg_text[action].text)})
            .then(response => {
                if (response) {
                    func();
                    m.redraw();
                }
            }).catch(error => messages.alert({header: msg_text[action].title , content: m('p.alert.alert-danger', error.message)}))
            .then(m.redraw());

    }
    function showReset(){
        beforeClearReset('reset', reset);
        function reset(){
            Object.assign(blocks, clone(defaultSettings.trialsByBlock));
            if(blocks.length>5){
                blocks.length=5
            }
            settings.switchSideBlock = defaultSettings.switchSideBlock;
            settings.blockOrder = defaultSettings.blockOrder;
            choosenBlocksList.length = 0;
            addFlag('visible')
        }
    }
    function showClear(){
        beforeClearReset('clear', clear);
        function clear(){
            blocks.forEach(element => {
                element.instHTML = '';
                element.miniBlocks = 0;
                element.singleAttTrials = 0;
                element.sharedAttTrials = 0;
                element.categoryTrials = 0;
            });
            settings.switchSideBlock = 0;
            settings.blockOrder = defaultSettings.blockOrder;
        }
    }

    function get(name, index){ return blocks[index][name]; }
    function set(name, index, type){ 
        if (type === 'text') return function(value){return blocks[index][name] = value; };
        return function(value){return blocks[index][name] = Math.abs(Math.round(value));};
    }
    function getParameters(name){ return settings[name]; }
    function setParameters(name, type){ 
        if (type === 'select') return function(value){return settings[name] = value; };
        return function(value){return settings[name] = Math.abs(Math.round(value));};
    }
    function updateChoosenBlocks(e, index){
        if (choosenBlocksList.includes(index) && !e.target.checked){
            var i = choosenBlocksList.indexOf(index);
            if (i !== -1) {
            choosenBlocksList.splice(i, 1);
            }
            return;
        } 
        if (e.target.checked) choosenBlocksList.push(index);
    }
    function chooseBlocks(){
        if (blocks.length < 4) {
            showRestrictions('error','It\'s not possible to remove blocks because there must be at least 3 blocks.', 'Error in Removing Choosen Blocks');
            return;
        }
        chooseFlag('visible');
        if(!chooseClicked()){  //show info message only for the first time the choose button has been clicked
            showRestrictions('info', 'To choose blocks to remove, please tik the checkbox near the wanted block, and to remove them click the \'Remove Choosen Blocks\' button.', 'Choose Blocks to Remove');
            chooseClicked(true);
        }
    }
    function addBlock(){
        blocks.push(clone(clearBlock));
        blocks.slice(-1)[0]['block'] = blocks.length;
        if (blocks.length === 30) addFlag('hidden') //limit blocks to 30
    }
    function showRemoveBlocks(){
        if ((blocks.length - choosenBlocksList.length) < 3){
            showRestrictions('error','Minimum number of blocks needs to be 3, please choose less blocks to remove','Error in Removing Choosen Blocks');
            return;
        }
        return messages.confirm({header: 'Are you sure?', content:
                m('strong', 'This action is permanent')})
            .then(response => {
                if (response) {
                    removeBlocks();
                    m.redraw();
                }
                else {
                    choosenBlocksList.length = 0;
                    chooseFlag('hidden');
                    m.redraw();
                }
            }).catch((error) => {showRestrictions("error", "Something went wrong on the page!\n"+error, "Oops!");})
            .then(m.redraw());

        function removeBlocks(){
            choosenBlocksList.sort();
            for (let i = choosenBlocksList.length - 1; i >=0; i--)
                blocks.splice(choosenBlocksList[i],1)
            
            for (let i = 0; i < blocks.length; i++) 
                blocks[i]['block'] = i+1
            
            choosenBlocksList.length = 0;
            chooseFlag('hidden');
        }
    }
}

function view(ctrl){
    return m('.container.space' , [
        m('.row', [
            m('.col-sm-2.space',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Change to \'startRight\' if you want to start with category on the right in the first block, \'startLeft\' if you want to start with category on the left in the first block or \'random\' if you want to randomize the order.']),
                m('span', [' ', 'Blocks order'])
            ]),
            m('.col-md-10',
                m('select.form-control',{value: ctrl.getParameters('blockOrder'), onchange:m.withAttr('value',ctrl.setParameters('blockOrder','select')), style: {width: '8.3rem', height:'2.7rem'}},[
                    m('option', 'random'),
                    m('option', 'startRight'),
                    m('option', 'startLeft'),
                ]))        
        ]), m('hr'),
        m('.row', [
            m('.col-sm-2.space',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['By default, we switch on block 4 (i.e., after blocks 2 and 3 showed the first pairing condition).']),
                m('span', [' ', 'Switch side block'])
            ]),
            m('.col-sm-9',
                m('input[type=number].form-control',{value: ctrl.getParameters('switchSideBlock'), onchange:m.withAttr('value',ctrl.setParameters('switchSideBlock')), style: {width: '4em'}, min:0}))   
        ]),
        ctrl.blocks.map(function(block) {
            let index = ctrl.blocks.indexOf(block);
            return m('div',[
                m('hr'),
                m('.row', [
                    m('.col-sm-2',[
                        m('input[type=checkbox]', {checked : ctrl.choosenBlocksList.includes(index), style:{visibility: ctrl.chooseFlag()}, onclick: (e) => ctrl.updateChoosenBlocks(e, index)}),
                        m('span', [' ','Block '+parseInt(index+1)])
                    ]),
                    m('.col-md-10',[
                        ctrl.rows.slice(0,-1).map(function(row) {
                            return m('.row.space', [
                                m('.col-sm-3.space',[
                                    m('i.fa.fa-info-circle'),
                                    m('.card.info-box.card-header', [row.desc]),
                                    m('span', [' ', row.label])
                                ]),
                                m('.col-sm-9', [
                                    row.name === 'instHTML' ?  m('textarea.form-control',{style: {width: '15rem' ,height: '4rem'},onchange: m.withAttr('value', ctrl.set(row.name, index, 'text')), value: ctrl.get(row.name, index)})
                                    : m('input[type=number].form-control',{style:{width:'4em'}, onchange: m.withAttr('value', ctrl.set(row.name, index,'number')), value: ctrl.get(row.name, index), min:0})
                                ]) 
                            ])
                        })
                    ])
                ])
            ]);
                    
        }),
        m('.row.space',[
            m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons',display: 'flex','justify-content': 'center'}},[
                m('button.btn btn btn-info',{onclick: ctrl.addBlock, style:{'padding-right':'60px','padding-left':'60px' ,visibility: ctrl.addFlag()}},
                    m('i.fa.fa-plus'),' Add Block'),
                m('button.btn btn btn-warning',{onclick: ctrl.chooseBlocks},
                    m('i.fa.fa-check'), ' Choose Blocks to Remove'),
                m('button.btn btn btn-danger',{onclick: ctrl.showRemoveBlocks, disabled: !ctrl.choosenBlocksList.length},
                    m('i.fa.fa-minus-square'), ' Remove Choosen Blocks'),
            ])
        ]), m('hr'),
        m('.row',[
            m('.col',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    m('button.btn btn-secondary', 
                        {title:'Reset all current fields to default values', onclick: () => ctrl.showReset()},
                        m('i.fa.fa-undo.fa-sm'), ' Reset'),
                    m('button.btn btn-danger',
                        {title:'Clears all current values',onclick:() => ctrl.showClear()},
                        m('i.fa.fa-trash-alt.fa-sm'), ' Clear')
                ])
            ])
        ])
    ]);
}

export default blocksComponent;

