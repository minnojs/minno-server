/**
    * @preserve minnojs-stiat-dashboard v1.0.0
    * @license Apache-2.0 (2022)
    */
    
(function () {
    'use strict';

    let tabsComponent = {
        controller: function(tabs){
            let tab = Object.keys(tabs)[0];
            let subTabs = null;
            let currSubTab = null;
            return {tab, subTabs, currSubTab};
        },
        view:
            function(ctrl, tabs, settings, defaultSettings, external = false, notifications,
                is_locked, is_settings_changed, show_do_save){
                return m('.container-fluid',[
                    m('.row',[
                        m('.col-md-11',
                            m('.tab',
                                Object.keys(tabs).map(function(tab){
                                    if (!external && (tab === 'output' || tab === 'import'))
                                        return;
                                    if (tab === 'practice' && !settings.parameters.practiceBlock)
                                        return;
                                    if (tab === 'exampleBlock' && !settings.parameters.exampleBlock)
                                        return;
                                    return m('button.tablinks', {
                                        class: ctrl.tab === tab ? 'active' : '',
                                        onclick:function(){
                                            ctrl.tab = tab;
                                            !tabs[tab].subTabs ? ''
                                                : ctrl.currSubTab = Object.keys(tabs[tab].subTabs)[0];
                                        }}, tabs[tab].text);}))
                        ),
                        m('.col-md-1-text-center',
                            !external ?
                                is_locked() ? '' :
                                    m('button.btn btn btn-primary', {
                                        id:'save_button',
                                        title: !is_settings_changed() ? 'No changes were made'
                                            : 'Update the script file (the .js file).\nThis will override the current script file.',
                                        disabled: !is_settings_changed(),
                                        onclick: () => show_do_save(),
                                    }, 'Save')
                                : m('a.btn btn-info btn-lg',{
                                    href:'https://minnojs.github.io/minno-server/implicitMeasures/',
                                    role:'button',
                                    title:'Main Page'}
                                ,m('i.fa.fa-home'))
                        )
                    ]),
                    !tabs[ctrl.tab].subTabs ? '' :
                        m('.row.space',[
                            m('.col-md-11',[
                                m('.subtab',
                                    Object.keys(tabs[ctrl.tab].subTabs).map(function(subTab){
                                        return m('button',{
                                            class: ctrl.currSubTab === subTab ? 'active' : '',
                                            onclick:function(){
                                                ctrl.currSubTab = subTab;
                                            }} ,tabs[ctrl.tab].subTabs[subTab].text);
                                    }))
                            ])
                        ]),
                    m('.row',[
                        external ? '' : m('div', notifications.view()),
                        m('.col-sm-11',{key:tabs[ctrl.tab]},
                            m.component(tabs[ctrl.tab].component, settings, defaultSettings, tabs[ctrl.tab].rowsDesc, tabs[ctrl.tab].type, ctrl.currSubTab))
                    ])
                ]);}
    };

    function defaultSettings(external) {

        return {
            parameters: {
                isQualtrics: false,
                base_url: {image: external ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/docs/images/' : './images'}
            },
            category: {
                name: 'Black people',
                title: {media: {word: 'Black people'}, css: {color: '#31b404', 'font-size': '2em'}, height: 4},
                stimulusMedia: [{word: 'Tayron'}, {word: 'Malik'}, {word: 'Terrell'}, {word: 'Jazamin'}, {word: 'Tiara'}, {word: 'Shanice'}],
                stimulusCss: {color: '#31b404', 'font-size': '2em'}
            },
            attribute1: {
                name: 'Unpleasant',
                title: {media: {word: 'Unpleasant'}, css: {color: '#31b404', 'font-size': '2em'}, height: 4},
                stimulusMedia: [{word: 'Bomb'}, {word: 'Abuse'}, {word: 'Sadness'}, {word: 'Pain'}, {word: 'Poison'}, {word: 'Grief'}],
                stimulusCss: {color: '#31b404', 'font-size': '2em'}
            },
            attribute2: {
                name: 'Pleasant',
                title: {media: {word: 'Pleasant'}, css: {color: '#31b404', 'font-size': '2em'}, height: 4},
                stimulusMedia: [{word: 'Paradise'}, {word: 'Pleasure'}, {word: 'Cheer'}, {word: 'Wonderful'}, {word: 'Splendid'}, {word: 'Love'}],
                stimulusCss: {color: '#31b404', 'font-size': '2em'}
            },
            trialsByBlock:
                [//Each object in this array defines a block
                    {
                        instHTML: '',
                        block: 1,
                        miniBlocks: 1,
                        singleAttTrials: 10,
                        sharedAttTrials: 10,
                        categoryTrials: 0
                    },
                    {
                        instHTML: '',
                        block: 2,
                        miniBlocks: 2,
                        singleAttTrials: 10,
                        sharedAttTrials: 7,
                        categoryTrials: 7
                    },
                    {
                        instHTML: '',
                        block: 3,
                        miniBlocks: 2,
                        singleAttTrials: 10,
                        sharedAttTrials: 7,
                        categoryTrials: 7
                    },
                    {
                        instHTML: '',
                        block: 4,
                        miniBlocks: 2,
                        singleAttTrials: 10,
                        sharedAttTrials: 7,
                        categoryTrials: 7
                    },
                    {
                        instHTML: '',
                        block: 5,
                        miniBlocks: 2,
                        singleAttTrials: 10,
                        sharedAttTrials: 7,
                        categoryTrials: 7
                    }
                ],
            blockOrder: 'random', //can be startRight/startLeft/random
            switchSideBlock: 4, //By default, we switch on block 4 (i.e., after blocks 2 and 3 showed the first pairing condition).
            text: {
                leftKeyText: 'Press "E" for',
                rightKeyText: 'Press "I" for',
                orKeyText: 'or',
                remindErrorText: '<p style="font-size:0.6em;font-family:arial sans-serif; text-align:center;">' +
                    'If you make a mistake, a red <font-color="#ff0000"><b>X</b></font> will appear. ' +
                    'Press the other key to continue.<p/>',
                finalText: 'You have completed this task<br/><br/>Press SPACE to continue.',
                instTemplatePractice: '<div><p align="center" style="font-size:20px; font-family:arial">' +
                    '<font color="#000000"><u>Part blockNum of nBlocks</u><br/><br/></p>' +
                    '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
                    'Put a left finger on the <b>E</b> key for items that belong to the category ' +
                    '<font color="#31b404">attribute1</font>.<br/>' +
                    'Put a right finger on the <b>I</b> key for items that belong to the category ' +
                    '<font color="#31b404">attribute2</font>.<br/>' +
                    'Items will appear one at a time.<br/><br/>' +
                    'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
                    'Press the other key to continue.<br/><br/>' +
                    '<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
                instTemplateCategoryRight: '<div><p align="center" style="font-size:20px; font-family:arial">' +
                    '<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +
                    '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
                    'Put a left finger on the <b>E</b> key for items that belong to the category ' +
                    '<font color="#31b404">attribute1</font>.<br/>' +
                    'Put a right finger on the <b>I</b> key for items that belong to the category ' +
                    '<font color="#31b404">attribute2</font> ' +
                    'and for items that belong to the category <font color="#31b404">thecategory</font>.<br/>' +
                    'Items will appear one at a time.<br/><br/>' +
                    'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
                    'Press the other key to continue.<br/><br/>' +
                    '<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
                instTemplateCategoryLeft: '<div><p align="center" style="font-size:20px; font-family:arial">' +
                    '<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +
                    '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
                    'Put a left finger on the <b>E</b> key for items that belong to the category ' +
                    '<font color="#31b404">attribute1</font> ' +
                    'and for items that belong to the category <font color="#31b404">thecategory</font>.<br/>' +
                    'Put a right finger on the <b>I</b> key for items that belong to the category ' +
                    '<font color="#31b404">attribute2</font>.<br/>' +
                    'Items will appear one at a time.<br/><br/>' +
                    'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +
                    'Press the other key to continue.<br/><br/>' +
                    '<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
            }
        };
    }

    let noop = ()=>{};

    let messages = {
        vm: {isOpen: false},

        open: (type, opts={}) => {
            let promise = new Promise((resolve, reject) => {
                messages.vm = {resolve,reject,type, opts, isOpen:true};
            });
            m.redraw();

            return promise;
        },

        close: response => {
            let vm = messages.vm;
            vm.isOpen = false;
            if (typeof vm.resolve === 'function') vm.resolve(response);
            m.redraw();
        },

        custom: opts=>messages.open('custom', opts),
        alert: opts => messages.open('alert', opts),
        confirm: opts => messages.open('confirm', opts),
        prompt: opts => messages.open('prompt', opts),

        view: () => {
            let vm = messages.vm;
            let close = messages.close.bind(null, null);
            let stopPropagation = e => e.stopPropagation();
            return m('#messages.backdrop', [
                !vm || !vm.isOpen
                    ? ''
                    :[
                        m('.overlay', {config:messages.config(vm.opts)}),
                        m('.backdrop-content', {onclick:close}, [
                            m('.card', {class: vm.opts.wide ? 'col-sm-8' : 'col-sm-5', config:maxHeight}, [
                                m('.card-block', {onclick: stopPropagation}, [
                                    messages.views[vm.type](vm.opts)
                                ])
                            ])
                        ])
                    ]
            ]);

        },

        config: (opts) => {
            return (element, isInitialized, context) => {
                if (!isInitialized) {
                    let handleKey = function(e) {
                        if (e.keyCode == 27) {
                            messages.close(null);
                        }
                        if (e.keyCode == 13 && !opts.preventEnterSubmits) {
                            messages.close(true);
                        }
                    };

                    document.body.addEventListener('keyup', handleKey);

                    context.onunload = function() {
                        document.body.removeEventListener('keyup', handleKey);
                    };
                }
            };
        },

        views: {
            custom: (opts={}) => opts.content,

            alert: (opts={}) => {
                let close = response => messages.close.bind(null, response);
                return [
                    m('h4', opts.header),
                    m('p.card-text', opts.content),
                    m('.text-xs-right.btn-toolbar',[
                        m('button.btn.btn-primary.btn-sm', {onclick:close(true)}, opts.okText || 'OK')
                    ])
                ];
            },

            confirm: (opts={}) => {
                let close = response => messages.close.bind(null, response);
                return [
                    m('h4', opts.header),
                    m('p.card-text', opts.content),
                    m('.text-xs-right.btn-toolbar',[
                        m('button.btn.btn-secondary.btn-sm', {onclick:close(null)}, opts.cancelText || 'Cancel'),
                        m('button.btn.btn-primary.btn-sm', {onclick:close(true)}, opts.okText || 'OK')
                    ])
                ];
            },

            /**
             * Promise prompt(Object opts{header: String, content: String, name: Prop})
             *
             * where:
             *   any Prop(any value)
             */
            prompt: ({prop, header, content, postContent, okText, cancelText}={prop:noop}) => {
                let close = response => messages.close.bind(null, response);
                return [
                    m('h4', header),
                    m('.card-text', content),
                    m('.card-block', [
                        m('input.form-control', {
                            key: 'prompt',
                            value: prop(),
                            onchange: m.withAttr('value', prop),
                            config: (element, isInitialized) => {
                                if (!isInitialized) setTimeout(() => element.focus());
                            }
                        })
                    ]),
                    m('.card-text', postContent),
                    m('.text-xs-right.btn-toolbar',[
                        m('button.btn.btn-secondary.btn-sm', {onclick:close(null)}, cancelText || 'Cancel'),
                        m('button.btn.btn-primary.btn-sm', {onclick:close(true)}, okText || 'OK')
                    ])
                ];
            }
        }
    };

    // set message max height, so that content can scroll within it.
    let maxHeight = (element, isInitialized, ctx) => {
        if (!isInitialized){
            onResize();

            window.addEventListener('resize', onResize, true);

            ctx.onunload = function(){
                window.removeEventListener('resize', onResize);
            };

        }

        function onResize(){
            element.style.maxHeight = document.documentElement.clientHeight * 0.9 + 'px';
        }
    };

    function clone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    function resetClearButtons(reset, clear, curr_tab = null, isBiat = false){
        let showReset = !(isBiat && curr_tab > 1); //if the condition holds, don't show the reset button
        return m('.pull-xs-right',[
            m('.btn-group btn-group-toggle',[
                !showReset ? '' :
                    m('button.btn btn btn-secondary',
                        {title:'Reset all current fields to default values',
                            onclick: () => reset(curr_tab)},
                        m('i.fa.fa-undo.fa-sm'), ' Reset'),
                m('button.btn btn btn-danger',
                    {title:'Clears all current values',onclick:() => clear(curr_tab)},
                    m('i.fa.fa-trash.fa-sm'), ' Clear'),
            ])
        ]);
    }

    function pageHeadLine(task){
        return m('h1.display-4', 'Create my '+task+' script');
    }

    function checkMissingElementName(element, name_to_display, error_msg){
        let containsImage = false;
        //check for missing titles and names
        if(element.name.length === 0)
            error_msg.push(name_to_display+'\'s name is missing');

        if(element.title.media.image !== undefined){
            containsImage = true;
            if(element.title.media.image.length === 0)
                error_msg.push(name_to_display+'\'s title is missing');
        }
        else {
            if(element.title.media.word.length === 0)
                error_msg.push(name_to_display+'\'s title is missing');
        }
        let stimulusMedia = element.stimulusMedia;

        //if there an empty stimuli list
        if (stimulusMedia.length === 0)
            error_msg.push(name_to_display+'\'s stimuli list is empty, please enter at least one stimulus.');

        //check if the stimuli contains images
        for(let i = 0; i < stimulusMedia.length ;i++)
            if(stimulusMedia[i].image) containsImage = true;

        if(element.title.startStimulus) //for biat only, checking if startStimulus contains image
            element.title.startStimulus.media.image ? containsImage = true : '';

        return containsImage;
    }
    function showClearOrReset(element, value, action){
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

    function showRestrictions(type, text, title = ''){
        if(type === 'error')
            messages.alert({header: title , content: m('p.alert.alert-danger', text)});
        if(type === 'info') messages.alert({header: title , content: m('p.alert.alert-info', text)});
    }

    let printFlag = m.prop(false);
    function viewOutput(ctrl, settings, toString){
        return m('.space',[
            !ctrl.error_msg.length ? '' :
                m('.alert alert-danger', [
                    m('strong','Some problems were found in your script, it\'s recommended to fix them before proceeding to download:'),
                    m('ul',[
                        ctrl.error_msg.map(function(err){
                            return m('li',err);
                        })
                    ])
                ]),
            m('.row',
                m('.col-md-8.offset-sm-3',
                    m('.btn-group', [
                        m('button.btn btn btn-success', {
                            onclick: ctrl.createFile(settings,'JS'),
                            title:'Download the JavaScript file. For more details how to use it, see the “Help” page.'}, [m('i.fa.fa-download'), ' Download Script']),
                        m('button.btn btn btn-success', {
                            onclick: ctrl.createFile(settings,'JSON'),
                            title:'Importing this file to this tool, will load all your parameters to this tool.'}, [m('i.fa.fa-download'), ' Download JSON']),
                        m('button.btn btn btn-light', {
                            onclick: () => printFlag(true)}, [m('i.fa.fa-file'), ' Print to Browser'])
                    ])
                )),
            !printFlag() ? '' :
                m('.row.space',
                    m('.col-md-10.offset-sm-1',
                        m('textarea.form-control', {value: toString(settings), rows:20})
                    ))
        ]);
    }

    function viewImport(ctrl){
        return m('.row.centrify.space',[
            m('.col-sm-4',
                m('.card.border-info', [
                    m('.card-header',m('strong','Upload a JSON file: ')),
                    m('card-body.text-info',[
                        m('.col-sm-12',
                            m('p.space','If you saved a JSON file from a previous session, you can upload that file here to edit the parameters.')
                        ),
                        m('input[type=file].form-control',{id:'uploadFile', onchange: ctrl.handleFile})
                    ])
                ])
            )]
        );
    }

    function editStimulusObject(fieldName, get, set){ //used in parameters component
        return m('.col-sm-4.col-lg-4',[
            m('.row',[
                m('.col-sm-4', m('span' ,'Font\'s color: ')),
                m('.col-sm-4', m('input[type=color].form-control', {value: get(fieldName,'css','color'), onchange:m.withAttr('value', set(fieldName,'css','color'))}))
            ]),
            m('.row.space',[
                m('.col-sm-4', m('span', 'Font\'s size:')),
                m('.col-sm-4', m('input[type=number].form-control', {placeholder:'0', value:get(fieldName,'css','font-size') ,min: '0' ,onchange:m.withAttr('value', set(fieldName,'css','font-size'))}))
            ]),
            m('.row.space',[
                m('.col-sm-4',
                    !fieldName.toLowerCase().includes('maskstimulus')
                        ? m('span', 'Text: ') :  m('span', 'Image: ')),
                m('.col-sm-7',
                    !fieldName.toLowerCase().includes('maskstimulus')
                        ? m('input[type=text].form-control', {value:get(fieldName,'media','word') ,oninput:m.withAttr('value', set(fieldName,'media','word'))})
                        : m('input[type=text].form-control', {value:get(fieldName,'media','image') ,oninput:m.withAttr('value', set(fieldName,'media','image'))})
                )
            ])
        ]);
    }

    let parametersComponent$1 = {
        controller:controller$a,
        view:view$a
    };

    function controller$a(settings, defaultSettings, rows) {
        let parameters = settings.parameters;
        let external = settings.external;
        let qualtricsParameters = ['leftKey', 'rightKey', 'fullscreen', 'showDebriefing'];
        return {reset, clear, set, get, rows, qualtricsParameters, external};

        function reset(){showClearOrReset(parameters, defaultSettings.parameters, 'reset');}
        function clear(){showClearOrReset(parameters, rows.slice(-1)[0], 'clear');}

        function get(name, object, parameter) {
            if (name === 'base_url')
                return parameters[name][object];
            if (name === 'isTouch')
                if (parameters[name] === true) return 'Touch';
                else return 'Keyboard';
            if (name === 'isQualtrics')
                if (parameters[name] === true) {
                    return 'Qualtrics';
                } else return 'Regular';
            if (object && parameter) {
                if (parameter === 'font-size')
                    return parseFloat((parameters[name][object][parameter].replace('em', '')));
                return parameters[name][object][parameter];
            }
            return parameters[name];
        }

        function set(name, object, parameter) {
            return function (value) {
                if (name === 'base_url')
                    return parameters[name][object] = value;
                if (name === 'isTouch')
                    if (value === 'Keyboard') return parameters[name] = false;
                    else return parameters[name] = true;
                if (name === 'isQualtrics')
                    if (value === 'Regular') return parameters[name] = false;
                    else return parameters[name] = true;
                if (name.includes('Duration')) return parameters[name] = Math.abs(value);
                if (object && parameter) {
                    if (parameter === 'font-size') {
                        value = Math.abs(value);
                        if (value === 0) {
                            showRestrictions('error', 'Font\'s size must be bigger than 0.', 'Error');
                            return parameters[name][object][parameter];
                        }
                        return parameters[name][object][parameter] = value + 'em';
                    }
                    return parameters[name][object][parameter] = value;
                }
                return parameters[name] = value;
            };
        }

    }

    function view$a(ctrl, settings){
        return m('.space' ,[
            ctrl.rows.slice(0,-1).map((row) => {
                if(!ctrl.external && row.name === 'isQualtrics') return;
                if((ctrl.qualtricsParameters.includes(row.name)) && ctrl.get('isQualtrics') === 'Regular') return;
                if(settings.parameters.isTouch && row.name.toLowerCase().includes('key')) return;
                return m('.row.line', [
                    m('.col-md-4',
                        row.desc ?
                            [
                                m('span', [' ', row.label, ' ']),
                                m('i.fa.fa-info-circle.text-muted',{title:row.desc})
                            ]
                            : m('span', [' ', row.label])
                    ),
                    row.name === ('base_url') ?
                        m('.col-md-6',
                            m('input[type=text].form-control', {value:ctrl.get('base_url','image'), oninput: m.withAttr('value', ctrl.set(row.name, 'image'))}))
                        : row.name.toLowerCase().includes('key') ? //case of keys parameters
                            m('.col-md-6.col-lg-1',
                                m('input[type=text].form-control',{value:ctrl.get(row.name), oninput:m.withAttr('value', ctrl.set(row.name))}))
                            : (row.name === 'fixationStimulus') ||  (row.name === 'deadlineStimulus' || row.name === 'maskStimulus') ?
                                editStimulusObject(row.name, ctrl.get, ctrl.set)
                                : m('.col-md-4.col-lg-2',
                                    row.options ? //case of isTouch and isQualtrics
                                        m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem', height:'2.8rem'}},[
                                            row.options.map(function(option){return m('option', option);})])
                                        : row.name.includes('Duration') ? //case of duration parameter
                                            m('input[type=number].form-control',{placeholder:'0', min:0, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))})
                                            : (row.name === 'sortingLabel1' || row.name === 'sortingLabel2' || row.name === 'targetCat') ?
                                                m('input[type=text].form-control', {value:ctrl.get(row.name) ,oninput:m.withAttr('value', ctrl.set(row.name))})
                                                : m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)})
                                )
                ]);
            }), resetClearButtons(ctrl.reset, ctrl.clear)
        ]);
    }

    let outputComponent = {
        view:view$9,
        controller:controller$9,
    };

    function controller$9(settings, defaultSettings, clearBlock){
        let error_msg = [];
        error_msg = validityCheck(error_msg, settings, clearBlock);
        return {error_msg, createFile};

        function createFile(fileType){
            return function(){
                let output,textFileAsBlob;
                let downloadLink = document.createElement('a');
                if (fileType === 'JS') {
                    output = toString(settings);
                    textFileAsBlob = new Blob([output], {type:'text/plain'});
                    downloadLink.download = 'STIAT.js'; }
                else {
                    output = updateSettings$1(settings);
                    textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
                    downloadLink.download = 'STIAT.json'; }
                if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
                else {
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.style.display = 'none';
                    document.body.appendChild(downloadLink);
                }
                downloadLink.click();
            };
        }
    }

    function toString(settings, external){
        return toScript(updateSettings$1(settings), external);
    }

    function updateMediaSettings$1(settings){
        //update attributes to be compatible to STIAT
        let settings_output = clone(settings);
        settings_output.category.media = settings_output.category.stimulusMedia;
        delete settings_output.category.stimulusMedia;
        settings_output.attribute1.media = settings_output.attribute1.stimulusMedia;
        delete settings_output.attribute1.stimulusMedia;
        settings_output.attribute2.media = settings_output.attribute2.stimulusMedia;
        delete settings_output.attribute2.stimulusMedia;

        settings_output.category.css = settings_output.category.stimulusCss;
        delete settings_output.category.stimulusCss;
        settings_output.attribute1.css = settings_output.attribute1.stimulusCss;
        delete settings_output.attribute1.stimulusCss;
        settings_output.attribute2.css = settings_output.attribute2.stimulusCss;
        delete settings_output.attribute2.stimulusCss;
        return settings_output;
    }

    function updateSettings$1(settings){
        settings = updateMediaSettings$1(settings);
        let output={
            category: settings.category,
            attribute1: settings.attribute1,
            attribute2: settings.attribute2,
            trialsByBlock: settings.trialsByBlock,
            blockOrder: settings.blockOrder,
            switchSideBlock: settings.switchSideBlock,
            base_url: settings.parameters.base_url,
        };
        if(settings.parameters.isQualtrics){
            output.isQualtrics=settings.parameters.isQualtrics;
        }
        Object.assign(output, settings.text);
        return output;
    }

    function toScript(output, external){
        let textForInternal = '//Note: This script was created by the STIAT wizard.\n//Modification of this file won\'t be reflected in the wizard.\n';
        let script = `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/qualtrics/qstiat6.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/stiat6.js'}'], function(APIConstructor, stiatExtension){\n\tvar API = new APIConstructor(); return stiatExtension(${JSON.stringify(output,null,4)});});`;
        external === false ? script = textForInternal + script : '';
        return script;
    }

    function validityCheck(error_msg, settings, clearBlock){
        let temp1 = checkMissingElementName(settings.category, 'Category', error_msg);
        let temp2 = checkMissingElementName(settings.attribute1, 'First Attribute', error_msg);
        let temp3 = checkMissingElementName(settings.attribute2, 'Second Attribute', error_msg);

        let containsImage = temp1 || temp2 || temp3;

        if(settings.parameters.base_url.image.length === 0 && containsImage)
            error_msg.push('Image\'s url is missing and there is an image in the study');

        //check for blocks problems
        let currBlocks = clone(settings.trialsByBlock);
        clearBlock = clone(clearBlock); //blocks parameters with zeros as the values, used to check if the current parameters are also zeros.
        delete clearBlock.block;

        let count = 0;
        let temp_err_msg = [];
        currBlocks.forEach(function(element, index){ //remove those parameters for the comparison
            delete element.block;
            if(JSON.stringify(element) === JSON.stringify(clearBlock)){
                temp_err_msg.push('All block #'+(index+1)+' parameters equals to 0, that will result in skipping this block');
                count++;
            }
        });
        if (count === currBlocks.length)
            error_msg.push('All the block\'s parameters equals to 0, that will result in not showing the task at all');
        else if (temp_err_msg.length !==0) error_msg = error_msg.concat(temp_err_msg);

        return error_msg;


    }

    function view$9(ctrl, settings){
        return viewOutput(ctrl, settings, toString);
    }

    let textComponent = {
        controller:controller$8,
        view:view$8
    };

    function controller$8(settings, defaultSettings, rows){
        let isTouch = settings.parameters.isTouch;
        let isQualtrics = settings.parameters.isQualtrics;
        let textparameters;
        isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
        //for AMP
        let isSeven = settings.parameters.responses;
        if(isSeven == 7) {
            textparameters = settings.text_seven;
            isSeven = true;
        }
        else if(isSeven == 2){
            textparameters = settings.text;
            isSeven = false;
        }
        return {reset, clear, set, get, rows: rows.slice(0,-2), isTouch, isQualtrics, isSeven};

        function reset(){
            let valueToSet = isTouch ? defaultSettings.touch_text
                : isSeven ?  defaultSettings.text_seven
                    : defaultSettings.text;
            showClearOrReset(textparameters, valueToSet, 'reset');
        }
        function clear(){
            let valueToSet = isTouch || isSeven ? rows.slice(-1)[0] :  rows.slice(-2)[0];
            showClearOrReset(textparameters, valueToSet, 'clear');
        }
        function get(name){return textparameters[name];}
        function set(name){return function(value){return textparameters[name] = value;};}
    }

    function view$8(ctrl){
        return m('.space' ,[
            ctrl.rows.map(function(row){
                //if touch parameter is chosen, don't show the irrelevant text parameters
                if (ctrl.isTouch === true && row.nameTouch === undefined)
                    return;
                if(ctrl.isQualtrics === false && row.name === 'preDebriefingText')
                    return;
                return m('.row.line',[
                    m('.col-md-4',
                        row.desc ?
                            [
                                m('span', [' ', row.label, ' ']),
                                m('i.fa.fa-info-circle.text-muted',{title:row.desc})
                            ]
                            : m('span', [' ', row.label])
                    ),
                    m('.col-md-8', [
                        m('textarea.form-control',{rows:5, value:ctrl.get(ctrl.isTouch ? row.nameTouch : ctrl.isSeven? row.nameSeven : row.name), oninput:m.withAttr('value', ctrl.set(ctrl.isTouch ? row.nameTouch : ctrl.isSeven ? row.nameSeven : row.name))})
                    ])
                ]);
            }), resetClearButtons(ctrl.reset, ctrl.clear)
        ]);
    }

    let blocksComponent = {
        controller:controller$7,
        view:view$7
    };

    function controller$7(settings, defaultSettings, rows){
        let blocks = settings.trialsByBlock;
        let chooseFlag = m.prop(false);
        let chosenBlocksList = m.prop([]);
        let chooseClicked = m.prop(false);
        let clearBlock = rows.slice(-1)[0];
        
        return {showReset, showClear, set, get, blocks, getParameters, setParameters, unChooseCategories,
            chooseFlag, addBlock, showRemoveBlocks, chosenBlocksList, updateChosenBlocks, chooseBlocks, rows};

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
                if(blocks.length > 5){
                    blocks.length = 5;
                }
                settings.switchSideBlock = defaultSettings.switchSideBlock;
                settings.blockOrder = defaultSettings.blockOrder;
                chosenBlocksList().length = 0;
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
        function getParameters(name){return settings[name]; }
        function setParameters(name, type){
            if (type === 'select') return function(value){return settings[name] = value; };
            return function(value){return settings[name] = Math.abs(Math.round(value));};
        }
        function unChooseCategories(){
            chooseFlag(false);
            chosenBlocksList().length = 0;
        }
        function updateChosenBlocks(e, index){
            if (chosenBlocksList().includes(index) && !e.target.checked){
                let i = chosenBlocksList().indexOf(index);
                if (i !== -1) {
                    chosenBlocksList().splice(i, 1);
                }
                return;
            } 
            if (e.target.checked) chosenBlocksList().push(index);
        }
        function chooseBlocks(){
            if (blocks.length < 4) {
                showRestrictions('error','It\'s not possible to remove blocks because there must be at least 3 blocks.', 'Error in Removing Chosen Blocks');
                return;
            }
            chooseFlag(true);
            if(!chooseClicked()){  //show info message only for the first time the choose button has been clicked
                showRestrictions('info', 'To choose blocks to remove, please tik the checkbox near the wanted block, and to remove them click the \'Remove Chosen Blocks\' button.', 'Choose Blocks to Remove');
                chooseClicked(true);
            }
        }
        function addBlock(){
            blocks.push(clone(clearBlock));
            blocks.slice(-1)[0]['block'] = blocks.length;
        }
        function showRemoveBlocks(){
            if ((blocks.length - chosenBlocksList().length) < 3){
                showRestrictions('error','Minimum number of blocks needs to be 3, please choose less blocks to remove','Error in Removing Chosen Blocks');
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
                        chosenBlocksList().length = 0;
                        chooseFlag(false);
                        m.redraw();
                    }
                }).catch((error) => {showRestrictions('error', 'Something went wrong on the page!\n'+error, 'Oops!');})
                .then(m.redraw());
            function removeBlocks(){
                chosenBlocksList().sort();
                for (let i = chosenBlocksList().length - 1; i >=0; i--)
                    blocks.splice(chosenBlocksList()[i],1);
                
                for (let i = 0; i < blocks.length; i++) 
                    blocks[i]['block'] = i+1;
                
                chosenBlocksList().length = 0;
                chooseFlag(true);
            }
        }
    }

    function view$7(ctrl){
        return m('.space' , [
            ctrl.rows.slice(0,2).map(function(row) {
                return m('.row.line', [
                    m('.col-md-3',[
                        m('span', [' ', row.label, ' ']),
                        m('i.fa.fa-info-circle.text-muted',{
                            title:row.desc
                        })
                    ]),
                    row.options ?
                        m('.col-md-2',
                            m('select.form-control',{value: ctrl.getParameters(row.name), onchange:m.withAttr('value',ctrl.setParameters(row.name, 'select'))},[
                                row.options.map(function(option){return m('option', option);})])
                        )
                        : m('.col-md-2.col-lg-1',
                            m('input[type=number].form-control',{placeholder:'0', value: ctrl.getParameters(row.name), onchange:m.withAttr('value',ctrl.setParameters(row.name)), min:0})
                        )
                ]);
            }),
            ctrl.blocks.map(function(block) {
                let index = ctrl.blocks.indexOf(block);
                return m('.row.line', [
                    m('.col-md-3',[
                        !ctrl.chooseFlag() ? ' ' :
                            m('input[type=checkbox]', {checked : ctrl.chosenBlocksList().includes(index), onclick: (e) => ctrl.updateChosenBlocks(e, index)}),
                        m('span', [' ','Block '+parseInt(index+1), ' ']),
                        index !== 0 ? ' ' :
                            m('i.fa.fa-info-circle.text-muted', {
                                title:'By default, this is the practice block that shows only the attributes and not the category. ' +
                                'Because of that, the number of category trials is 0. ' +
                                'You can change that if you want.'
                            }),
                    ]),
                    m('.col-md-9',[
                        ctrl.rows.slice(2,-1).map(function(row) {
                            return m('.row.space', [
                                m('.col-md-5.space',[
                                    m('span', [' ', row.label, ' ']),
                                    m('i.fa.fa-info-circle.text-muted',{
                                        title:row.desc
                                    }),
                                ]),
                                row.name === 'instHTML' ?
                                    m('.col-md-5', [
                                        m('textarea.form-control',{rows:5, oninput: m.withAttr('value', ctrl.set(row.name, index, 'text')), value: ctrl.get(row.name, index)})
                                    ]) :
                                    m('.col-md-3.col-lg-2',
                                        m('input[type=number].form-control',{placeholder:'0', onchange: m.withAttr('value', ctrl.set(row.name, index,'number')), value: ctrl.get(row.name, index), min:0})
                                    )
                            ]);
                        })
                    ])
                ]);
            }),
            m('.row.space',
                m('.col-sm-8',
                    m('.btn-group btn-group-toggle', [
                        ctrl.blocks.length > 29 ? '' : //limit number of blocks to 30
                            m('button.btn btn btn-info',{onclick: ctrl.addBlock},
                                m('i.fa.fa-plus'),' Add Block'),
                        !ctrl.chooseFlag() ?
                            m('button.btn btn btn-warning',{onclick: ctrl.chooseBlocks},
                                m('i.fa.fa-check'), ' Choose Blocks to Remove')
                            : m('button.btn btn btn-warning',{onclick: ctrl.unChooseCategories},[
                                m('i.fa.fa-minus-circle'), ' Un-Choose Categories to Remove']),
                        !ctrl.chosenBlocksList().length ? '' :
                            m('button.btn btn btn-danger',{onclick: ctrl.showRemoveBlocks, disabled: !ctrl.chosenBlocksList().length},
                                m('i.fa.fa-minus-square'), ' Remove Chosen Blocks')
                    ])
                )
            ), resetClearButtons(ctrl.showReset, ctrl.showClear)
        ]);
    }

    let elementComponent$2 = {
        controller:controller$6,
        view:view$6,
    };

    function controller$6(object, settings, stimuliList){
        let element = settings[object.key];
        let fields = {
            newStimulus : m.prop(''),
            elementType: m.prop(object.key.includes('attribute') ? 'Attribute' : 'Category'),
            titleType: m.prop(element.title.media.word === undefined ? 'image' : 'word'),
            titleHidden: m.prop(this.titleType === 'word'), //weather the category design flag will be visible
            selectedStimuli: m.prop(''),
            stimuliHidden: m.prop(true),
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

    function view$6(ctrl) {
        return m('.space', [
            m('.row.line', [
                m('.col-sm-3',[
                    m('span', ctrl.fields.elementType()+' name logged in the data file '),
                    m('i.fa.fa-info-circle.text-muted',{title:'Will appear in the data and in the default feedback message.'})
                ]),
                m('.col-sm-3', m('input[type=text].form-control',{value:ctrl.get('name'), oninput: m.withAttr('value', ctrl.set('name'))})),
            ]),
            m('.row.line', [
                m('.col-sm-3',[
                    m('span', ctrl.fields.elementType()+' name presented in the task '),
                    m('i.fa.fa-info-circle.text-muted',{title:'Name of the ' +ctrl.fields.elementType()+' presented in the task'}),
                ]),
                m('.col-sm-3', [
                    m('input[type=text].form-control',{value: ctrl.get('title'), oninput:m.withAttr('value', ctrl.set('title', 'media', ctrl.fields.titleType()))}),
                ]),
                m('.col-sm-3',
                    m('.row',[
                        m('.col-sm-5',m('span', 'Category\'s Type:')),
                        m('.col-sm-7',[
                            m('select.custom-select',{value: ctrl.get('title','media','word') === undefined ? 'image' : 'word', onchange:m.withAttr('value',ctrl.updateTitleType())},[
                                ctrl.fields.titleType(ctrl.get('title','media','word') === undefined ? 'image' : 'word'),
                                ctrl.fields.titleHidden(ctrl.fields.titleType() === 'word'),
                                m('option', 'word'),
                                m('option', 'image')
                            ])
                        ])
                    ])
                ),
                !ctrl.fields.titleHidden() ? '' :
                    m('.col-sm-3',[
                        m('.row',[
                            m('.col-sm-5',[
                                m('span', 'Font\'s color:'),
                            ]),
                            m('.col-sm-6',[
                                m('input[type=color].form-control',{value: ctrl.get('title','css','color'), onchange:m.withAttr('value', ctrl.set('title','css','color'))})
                            ])
                        ]),
                        m('.row.space',[
                            m('.col-sm-5',[
                                m('span', 'Font\'s size:'),
                            ]),
                            m('.col-sm-6',[
                                m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('title','css','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('title','css','font-size'))})
                            ])
                        ])
                    ])
            ]),
            m('.row',[
                m('.col-md-6',[
                    m('.row',
                        m('.col-md-6',
                            m('p.h4','Stimuli: ', m('i.fa.fa-info-circle.text-muted',{
                                title:'Enter text (word) or image name (image). Set the path to the folder of images in the General Parameters page'})
                            ))
                    ),
                    m('.row',
                        m('.col-md-7',
                            m('input[type=text].form-control', {placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', 'aria-describedby':'basic-addon2', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)}
                            ))
                    ),
                    m('.row',
                        m('.col-md-9',
                            m('.btn-group btn-group-toggle', [
                                m('button[type=button].btn btn-secondary',{disabled:!ctrl.fields.newStimulus().length, id:'addWord', onclick: (e) => ctrl.addStimulus(e)},[
                                    m('i.fa.fa-plus'), 'Add Word'
                                ]),
                                m('button[type=button].btn btn-secondary', {disabled:!ctrl.fields.newStimulus().length, id:'addImage', onclick: (e) => ctrl.addStimulus(e)},[
                                    m('i.fa.fa-plus'), 'Add Image'
                                ])
                            ])
                        )
                    ),
                    m('.row',[
                        m('.col-md-7',
                            m('select.form-control.scroll', {multiple : 'multiple', size : '8' ,onchange:(e) => ctrl.updateSelectedStimuli(e)},[
                                ctrl.get('stimulusMedia').some(object => object.word) ? ctrl.fields.stimuliHidden(true) : ctrl.fields.stimuliHidden(false),
                                ctrl.get('stimulusMedia').map(function(object){
                                    let value = object.word ? object.word : object.image;
                                    let option = value + (object.word ? ' [Word]' : ' [Image]');
                                    return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                                })
                            ])
                        ),
                        m('.col-md-5',
                            !ctrl.fields.stimuliHidden() ? '' :
                                [
                                    m('.row',
                                        m('.col-md-8',[
                                            m('u','Stimuli font\'s design:'),
                                        ])
                                    ),
                                    m('.row.space',
                                        m('.col-md-8',[
                                            m('label','Font\'s color: '),
                                            m('input[type=color].form-control', {value: ctrl.get('stimulusCss','color'), onchange: m.withAttr('value', ctrl.set('stimulusCss','color'))}),
                                        ])

                                    ),
                                    m('.row.space',
                                        m('.col-md-8',[

                                            m('label', 'Font\'s size:'),
                                            m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('stimulusCss','font-size') ,min: '0' ,onchange: m.withAttr('value', ctrl.set('stimulusCss','font-size'))})
                                        ])
                                    )
                                ]
                        )
                    ])
                ])
            ]),
            m('.row',
                m('.col-md-6.space',
                    m('.btn-group-vertical',[
                        m('button.btn btn btn-warning', {title:'To select multiple stimuli, please press the ctrl key while selecting the desired stimuli', disabled: !ctrl.fields.selectedStimuli().length, onclick: () => ctrl.removeChosenStimuli()},'Remove Chosen Stimuli'),
                        m('button.btn btn btn-warning', {onclick: () => ctrl.removeAllStimuli()},'Remove All Stimuli'),
                        m('button.btn btn btn-warning', {onclick: () => ctrl.resetStimuliList()},'Reset Stimuli List'),
                    ])
                )
            )
        ]);
    }

    let elementComponent$1 = {
        controller: controller$5,
        view: view$5,
    };

    function controller$5(object, settings,stimuliList, startStimulusList ,index){
        let element = settings[object.key];
        if (Array.isArray(element)) element = element[index]; //in case of 'categories' in BIAT
        let fields = {
            newStimulus : m.prop(''),
            elementType: m.prop(object.key.toLowerCase().includes('categor') ? 'Category' : 'Attribute'),
            titleType: m.prop(element.title.media.word === undefined ? 'image' : 'word'),
            titleHidden: m.prop(this.titleType === 'word'), //weather the category design flag will be visible
            selectedStimuli: m.prop(''),
            stimuliHidden: m.prop(true),
            startStimulus: m.prop(settings.parameters.showStimuliWithInst),
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
                else {
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
                            showRestrictions('error','Font\'s size must be bigger than 0.', 'Error');
                            return element[name][media][type];
                        }
                        return element[name][media][type] = value + 'em';
                    }
                    else if (startStimulus !=null){ //in case of startStimulus
                        if(startStimulus === 'font-size'){
                            value = Math.abs(value);
                            if (!value){
                                showRestrictions('error','Font\'s size must be bigger than 0.', 'Error');
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
                        showRestrictions('error','Font\'s size must be bigger than 0.', 'Error');
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
                else {
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
                else {
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
                else {
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
            else {
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

    function view$5(ctrl) {
        return m('.space', [
            m('.row.line', [
                m('.col-sm-3',[
                    m('span', ctrl.fields.elementType()+' name logged in the data file '),
                    m('i.fa.fa-info-circle.text-muted',{title:'Will appear in the data and in the default feedback message.'})
                ]),
                m('.col-sm-3', m('input[type=text].form-control',{value:ctrl.get('name'), oninput: m.withAttr('value', ctrl.set('name'))})),
            ]),
            m('.row.line', [
                m('.col-sm-3',[
                    m('span', ctrl.fields.elementType()+' name presented in the task '),
                    m('i.fa.fa-info-circle.text-muted',{title:'Name of the ' +ctrl.fields.elementType()+' presented in the task'}),
                ]),
                m('.col-sm-3', [
                    m('input[type=text].form-control',{value: ctrl.get('title'), oninput:m.withAttr('value', ctrl.set('title', 'media', ctrl.fields.titleType()))}),
                ]),
                m('.col-sm-3',
                    m('.row',[
                        m('.col-sm-5',m('span', 'Category\'s Type:')),
                        m('.col-sm-7',[
                            m('select.custom-select',{value: ctrl.get('title','media','word') === undefined ? 'image' : 'word', onchange:m.withAttr('value',ctrl.updateTitleType())},[
                                ctrl.fields.titleType(ctrl.get('title','media','word') === undefined ? 'image' : 'word'),
                                ctrl.fields.titleHidden(ctrl.fields.titleType() === 'word'),
                                m('option', 'word'),
                                m('option', 'image')
                            ])
                        ])
                    ])
                ),
                !ctrl.fields.titleHidden() ? '' :
                    m('.col-sm-3',[
                        m('.row',[
                            m('.col-sm-5',[
                                m('span', 'Font\'s color:'),
                            ]),
                            m('.col-sm-6',[
                                m('input[type=color].form-control',{value: ctrl.get('title','css','color'), onchange:m.withAttr('value', ctrl.set('title','css','color'))})
                            ])
                        ]),
                        m('.row.space',[
                            m('.col-sm-5',[
                                m('span', 'Font\'s size:'),
                            ]),
                            m('.col-sm-6',[
                                m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('title','css','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('title','css','font-size'))})
                            ])
                        ])
                    ])
            ]),
            m('.row',[
                m('.col-md-6',[
                    m('.row',
                        m('.col-md-6',
                            m('p.h4','Stimuli: ', m('i.fa.fa-info-circle.text-muted',{
                                title:'Enter text (word) or image name (image). Set the path to the folder of images in the General Parameters page'
                            }))
                        )
                    ),
                    m('.row',
                        m('.col-md-7',
                            m('input[type=text].form-control', {placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)})
                        )
                    ),
                    m('.row',
                        m('.col-md-9',[
                            m('.btn-group btn-group-toggle', [
                                m('button[type=button].btn btn-secondary',{disabled:!ctrl.fields.newStimulus().length, id:'addWord', onclick: ctrl.addStimulus},[
                                    m('i.fa.fa-plus'), 'Add Word'
                                ]),
                                m('button[type=button].btn btn-secondary', {disabled:!ctrl.fields.newStimulus().length, id:'addImage', onclick: ctrl.addStimulus},[
                                    m('i.fa.fa-plus'), 'Add Image'
                                ])
                            ])
                        ])
                    ),
                    m('.row',[
                        m('.col-md-7',
                            m('select.form-control.scroll', {multiple : 'multiple', size : '8' ,onchange: (e) => ctrl.updateSelectedStimuli(e)},[
                                ctrl.get('stimulusMedia').some(object => object.word) ? ctrl.fields.stimuliHidden(true) : ctrl.fields.stimuliHidden(false),
                                ctrl.get('stimulusMedia').map(function(object){
                                    let value = object.word ? object.word : object.image;
                                    let option = value + (object.word ? ' [Word]' : ' [Image]');
                                    return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                                })
                            ])
                        ),
                        m('.col-md-5',
                            !ctrl.fields.stimuliHidden() ? '' :
                                [
                                    m('.row',
                                        m('.col-md-8',[
                                            m('u','Stimuli font\'s design:'),
                                        ])
                                    ),
                                    m('.row.space',
                                        m('.col-md-8',[
                                            m('label','Font\'s color: '),
                                            m('input[type=color].form-control', {value: ctrl.get('stimulusCss','color'), onchange: m.withAttr('value', ctrl.set('stimulusCss','color'))}),
                                        ])

                                    ),
                                    m('.row.space',
                                        m('.col-md-8',[

                                            m('label', 'Font\'s size:'),
                                            m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('stimulusCss','font-size') ,min: '0' ,onchange: m.withAttr('value', ctrl.set('stimulusCss','font-size'))})
                                        ])
                                    )
                                ]
                        )
                    ])
                ]),
                ///startStimulus
                !ctrl.fields.startStimulus() ? '' :
                    m('.col-md-6', [
                        m('.row',
                            m('.col-md-12',
                                m('p.h4','Stimuli Presented with Instructions: ', m('i.fa.fa-info-circle.text-muted',{
                                    title:'Here You can enter only one type of stimuli (image or words), if you enter an image you can only enter one and with its file extension.'
                                }))
                            )
                        ),
                        m('.row',
                            m('.col-md-7',
                                m('input[type=text].form-control', {placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', value: ctrl.fields.newStartStimulus(), oninput: m.withAttr('value', ctrl.fields.newStartStimulus)})
                            )

                        ),
                        m('.row',
                            m('.col-md-9',
                                m('.btn-group btn-group-toggle', [
                                    m('button[type=button].btn btn-secondary',{disabled:!ctrl.fields.newStartStimulus().length, id:'addWord', onclick: (e) => ctrl.addStimulus(e,true)},[
                                        m('i.fa.fa-plus'), 'Add Word'
                                    ]),
                                    m('button[type=button].btn btn-secondary', {disabled:!ctrl.fields.newStartStimulus().length, id:'addImage', onclick: (e) => ctrl.addStimulus(e,true)},[
                                        m('i.fa.fa-plus'), 'Add Image'
                                    ])
                                ])
                            )
                        ),
                        m('.row',[
                            m('.col-md-7',
                                m('select.form-control.scroll', {multiple : 'multiple', size : '8' ,onchange: (e) => ctrl.updateSelectedStimuli(e, true)},[
                                    !ctrl.fields.startStimulus()  ||
                                    ctrl.get('title','startStimulus','media').some(object => object.includes('.')) ||
                                    !ctrl.get('title','startStimulus','media').length ? ctrl.fields.startStimuliHidden(false) : ctrl.fields.startStimuliHidden(true),
                                    ctrl.get('title','startStimulus','media').map(function(object){
                                        let type = object.includes('.') ? ' [Image]' : ' [Word]';
                                        let option = object + type;
                                        return m('option', {value:object, selected : ctrl.fields.selectedStartStimuli().includes(object)} ,option);
                                    })
                                ])
                            ),
                            m('.col-md-5',
                                !ctrl.fields.startStimuliHidden() ? '' :
                                    [
                                        m('.row',
                                            m('.col-md-8',[
                                                m('u','Stimuli font\'s design:'),
                                            ])
                                        ),
                                        m('.row.space',
                                            m('.col-md-8',[
                                                m('label','Font\'s color: '),
                                                m('input[type=color].form-control', {value: ctrl.get('title','startStimulus','css','color'), onchange:m.withAttr('value', ctrl.set('title','startStimulus','css','color'))}),
                                            ])
                                        ),
                                        m('.row.space',
                                            m('.col-md-8',[
                                                m('label', 'Font\'s size:'),
                                                m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('title','startStimulus','css','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('title','startStimulus','css','font-size'))})
                                            ])
                                        )
                                    ]
                            )
                        ])
                    ])
            ]),
            m('.row',[
                m('.col-md-6.space',
                    m('.btn-group-vertical', [
                        m('button.btn btn btn-warning', {title:'To select multiple stimuli, please press the ctrl key while selecting the desired stimuli', disabled: !ctrl.fields.selectedStimuli().length, onclick:ctrl.removeChosenStimuli}, 'Remove Chosen Stimuli'),
                        m('button.btn btn btn-warning', {onclick:ctrl.removeAllStimuli},'Remove All Stimuli'),
                        ctrl.fields.isNewCategory() ? '' : m('button.btn btn btn-warning', {onclick:(e) => ctrl.resetStimuliList(e)}, 'Reset Stimuli List'),
                    ])),
                ///startStimulus
                !ctrl.fields.startStimulus() ? '' :
                    m('.col-md-6.space',[
                        m('.btn-group-vertical', [
                            m('button.btn btn btn-warning', {title:'To select multiple stimuli, please press the ctrl key while selecting the desired stimuli', disabled: !ctrl.fields.selectedStartStimuli().length, onclick: (e) => ctrl.removeChosenStartStimuli(e)}, 'Remove Chosen Stimuli'),
                            m('button.btn btn btn-warning', {onclick: (e) => ctrl.removeAllStimuli(e,true)}, 'Remove All Stimuli'),
                            ctrl.fields.isNewCategory() ? '' : m('button.btn btn btn-warning', {onclick:(e) => ctrl.resetStimuliList(e,true)}, 'Reset Stimuli List'),
                        ])
                    ])
            ]),
        ]);
    }

    let elementComponent = {
        controller:controller$4,
        view:view$4,
    };

    function controller$4(object, settings, stimuliList, taskType){
        let element = settings[object.key];
        let fields = {
            newStimulus : m.prop(''),
            selectedStimuli: m.prop(''),
            isAMP: taskType === 'AMP',
            elementType: m.prop(object.key.includes('target') ? 'Target' : 'Prime'),
            isTarget: m.prop(object.key.includes('target'))
        };

        return {fields ,set, get, addStimulus, updateSelectedStimuli,
            removeChosenStimuli, removeAllStimuli, resetStimuliList};

        function get(name, media, type){
            if (media != null && type != null){
                if (type === 'font-size'){
                    return parseFloat((element[name][media][type].replace('em','')));
                }
                return element[name][media][type];
            }
            else if (media === 'color') return element[name][media]; //case of stimulusCss
            else if (media === 'font-size') return parseFloat((element[name][media]).substring(0,3));
            return element[name];
        }
        function set(name, media, type){
            return function(value){
                if (media && type){
                    if (type === 'font-size'){
                        value = Math.abs(value);
                        if (value === 0){
                            showRestrictions('Font\'s size must be bigger than 0.', 'error');
                            return element[name][media][type];
                        }
                        return element[name][media][type] = value + 'em';
                    }
                    return element[name][media][type] = value;
                }
                else if (media === 'color') return element[name][media] = value;
                else if (media === 'font-size'){
                    value = Math.abs(value);
                    if (value === 0){
                        showRestrictions('Font\'s size must be bigger than 0.', 'error');
                        return element[name][media];
                    }
                    return element[name][media] = value + 'em';
                }
                return element[name] = value;
            };
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

    function view$4(ctrl) {
        return m('.space', [
            m('.row.line',[
                m('.col-sm-3',[
                    m('span', ctrl.fields.elementType()+' category\'s name logged in the data file '),
                    m('i.fa.fa-info-circle.text-muted',{
                        title:'Will appear in the data and in the default feedback message.'
                    }),
                ]),
                m('.col-sm-3', [
                    m('input[type=text].form-control', {value:ctrl.get('name'), oninput:m.withAttr('value', ctrl.set('name'))})
                ])
            ]),
            !ctrl.fields.isAMP ? '' : //AMP has this additional field
                m('.row.line',[
                    m('.col-sm-3',[
                        m('span', ctrl.fields.elementType()+' category\'s name presented in the feedback page '),
                        m('i.fa.fa-info-circle.text-muted',{
                            title: !ctrl.fields.isTarget() ? 'Will appear in the default feedback message'
                                : 'The name of the targets (used in the instructions)'
                        }),
                    ]),
                    m('.col-sm-3', [
                        m('input[type=text].form-control', {value:ctrl.get('nameForFeedback'),
                            oninput:m.withAttr('value', ctrl.set('nameForFeedback'))})
                    ])
                ]),
            m('.row',[
                m('.col-md-6',[
                    m('.row',
                        m('.col-md-6',
                            m('p.h4','Stimuli: ', m('i.fa.fa-info-circle.text-muted',{
                                title:'Enter text (word) or image name (image). Set the path to the folder of images in the General Parameters page'})
                            ))
                    ),
                    m('.row',
                        m('.col-md-7',
                            m('input[type=text].form-control', {placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', 'aria-describedby':'basic-addon2', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)}
                            ))
                    ),
                    m('.row',
                        m('.col-md-9',
                            m('.btn-group btn-group-toggle', [
                                m('button[type=button].btn btn-secondary',{disabled:!ctrl.fields.newStimulus().length, id:'addWord', onclick: (e) => ctrl.addStimulus(e)},[
                                    m('i.fa.fa-plus'), 'Add Word'
                                ]),
                                m('button[type=button].btn btn-secondary', {disabled:!ctrl.fields.newStimulus().length, id:'addImage', onclick: (e) => ctrl.addStimulus(e)},[
                                    m('i.fa.fa-plus'), 'Add Image'
                                ])
                            ])
                        )
                    ),
                    m('.row',[
                        m('.col-md-7',
                            m('select.form-control.scroll', {multiple : 'multiple', size : '8' ,onchange:(e) => ctrl.updateSelectedStimuli(e)},[
                                ctrl.get('mediaArray').map(function(object){
                                    let value = object.word ? object.word : object.image;
                                    let option = value + (object.word ? ' [Word]' : ' [Image]');
                                    return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                                })
                            ])
                        ),
                    ]),
                ])
            ]),

            m('.row',
                m('.col-sm-5.space',
                    m('.btn-group-vertical',[
                        m('button.btn btn btn-warning', {title:'To select multiple stimuli, please press the ctrl key while selecting the desired stimuli', disabled: !ctrl.fields.selectedStimuli().length, onclick:ctrl.removeChosenStimuli},'Remove Chosen Stimuli'),
                        m('button.btn btn btn-warning', {onclick:ctrl.removeAllStimuli},'Remove All Stimuli'),
                        m('button.btn btn btn-warning', {onclick: ctrl.resetStimuliList},'Reset Stimuli List')
                    ]))
            )
        ]);
    }

    let parametersComponent = {
        controller:controller$3,
        view:view$3
    };

    function controller$3(taskType, settings, elementName){
        let primeCss = settings[elementName];
        let elementType = m.prop(elementName.includes('target') ? 'Target' : 'Prime');
        let durationFieldName = m.prop(elementType() === 'Target' ? 'targetDuration' : 'primeDuration');
        return {set, get, elementType, durationFieldName, primeCss};

        function get(parameter){
            if (parameter === 'font-size') return parseFloat((primeCss[parameter]).substring(0,3));
            return primeCss[parameter];
        }
        function set(parameter){
            return function(value){
                if(parameter.includes('Duration')) //Duration parameter is under settings directly
                    return primeCss[parameter] = Math.abs(value);
                if (parameter === 'font-size'){
                    value = Math.abs(value);
                    if (value === 0){
                        showRestrictions('Font\'s size must be bigger than 0.', 'error');
                        return primeCss[parameter];
                    }
                    return primeCss[parameter] = value + 'em';
                }
                return primeCss[parameter] = value;
            };
        }
    }

    function view$3(ctrl, taskType){
        return m('.space' , [
            m('.row.line',[
                m('.col-sm-3',[
                    m('.row.space', m('.col-sm-12', m('span', 'Font\'s color:'))),
                    m('.row.space', m('.col-sm-6', m('input[type=color].form-control', {value: ctrl.get('color'), onchange:m.withAttr('value', ctrl.set('color'))})))
                ]),
                m('.col-sm-3',[
                    m('.row.space', m('.col-sm-12',m('span', 'Font\'s size:'))),
                    m('.row.space', m('.col-sm-6',m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('font-size'))})))
                ])
            ]),
            m('.row.space',[
                m('.col-sm-3',[
                    m('.row.space', m('.col-sm-12', m('span', ctrl.elementType()+' category\'s display duration:'))),
                    m('.row.space', m('.col-sm-6', m('input[type=number].form-control',{placeholder:'0', min:0, value:ctrl.get(ctrl.durationFieldName()), onchange:m.withAttr('value', ctrl.set(ctrl.durationFieldName()))})))
                ]),
                ctrl.elementType() === 'Prime' && taskType === 'AMP' ?
                    m('.col-sm-3',[
                        m('.row.space', m('.col-sm-12', m('span', 'Post prime category\'s display duration:'))),
                        m('.row.space', m('.col-sm-6', m('input[type=number].form-control',{placeholder:'0', min:0, value:ctrl.get('postPrimeDuration'), onchange:m.withAttr('value', ctrl.set('postPrimeDuration'))})))
                    ])
                    : ''
            ])
        ]);
    }

    let categoriesComponent = {
        controller:controller$2,
        view:view$2
    };

    function controller$2(settings, defaultSettings, clearElement) {
        return {reset, clear};

        function reset(curr_tab){showClearOrReset(settings[curr_tab], defaultSettings[curr_tab],'reset');}
        function clear(curr_tab){
            curr_tab.includes('StimulusCSS') ?
                showClearOrReset(settings[curr_tab], clearElement[1], 'clear')
                : showClearOrReset(settings[curr_tab], clearElement[0], 'clear');
        }
    }

    function view$2(ctrl, settings, defaultSettings, clearElement, taskType, currTab) {
        return m('div', [
            taskType === 'BIAT' ?
                m.component(elementComponent$1,{key:currTab}, settings,
                    defaultSettings[currTab].stimulusMedia, defaultSettings[currTab].title.startStimulus)
                //in EP & AMP there is additional sub tab called Target/Prime Appearance, it needs a different component.
                : currTab.includes('StimulusCSS') ?
                    m.component(parametersComponent, taskType, settings, currTab)
                    : taskType === 'EP' || taskType === 'AMP' ?
                        m.component(elementComponent, {key:currTab}, settings, defaultSettings[currTab].mediaArray, taskType)
                        : m.component(elementComponent$2, {key:currTab}, settings, defaultSettings[currTab].stimulusMedia),
            m('hr')
            ,resetClearButtons(ctrl.reset, ctrl.clear, currTab)
        ]);
    }

    let importComponent = {
        controller:controller$1,
        view:view$1
    };

    function view$1(ctrl){
        return viewImport(ctrl);
    }

    function controller$1(settings) {
        return {handleFile, updateSettings};

        function handleFile(){
            let importedFile = document.getElementById('uploadFile').files[0];
            let reader = new FileReader();
            reader.readAsText(importedFile); 
            reader.onload = function() {
                let fileContent = JSON.parse(reader.result);
                settings = updateSettings(settings, fileContent);
            };
        }
    }

    function updateMediaSettings(settings){
        //update attributes to be compatible to IAT so that elementComponent can be used.
        settings.category.stimulusMedia = settings.category.media;
        delete settings.category.media;
        settings.attribute1.stimulusMedia = settings.attribute1.media;
        delete settings.attribute1.media;
        settings.attribute2.stimulusMedia = settings.attribute2.media;
        delete settings.attribute2.media;

        settings.category.stimulusCss = settings.category.css;
        delete settings.category.css;
        settings.attribute1.stimulusCss = settings.attribute1.css;
        delete settings.attribute1.css;
        settings.attribute2.stimulusCss = settings.attribute2.css;
        delete settings.attribute2.css;
        return settings;
    }

    function updateSettings(settings, input) {
        settings.category = input.category;
        settings.attribute1 = input.attribute1;
        settings.attribute2 = input.attribute2;
        settings.parameters.base_url = input.base_url;
        settings.parameters.isQualtrics = input.isQualtrics;
        settings.text.leftKeyText = input.leftKeyText;
        settings.text.rightKeyText = input.rightKeyText;
        settings.text.orKeyText = input.orKeyText;
        settings.text.remindErrorText = input.remindErrorText;
        settings.text.finalText = input.finalText;
        settings.text.instTemplatePractice = input.instTemplatePractice;
        settings.text.instTemplateCategoryRight = input.instTemplateCategoryRight;
        settings.text.instTemplateCategoryLeft = input.instTemplateCategoryLeft;
        settings.trialsByBlock = input.trialsByBlock;
        settings.blockOrder = input.blockOrder;
        settings.switchSideBlock = input.switchSideBlock;

        settings = updateMediaSettings(settings);
        return settings;

    }

    let links = {IAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/',
    	BIAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-biat/',
    	STIAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-stiat/',
    	SPF: '#',
    	EP: 'https://minnojs.github.io/minnojs-blog/qualtrics-priming/'
    };

    let helpComponent = {
    	view: function(ctrl, settings, defaultSettings, type){
    		let extension = '.'+type.toLowerCase();
    		return m('.space',
    			m('.alert.alert-info',
    				!settings.external ? //only show this text if we are in the dashboard
    				['This will create a script for our '+type+' extension.' +
    					'After you save your work here, it will be updated into a file with the same name but a different file extension (.js instead of '+extension+'). ' +
    					'You can edit that file further. However, everything you Save changes you made to this wizard, it will override your .js file. '
    				]:
    				['This tool creates a script for running an '+type+' in your online study. ' +
    					'The script uses Project Implicit’s '+type+ ' extension, which runs on MinnoJS, a JavaScript player for online studies. ',
    					m('a',{href: 'http://projectimplicit.net/'}, 'Project Implicit '), 'has developed MinnoJS to program web studies. ' +
    					'To create ' +type+'s, we programmed a general script (the “extension”) that runs an '+type+ ' based on parameters provided by another, ' + 'more simple script. ' +
    					'In this page, you can create a script that uses our '+type+' extension. ' +
    					'You can read more about the basic idea of using extensions in Minno ',
    					m('a',{href: 'https://github.com/baranan/minno-tasks/blob/master/implicitmeasures.md'}, 'on this page. '),
    					'We run those scripts in ', m('a',{href: 'https://minnojs.github.io/docsite/minnosuitedashboard/'}, 'Open Minno Suite, '),
    					'our platform for running web studies. ' +
    					'You can install that platform on your own server, use a more simple ',
    					m('a',{href: 'https://minnojs.github.io/minnojs-blog/csv-server/'}, 'php server for Minno, '), 'or run ', m('a',{href: links[type]},'this script directly from Qualtrics.')
    				]));}
    };

    let parametersDesc = [
        {name: 'isQualtrics', options:['Regular','Qualtrics'],label:'Regular script or Qualtrics?', desc: ['If you want this IAT to run from Qualtrics, read ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/'}, 'this blog post '),'to see how.']},
        {name: 'base_url', label: 'Image\'s URL', desc: 'If your task has any images, enter here the path to that images folder. It can be a full url, or a relative URL to the folder that will host this script'},
        {isQualtrics:false, base_url:{image:''}}
    ];

    let textDesc = [
        {name: 'leftKeyText', label:'Top-left text (about the left key)', desc: 'We use this text to remind participants what key to use for a left response.'},
        {name: 'rightKeyText', label:'Top-right text (about the right key)', desc: 'We use this text to remind participants what key to use for a right response.'},
        {name: 'orKeyText', label:'Or', desc: 'We show this text in the combined blocks to separate between the two categories that use the same key.'},
        {name: 'remindErrorText', label: 'Screen\'s Bottom (error reminder)', desc: 'We use this text to remind participants what happens on error.'},
        {name: 'finalText', label:'Text shown at the end of the task'},
        {name: 'instTemplatePractice', label:'Instructions in Practice Block'},
        {name: 'instTemplateCategoryRight', label:'Block instructions when the single category is on the right'},
        {name: 'instTemplateCategoryLeft', label:'Block instructions when the single category is on the left'},
        {textOnError:'', leftKeyText:'', rightKeyText:'', orKeyText:'', remindErrorText:'',finalText:'',
            instTemplatePractice:'', instTemplateCategoryRight:'', instTemplateCategoryLeft:''},
        {} //an empty element
    ];

    let blocksDesc = [
        {name: 'blockOrder', label: 'Block Order', options: ['startRight','startLeft','random'], desc: 'Change to \'startRight\' if you want the first block to show the single category on the right in the first block, \'startLeft\' if you want it to appear on the left side. If you choose \'random\', the program will randomly choose a side for each participant. The first attribute in the Attributes page appears on the left and the second attribute appears on the right. \n'},
        {name: 'switchSideBlock', label: 'Switch Side Block ', desc: 'By default, we switch on block 4 (i.e., after blocks 2 and 3 showed the first pairing condition).'},
        {name: 'instHTML', label:'Block\'s Instructions', desc: 'Empty field means we will create the instructions from a default template.'},
        {name: 'miniBlocks', label:'Number of mini-blocks', desc: 'Higher number reduces repetition of same group/response. Set to 1 if you don\'t need mini blocks. 0 will break the task.'},
        {name: 'singleAttTrials', label:'Number of single attribute trials', desc: 'Number of trials of the attribute that does not share key with the category (in a mini block).'},
        {name: 'sharedAttTrials', label:'Number of shared key attribute trials', desc: 'Number of trials of the attribute that shares key with the category (in a mini block).'},
        {name: 'categoryTrials', label:'Number of category trials', desc: 'Number of trials of the category (in a mini-block). If 0, the label does not appear.'},
        {
            instHTML : '', 
            block : 1,
            miniBlocks : 0, 
            singleAttTrials : 0, 
            sharedAttTrials : 0, 
            categoryTrials : 0 
        }
    ];

    let categoryClear = [{
        name: '', 
        title: {media: {word: ''}, css: {color: '#000000', 'font-size': '1em'}, height: 4},
        stimulusMedia: [],
        stimulusCss : {color:'#000000', 'font-size':'1em'}
    }];

    let category = {
        'category':{text: 'Category'}
    };

    let attributesTabs = {
        'attribute1': {text: 'First Attribute'},
        'attribute2': {text: 'Second Attribute'}
    };

    let tabs = {
        'parameters': {text: 'General parameters', component: parametersComponent$1, rowsDesc: parametersDesc},
        'blocks': {text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
        'category': {text: 'Category', component: categoriesComponent, rowsDesc: categoryClear, subTabs: category},
        'attributes': {
            text: 'Attributes',
            component: categoriesComponent,
            rowsDesc: categoryClear,
            subTabs: attributesTabs
        },
        'text': {text: 'Texts', component: textComponent, rowsDesc: textDesc},
        'output': {text: 'Complete', component: outputComponent, rowsDesc: blocksDesc.slice(-1)[0]},
        'import': {text: 'Import', component: importComponent},
        'help': {text: 'Help', component: helpComponent, rowsDesc: 'STIAT'}
    };

    let checkStatus = response => {

        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        let error = new Error(response.statusText);

        error.response = response;

        throw error;
    };

    let toJSON = response => response
        .json()
        .catch( );

    // extract info from status error
    let catchJSON = err => (err.response ? err.response.json() : Promise.reject())
        .catch(() => Promise.reject(err))
        .then(json => Promise.reject(json));


    function fetchVoid(url, options = {}){
        let opts = Object.assign({
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, options);

        opts.body = JSON.stringify(options.body);
        return fetch(url, opts)
            .then(checkStatus)
            .catch(catchJSON);
    }

    function fetchJson(url, options){
        return fetchVoid(url, options)
            .then(toJSON);
    }

    /**/
    // const urlPrefix = 'http://app-prod-03.implicit.harvard.edu/openserver'; // first pathname section with slashes

    // const urlPrefix = window.location.origin; // first pathname section with slashes

    const urlPrefix = '..';//location.pathname.match(/^(?=\/)(.+?\/|$)/)[1]; // first pathname section with slashes


    // console.log(location.href);
    const baseUrl            = `${urlPrefix}`;

    function url(study_type, study_id, file_id) {
        return `${baseUrl}/files/${encodeURIComponent(study_id)}/file/${encodeURIComponent(file_id)}`;
    }

    let save = (study_type, study_id, file_id, content) => fetchJson(url(study_type, study_id, file_id), {
        method: 'put',
        body: {content: JSON.stringify(content)}
    });

    let saveToJS = (study_type, study_id, file_id, content) => fetchJson(url(study_type, study_id, file_id), {
        method: 'put',
        body: {content: content}
    });

    let createNotifications = function(){
        const state = [];
        return {show_success, show_danger, view};

        function show(value, time = 6000){
            state.push(value);
            m.redraw();
            setTimeout(()=>{state.pop(value);  m.redraw();}, time);
        }

        function show_success(value){
            return show({value, type:'success'});
        }

        function show_danger(value){
            return show({value, type:'danger'});
        }


        function view(){
            return state.map(notes => m('.note.alert.animated.fade', {class: notes.type==='danger' ? 'alert-danger' : 'alert-success'},[
                notes.value
            ]));

        }
    };

    const stiat = (args, external) => m.component(stiatComponent, args, external);

    let stiatComponent = {
        controller: controller,
        view: view
    };

    function controller({file, study}, external = false){
        let ctrl = {
            study: study ? study : null,
            file : file ? file : null,
            err : m.prop([]),
            loaded : m.prop(false),
            notifications : createNotifications(),
            settings : clone(defaultSettings(external)),
            defaultSettings : clone(defaultSettings(external)),
            external: external,
            is_locked:m.prop(study ? study.is_locked : null),
            show_do_save,
            is_settings_changed
        };

        ctrl.settings.external = ctrl.external;

        function load() {
            return ctrl.file.get()
                .catch(ctrl.err)
                .then(() => {
                    if (ctrl.file.content() !== '') {
                        ctrl.settings = JSON.parse(ctrl.file.content());
                        ctrl.prev_settings = clone(ctrl.settings);
                    }
                    ctrl.loaded(true);
                })
                .then(m.redraw);
        }

        function show_do_save(){
            let error_msg = [];
            let blocksObject = tabs.blocks.rowsDesc; //blockDesc inside output attribute
            error_msg = validityCheck(error_msg, ctrl.settings, blocksObject);
            if(error_msg.length !== 0) {
                return messages.confirm({
                    header: 'Some problems were found in your script, it\'s recommended to fix them before saving:',
                    content:
                        m('div',[
                            m('.alert alert-danger', [
                                m('ul', [
                                    error_msg.map(function (err) {
                                        return m('li', err);
                                    })
                                ])
                            ]),
                            m('strong','Do you want to save anyway?')
                        ])
                })
                    .then(response => {
                        if (response) do_save();
                    }).catch(error => messages.alert({
                        content: m('p.alert.alert-danger', error.message)
                    }))
                    .then(m.redraw());
            }
            else do_save();
        }
        function do_save(){
            ctrl.err([]);
            let studyId  =  m.route.param('studyId');
            let fileId = m.route.param('fileId');
            let jsFileId =  fileId.split('.')[0]+'.js';
            save('stiat', studyId, fileId, ctrl.settings)
                .then (() => saveToJS('stiat', studyId, jsFileId, toString(ctrl.settings, ctrl.external)))
                .then(ctrl.study.get())
                .then(() => ctrl.notifications.show_success(`STIAT Script successfully saved`))
                .then(m.redraw)
                .catch(err => ctrl.notifications.show_danger('Error Saving:', err.message));
            ctrl.prev_settings = clone(ctrl.settings);
            m.redraw();
        }

        function is_settings_changed(){
            return JSON.stringify(ctrl.prev_settings) !== JSON.stringify(ctrl.settings);
        }

        external ? null : load();
        return ctrl;
    }
    function view(ctrl){
        if(!ctrl.external) {
            return !ctrl.loaded()
                ? m('.loader')
                : m('.wizard.container-fluid.space',
                    m.component(tabsComponent, tabs, ctrl.settings, ctrl.defaultSettings, ctrl.external, ctrl.notifications,
                        ctrl.is_locked, ctrl.is_settings_changed, ctrl.show_do_save));
        }
        return m('.container-fluid',
            pageHeadLine('STIAT'),
            m.component(messages),
            m.component(tabsComponent, tabs, ctrl.settings, ctrl.defaultSettings, ctrl.external)
        );


    }

    m.mount(document.getElementById('dashboard'), stiat({}, true));

}());
//# sourceMappingURL=stiat_index.js.map
