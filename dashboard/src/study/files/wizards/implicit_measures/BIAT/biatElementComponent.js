import {clone, showRestrictions} from '../resources/utilities.js';

let elementComponent = {
    controller: controller,
    view: view,
};

function controller(object, settings,stimuliList, startStimulusList ,index){
    let element = settings[object.key];
    if (Array.isArray(element)) element = element[index]; //in case of 'categories' in BIAT
    let fields = {
        newStimulus : m.prop(''),
        elementType: m.prop(object.key.toLowerCase().includes('categor') ? 'Category' : 'Attribute'),
        titleType: m.prop(element.title.media.word === undefined ? 'image' : 'word'),
        titleHidden: m.prop(this.titleType === 'word'? 'hidden': 'visible'), //weather the category design flags will be visible
        selectedStimuli: m.prop(''),
        stimuliHidden: m.prop('visible'),
        startStimulus: m.prop(settings.parameters.showStimuliWithInst === false ? 'hidden' : 'visible'),
        newStartStimulus: m.prop(''), //startStimulus
        startStimuliHidden: m.prop(this.startStimulus),
        selectedStartStimuli: m.prop(''),
        isNewCategory: index > 1 ? m.prop(true) : m.prop(false) //if it's a new category (mot first or second) there won't be an option to reset stimuli lists
    };
    return {fields, set, get, addStimulus, updateSelectedStimuli,removeChosenStimuli, removeAllStimuli,
        updateTitleType, removeChosenStartStimuli, resetStimuliList};
    
    function get(name, media, type, startStimulus){
        if (name === 'title' && media === 'startStimulus' && type === 'media'){ //in case of getting startStimulus stimuli list
            if (element.title.startStimulus.media.word !== undefined)
            {
                if (element.title.startStimulus.media.word === '') return [];
                return element.title.startStimulus.media.word.split(', ');
            }
            else{
                if (element.title.startStimulus.media.image === '') return [];
                return [element.title.startStimulus.media.image];
            }
        }
        if (name === 'title' && !media && !type) //special case - return the title's value (word/image)
        { 
            if (element.title.media.word === undefined) return element.title.media.image;
            return element.title.media.word;
        }
        if (media && type){
            if (type === 'font-size')
                return parseFloat((element[name][media][type].replace('em','')));
            else if (startStimulus){
                if (startStimulus === 'font-size')
                    return parseFloat((element[name][media][type][startStimulus].replace('em','')));
                return element[name][media][type][startStimulus];
            }
            return element[name][media][type];
        }
        else if (media === 'color') //case of stimulusCss
            return element[name][media];
        else if (media === 'font-size') return parseFloat((element[name][media]).substring(0,3));
        return element[name]; 
    }
    function set(name, media, type, startStimulus){
        return function(value){
            if (media && type){
                if (type === 'font-size'){
                    value = Math.abs(value);
                    if (!value){
                        showRestrictions('error','Font\'s size must be bigger than 0.', 'Error')
                        return element[name][media][type];
                    }
                    return element[name][media][type] = value + 'em';
                }
                else if (startStimulus !=null){ //in case of startStimulus
                    if(startStimulus === 'font-size'){
                        value = Math.abs(value);
                        if (!value){
                            showRestrictions('error','Font\'s size must be bigger than 0.', 'Error')
                            return element[name][media][type][startStimulus];
                        }
                        return element[name][media][type][startStimulus] = value + 'em';
                    }
                    return element[name][media][type][startStimulus] = value;
                }
                return element[name][media][type] = value;
            }
            else if (media === 'color') return element[name][media] = value;
            else if (media === 'font-size'){
                value = Math.abs(value);
                if (!value){
                    showRestrictions('error','Font\'s size must be bigger than 0.', 'Error')
                    return element[name][media];
                }
                return element[name][media] = value + 'em';
            }
            return element[name]= value;
        };
    }
    function updateTitleType(){
        return function(type){
            fields.titleType(type);
            let object = element.title.media;
            let category;
            object.word ? category = object.word : category = object.image;
            if (type === 'word'){
                element.title.media = {};
                element.title.media = {word: category};
            }
            else{
                element.title.media = {};
                element.title.media = {image: category};
            }
        };
    }
    function addStimulus(event, startStimulus = false){
        let new_stimuli = !startStimulus ? fields.newStimulus() : fields.newStartStimulus();
        event = event.target.id; //get the button name, to know the kind of the stimulus added
        if (event === 'addWord'){
            if (!startStimulus) element.stimulusMedia.push({word : new_stimuli});
            else{
                let mediaStr;
                if (!element.title.startStimulus.media.word) {
                    removeAllStimuli(event, true);
                    mediaStr = new_stimuli;
                }
                else if (element.title.startStimulus.media.word === '')
                    mediaStr = element.title.startStimulus.media.word + new_stimuli;
                else mediaStr = element.title.startStimulus.media.word +', '+new_stimuli;
                element.title.startStimulus.media = {word : mediaStr};
            }
        }
        else { //addImage
            if (!startStimulus) element.stimulusMedia.push({image : new_stimuli});
            else{
                removeAllStimuli(event, true);
                element.title.startStimulus.media = {image: new_stimuli};
            }
        }
        if (!startStimulus) fields.newStimulus(''); //reset the field
        else fields.newStartStimulus('');
    }

    function updateSelectedStimuli(select, startStimulus = false){
        let list =[];
        if (!startStimulus) {
            list = element.stimulusMedia.filter((val,i) => select.target.options[i].selected);
            fields.selectedStimuli(list);
        }
        else{
            for (let i = 0; i < select.target.options.length; i++)
                if (select.target.options[i].selected) list.push(select.target.options[i].value);
            fields.selectedStartStimuli(list);
        }
    }
    function removeChosenStimuli(){
        element.stimulusMedia = element.stimulusMedia.filter((element)=>!fields.selectedStimuli().includes(element));
        fields.selectedStimuli([]);
    }
    function removeChosenStartStimuli(e){
        let selected = fields.selectedStartStimuli();
        let stimuli = element.title.startStimulus.media;
        if (!stimuli.word) { //in case of a single image
            removeAllStimuli(e, true);
            fields.selectedStartStimuli([]);
            return; 
        }
        else stimuli = element.title.startStimulus.media.word.split(', ');
        let new_str = '';
        for (let i = 0 ; i < stimuli.length; i++){
            if (selected.includes(stimuli[i])){
                if (stimuli.length === 1) new_str = '';
                else if (i === stimuli.length - 1) new_str = new_str.slice(0,-2);
                continue;
            }
            if (stimuli.length === 1) new_str = stimuli[i];
            else if (i === stimuli.length - 1) new_str = new_str + stimuli[i];
            else new_str = new_str + stimuli[i] + ', ';
        }
        element.title.startStimulus.media.word = new_str;
        fields.selectedStartStimuli([]);
    }
    function removeAllStimuli(e,startStimulus = false){
        if (!startStimulus) element.stimulusMedia.length = 0;
        else {
            if (element.title.startStimulus.media.word)
                element.title.startStimulus.media.word = '';
            else element.title.startStimulus.media.image = '';
        }
    }
    function resetStimuliList(e,flag = false){
        flag ? element.title.startStimulus = clone(startStimulusList) : element.stimulusMedia = clone(stimuliList);
    }
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
                m('input[type=text].form-control',{style: {width: '16rem', height:'2.5rem'}, value:ctrl.get('name'), onchange:m.withAttr('value', ctrl.set('name'))})
            ]),
        ]),
        m('hr'),
        m('.row', [
            m('.col-md-4',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Name of the ' +ctrl.fields.elementType()+' presented in the task: ']),
                m('span', [' ',ctrl.fields.elementType()+' title as will appear to the user: '])
            ]),
            m('.col-md-4', [
                m('input[type=text].form-control',{style: {width: '16rem', height:'2.5rem'}, value: ctrl.get('title'), onchange:m.withAttr('value', ctrl.set('title', 'media', ctrl.fields.titleType()))})
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
                        m('input[type=color]',{style: {width:'3em', 'border-radius':'3px',visibility:ctrl.fields.titleHidden()}, value: ctrl.get('title','css','color'), onchange:m.withAttr('value', ctrl.set('title','css','color'))})
                    ])
                ]),m('br'),
                m('.row',[
                    m('.col',[
                        m('span', {style: {visibility:ctrl.fields.titleHidden()}}, 'Font\'s size: '),
                        m('input[type=number]', {style: {width:'3em','border-radius':'4px','border':'1px solid #E2E3E2',visibility:ctrl.fields.titleHidden()}, value:ctrl.get('title','css','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('title','css','font-size'))})
                    ])
                ])
            ])
        ]),
        m('hr'),
        m('.row',[
            m('.col-sm-1',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Enter text (word) or image name (image). Set the path to the folder of images in the General Parameters page'])
            ]),
            m('.col-sm-5',{style:{'margin-left': '-67px', 'margin-top': '-1px'}},[
                m('input[type=text].form-control', {style:{width:'15em'},placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', 'aria-describedby':'basic-addon2', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)}),
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons'}},[
                    m('button[type=button].btn btn-outline-secondary',{disabled:ctrl.fields.newStimulus().length===0, id:'addWord', onclick: ctrl.addStimulus},[
                        m('i.fa.fa-plus'), 'Add Word'
                    ]),
                    m('button[type=button].btn btn-outline-secondary', {disabled:ctrl.fields.newStimulus().length===0, id:'addImage', onclick: ctrl.addStimulus},[
                        m('i.fa.fa-plus'), 'Add Image'
                    ])
                ])
            ]),
            ///startStimulus
            m('.col-sm-1',{style: {visibility:ctrl.fields.startStimulus()}},[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Here You can enter only one type of stimuli (image or words), if you enter an image you can only enter one and with it`s file extension.']),
            ]),
            m('.col-sm-5',{style: {'margin-left': '-67px', 'margin-top': '-1px', visibility:ctrl.fields.startStimulus()}}, [
                m('input[type=text].form-control', {style:{width:'15em'},placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', 'aria-describedby':'basic-addon2', value: ctrl.fields.newStartStimulus(), oninput: m.withAttr('value', ctrl.fields.newStartStimulus)}),
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons'}},[
                    m('button[type=button].btn btn-outline-secondary',{disabled:ctrl.fields.newStartStimulus().length === 0, id:'addWord', onclick: (e) => ctrl.addStimulus(e,true)},[
                        m('i.fa.fa-plus'), 'Add Word'
                    ]),
                    m('button[type=button].btn btn-outline-secondary', {disabled:ctrl.fields.newStartStimulus().length === 0, id:'addImage', onclick: (e) => ctrl.addStimulus(e,true)},[
                        m('i.fa.fa-plus'), 'Add Image'
                    ])
                ])
            ]),
        ]),
        m('.row',[
            m('.col-sm-1',[
                m('br'),
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['To select multiple stimuli, please press the ctrl key while selecting the desired stimuli'])
            ]),
            m('.col-sm-5',{style:{'margin-left': '-67px', 'margin-top': '-1px'}},[
                m('.form-group',[
                    m('br'),
                    m('span',{style:{'font-size': '20px'}},'Stimuli: '),
                    m('select.form-control', {multiple : 'multiple', size : '8' ,style: {width: '15rem'}, onchange: (e) => ctrl.updateSelectedStimuli(e)},[
                        ctrl.get('stimulusMedia').some(object => object.word) ? ctrl.fields.stimuliHidden('visible') : ctrl.fields.stimuliHidden('hidden'),
                        ctrl.get('stimulusMedia').map(function(object){
                            let value = object.word ? object.word : object.image;
                            let option = value + (object.word ? ' [Word]' : ' [Image]');
                            return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                        })
                    ]),
                    m('div',{style: {visibility:ctrl.fields.stimuliHidden(), position: 'relative', top: '-170px', left: '255px', marginBottom: '-150px'}},[
                        m('span',{style:{'text-decoration': 'underline'}}, 'Stimuli font\'s design:'),m('br'),
                        m('label','Font\'s color: '),m('br'),
                        m('input[type=color]', {style:{width:'3em', 'border-radius':'3px'},value: ctrl.get('stimulusCss','color'), onchange:m.withAttr('value', ctrl.set('stimulusCss','color'))}),
                        m('br'), m('label', 'Font\'s size:'), m('br'),
                        m('input[type=number]', {style: {width:'3em','border-radius':'4px','border':'1px solid #E2E3E2'},value:ctrl.get('stimulusCss','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('stimulusCss','font-size'))})
                    ]),
                    m('br'),
                    m('.btn-group-vertical', {style:{'data-toggle':'buttons'}},[
                        m('button.btn btn btn-warning', {disabled: ctrl.fields.selectedStimuli().length===0, onclick:ctrl.removeChosenStimuli}, 'Remove Chosen Stimuli'),
                        m('button.btn btn btn-warning', {onclick:ctrl.removeAllStimuli},'Remove All Stimuli'),
                        ctrl.fields.isNewCategory() ? '' : m('button.btn btn btn-warning', {onclick:(e) => ctrl.resetStimuliList(e)}, 'Reset Stimuli List'),
                    ])
                ]),
            ]),
            ///startStimulus
            m('.col-sm-1',{style: {visibility:ctrl.fields.startStimulus()}},[
                m('br'),
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['To select multiple stimuli, please press the ctrl key while selecting the desired stimuli'])
            ]),
            m('.col-sm-5',{style: {'margin-left': '-67px', 'margin-top': '-1px', visibility:ctrl.fields.startStimulus()}},[
                m('.form-group',[   
                    m('br'), 
                    m('span',{style:{'font-size': '20px'}},'Stimuli Presented with Instructions: '),
                    m('select.form-control', {multiple : 'multiple', size : '8' ,style: {width: '15rem'}, onchange: (e) => ctrl.updateSelectedStimuli(e, true)},[
                        ctrl.fields.startStimulus() === 'hidden' ||
                        ctrl.get('title','startStimulus','media').some(object => object.includes('.')) || 
                        ctrl.get('title','startStimulus','media').length === 0 ? ctrl.fields.startStimuliHidden('hidden') : ctrl.fields.startStimuliHidden('visible'),
                        ctrl.get('title','startStimulus','media').map(function(object){
                            let type = object.includes('.') ? ' [Image]' : ' [Word]';
                            let option = object + type;
                            return m('option', {value:object, selected : ctrl.fields.selectedStartStimuli().includes(object)} ,option);
                        })
                    ]),
                    m('div',{style: {visibility:ctrl.fields.startStimuliHidden(), position: 'relative', top: '-170px', left: '255px', marginBottom: '-150px'}},[
                        m('span',{style:{'text-decoration': 'underline'}},'Stimuli font\'s design:'),m('br'),
                        m('label','Font\'s color: '),m('br'),
                        m('input[type=color]', {style:{width:'3em', 'border-radius':'3px'},value: ctrl.get('title','startStimulus','css','color'), onchange:m.withAttr('value', ctrl.set('title','startStimulus','css','color'))}),
                        m('br'), m('label', 'Font\'s size:'), m('br'),
                        m('input[type=number]', {style: {width:'3em','border-radius':'4px','border':'1px solid #E2E3E2'}, value:ctrl.get('title','startStimulus','css','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('title','startStimulus','css','font-size'))})
                    ]),
                    m('br'),
                    m('.btn-group-vertical', {style:{'data-toggle':'buttons'}},[
                        m('button.btn btn btn-warning', {disabled: ctrl.fields.selectedStartStimuli().length === 0, onclick: (e) => ctrl.removeChosenStartStimuli(e)}, 'Remove Chosen Stimuli'),
                        m('button.btn btn btn-warning', {onclick: (e) => ctrl.removeAllStimuli(e,true)}, 'Remove All Stimuli'),
                        ctrl.fields.isNewCategory() ? '' : m('button.btn btn btn-warning', {onclick:(e) => ctrl.resetStimuliList(e,true)}, 'Reset Stimuli List'),
                    ])
                ])
            ])
        ])
    ]);
}

export default elementComponent;

