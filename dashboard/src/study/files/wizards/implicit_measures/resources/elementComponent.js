import {clone, showRestrictions} from './utilities.js';

let elementComponent = {
    controller:controller,
    view:view,
};

function controller(object, settings, stimuliList){
    let element = settings[object.key];
    let fields = {
        newStimulus : m.prop(''),
        elementType: m.prop(object.key.includes('attribute') ? 'Attribute' : 'Category'),
        titleType: m.prop(element.title.media.word === undefined ? 'image' : 'word'),
        titleHidden: m.prop(''), //weather the category design flags will be visible
        selectedStimuli: m.prop(''),
        stimuliHidden: m.prop('')
    }; 
    return {fields, set, get, addStimulus, updateSelectedStimuli,removeChosenStimuli, removeAllStimuli,
        updateTitleType, resetStimuliList};
    
    function get(name, media ,type){
        if (name === 'title' && media == null && type == null) { //special case - return the title's value (word/image)
            if (element.title.media.word === undefined) return element.title.media.image;
            return element.title.media.word;
        }
        if (media !=null && type!=null) {
            if (type === 'font-size') {
                return parseFloat((element[name][media][type].replace('em','')));
            }
            return element[name][media][type];
        }
        else if (media ==='color') //case of stimulusCss
            return element[name][media];
        else if (media === 'font-size') return parseFloat((element[name][media]).substring(0,3));
        return element[name]; 
    }
    function set(name, media, type){
        return function(value){ 
            if (media !=null && type!=null) {
                if (type === 'font-size') {
                    value = Math.abs(value);
                    if (value === 0) {
                        showRestrictions('error', 'Font\'s size must be bigger than 0', 'Error');
                        return element[name][media][type]; 
                    }
                    return element[name][media][type] = value + 'em';
                }
                return element[name][media][type] = value;
            }
            else if (media === 'color') return element[name][media] = value;
            else if (media === 'font-size') {
                value = Math.abs(value);
                if (value === 0) {
                    showRestrictions('error','Font\'s size must be bigger than 0', 'Error');
                    return element[name][media];
                }
                return element[name][media] = value + 'em';
            }
            return element[name] = value; 
        };
    }

    function updateTitleType() {
        return function (type) {
            fields.titleType(type);
            let object = element.title.media;
            let category = object.word !== undefined ? object.word : object.image;
            if (type === 'word') {
                element.title.media = {};
                element.title.media = {word: category};
            }
            else {
                element.title.media = {};
                element.title.media = {image: category};
            }
        };
    }
    function addStimulus(event){
        let new_stimuli = fields.newStimulus();
        event = event.target.id; //button name, to know the kind of the stimulus added
        element.stimulusMedia.push( (event === 'addWord') ? {word : new_stimuli} : {image : new_stimuli});
        fields.newStimulus(''); //reset the field               
    }
    function updateSelectedStimuli(select){
        let list = element.stimulusMedia.filter((val,i) => select.target.options[i].selected);
        fields.selectedStimuli(list);
    }

    function removeChosenStimuli() {
        element.stimulusMedia = element.stimulusMedia.filter((element)=>!fields.selectedStimuli().includes(element));
        fields.selectedStimuli([]);
    }

    function removeAllStimuli() {element.stimulusMedia.length = 0;}
    function resetStimuliList() {element.stimulusMedia = clone(stimuliList);}
}

function view(ctrl) {
    return m('.container', [
        m('.row', [
            m('.col-sm-4.space',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Will appear in the data and in the default feedback message.']),
                m('span', [' ',ctrl.fields.elementType()+' name as will appear in the data: '])
            ]),
            m('.col-sm-8', [
                m('input[type=text].form-control',{style: {width: '18rem'}, value:ctrl.get('name'), onchange: m.withAttr('value', ctrl.set('name'))})
            ]),
        ]),
        m('hr'),
        m('.row', [
            m('.col-md-4',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Name of the ' +ctrl.fields.elementType()+' presented in the task']),
                m('span', [' ',ctrl.fields.elementType()+' title as will appear to the user'])
            ]),
            m('.col-md-4', [
                m('input[type=text].form-control',{style: {width: '18rem'}, value: ctrl.get('title'), onchange: m.withAttr('value', ctrl.set('title', 'media', ctrl.fields.titleType()))})
            ]),
            m('.col-sm-2', ctrl.fields.elementType()+'\'s type:',
                [
                    m('select.custom-select',{value: ctrl.get('title','media','word') === undefined ? 'image' : 'word', onchange:m.withAttr('value',ctrl.updateTitleType())},[
                        ctrl.fields.titleType(ctrl.get('title','media','word') === undefined ? 'image' : 'word'),
                        ctrl.fields.titleHidden(ctrl.fields.titleType() === 'word' ? 'visible' : 'hidden'),
                        m('option', 'word'),
                        m('option', 'image')
                    ])
                ]),
            m('.col-md-2',[
                m('.row',[
                    m('.col',[
                        m('span', {style: {visibility:ctrl.fields.titleHidden()}}, 'Font\'s color: '),
                        m('input[type=color]',{style: {width:'3em', 'border-radius':'3px',visibility:ctrl.fields.titleHidden()}, value: ctrl.get('title','css','color'), onchange: m.withAttr('value', ctrl.set('title','css','color'))})
                    ])
                ]),m('br'),
                m('.row',[
                    m('.col',[
                        m('span', {style: {visibility:ctrl.fields.titleHidden()}}, 'Font\'s size: '),
                        m('input[type=number]', {style: {width:'3em','border-radius':'4px','border':'1px solid #E2E3E2',visibility:ctrl.fields.titleHidden()}, value:ctrl.get('title','css','font-size') ,min: '0' ,onchange: m.withAttr('value', ctrl.set('title','css','font-size'))})
                    ])
                ])
            ])
        ]),
        m('hr'),
        m('.row',[
            m('.col-sm-1',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Enter text (word) or image name (image). Set the path to the folder of images in the General Parameters page']),
            ]),
            m('.col-sm-11',{style:{'margin-left': '-67px', 'margin-top': '-1px'}},[
                m('input[type=text].form-control', {style:{width:'15em'},placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', 'aria-describedby':'basic-addon2', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)}),
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons'}},[
                    m('button[type=button].btn btn-outline-secondary',{disabled:ctrl.fields.newStimulus().length===0, id:'addWord', onclick: (e) => ctrl.addStimulus(e)},[
                        m('i.fa.fa-plus'), 'Add Word'
                    ]),
                    m('button[type=button].btn btn-outline-secondary', {disabled:ctrl.fields.newStimulus().length===0, id:'addImage', onclick: (e) => ctrl.addStimulus(e)},[
                        m('i.fa.fa-plus'), 'Add Image'
                    ])
                ])
            ]),
        ]),
        m('.row',[
            m('.col-sm-1',[
                m('br'),
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['To select multiple stimuli, please press the ctrl key while selecting the desired stimuli']),
            ]),
            m('.col-sm-11',{style:{'margin-left': '-67px', 'margin-top': '-1px'}},[
                m('.form-group',[
                    m('br'),
                    m('span',{style:{'font-size': '20px'}},'Stimuli: '),
                    m('select.form-control', {multiple : 'multiple', size : '8' ,style: {width: '15rem'}, onchange:(e) => ctrl.updateSelectedStimuli(e)},[
                        ctrl.get('stimulusMedia').some(object => object.word) ? ctrl.fields.stimuliHidden('visible') : ctrl.fields.stimuliHidden('hidden'),
                        ctrl.get('stimulusMedia').map(function(object){
                            let value = object.word ? object.word : object.image;
                            let option = value + (object.word ? ' [Word]' : ' [Image]');
                            return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                        })
                    ]),
                    m('.div',{style: {visibility:ctrl.fields.stimuliHidden(), position: 'relative', top: '-170px', left: '255px', marginBottom: '-150px'}},[
                        m('span', {style:{'text-decoration': 'underline'}} ,'Stimuli font\'s design:'),m('br'),
                        m('label','Font\'s color: '),m('br'),
                        m('input[type=color]', {style:{width:'3em', 'border-radius':'3px'},value: ctrl.get('stimulusCss','color'), onchange: m.withAttr('value', ctrl.set('stimulusCss','color'))}),
                        m('br'), m('label', 'Font\'s size:'), m('br'),
                        m('input[type=number]', {style: {width:'3em','border-radius':'4px','border':'1px solid #E2E3E2'},value:ctrl.get('stimulusCss','font-size') ,min: '0' ,onchange: m.withAttr('value', ctrl.set('stimulusCss','font-size'))})
                    ]),
                    m('br'),
                    m('.btn-group-vertical', {style:{'data-toggle':'buttons'}},[
                        m('button.btn btn btn-warning', {disabled: ctrl.fields.selectedStimuli().length ===0, onclick: () => ctrl.removeChosenStimuli()},'Remove Chosen Stimuli'),
                        m('button.btn btn btn-warning', {onclick: () => ctrl.removeAllStimuli()},'Remove All Stimuli'),
                        m('button.btn btn btn-warning', {onclick: () => ctrl.resetStimuliList()},'Reset Stimuli List'),
                    ])
                ]),
            ])
        ])
    ]);
}

export default elementComponent;

