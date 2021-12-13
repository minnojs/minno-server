import messages from '../../../../../utils/messagesComponent';

export function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

export function checkMissingElementName(element, name_to_display, error_msg){
    let containsImage = false
    //check for missing titles and names
    if(element.name.length === 0)
        error_msg.push(name_to_display+'\'s\ name is missing');

    if(element.title.media.image !== undefined){
        containsImage = true
        if(element.title.media.image.length === 0)
            error_msg.push(name_to_display+'\'s\ title is missing');
    }
    else{
        if(element.title.media.word.length === 0)
            error_msg.push(name_to_display+'\'s\ title is missing');
    }
    let stimulusMedia = element.stimulusMedia

    //if there an empty stimulli list
    if (stimulusMedia.length === 0)
        error_msg.push(name_to_display+'\'s stimuli list is empty, please enter at least one stimulus.')

    //check if the stimuli contains images
    for(let i = 0; i < stimulusMedia.length ;i++)
        if(stimulusMedia[i].image) containsImage = true

    if(element.title.startStimulus) //for biat only, checking if startStimulus contains image
        element.title.startStimulus.media.image ? containsImage = true : ''

    return containsImage
}

export function checkPrime(element, name_to_display, error_msg){
    let containsImage = false
    //check for missing titles and names
    if(element.name.length === 0)
        error_msg.push(name_to_display+'\'s\ name is missing');

    let mediaArray = element.mediaArray

    //if there an empty stimulli list
    if (mediaArray.length === 0)
        error_msg.push(name_to_display+'\'s stimuli list is empty, please enter at least one stimulus.')

    //check if the stimuli contains images
    for(let i = 0; i < mediaArray.length ;i++)
        if(mediaArray[i].image) containsImage = true

    return containsImage
}

export function showClearOrReset(element, value, action){
    let msg_text = {
        'reset':{text:'This will delete all current properties and reset them to default values.',title:'Reset?'},
        'clear':{text: 'This will delete all current properties.', title: 'Clear?'}
    };
    return messages.confirm({header: msg_text[action].title, content:
            m('strong', msg_text[action].text)})
        .then(response => {
            if (response) {
                Object.assign(element, clone(value));
                m.redraw();
            }
        }).catch(error => messages.alert({header: msg_text[action].title , content: m('p.alert.alert-danger', error.message)}))
        .then(m.redraw());
}

export function showRestrictions(type, text, title = ''){
    if(type === 'error') messages.alert({header: title , content: m('p.alert.alert-danger', text)})
    if(type === 'info') messages.alert({header: title , content: m('p.alert.alert-info', text)})
}

export function viewOutput(ctrl, settings){
    return m('.container',[
        m('.alert alert-danger', {role:'alert',style: {'margin-top':'20px',visibility: ctrl.error_msg.length === 0 ? 'hidden' : 'visible'}},[
            m('h6','Some problems were found in your script, it\'s recommended to fix them before proceeding to download:'),
            m('ul',[
                ctrl.error_msg.map(function(err){
                    return m('li',err);
                })
            ])
        ]),
        m('.row.space',[
            m('.col-md-6.offset-sm-4',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Download the JavaScript file. For more details how to use it, see the “Help” page.']),
                m('button.btn btn btn-primary', {style:{'margin-left':'6px','background-color': 'rgb(40, 28, 128)', 'font-size': '16px'},onclick: ctrl.createFile(settings,'JS')},[
                    m('i.fa.fa-download'), ' Download Script']),
            ])
        ]),
        m('.row.space',[
            m('.col-md-6.offset-sm-4',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Importing this file to this tool, will load all your parameters to this tool.']),
                m('button.btn btn btn-primary', {style:{'margin-left':'6px'}, onclick: ctrl.createFile(settings,'JSON')},[
                    m('i.fa.fa-download'), ' Download JSON']),
            ])
        ]),
        m('.row.space',[
            m('.col-md-6.offset-sm-4',
                m('button.btn btn btn-primary', {style:{'margin-left': '30px'} ,onclick: ctrl.printToPage(settings)},
                    'Print to Browser'))
        ]),
        m('div.space',{id: 'textDiv', style: {visibility: 'hidden', 'padding' :'1em 0 0 3.5em'}},
            m('textarea.form-control', {id:'textArea', value:'', style: {width : '57rem', height: '25rem'}}))
    ]);
}

export function viewImport(ctrl){
    return m('.activation.centrify',[
        m('.card-block',[
            m('.card.border-info.mb-3',{style:{'max-width': '25rem'}}, [
                m('.card-header','Upload a JSON file: ' ),
                m('.card-body.text-info',[
                    m('p',{style:{margin:'0.5em 1em 0.5em 1em'}},'If you saved a JSON file from a previous session, you can upload that file here to edit the parameters.'),
                    m('input[type=file].form-control',{id:'uploadFile', style: {'text-align': 'center'}, onchange: ctrl.handleFile})
                ])
            ])
        ])
    ]);
}

export function editStimulusObject(fieldName, get, set){ //used in parameters component
    return m('.col-8',[
        m('.col',[
            m('span' ,'Font\'s color: '),
            m('input[type=color]', {style: {width:'3em', 'border-radius':'3px', 'margin-left':'0.3rem'}, value: get(fieldName,'css','color'), onchange:m.withAttr('value', set(fieldName,'css','color'))})
        ]),
        m('.col.space',{style:{'padding-left':'22.5rem'}},[
            m('label', 'Font\'s size:'),
            m('input[type=number]', {placeholder:'0', style: {width:'3em','border-radius':'4px','border':'1px solid #E2E3E2', 'margin-left':'0.3rem'}, value:get(fieldName,'css','font-size') ,min: '0' ,onchange:m.withAttr('value', set(fieldName,'css','font-size'))})
        ]),
        m('.col.space',{style:{'padding-left':'22.5rem'}},[
            !fieldName.toLowerCase().includes('maskstimulus') ? m('span', 'Text: ') :  m('span', 'Image: '),
            !fieldName.toLowerCase().includes('maskstimulus') ? m('input[type=text]', {style: {'border-radius':'3px','border':'1px solid #E2E3E2',height:'2.5rem',width:'13rem'}, value:get(fieldName,'media','word') ,onchange:m.withAttr('value', set(fieldName,'media','word'))})
                : m('input[type=text]', {style: {'border-radius':'3px','border':'1px solid #E2E3E2'}, value:get(fieldName,'media','image') ,onchange:m.withAttr('value', set(fieldName,'media','image'))})
        ])
    ])
}

