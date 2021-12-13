import {clone, showRestrictions} from '../resources/utilities.js';

let elementComponent = {
    controller:controller,
    view:view,
};

function controller(object, settings, stimuliList){
    let element = settings[object.key];
    let fields = {
        newStimulus : m.prop(''),
        elementType: m.prop(object.key.includes('attribute') ? 'Attribute' : 'Category'),
        selectedStimuli: m.prop(''),
        stimuliHidden: m.prop('')
    };

    return {fields, set, get, addStimulus, updateSelectedStimuli, removeChosenStimuli, removeAllStimuli,
        resetStimuliList};

    function get(name, media, type){
        if (media != null && type != null){
            if (type === 'font-size'){
                return parseFloat((element[name][media][type].replace("em","")));
            }
            return element[name][media][type];
        }
        else if (media === 'color') return element[name][media]; //case of stimulusCss
        else if (media === 'font-size') return parseFloat((element[name][media]).substring(0,3));
        return element[name];
    }
    function set(name, media, type){
        return function(value){
            if (media != null && type != null){
                if (type === 'font-size'){
                    value = Math.abs(value);
                    if (value === 0){
                        showRestrictions('Font\'s size must be bigger than 0.', 'error')
                        return element[name][media][type];
                    }
                    return element[name][media][type] = value + "em";
                }
                return element[name][media][type] = value;
            }
            else if (media === 'color') return element[name][media] = value;
            else if (media === 'font-size'){
                value = Math.abs(value);
                if (value === 0){
                    showRestrictions('Font\'s size must be bigger than 0.', 'error')
                    return element[name][media];
                }
                return element[name][media] = value + "em";
            }
            return element[name] = value;
        }
    }
    function addStimulus(event){
        let new_stimuli = fields.newStimulus();
        event = event.target.id; //button name, to know the kind of the stimulus added
        element.mediaArray.push( (event === 'addWord') ? {word : new_stimuli} : {image : new_stimuli});
        fields.newStimulus(''); //reset the field
    }
    function updateSelectedStimuli(select){
        let list = element.mediaArray.filter((val,i) => select.target.options[i].selected);
        fields.selectedStimuli(list);
    }

    function removeChosenStimuli(){
        element.mediaArray = element.mediaArray.filter((element)=>!fields.selectedStimuli().includes(element));
        fields.selectedStimuli([]);
    }

    function removeAllStimuli(){element.mediaArray.length = 0;}
    function resetStimuliList(){element.mediaArray = clone(stimuliList);}
}

function view(ctrl) {
    return m('.container', [
        m('.row.space',[
            m('.col-sm-4.space',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Will appear in the data and in the default feedback message.']),
                m('span', [' ',ctrl.fields.elementType()+' name as will appear in the data: '])
            ]),
            m('.col-8', [
                m('input[type=text].form-control',{style: {width: '18rem'}, value:ctrl.get('name'), oninput:m.withAttr('value', ctrl.set('name'))})
            ])
        ]),
        m('hr'),
        m('.row',[
            m('.col-sm-12',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Enter text (word) or image name (image). Set the path to the folder of images in the General Parameters page']),
                m('input[type=text].form-control', {style:{width:'15em'},placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', 'aria-describedby':'basic-addon2', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)}),
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons'}},[
                    m('button[type=button].btn btn-outline-secondary',{disabled:ctrl.fields.newStimulus().length===0, id:'addWord', onclick:ctrl.addStimulus},[
                        m('i.fa.fa-plus'), 'Add Word'
                    ]),
                    m('button[type=button].btn btn-outline-secondary', {disabled:ctrl.fields.newStimulus().length===0, id:'addImage', onclick: ctrl.addStimulus},[
                        m('i.fa.fa-plus'), 'Add Image'
                    ])
                ])
            ]),
        ]),
        m('.row',[
            m('.col-sm-12',[
                m('.form-group',[
                    m('br'),
                    m('span',{style:{'font-size': '20px'}},'Stimuli: '),
                    m('select.form-control', {multiple : 'multiple', size : '8' ,style: {width: '15rem'}, onchange:(e) => ctrl.updateSelectedStimuli(e)},[
                        ctrl.get('mediaArray').some(object => object.word) ? ctrl.fields.stimuliHidden('visible') : ctrl.fields.stimuliHidden('hidden'),
                        ctrl.get('mediaArray').map(function(object){
                            let value = object.word ? object.word : object.image;
                            let option = value + (object.word ? ' [Word]' : ' [Image]');
                            return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                        })
                    ]),
                    m('br'),
                    m('.btn-group-vertical', {style:{'data-toggle':'buttons'}},[
                        m('button.btn btn btn-warning', {title:'To select multiple stimuli, please press the ctrl key while selecting the desired stimuli', disabled: ctrl.fields.selectedStimuli().length===0, onclick:ctrl.removeChosenStimuli},'Remove Chosen Stimuli'),
                        m('button.btn btn btn-warning', {onclick:ctrl.removeAllStimuli},'Remove All Stimuli'),
                        m('button.btn btn btn-warning', {onclick: ctrl.resetStimuliList},'Reset Stimuli List'),
                    ])
                ]),
                m('.row'),
                m('hr')
            ])
        ])
    ]);
}

export default elementComponent;

