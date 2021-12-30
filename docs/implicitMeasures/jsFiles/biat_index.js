/**
    * @preserve minnojs-biat-dashboard v1.0.0
    * @license Apache-2.0 (2021)
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
                                    if (tab === 'practice' && settings.parameters.practiceBlock === false)
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
                            m.component(tabs[ctrl.tab].component, settings, defaultSettings, tabs[ctrl.tab].rowsDesc, tabs[ctrl.tab].subTabs, tabs[ctrl.tab].type, ctrl.currSubTab))
                    ])
                ]);}
    };

    function defaultSettings(external){
        return {
            parameters : {isTouch:false, isQualtrics:false, practiceBlock:true,
                showStimuliWithInst:true, remindError:true,
                base_url: {image: external ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/docs/images/' : './images'}
            },
            blocks: {nMiniBlocks: 1, nTrialsPerMiniBlock:16, nPracticeBlockTrials: 8, nCategoryAttributeBlocks: 4,
                focalAttribute: 'attribute1', firstFocalAttribute : 'random', focalCategoryOrder: 'random'
            },
            practiceCategory1 : {
                name : 'Mammals',
                title : {
                    media : {word : 'Mammals'},
                    css : {color:'#31b404','font-size':'1.8em'},
                    height : 4,
                    startStimulus : {
                        media : {word : 'Dogs, Horses, Cows, Lions'},
                        css : {color:'#31b404','font-size':'1em'},
                        height : 2
                    }
                },
                stimulusMedia : [
                    {word : 'Dogs'},
                    {word : 'Horses'},
                    {word : 'Lions'},
                    {word : 'Cows'}
                ],
                stimulusCss : {color:'#31b404','font-size':'2em'}},
            practiceCategory2 : {
                name : 'Birds',
                title : {
                    media : {word : 'Birds'},
                    css : {color:'#31b404','font-size':'1.8em'},
                    height : 4,
                    startStimulus : {
                        media : {word : 'Pigeons, Swans, Crows, Ravens'},
                        css : {color:'#31b404','font-size':'1em'},
                        height : 2
                    }
                },
                stimulusMedia : [
                    {word : 'Pigeons'},
                    {word : 'Swans'},
                    {word : 'Crows'},
                    {word : 'Ravens'}
                ],
                stimulusCss : {color:'#31b404','font-size':'2em'}
            },
            categories : [  //As many categories you need.
                {
                    name : 'Black people',
                    title : {
                        media : {word : 'Black people'},
                        css : {color:'#31b404','font-size':'1.8em'},
                        height : 4,
                        startStimulus : {
                            media : {word : 'Tyron, Malik, Terrell, Jazmin, Tiara, Shanice'},
                            css : {color:'#31b404','font-size':'1em'},
                            height : 2
                        }
                    },
                    stimulusMedia : [
                        {word: 'Tyron'},
                        {word: 'Malik'},
                        {word: 'Terrell'},
                        {word: 'Jazmin'},
                        {word: 'Tiara'},
                        {word: 'Shanice'}
                    ],
                    stimulusCss : {color:'#31b404','font-size':'2em'}
                },
                {
                    name : 'White people',
                    title : {
                        media : {word : 'White people'},
                        css : {color:'#31b404','font-size':'1.8em'},
                        height : 4,
                        startStimulus : {
                            media : {word : 'Jake, Connor, Bradley, Alison, Emma, Emily'},
                            css : {color:'#31b404','font-size':'1em'},
                            height : 2
                        }
                    },
                    stimulusMedia : [
                        {word: 'Jake'},
                        {word: 'Connor'},
                        {word: 'Bradley'},
                        {word: 'Allison'},
                        {word: 'Emma'},
                        {word: 'Emily'}
                    ],
                    //Stimulus css
                    stimulusCss : {color:'#31b404','font-size':'2em'}
                }
            ],
            attribute1 :
                {
                    name : 'Pleasant',
                    title : {
                        media : {word : 'Pleasant'},
                        css : {color:'#0000FF','font-size':'1.8em'},
                        height : 4,
                        startStimulus : {
                            media : {word : 'Joy, Love, Happy, Good'},
                            css : {color:'#0000FF','font-size':'1em'},
                            height : 2
                        }
                    },
                    stimulusMedia : [
                        {word : 'Joy'},
                        {word : 'Love'},
                        {word : 'Happy'},
                        {word : 'Good'}
                    ],
                    stimulusCss : {color:'#0000FF','font-size':'2em'}
                },
            attribute2 :
                {
                    name : 'Unpleasant',
                    title : {
                        media : {word : 'Unpleasant'},
                        css : {color:'#0000FF','font-size':'1.8em'},
                        height : 4,
                        startStimulus : {
                            media : {word : 'Horrible, Evil, Nasty, Bad'},
                            css : {color:'#0000FF','font-size':'1em'},
                            height : 2
                        }
                    },
                    stimulusMedia : [
                        {word : 'Horrible'},
                        {word : 'Nasty'},
                        {word : 'Bad'},
                        {word : 'Evil'}
                    ],
                    stimulusCss : {color:'#0000FF','font-size':'2em'}
                },
            text: {
                leftKeyText:'"E" for all else',
                rightKeyText:'"I" if item belongs',
                orText:'or',
                remindErrorText : '<p style="font-size:0.6em;font-family:arial sans-serif; text-align:center;">' +
                    'If you make a mistake, a red <font-color="#ff0000"><b>X</b></font> will appear. ' +
                    'Press the other key to continue.<p/>',
                finalText : 'Press space to continue to the next task',
                instTemplate: '<div><p style="font-size:20px; font-family:arial sans-serif; text-align:center;"><br/>' +
                    '<font-color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +
                    '<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +
                    'Put a right finger on the <b>I</b> key for items that belong to the category ' +
                    '<font-color="#0000FF">focalAtt</font>, ' +
                    'and for items that belong to the category <font-color="#31b404">focalCat</font>.<br/>' +
                    'Put a left finger on the <b>E</b> key for items that do not belong to these categories.<br/><br/>' +
                    'If you make a mistake, a red <font-color="#ff0000"><b>X</b></font> will appear. ' +
                    'Press the other key to continue.<br/><br/>' +
                    '<p style="text-align:center;">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
            },
            touch_text : {
                rightKeyTextTouch : 'Left for all else',
                leftKeyTextTouch : 'Right if item belongs',
                remindErrorTextTouch : '<p style="font-size:1.4em; font-family:arial sans-serif; text-align:center;">' +
                    'If you make a mistake, a red <font-color="#ff0000"><b>X</b></font> will appear. ' +
                    'Touch the other side to continue.<p/>',
                finalTouchText: 'Touch the bottom green area to continue to the next task',
                instTemplateTouch: '<div><p style="text-align:center;"" ' +
                    '<br/><font-color="#000000"><u>Part blockNum of nBlocks </u><br/></p>' +
                    '<p style="text-align:left;" style="margin-left:5px"> ' +
                    'Put a right finger on the <b>right</b> green area for items that belong to the category ' +
                    '<font-color="#0000FF">focalAtt</font>, ' +
                    'and for items that belong to the category <font-color="#31b404">focalCat</font>.<br/>' +
                    'Put a left finger on the <b>left</b> green area for items that do not belong to these categories.<br/>' +
                    'If you make a mistake, a red <font-color="#ff0000"><b>X</b></font> will appear. ' +
                    'Press the other key to continue.<br/>' +
                    '<p style="text-align:center;">Touch the <b>lower </b> green area to start.</font></p></div>',

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
        return m('h1.display-4', 'Create my '+task+' script')
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
                            m('p.space','If you saved a JSON file from a previous session, you can upload that file here to edit the parameters.'),
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
                m('.col-sm-8',
                    !fieldName.toLowerCase().includes('maskstimulus')
                        ? m('input[type=text].form-control', {value:get(fieldName,'media','word') ,onchange:m.withAttr('value', set(fieldName,'media','word'))})
                        : m('input[type=text].form-control', {value:get(fieldName,'media','image') ,onchange:m.withAttr('value', set(fieldName,'media','image'))})
                )
            ])
        ]);
    }

    let parametersComponent$1 = {
        controller:controller$b,
        view:view$b
    };

    function controller$b(settings, defaultSettings, rows) {
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

    function view$b(ctrl, settings){
        return m('.space' ,[
            ctrl.rows.slice(0,-1).map((row) => {
                if(!ctrl.external && row.name === 'isQualtrics') return;
                if ((ctrl.qualtricsParameters.includes(row.name)) && ctrl.get('isQualtrics') === 'Regular') return;
                if(settings.parameters.isTouch && row.name.toLowerCase().includes('key')) return;
                return m('.row.line', [
                    m('.col-md-3',
                        row.desc ?
                            [
                                m('span', [' ', row.label, ' ']),
                                m('i.fa.fa-info-circle.text-muted',{title:row.desc})
                            ]
                            : m('span', [' ', row.label])
                    ),
                    row.name === ('base_url') ?
                        m('.col-md-5',
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

    let blocksComponent = {
        controller:controller$a,
        view:view$a
    };

    function controller$a(settings, defaultSettings, rows){
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
    function view$a(ctrl, settings){
        return m('.space' , [
            //create numbers inputs
            ctrl.rows.map(function(row){
                //if user chooses not to have a practice block set its parameter to 0
                if (row.name === 'nPracticeBlockTrials' && settings.parameters.practiceBlock === false) {
                    settings.blocks.nPracticeBlockTrials = 0;
                    return;
                }
                return m('.row.line', [
                    m('.col-md-3',
                        row.desc ?
                            [
                                m('span', [' ', row.label, ' ']),
                                m('i.fa.fa-info-circle.text-muted',{title:row.desc})
                            ]
                            : m('span', [' ', row.label])
                    ),
                        row.options ?
                            m('.col-md-3.col-lg-2',
                                m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name))},[
                                row.options.map(function(option){return m('option', option);})
                            ]))
                            : row.name.includes('random') ?
                                m('.col-md-3.col-lg-1',
                                    m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name,'checkbox')), checked: ctrl.get(row.name)})
                                )
                            : m('.col-md-3.col-lg-1',
                                m('input[type=number].form-control',{placeholder:'0', onchange: m.withAttr('value', ctrl.set(row.name, 'number')), value: ctrl.get(row.name), min:0})
                                )

                ]);
            }), resetClearButtons(ctrl.reset, ctrl.clear)
        ]);
    }

    let textComponent = {
        controller:controller$9,
        view:view$9
    };

    function controller$9(settings, defaultSettings, rows){
        let isTouch = settings.parameters.isTouch;
        let isQualtrics = settings.parameters.isQualtrics;
        let textparameters;
        isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
        return {reset, clear, set, get, rows: rows.slice(0,-2), isTouch, isQualtrics};

        function reset(){
            let valueToSet = isTouch ? defaultSettings.touch_text : defaultSettings.text;
            showClearOrReset(textparameters, valueToSet, 'reset');
        }
        function clear(){
            let valueToSet = isTouch ? rows.slice(-1)[0] :  rows.slice(-2)[0];
            showClearOrReset(textparameters, valueToSet, 'clear');
        }
        function get(name){return textparameters[name];}
        function set(name){return function(value){return textparameters[name] = value;};}
    }

    function view$9(ctrl){
        return m('.space' ,[
            ctrl.rows.map(function(row){
                //if touch parameter is chosen, don't show the irrelevant text parameters
                if (ctrl.isTouch === true && row.nameTouch === undefined)
                    return;
                if(ctrl.isQualtrics === false && row.name === 'preDebriefingText')
                    return;
                return m('.row.line',[
                    m('.col-md-3',
                        row.desc ?
                            [
                                m('span', [' ', row.label, ' ']),
                                m('i.fa.fa-info-circle.text-muted',{title:row.desc})
                            ]
                            : m('span', [' ', row.label])
                    ),
                    m('.col-md-9', [
                        m('textarea.form-control',{rows:5, value:ctrl.get(ctrl.isTouch ? row.nameTouch : row.name), oninput:m.withAttr('value', ctrl.set(ctrl.isTouch ? row.nameTouch : row.name))})
                    ])
                ]);
            }), resetClearButtons(ctrl.reset, ctrl.clear)
        ]);
    }

    let elementComponent$2 = {
        controller: controller$8,
        view: view$8,
    };

    function controller$8(object, settings,stimuliList, startStimulusList ,index){
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

    function view$8(ctrl) {
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
                        m('.col-sm-6',m('span', 'Category\'s Type:')),
                        m('.col-sm-5',[
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
                            m('.col-sm-5',[
                                m('input[type=color].form-control',{value: ctrl.get('title','css','color'), onchange:m.withAttr('value', ctrl.set('title','css','color'))})
                            ])
                        ]),
                        m('.row.space',[
                            m('.col-sm-5',[
                                m('span', 'Font\'s size:'),
                            ]),
                            m('.col-sm-5',[
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
                        m('.col-md-6',
                            m('input[type=text].form-control', {placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)})
                        )
                    ),
                    m('.row',
                        m('.col-md-7',[
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
                        m('.col-md-6',
                            m('select.form-control', {multiple : 'multiple', size : '8' ,onchange: (e) => ctrl.updateSelectedStimuli(e)},[
                                ctrl.get('stimulusMedia').some(object => object.word) ? ctrl.fields.stimuliHidden(true) : ctrl.fields.stimuliHidden(false),
                                ctrl.get('stimulusMedia').map(function(object){
                                    let value = object.word ? object.word : object.image;
                                    let option = value + (object.word ? ' [Word]' : ' [Image]');
                                    return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                                })
                            ])
                        ),
                        m('.col-md-6',
                            !ctrl.fields.stimuliHidden() ? '' :
                                m('.col-md-6',[
                                    m('u','Stimuli font\'s design:'),m('br'),
                                    m('label','Font\'s color: '),m('br'),
                                    m('input[type=color].form-control', {value: ctrl.get('stimulusCss','color'), onchange:m.withAttr('value', ctrl.set('stimulusCss','color'))}),
                                    m('br'), m('label', 'Font\'s size:'), m('br'),
                                    m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('stimulusCss','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('stimulusCss','font-size'))})
                                ])
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
                            m('.col-md-6',
                                m('input[type=text].form-control', {placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', value: ctrl.fields.newStartStimulus(), oninput: m.withAttr('value', ctrl.fields.newStartStimulus)})
                            )

                        ),
                        m('.row',
                            m('.col-md-7',
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
                            m('.col-md-6',
                                m('select.form-control', {multiple : 'multiple', size : '8' ,onchange: (e) => ctrl.updateSelectedStimuli(e, true)},[
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
                            m('.col-md-6',
                                !ctrl.fields.startStimuliHidden() ? '' :
                                    m('.col-md-6',[
                                        m('u','Stimuli font\'s design:'),m('br'),
                                        m('label','Font\'s color: '),m('br'),
                                        m('input[type=color].form-control', {value: ctrl.get('title','startStimulus','css','color'), onchange:m.withAttr('value', ctrl.set('title','startStimulus','css','color'))}),
                                        m('br'), m('label', 'Font\'s size:'), m('br'),
                                        m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('title','startStimulus','css','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('title','startStimulus','css','font-size'))})
                                    ])
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

    let categoriesComponent$1 = {
        controller:controller$7,
        view:view$7
    };

    function controller$7(settings, defaultSettings, clearElement){
        let categories = settings.categories;
        categories.forEach(element => { //adding a random key for each category
            element.key = Math.random();
        });
        let headlines = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth'];
        let chooseFlag = m.prop(false);
        let chosenCategoriesList = m.prop([]);
        let chooseClicked = m.prop(false);
        let curr_tab = m.prop(0);

        return {reset, clear, chooseFlag, unChooseCategories,categories, headlines, addCategory, chosenCategoriesList,
            updateChosenBlocks, showRemoveCategories, chooseCategories, curr_tab, getDefaultValues};

        function clear(curr_tab){showClearOrReset(categories[curr_tab], clearElement[0], 'clear');}
        function reset(curr_tab){showClearOrReset(categories[curr_tab], defaultSettings.categories[curr_tab], 'reset');
        }
        function addCategory() {
            categories.push(clone(clearElement[0]));
            let last = categories.length - 1;
            categories[last].key = Math.random();
        }
        function updateChosenBlocks(e, index){
            //if clicked the checkbox to uncheck the item
            if (chosenCategoriesList().includes(index) && !e.target.checked){
                let i = chosenCategoriesList().indexOf(index);
                if (i !== -1) chosenCategoriesList().splice(i, 1);
                return;
            }
            if (e.target.checked) chosenCategoriesList().push(index);
        }
        function unChooseCategories(){
            chooseFlag(false);
            chosenCategoriesList().length = 0;
        }
        function chooseCategories(){
            if(categories.length < 3){
                showRestrictions('error','It\'s not possible to remove categories because there must be at least 2 categories.','Error');
                return;
            }
            chooseFlag(true);
            if (!chooseClicked()) { //show the info msg only for the first time the choose button has been clicked
                showRestrictions('info','To choose categories to remove, please tik the checkbox near the wanted category, and to remove them click the \'Remove Chosen Categories\' button.', 'Choose categories to remove');
                chooseClicked(true);
            }
        }
        function showRemoveCategories(){
            if ((categories.length - chosenCategoriesList().length) < 2){
                showRestrictions('error','Minimum number of categories needs to be 2, please choose less categories to remove', 'Error Removing Chosen Categories');
                return;
            }
            return messages.confirm({header: 'Are you sure?', content:
                    m('', 'This action is permanent')})
                .then(response => {
                    if (response) {
                        removeCategories();
                        m.redraw();
                    }
                    else {
                        chosenCategoriesList().length = 0;
                        chooseFlag(false);
                        m.redraw();
                    }
                }).catch(error => messages.alert({header: 'Error in removing categories' , content: m('p.alert.alert-danger', error.message)}))
                .then(m.redraw());

            function removeCategories(){
                chosenCategoriesList().sort();
                for (let i = chosenCategoriesList().length - 1; i >=0; i--)
                    categories.splice(chosenCategoriesList()[i],1);

                chosenCategoriesList().length = 0;
                chooseFlag(false);
                curr_tab(categories.length - 1);
            }
        }

        function getDefaultValues(){
            let stimulusMedia = null;
            let startStimulus = null;
            if(curr_tab() < 2){
                stimulusMedia = defaultSettings.categories[curr_tab()].stimulusMedia;
                startStimulus = defaultSettings.categories[curr_tab()].title.startStimulus;
            }
            return [stimulusMedia, startStimulus];
        }
    }

    function view$7(ctrl,settings) {
        return m('.space',[
            m('.row',[
                m('.col-md-12',
                    m('.subtab', ctrl.categories.map(function(tab, index){
                        return m('button',{
                            class: ctrl.curr_tab() === index ? 'active' : '',
                            onclick:function(){
                                ctrl.curr_tab(index);
                            }}, ctrl.headlines[index] + ' Category ',
                        !ctrl.chooseFlag() ? '' :
                            m('input[type=checkbox].space', {checked : ctrl.chosenCategoriesList().includes(index), onclick: (e) => ctrl.updateChosenBlocks(e, index)}));
                    }))
                )
            ]),
            m('.row.space',[
                m('.col-md-9',
                    m('.btn-group btn-group-toggle', [
                        ctrl.categories.length > 7 ? '' :
                            m('button.btn btn btn-info',{title:'You can add up to 8 categories',onclick: ctrl.addCategory}, [m('i.fa.fa-plus')],' Add Category'),
                        !ctrl.chooseFlag() ?
                            m('button.btn btn btn-secondary',{onclick: ctrl.chooseCategories},[
                                m('i.fa.fa-check'), ' Choose Categories to Remove'])
                            : m('button.btn btn btn-warning',{onclick: ctrl.unChooseCategories},[
                                m('i.fa.fa-minus-circle'), ' Un-Choose Categories to Remove']),
                        !ctrl.chosenCategoriesList().length ? '' :
                            m('button.btn btn btn-danger',{onclick: ctrl.showRemoveCategories},[
                                m('i.fa.fa-eraser'), ' Remove Chosen Categories'])

                    ])
                )
            ]),
            m('div',{key:ctrl.categories[ctrl.curr_tab()].key},
                m.component(elementComponent$2, {key:'categories'}, settings, ctrl.getDefaultValues()[0], ctrl.getDefaultValues()[1], ctrl.curr_tab())),
            m('hr'),
            resetClearButtons(ctrl.reset, ctrl.clear, ctrl.curr_tab(), true)
        ]);
    }

    let elementComponent$1 = {
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
                        m('.col-sm-6',m('span', 'Category\'s Type:')),
                        m('.col-sm-5',[
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
                            m('.col-sm-5',[
                                m('input[type=color].form-control',{value: ctrl.get('title','css','color'), onchange:m.withAttr('value', ctrl.set('title','css','color'))})
                            ])
                        ]),
                        m('.row.space',[
                            m('.col-sm-5',[
                                m('span', 'Font\'s size:'),
                            ]),
                            m('.col-sm-5',[
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
                        m('.col-md-6',
                            m('input[type=text].form-control', {placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', 'aria-describedby':'basic-addon2', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)}
                            ))
                    ),
                    m('.row',
                        m('.col-md-7',
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
                        m('.col-md-6',
                            m('select.form-control', {multiple : 'multiple', size : '8' ,onchange:(e) => ctrl.updateSelectedStimuli(e)},[
                                ctrl.get('stimulusMedia').some(object => object.word) ? ctrl.fields.stimuliHidden(true) : ctrl.fields.stimuliHidden(false),
                                ctrl.get('stimulusMedia').map(function(object){
                                    let value = object.word ? object.word : object.image;
                                    let option = value + (object.word ? ' [Word]' : ' [Image]');
                                    return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                                })
                            ])
                        ),
                        m('.col-md-6',
                            !ctrl.fields.stimuliHidden() ? '' :
                                m('.col-md-6',[
                                    m('u','Stimuli font\'s design:'),m('br'),
                                    m('label','Font\'s color: '),m('br'),
                                    m('input[type=color].form-control', {value: ctrl.get('stimulusCss','color'), onchange: m.withAttr('value', ctrl.set('stimulusCss','color'))}),
                                    m('br'), m('label', 'Font\'s size:'), m('br'),
                                    m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('stimulusCss','font-size') ,min: '0' ,onchange: m.withAttr('value', ctrl.set('stimulusCss','font-size'))})
                                ])
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

    let elementComponent = {
        controller:controller$5,
        view:view$5,
    };

    function controller$5(object, settings, stimuliList){
        let element = settings[object.key];
        let fields = {
            newStimulus : m.prop(''),
            elementType: m.prop(object.key.includes('attribute') ? 'Attribute' : 'Category'),
            selectedStimuli: m.prop(''),
        };

        return {fields, set, get, addStimulus, updateSelectedStimuli, removeChosenStimuli, removeAllStimuli, resetStimuliList};

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
                if (media != null && type != null){
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

    function view$5(ctrl) {
        return m('.space', [
            m('.row.line',[
                m('.col-sm-3',[
                    m('span', ctrl.fields.elementType()+' name logged in the data file '),
                    m('i.fa.fa-info-circle.text-muted',{
                        title:'Will appear in the data and in the default feedback message.'
                    }),
                ]),
                m('.col-sm-3', [
                    m('input[type=text].form-control', {value:ctrl.get('name'), oninput:m.withAttr('value', ctrl.set('name'))})
                ])
            ]),
            m('.row',[
                m('.col-md-12',[
                    m('p.h4','Stimuli: ', m('i.fa.fa-info-circle.text-muted',{
                        title:'Enter text (word) or image name (image). Set the path to the folder of images in the General Parameters page'
                    })),
                    m('.h-25.d-inline-block',[
                        m('input[type=text].form-control', {placeholder:'Enter Stimulus content here', 'aria-label':'Enter Stimulus content', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)}),
                        m('.btn-group btn-group-toggle', [
                            m('button[type=button].btn btn-secondary',{disabled:!ctrl.fields.newStimulus().length, id:'addWord', onclick: ctrl.addStimulus},[
                                m('i.fa.fa-plus'), 'Add Word'
                            ]),
                            m('button[type=button].btn btn-secondary', {disabled:!ctrl.fields.newStimulus().length, id:'addImage', onclick: ctrl.addStimulus},[
                                m('i.fa.fa-plus'), 'Add Image'
                            ])
                        ])
                    ])
                ])
            ]),
            m('.row',[
                m('.col-md-6',[
                    m('.row',
                        m('.col-sm-6',
                            m('select.form-control', {multiple : 'multiple', size : '8' ,onchange:(e) => ctrl.updateSelectedStimuli(e)},[
                                ctrl.get('mediaArray').map(function(object){
                                    let value = object.word ? object.word : object.image;
                                    let option = value + (object.word ? ' [Word]' : ' [Image]');
                                    return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                                })
                            ])
                        )
                    ),
                    m('.row.space',
                        m('.col-sm-5',
                            m('.btn-group-vertical',[
                                m('button.btn btn btn-warning', {title:'To select multiple stimuli, please press the ctrl key while selecting the desired stimuli', disabled: !ctrl.fields.selectedStimuli().length, onclick:ctrl.removeChosenStimuli},'Remove Chosen Stimuli'),
                                m('button.btn btn btn-warning', {onclick:ctrl.removeAllStimuli},'Remove All Stimuli'),
                                m('button.btn btn btn-warning', {onclick: ctrl.resetStimuliList},'Reset Stimuli List')
                            ]))
                    )
                ])
            ])
        ]);
    }

    let parametersComponent = {
        controller:controller$4,
        view:view$4
    };

    function controller$4(settings){
        let primeCss = settings.primeStimulusCSS;
        return {set, get};

        function get(parameter){
            if (parameter === 'font-size') return parseFloat((primeCss[parameter]).substring(0,3));
            return primeCss[parameter];
        }
        function set(parameter){
            return function(value){
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

    function view$4(ctrl){
        return m('.row' , [
            m('.col-sm-12',[
                m('.row.space',[
                    m('.col-sm-2',[
                        m('span', 'Font\'s color: '),
                        m('input[type=color].form-control', {value: ctrl.get('color'), onchange:m.withAttr('value', ctrl.set('color'))})
                    ]),
                    m('.col-sm-2',[
                        m('span', 'Font\'s size: '),
                        m('input[type=number].form-control', {placeholder:'1', value:ctrl.get('font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('font-size'))})
                    ])
                ])
            ])
        ]);
    }

    let categoriesComponent = {
        controller:controller$3,
        view:view$3
    };

    function controller$3(settings, defaultSettings, clearElement){

        return {reset, clear};

        function reset(curr_tab){showClearOrReset(settings[curr_tab], defaultSettings[curr_tab],'reset');}
        function clear(curr_tab){
            curr_tab === 'primeStimulusCSS' ? showClearOrReset(settings[curr_tab], {color:'#000000','font-size':'0em'}, 'clear')
                : showClearOrReset(settings[curr_tab], clearElement[0], 'clear');
        }
    }

    function view$3(ctrl, settings, defaultSettings, clearElement, subTabs, taskType, currTab) {
        return m('div', [
            taskType === 'BIAT' ?
                m.component(elementComponent$2,{key:currTab}, settings,
                    defaultSettings[currTab].stimulusMedia, defaultSettings[currTab].title.startStimulus)
                : currTab === 'primeStimulusCSS' ? //in EP there is additional subtab called Prime Design, it needs different component.
                    m.component(parametersComponent, settings)
                    : taskType === 'EP' ?
                        m.component(elementComponent, {key:currTab}, settings, defaultSettings[currTab].mediaArray)
                        : m.component(elementComponent$1, {key:currTab}, settings, defaultSettings[currTab].stimulusMedia),
            m('hr')
            ,resetClearButtons(ctrl.reset, ctrl.clear, currTab)
        ]);
    }

    let outputComponent = {
        controller: controller$2,
        view:view$2
    };

    function controller$2(settings, defaultSettings, blocksObject){
        let error_msg = [];
        error_msg = validityCheck(error_msg, settings, blocksObject);

        return {createFile, error_msg};

        function createFile(settings, type){
            return function(){
                let output,textFileAsBlob;
                let downloadLink = document.createElement('a');
                if (type === 'JS'){
                    output = toString(settings);
                    textFileAsBlob = new Blob([output], {type:'text/plain'});
                    downloadLink.download = 'BIAT.js';
                }
                else {
                    output = updateSettings$1(settings);
                    textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
                    downloadLink.download = 'BIAT.json';
                }
                if (window.webkitURL) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
                else {
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.style.display = 'none';
                    document.body.appendChild(downloadLink);
                }
                downloadLink.click();
            };
        }

    }
    function validityCheck(error_msg, settings, blocksObject){
        let category_headlines = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth'];

        let temp1,temp2,temp3 = false;
        if(settings.parameters.practiceBlock){
            temp1 = checkMissingElementName(settings.practiceCategory1, 'First Practice Category', error_msg);
            temp2 = checkMissingElementName(settings.practiceCategory2, 'Second Practice Category', error_msg);
        }
        settings.categories.map(function(category, index){
            let temp = checkMissingElementName(category, category_headlines[index]+' Category', error_msg);
            if (temp) temp3 = true;
        });

        let temp4 = checkMissingElementName(settings.attribute1, 'First Attribute', error_msg);
        let temp5 = checkMissingElementName(settings.attribute2, 'Second Attribute', error_msg);

        let containsImage = temp1 || temp2 || temp3 || temp4 || temp5;

        if(settings.parameters.base_url.image.length === 0 && containsImage)
            error_msg.push('Image\'s url is missing and there is an image in the study');

        //check for blocks problems
        let currBlocks = clone(settings.blocks);
        let clearBlocks = blocksObject.slice(-1)[0]; //blocks parameters with zeros as the values, used to check if the current parameters are also zeros.
        ['focalAttribute', 'firstFocalAttribute', 'focalCategoryOrder'].forEach(function(key){
            delete currBlocks[key];
            delete clearBlocks[key];
        });

        if(JSON.stringify(currBlocks) === JSON.stringify(clearBlocks))
            error_msg.push('All the block\'s parameters equals to 0, that will result in not showing the task at all');
        return error_msg;

    }

    function removeIndexFromCategories(settings){
        settings.categories.forEach(element => delete element.key);
        return settings;
    }

    function toString(settings, external){
        return toScript(updateSettings$1(settings), external);
    }

    function updateSettings$1(settings){
        // remove added keys and put in a temp var to keep keys on original settings
        let temp_settings = clone(settings);
        temp_settings = removeIndexFromCategories(temp_settings);
        let output = {};
        if (settings.parameters.practiceBlock){
            output.practiceCategory1 = temp_settings.practiceCategory1;
            output.practiceCategory2 = temp_settings.practiceCategory2;
        }
        output.categories = temp_settings.categories;
        output.attribute1 = temp_settings.attribute1;
        output.attribute2 = temp_settings.attribute2;
        output.base_url = temp_settings.parameters.base_url;
        output.remindError =  temp_settings.parameters.remindError;
        output.showStimuliWithInst = temp_settings.parameters.showStimuliWithInst;
        output.isTouch = temp_settings.parameters.isTouch;
        output.practiceBlock = temp_settings.parameters.practiceBlock;

        temp_settings.parameters.isQualtrics ? output.isQualtrics = temp_settings.parameters.isQualtrics : '';

        Object.assign(output, temp_settings.blocks);
        temp_settings.parameters.isTouch ? Object.assign(output, temp_settings.touch_text) : Object.assign(output, temp_settings.text);
        return output;
    }

    function toScript(output, external){
        let textForInternal = '//Note: This script was created by the BIAT wizard.\n//Modification of this file won\'t be reflected in the wizard.\n';
        let script = `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/qualtrics/qbiat6.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/biat6.js'}'], function(APIConstructor, iatExtension){\n\tvar API = new APIConstructor(); return iatExtension(${JSON.stringify(output,null,4)});});`;
        external === false ? script = textForInternal + script : '';
        return script;
    }

    function view$2(ctrl, settings){
        return viewOutput(ctrl, settings, toString);
    }

    let importComponent = {
        controller:controller$1,
        view:view$1
    };

    function view$1(ctrl){
        return viewImport(ctrl);
    }

    function controller$1(settings) {
        return {handleFile: handleFile, updateSettings: updateSettings};

        function handleFile(){
            let importedFile = document.getElementById('uploadFile').files[0];
            let reader = new FileReader();
            reader.readAsText(importedFile);
            reader.onload = function(){
                let fileContent = JSON.parse(reader.result);
                settings = updateSettings(settings, fileContent);
            };
        }
    }
    function updateSettings(settings, input) {
        if(input.practiceBlock) {
            settings.practiceCategory1 = input.practiceCategory1;
            settings.practiceCategory2 = input.practiceCategory2;
        }
        settings.categories = input.categories;
        settings.attribute1 = input.attribute1;
        settings.attribute2 = input.attribute2;
        settings.parameters.base_url = input.base_url;
        settings.parameters.remindError = input.remindError;
        settings.parameters.showStimuliWithInst = input.showStimuliWithInst;
        settings.parameters.isTouch = input.isTouch;
        settings.parameters.practiceBlock = input.practiceBlock;
        settings.blocks.nMiniBlocks = input.nMiniBlocks;
        settings.blocks.nTrialsPerMiniBlock = input.nTrialsPerMiniBlock;
        settings.blocks.nPracticeBlockTrials = input.nPracticeBlockTrials;
        settings.blocks.nCategoryAttributeBlocks = input.nCategoryAttributeBlocks;
        settings.blocks.focalAttribute = input.focalAttribute;
        settings.blocks.firstFocalAttribute = input.firstFocalAttribute;
        settings.blocks.focalCategoryOrder = input.focalCategoryOrder;
        if(input.isQualtrics) settings.parameters.isQualtrics = input.isQualtrics;
        if (input.isTouch){
            settings.touch_text.remindErrorTextTouch = input.remindErrorTextTouch;
            settings.touch_text.leftKeyTextTouch = input.leftKeyTextTouch;
            settings.touch_text.rightKeyTextTouch = input.rightKeyTextTouch;
            settings.touch_text.orKeyText = input.orKeyText;
            settings.touch_text.finalTouchText = input.finalTouchText;
            settings.touch_text.instTemplateTouch = input.instTemplateTouch;
        }
        else {
            settings.text.remindErrorText = input.remindErrorText;
            settings.text.leftKeyText = input.leftKeyText;
            settings.text.rightKeyText = input.rightKeyText;
            settings.text.orKeyText = input.orKeyText;
            settings.text.finalText = input.finalText;
            settings.text.instTemplate = input.instTemplate;
        }

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
        {name: 'isTouch', options:['Keyboard', 'Touch'], label:'Keyboard input or touch input?', desc:'Minno does not auto-detect the input method. If you need a touch version and a keyboard version, create two different scripts with this tool.'},
        {name: 'isQualtrics', options:['Regular','Qualtrics'], label:'Regular script or Qualtrics?', desc: ['If you want this BIAT to run from Qualtrics, read ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/qualtrics-biat/'}, 'this blog post '),'to see how.']},
        {name: 'practiceBlock', label: 'Practice Block', desc: 'Should the task start with a practice block?'},
        {name: 'remindError', label: 'Error feedback on incorrect responses', desc: 'It is recommended to show participants an error feedback on error responses'},
        {name: 'showStimuliWithInst', label: 'Show Stimuli with Instructions', desc: 'Whether to show the stimuli of the IN categories at the beginning of the block.'},
        {name: 'base_url', label: 'Image\'s URL', desc: 'If your task has any images, enter here the path to that images folder. It can be a full url, or a relative URL to the folder that will host this script'},
        {istouch:false, isQualtrics:false, practiceBlock:false, showStimuliWithInst:false, remindError:false, base_url:{image:''}}
    ];

    let blocksDesc = [
        {name: 'nMiniBlocks', label: 'Mini Blocks', desc: 'Each block can be separated to a number of mini-blocks, to reduce repetition of the same response in consecutive trials. The default, 1, means that we don\'t actually use mini blocks.'},
        {name: 'nTrialsPerMiniBlock', label: 'Trials in Mini Blocks', desc: '50% on the right, 50% left, 50% attributes, 50% categories.'},
        {name: 'nPracticeBlockTrials', label: 'Trials in Practice Block', desc:'Should be at least 8 trials'},
        {name: 'nCategoryAttributeBlocks', label: 'Blocks per focal category-attribute combination', desc: 'Number of blocks per focal category-attribute combination'},
        {name: 'focalAttribute', label: 'Focal Attribute', desc: 'Sets whether we use a certain focal attribute throughout the task, or both.', options: ['attribute1','attribute2','both']},
        {name: 'firstFocalAttribute', label: 'First Focal Attribute', desc: 'Sets what attribute appears first. Irrelevant if Focal Attribute is not \'both\'.', options: ['attribute1','attribute2','random']},
        {name: 'focalCategoryOrder', label: 'Focal Category Order', desc: 'If bySequence then we always start with the first category in the list as the first focal category.', options: ['bySequence','random']},
        {nMiniBlocks: 0, nTrialsPerMiniBlock: 0, nPracticeBlockTrials:0, nCategoryAttributeBlocks:0,
            focalAttribute: 'attribute1', firstFocalAttribute : 'random', focalCategoryOrder: 'random'}
    ];

    let textDesc = [
        {name: 'instTemplate', nameTouch: 'instTemplateTouch',label:'Instructions'},
        {name: 'remindErrorText', nameTouch: 'remindErrorTextTouch' , label:'Screen\'s Bottom (error reminder)', desc:'We use this text to remind participants what happens on error. Replace this text if you do not require participants to correct their error responses (see General Parameters page).'},
        {name: 'leftKeyText', nameTouch:'leftKeyTextTouch',label:'Top-left text (about the left key)', desc: 'We use this text to remind participants what key to use for a left response.'},
        {name: 'rightKeyText', nameTouch:'rightKeyTextTouch',label:'Top-right text (about the right key)', desc: 'We use this text to remind participants what key to use for a right response.'},
        {name: 'orText', label:'Or', desc: 'We show this text in the combined blocks to separate between the two categories that use the same key.'},
        {name: 'finalText', nameTouch: 'finalTouchText' , label:'Text shown at the end of the task'},
        {remindErrorText:'', leftKeyText:'', rightKeyText:'', orText:'', instTemplate:'', finalText:''},
        {remindErrorTextTouch:'', leftKeyTextTouch:'', rightKeyTextTouch:'',  instTemplateTouch:'', finalTouchText:''}
    ];

    let elementClear = [{
        name : '',
        title : {
            media : {word : ''},
            css : {color:'#000000','font-size':'1em'},
            height : 4, 
            startStimulus : { 
                media : {word : ''},
                css : {color:'#000000','font-size':'1em'},
                height : 2
            }
        },
        stimulusMedia : [], 
        stimulusCss : {color:'#000000','font-size':'1em'} }];


    let attributesTabs = {
        'attribute1': {text: 'First Attribute'},
        'attribute2': {text: 'Second Attribute'}
    };

    let practiceTabs = {
        'practiceCategory1':{text: 'First Practice Category'},
        'practiceCategory2':{text: 'Second Practice Category'}
    };

    let tabs = {
        'parameters': {text: 'General parameters', component: parametersComponent$1, rowsDesc: parametersDesc},
        'blocks': {text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
        'practice': {
            text: 'Practice Block',
            component: categoriesComponent,
            rowsDesc: elementClear,
            subTabs: practiceTabs,
            type: 'BIAT'
        },
        'categories': {text: 'Categories', component: categoriesComponent$1, rowsDesc: elementClear},
        'attributes': {
            text: 'Attributes',
            component: categoriesComponent,
            rowsDesc: elementClear,
            subTabs: attributesTabs,
            type: 'BIAT'
        },
        'text': {text: 'Texts', component: textComponent, rowsDesc: textDesc},
        'output': {text: 'Complete', component: outputComponent, rowsDesc: blocksDesc},
        'import': {text: 'Import', component: importComponent},
        'help': {text: 'Help', component: helpComponent, rowsDesc: 'BIAT'}
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

    const biat = (args, external) => m.component(biatComponent, args, external);

    let biatComponent = {
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
            defaultSettings : clone(defaultSettings(external)),
            settings : clone(defaultSettings(external)),
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
            save('biat', studyId, fileId, ctrl.settings)
                .then (() => saveToJS('biat', studyId, jsFileId, toString(ctrl.settings, ctrl.external)))
                .then(ctrl.study.get())
                .then(() => ctrl.notifications.show_success(`BIAT Script successfully saved`))
                .then(m.redraw)
                .catch(err => ctrl.notifications.show_danger('Error Saving:', err.message));
            ctrl.prev_settings = clone(ctrl.settings);
            m.redraw();
        }

        function is_settings_changed(){
            // remove added keys and put in a temp var to keep keys on original settings
            let temp_settings = removeIndexFromCategories(clone(ctrl.settings));
            let temp_prev_settings = ctrl.prev_settings === undefined ? ' ' : //if this is a new file and the prev_settings isn't set
                removeIndexFromCategories(clone(ctrl.prev_settings));
            return JSON.stringify(temp_prev_settings) !== JSON.stringify(temp_settings);
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
        return m('.container-fluid',[
            pageHeadLine('BIAT'),
            m.component(messages),
            m.component(tabsComponent, tabs, ctrl.settings, ctrl.defaultSettings, ctrl.external)
        ]);
    }

    m.mount(document.getElementById('dashboard'), biat({}, true));

}());
//# sourceMappingURL=biat_index.js.map
