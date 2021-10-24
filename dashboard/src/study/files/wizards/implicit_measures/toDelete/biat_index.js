/**
* @preserve minnojs-biat-dashboard v1.0.0
* @license Apache-2.0 (2021)
*/

(function (modelHelpers, modelUrls) {
    'use strict';

    let tabsComponent = {
        controller: function(tabs, settings, defaultSettings, external = false, is_locked = false){
            let tab = tabs[0].value;
            let index = setIndex(tab);
            //disable_all();
            return {tab: tab, index: index, setIndex:setIndex};
            function setIndex(tab){return tabs.findIndex((element) => (element.value === tab));}
        }, view:
            function(ctrl, tabs, settings, defaultSettings, external = false, is_locked = false){
                return m('.container',{id:'tabs'},[m('.tab',
                    tabs.map(function(tab){
                        if (!external && (tab.value === 'output' || tab.value === 'import'))
                            return;
                        if (tab.value === 'practice' && settings.parameters.practiceBlock === false)
                            return;
                        return m('button.tablinks', {
                            class: ctrl.tab === tab.value ? 'active' : '', onclick:function(){
                                ctrl.tab = tab.value;ctrl.index = ctrl.setIndex(tab.value);}},
                            tab.text);})),
                    m('.div',{key:tabs[ctrl.index].value},
                        m.component(tabs[ctrl.index].component, settings, defaultSettings, tabs[ctrl.index].rowsDesc, tabs[ctrl.index].subTabs, tabs[ctrl.index].biat))
                ]);
        }
    };

    let settings = {
        parameters : {isTouch:false, isQualtrics:false, practiceBlock:true, 
            showStimuliWithInst:true, remindError:true, base_url:''},
        blocks: {nMiniBlocks: 1, nTrialsPerMiniBlock:16, nPracticeBlockTrials: 8, nCategoryAttributeBlocks: 4,
            focalAttribute: 'attribute1', firstFocalAttribute : 'random', focalCategoryOrder: 'random'},
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
            orKeyText:'or',
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
            rightKeyText : 'Left for all else', 
            leftKeyText : 'Right if item belongs',
            orKeyText:'or',
            remindErrorText : '<p style="font-size:1.4em; font-family:arial sans-serif; text-align:center;">' +
            'If you make a mistake, a red <font-color="#ff0000"><b>X</b></font> will appear. ' +
            'Touch the other side to continue.<p/>',
            finalText: 'Touch the bottom green area to continue to the next task',
            instTemplate: '<div><p style="text-align:center;"" ' +
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

    let parametersComponent = {
        controller:controller$8,
        view:view$9
    };

    function controller$8(settings, defaultSettings, rows){
        var parameters = settings.parameters;
        var qualtricsParameters = ['leftKey', 'rightKey', 'fullscreen', 'showDebriefing'];

        return {reset, clear, set, get, rows, qualtricsParameters};

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

    function view$9(ctrl){
        return m('.container' , [
            ctrl.rows.slice(0,-1).map((row) => {
                if ((ctrl.qualtricsParameters.includes(row.name)) && ctrl.get('isQualtrics') === 'Regular') return;
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

    let blocksComponent = {
        controller:controller$7,
        view:view$8
    };

    function controller$7(settings, defaultSettings, rows){
        let blocks = settings.blocks;
        return {reset:reset, clear:clear, set:set, get:get, rows: rows};
        
        function reset(){Object.assign(blocks, defaultSettings.blocks);}
        function clear(){Object.assign(blocks, rows.slice(-1)[0]);}
        function get(name){return blocks[name]; }
        function set(name, type){ 
            if (type === 'number') return function(value){ return blocks[name] = Math.round(value);};
            return function(value){ return blocks[name] = value; };
        }
    }
    function view$8(ctrl, settings){
        return m('.container' , [
            m('.row',[
                m('.col',{style:{'margin-bottom':'7px'}},[
                    m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                        m('button.btn btn btn-danger', {onclick: ctrl.reset},[
                            m('i.fa.fa-undo.fa-sm'), ' Reset'
                        ]),
                        m('button.btn btn btn-danger',{onclick: ctrl.clear},[
                            m('i.fa.fa-trash.fa-sm'), ' Clear'
                        ])
                    ])
                ])
            ]),
            //create numbers inputs
            ctrl.rows.slice(0,4).map(function(row) {
            //if user chooses not to have a prcatice block set it's parameter to 0
                if (row.name === 'nPracticeBlockTrials' && settings.parameters.practiceBlock === false) {
                    settings.blocks.nPracticeBlockTrials = '0';
                    return null;
                }
                return m('div',[
                    m('.row', [
                        m('.col-sm-5',[
                            m('i.fa.fa-info-circle'),
                            m('.card.info-box.card-header', [row.desc]),
                            m('span', [' ', row.label])
                        ]),
                        m('.col-7',
                            m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set(row.name, 'number')), value: ctrl.get(row.name)}))
                    ]),
                    m('hr')
                ]);
            }),
            //create select inputs
            ctrl.rows.slice(4,-1).map(function(row) {
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
            })
        ]);
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

    function showClearOrReset$1(element, value, action){
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

    let textComponent = {
        controller:controller$6,
        view:view$7
    };

    function controller$6(settings, defaultSettings, rows){
        let isTouch = settings.parameters.isTouch;
        let textparameters;
        isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
        return {reset, clear, set, get, rows: rows.slice(0,-2), isTouch};

        function reset(){
            let valueToSet = isTouch ? defaultSettings.touch_text : defaultSettings.text;
            showClearOrReset$1(textparameters, valueToSet, 'reset');
        }
        function clear(){
            let valueToSet = isTouch ? rows.slice(-1)[0] :  rows.slice(-2)[0];
            showClearOrReset$1(textparameters, valueToSet, 'clear');
        }
        function get(name){ return textparameters[name]; }
        function set(name){return function(value){return textparameters[name] = value;};}
    }

    function view$7(ctrl){
        return m('.container' , [
            ctrl.rows.map(function(row) {
                //if touch parameter is chosen, don't show the irrelevant text parameters
                if (ctrl.isTouch === true && row.nameTouch === undefined) {
                    return null;
                }
                return m('.div' , [
                    m('.row.space', [
                        m('.col-sm-4.space',[
                            m('i.fa.fa-info-circle'),
                            m('.card.info-box.card-header',[row.desc]),
                            m('span',[' ', row.label])
                        ]),
                        m('.col-sm-8', [
                            m('textarea.form-control',{style: {width: '30rem' ,height: '5.5rem'}, value:ctrl.get(ctrl.isTouch ? row.nameTouch : row.name), onchange:m.withAttr('value', ctrl.set(ctrl.isTouch ? row.nameTouch : row.name))})
                        ])
                    ]),
                    m('hr')
                ]);
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
        ]);
    }

    let elementComponent = {
        controller: controller$5,
        view: view$6,
    };

    function controller$5(object, settings,stimuliList, startStimulusList ,index ){
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
            selectedStartStimuli: m.prop('')
        };
        return {fields, set:set, get:get, addStimulus:addStimulus, 
            updateSelectedStimuli:updateSelectedStimuli,removeChosenStimuli:removeChosenStimuli, removeAllStimuli:removeAllStimuli, 
            updateTitleType:updateTitleType, removeChosenStartStimuli:removeChosenStartStimuli,
            resetStimuliList:resetStimuliList};
        
        function get(name,media,type, startStimulus){
            if (name === 'title' && media === 'startStimulus' && type === 'media') { //in case of getting startStimulus stimuli list
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
            if (name === 'title' && media == null && type == null) //special case - return the title's value (word/image)
            { 
                if (element.title.media.word === undefined) return element.title.media.image;
                return element.title.media.word;
            }
            if (media !=null && type!=null) 
            {
                if (type === 'font-size')
                    return parseFloat((element[name][media][type].replace('em','')));
                else if (startStimulus != null) 
                {
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
            return function(value)
            { 
                if (media !=null && type!=null) 
                {
                    if (type === 'font-size')
                    {
                        if (value === 0)
                        { 
                            alert('Font`s size must be bigger then 0');
                            return element[name][media][type]; 
                        }
                        return element[name][media][type] = value + 'em';
                    }
                    else if (startStimulus !=null) //in case of startStimulus
                        return element[name][media][type][startStimulus] = value;
                    return element[name][media][type] = value;
                }
                else if (media === 'color') return element[name][media] = value;
                else if (media === 'font-size')
                {
                    if (value === 0)
                    { 
                        alert('Font`s size must be bigger then 0');
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
                let category;
                object.word !== undefined ? category = object.word : category = object.image;
                if (type === 'word')
                {
                    element.title.media = {};
                    element.title.media = {word: category};
                }
                else 
                {
                    element.title.media = {};
                    element.title.media = {image: category};
                }
            };
        }
        function addStimulus(event, startStimulus = false)
        {
            let new_stimuli = !startStimulus ? fields.newStimulus() : fields.newStartStimulus();
            event = event.target.id; //get the button name, to know the kind of the stimulus added
            if(new_stimuli == null || new_stimuli === '') alert('Please fill the stimulus field');
            else {
                if (event === 'addWord') {
                    if (!startStimulus) element.stimulusMedia.push({word : new_stimuli});
                    else {
                        let mediaStr;
                        if (element.title.startStimulus.media.word === undefined) {
                            removeAllStimuli(event, true);
                            mediaStr = new_stimuli;
                        }
                        else if (element.title.startStimulus.media.word === '')
                            mediaStr = element.title.startStimulus.media.word + new_stimuli;
                        else mediaStr = element.title.startStimulus.media.word +', '+new_stimuli;
                        element.title.startStimulus.media = {word : mediaStr};}
                }
                else {
                    if (!startStimulus) element.stimulusMedia.push({image : new_stimuli});
                    else {
                        removeAllStimuli(event, true);
                        element.title.startStimulus.media = {image: new_stimuli};
                    }
                }
                if (!startStimulus) fields.newStimulus(''); //reset the field
                else fields.newStartStimulus('');
            }        
        }

        function updateSelectedStimuli(select, startStimulus = false){
            let list =[];
            if (startStimulus === false ) {
                list = element.stimulusMedia.filter((val,i) => select.target.options[i].selected);
                fields.selectedStimuli(list);
            }
            else {
                for (let i = 0; i < select.target.options.length; i++) {
                    if (select.target.options[i].selected) list.push(select.target.options[i].value);
                }
                fields.selectedStartStimuli(list);
            }
        }
        function removeChosenStimuli() {
            element.stimulusMedia = element.stimulusMedia.filter((element)=>!fields.selectedStimuli().includes(element));
            fields.selectedStimuli([]);
        }
        function removeChosenStartStimuli(e) {
            let selected = fields.selectedStartStimuli();
            let stimuli = element.title.startStimulus.media;
            if (stimuli.word === undefined) { //in case of a single image
                removeAllStimuli(e, true);
                fields.selectedStartStimuli([]);
                return; 
            }
            else stimuli = element.title.startStimulus.media.word.split(', ');
            let new_str = '';
            for (let i = 0 ; i < stimuli.length; i++) {
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
        function removeAllStimuli(e,startStimulus = false) {
            if (!startStimulus) element.stimulusMedia.length = 0;
            else {
                if (element.title.startStimulus.media.word !== undefined)
                    element.title.startStimulus.media.word = '';
                else element.title.startStimulus.media.image = '';
            }
        }
        function resetStimuliList(e,flag = false){
            flag ? element.title.startStimulus = clone(startStimulusList) : element.stimulusMedia = clone(stimuliList);
        }
    }

    function view$6(ctrl) {
        return m('.container', [
            m('.row', [
                m('.col-sm-4.space',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', ['Will appear in the data and in the default feedback message.']),
                    m('span', [' ',ctrl.fields.elementType()+' name as will appear in the data: '])
                ]),
                m('.col-sm-8', [
                    m('input[type=text].form-control',{style: {width: '18rem'}, value:ctrl.get('name'), onchange:m.withAttr('value', ctrl.set('name'))})
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
                    m('input[type=text].form-control',{style: {width: '18rem'}, value: ctrl.get('title'), onchange:m.withAttr('value', ctrl.set('title', 'media', ctrl.fields.titleType()))})
                ]),
                m('.col-sm-2', ctrl.fields.elementType()+'\'s type:',
                    [
                        m('select.custom-select',{value: ctrl.get('title','media','word') === undefined || ctrl.get('title','media','word') === '' ? 'image' : 'word', onchange:m.withAttr('value',ctrl.updateTitleType())},[
                            ctrl.fields.titleType(ctrl.get('title','media','word') === undefined || ctrl.get('title','media','word') === '' ? 'image' : 'word'),
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
                            m('button.btn btn btn-warning', {onclick:(e) => ctrl.resetStimuliList(e)}, 'Reset Stimuli List'),
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
                            m('button.btn btn btn-warning', {onclick:(e) => ctrl.resetStimuliList(e,true)}, 'Reset Stimuli List'),
                        ])
                    ])
                ])
            ])
        ]);
    }

    let prCategoriesComponent = {
        controller:controller$4,
        view:view$5
    };

    function controller$4(settings, defaultSettings, clearElement){

        return {reset:reset, clear:clear};
        function reset(){
            Object.assign(settings.practiceCategory1, JSON.parse(JSON.stringify(defaultSettings.practiceCategory1)));
            Object.assign(settings.practiceCategory2, JSON.parse(JSON.stringify(defaultSettings.practiceCategory2)));
        }
        function clear(){
            Object.assign(settings.practiceCategory1, clearElement[0]);
            Object.assign(settings.practiceCategory2, clearElement[0]);
        }
    }

    function view$5(ctrl, settings, defaultSettings) {
        return m('.container', [
            m('.row',[
                m('.col-8',{style:{'margin-bottom':'7px'}},[
                    m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                        m('button.btn btn btn-danger', {onclick: ctrl.reset},[
                            m('i.fa.fa-undo.fa-sm'), ' Reset'
                        ]),
                        m('button.btn btn btn-danger',{onclick: ctrl.clear},[
                            m('i.fa.fa-trash.fa-sm'), ' Clear'
                        ])
                    ])
                ]),
                m('.col-4', m('h2','First Practice Category')),
                m('hr')
            ]),
            m.component(elementComponent, {key: 'practiceCategory1'} ,settings,
                defaultSettings.practiceCategory1.stimulusMedia, defaultSettings.practiceCategory1.title.startStimulus),
            m('.row',[
                m('h2','Second Practice Category'),
                m('hr')
            ]),
            m.component(elementComponent, {key:'practiceCategory2'}, settings,
                defaultSettings.practiceCategory2.stimulusMedia, defaultSettings.practiceCategory2.title.startStimulus)
        ]);
    }

    let categoriesComponent = {
        controller:controller$3,
        view:view$4
    };

    function controller$3(settings, defaultSettings, clearElement){
        let categories = settings.categories;
        for (let i=0; i < categories.length; i++){
            categories[i].key = Math.random();
        }
        let headlines = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth'];
        let keys = Array.from(Array(8)).map(x=>Math.random());
        let addFlag =  m.prop('visible');
        let removeFlag = m.prop('hidden');
        let chooseFlag = m.prop('hidden');
        let firstFlag = m.prop('false'); //to know if the first&second original categories() were choosen to remove. For reset actions.
        let secondFlag = m.prop('false');
        let choosenCategoriesList = [];
        let chooseClicked = m.prop(false);

        return {addFlag:addFlag, removeFlag, chooseFlag ,firstFlag, secondFlag, categories: categories, headlines: headlines,
            reset:reset, clear:clear, addCategory:addCategory, choosenCategoriesList:choosenCategoriesList,
            updateChoosenBlocks:updateChoosenBlocks, removeCategories:removeCategories, keys, chooseCategories: chooseCategories};

        function reset(){
            Object.assign(settings.categories[0], clone(defaultSettings.categories[0]));
            Object.assign(settings.categories[1], clone(defaultSettings.categories[1]));
            if(categories.length > 2) categories.length = 2;
            addFlag('visible');
            firstFlag('false');
            secondFlag('false');
        }
        function clear(){
            settings.categories.forEach(element => Object.assign(element, clone(clearElement[0])));
        }
        function addCategory() {
            categories.push(clone(clearElement[0]));
            let last = categories.length - 1;
            categories[last].key = Math.random();
            if (categories.length === 8) addFlag('hidden');
        }
        function updateChoosenBlocks(e, index){
            //if clicked the checkbox to uncheck the item
            if (choosenCategoriesList.includes(index) && !e.target.checked){
                var i = choosenCategoriesList.indexOf(index);
                if (i !== -1) {
                    choosenCategoriesList.splice(i, 1);
                }
                return;
            }
            if (e.target.checked) choosenCategoriesList.push(index);
        }
        function chooseCategories(){
            chooseFlag('visible');
            if (!chooseClicked()) { //show the alert only for the first time the choose button has been clicked
                alert('To choose categories to remove, please tik the checkbox near the wanted category, and to remove them click the \'Remove Choosen Categories\' button below');
                chooseClicked(true);
            }
        }
        function removeCategories(){

            if (categories.length < 2) {
                alert('Minimum number of blocks needs to be 2');
                choosenCategoriesList.length = 0;
                return;
            }
            if ((categories.length - choosenCategoriesList.length) < 2){
                alert('Minimum number of blocks needs to be 2, please choose less categories to remove');
                choosenCategoriesList.length = 0;
                return;
            }
            choosenCategoriesList.sort();
            for (let i = choosenCategoriesList.length - 1; i >=0; i--) {
                if (choosenCategoriesList[i] === 0) firstFlag('true');
                if (choosenCategoriesList[i] === 1) secondFlag('true');

                categories.splice(choosenCategoriesList[i],1);
            }
            choosenCategoriesList.length = 0;
            chooseFlag('hidden');
            addFlag(categories.length < 8 ? 'visible' : 'hidden');
        }
    }

    function view$4(ctrl,settings, defaultSettings, clearElement) {
        return m('.container',{id:'categories'} ,[
            m('.row',[
                m('.col',{style:{'margin-bottom':'7px'}},[
                    m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                        m('button.btn btn btn-danger', {onclick: ctrl.reset},[
                            m('i.fa.fa-undo.fa-sm'), ' Reset'
                        ]),
                        m('button.btn btn btn-danger',{onclick: ctrl.clear},[
                            m('i.fa.fa-trash-alt.fa-sm'), ' Clear'
                        ])
                    ])
                ])
            ]),
            //filter to remove the first element
            ctrl.categories.map(function(category, index){
                let stimulusMedia;
                let startStimulus;
                let key = category.key;
                if ((index === 0 && ctrl.firstFlag() === 'false') || (index === 1 && ctrl.secondFlag() === 'false')){
                    stimulusMedia = defaultSettings.categories[index].stimulusMedia;
                    startStimulus = defaultSettings.categories[index].title.startStimulus;
                }
                else {
                    stimulusMedia = clearElement[0].stimulusMedia;
                    startStimulus = clearElement[0].title.startStimulus;
                }
                return m('div',{key: key},[
                    m('.row',[
                    m('input[type=checkbox]', {checked : ctrl.choosenCategoriesList.includes(index), style:{visibility: ctrl.chooseFlag()}, onclick: (e) => ctrl.updateChoosenBlocks(e, index)}),
                    m('.col',m('h1', ctrl.headlines[index] + ' Category')),
                    m('hr'),
                    m.component(elementComponent, {key:'categories'}, settings, stimulusMedia, startStimulus, index),
                    ]),
                    m('hr')
                ]);
            }),
            m('.activation.centrify',[
            m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons'}},[
                m('button.btn btn btn-info',{onclick: ctrl.addCategory, style:{'padding-right':'60px','padding-left':'60px' ,visibility: ctrl.addFlag()}}, [
                    m('i.fa.fa-plus')],' Add Category'),
                m('button.btn btn btn-warning',{onclick: ctrl.chooseCategories},[
                    m('i.fa.fa-check'), ' Choose Blocks to Remove']),
                m('button.btn.btn.btn-danger',{onclick: ctrl.removeCategories},[
                    m('i.fa.fa-minus-square'), ' Remove Choosen Blocks']),
            ])
            ]),
        ]);
    }

    let attributesComponent = {
        controller:controller$2,
        view:view$3
    };

    function controller$2(settings, defaultSettings, clearElement){
        return {reset:reset, clear:clear};
        function reset(){
            Object.assign(settings.attribute1, JSON.parse(JSON.stringify(defaultSettings.attribute1)));
            Object.assign(settings.attribute2,  JSON.parse(JSON.stringify(defaultSettings.attribute2)));}
        function clear(){
            Object.assign(settings.attribute1, clearElement[0]);
            Object.assign(settings.attribute2, clearElement[0]);
        }
    }

    function view$3(ctrl,settings, defaultSettings) {
        return m('.container', [
            m('.row',[
                m('.col-8',{style:{'margin-bottom':'7px'}},[
                    m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                        m('button.btn btn btn-danger', {onclick: ctrl.reset, title:'reset values'},[
                            m('i.fa.fa-undo.fa-sm'), ' Reset'
                        ]),
                        m('button.btn btn btn-danger',{onclick: ctrl.clear},[
                            m('i.fa.fa-trash.fa-sm'), ' Clear'
                        ])
                    ])
                ]),
                m('.col-4', m('h2','First Attribute')),
                m('hr')
            ]),
            m.component(elementComponent,{key: 'attribute1'} ,settings,
                defaultSettings.attribute1.stimulusMedia, defaultSettings.attribute1.title.startStimulus),
            m('.row',[
                m('h2','Second Attribute'),
                m('hr')
            ]),
            m.component(elementComponent,{key:'attribute2'}, settings,
                defaultSettings.attribute2.stimulusMedia, defaultSettings.attribute2.title.startStimulus)
        ]);
    }

    let outputComponent = {
        view:view$2
    };

    function view$2(ctrl,settings){
        return m('.container',[
            m('.row.space',[
                m('.col-md-6.offset-sm-4',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', ['Download the JavaScript file. For more details how to use it, see the “Help” page.']),
                    m('button.btn btn btn-primary', {style:{'margin-left':'6px','background-color': 'rgb(40, 28, 128)', 'font-size': '16px'},onclick: createFile(settings,'JS')},[
                        m('i.fa.fa-download'), ' Download Script']),
                ])
            ]),
            m('.row.space',[
                m('.col-md-6.offset-sm-4',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', ['Importing this file to this tool, will load all your parameters to this tool.']),
                    m('button.btn btn btn-primary', {style:{'margin-left':'6px'}, onclick: createFile(settings,'JSON')},[
                        m('i.fa.fa-download'), ' Download JSON']),
                ])
            ]),
            m('.row.space',[
                m('.col-md-6.offset-sm-4',
                    m('button.btn btn btn-primary', {style:{'margin-left': '30px'} ,onclick: printToPage(settings)},
                        'Print to Browser'))
            ]),
            m('div.space',{id: 'textDiv', style: {visibility: 'hidden', 'padding' :'1em 0 0 3.5em'}},
                m('textarea.form-control', {id:'textArea', value:'', style: {width : '57rem', height: '25rem'}}))
        ]);
    }

    function createFile(settings, type){
        return function(){
            let output,textFileAsBlob;
            let downloadLink = document.createElement('a');
            if (type === 'JS') {
                output = toString(settings);
                textFileAsBlob = new Blob([output], {type:'text/plain'});
                downloadLink.download = 'BIAT.js';
            }
            else {
                output = updateSettings$1(settings);
                textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
                downloadLink.download = 'BIAT.json';
            }
            if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
            else {
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        };
    }

    // function toConsole(settings){
    //     return function(){
    //         window.settings = settings;
    //         console.log(settings);};
    // }

    function printToPage(settings){
        return function() {
            let para = document.getElementById('textDiv');
            para.style.visibility = 'visible';
            let text_area = document.getElementById('textArea');
            text_area.value = toString(settings);
        };
    }

    function toString(settings){
        return toScript(updateSettings$1(settings));
    }

    function removeIndexFromCategories(settings){ //remove the index created in the addCategory function for each new category
        let categories = settings.categories;
        categories.forEach(element => delete element.key);
    }

    function updateSettings$1(settings){
        removeIndexFromCategories(settings);
        let output = {};
        if (settings.parameters.practiceBlock) {
            output.practiceCategory1 = settings.practiceCategory1;
            output.practiceCategory2 = settings.practiceCategory2;
        }
        output.categories = settings.categories;
        output.attribute1 = settings.attribute1;
        output.attribute2 = settings.attribute2;
        output.base_url = settings.parameters.base_url;
        output.remindError =  settings.parameters.remindError;
        output.showStimuliWithInst = settings.parameters.showStimuliWithInst;
        output.isTouch = settings.parameters.isTouch;
        output.practiceBlock = settings.parameters.practiceBlock;
        if(settings.parameters.isQualtrics) output.isQualtrics = settings.parameters.isQualtrics; 
        Object.assign(output, settings.blocks);
        settings.parameters.isTouch ? Object.assign(output, settings.touch_text) : Object.assign(output, settings.text); 
        return output;
    }

    function toScript(output){
        return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/qualtrics/qbiat6.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/biat6.js'}'], function(APIConstructor, iatExtension) {var API = new APIConstructor(); return iatExtension(${JSON.stringify(output,null,4)});});`;
    }

    let importComponent = {
        controller:controller$1,
        view:view$1
    };

    function view$1(ctrl){
        return m('.activation.centrify',[
            m('.card-block',[
                m('.card.border-info.mb-3',{style:{'max-width': '25rem'}}, [
                    m('.card-header','Upload a JSON file: ' ),
                    m('.card-body.text-info',[
                        m('p',{style:{margin:'0.5em 1em 0.5em 1em'}},'If you saved a JSON file from a previous session, you can upload that file here to edit the parameters.'),
                        m('input[type=file].form-control',{id:'uploadFile', style: {'text-align': 'center'}, onchange: ctrl.handleFile})
                    ])
                ])
            ]),
        ]);
    }

    function controller$1(settings) {
        return {handleFile: handleFile, updateSettings: updateSettings};

        function handleFile() {
            let importedFile = document.getElementById('uploadFile').files[0];
            let reader = new FileReader();
            reader.readAsText(importedFile);
            reader.onload = function () {
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
                settings.touch_text.remindErrorText = input.remindErrorText;
                settings.touch_text.leftKeyText = input.leftKeyText;
                settings.touch_text.rightKeyText = input.rightKeyText;
                settings.touch_text.orKeyText = input.orKeyText;
                settings.touch_text.finalText = input.finalText;
                settings.touch_text.instTemplate = input.instTemplate;
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

    let links = {IAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/', BIAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-biat/'};

    let helpComponent = {view: function(ctrl, settings, defaultSettings, type){return m('.activation.centrify', [m('.alert.alert-info',{role:'alert'}, m('p',{style:{margin:'0.5em 1em 0.5em 1em'}}, 'This tool creates a script for running an '+type+' in your online study. The script uses Project Implicit’s '+type+ ' extension, which runs on MinnoJS, a JavaScript player for online studies. ', m('a',{href: 'http://projectimplicit.net/'}, 'Project Implicit '), 'has developed MinnoJS to program web studies. To create '+type+'s, we programmed a general script (the “extension”) that runs an '+type+
    					' based on parameters provided by another, more simple script. In this page, you can create a script that uses our '+type+' extension. You can read more about the basic idea of using extensions in Minno ', m('a',{href: 'https://github.com/baranan/minno-tasks/blob/master/implicitmeasures.md'}, 'on this page. '), 'We run those scripts in ', m('a',{href: 'https://minnojs.github.io/docsite/minnosuitedashboard/'}, 'Open Minno Suite, '), 'our platform for running web studies. You can install that platform on your own server, use a more simple ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/csv-server/'}, 'php server for Minno, '), 'or run ', m('a',{href: links[type]}, 'this script directly from Qualtrics.')))]);}
    };

    let parametersDesc = [
        {name: 'isTouch', options:['Keyboard', 'Touch'], label:'Keyboard input or touch input?', desc:'Minno does not auto-detect the input method. If you need a touch version and a keyboard version, create two different scripts with this tool.'},
        {name: 'isQualtrics',options:['Regular','Qualtrics'], label:'Regular script or Qualtrics?', desc: ['If you want this BIAT to run from Qualtrics, read ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/qualtrics-biat/'}, 'this blog post '),'to see how.']},
        {name: 'practiceBlock', label: 'Practice Block', desc: 'Should the task start with a practice block?'},
        {name: 'remindError', label: 'Error feedback on incorrect responses', desc: 'It is recommended to show participants an error feedback on error responses'},
        {name: 'showStimuliWithInst', label: 'Show Stimuli with Instructions', desc: 'Whether to show the stimuli of the IN categories at the beginning of the block.'},
        {istouch:false, isQualtrics:false, practiceBlock:false, showStimuliWithInst:false, remindError:false, base_url:''}
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
        {name: 'instTemplate', label:'Instructions', desc: 'Instructions'},
        {name: 'remindErrorText', label:'Screen\'s Bottom (error reminder)', desc:'We use this text to remind participants what happens on error. Replace this text if you do not require participants to correct their error responses (see General Parameters page).'},
        {name: 'leftKeyText', label:'Top-left text (about the left key)', desc: 'We use this text to remind participants what key to use for a left response.'},
        {name: 'rightKeyText', label:'Top-right text (about the right key)', desc: 'We use this text to remind participants what key to use for a right response.'},
        {name: 'orKeyText', label:'Or', desc: 'We show this text in the combined blocks to separate between the two categories that use the same key.'},
        {name: 'finalText', label:'Text shown at the end', desc: 'Text shown at the end'},
        {remindErrorText:'', leftKeyText:'', rightKeyText:'', orKeyText:'', 
            instTemplate:'', finalText:''}
    ];

    let elementClear = [{
        name : '',
        title : {
            media : {image : ''},
            css : {color:'#000000','font-size':'0em'},
            height : 4, 
            startStimulus : { 
                media : {image : ''}, 
                css : {color:'#000000','font-size':'0em'}, 
                height : 2
            }
        },
        stimulusMedia : [], 
        stimulusCss : {color:'#000000','font-size':'0em'} }];

    let tabs = [
        {value: 'parameters', text: 'General parameters', component: parametersComponent, rowsDesc: parametersDesc },
        {value: 'blocks', text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
        {value: 'practice', text: 'Practice Block', component: prCategoriesComponent, rowsDesc: elementClear},
        {value: 'categories', text: 'Categories', component: categoriesComponent, rowsDesc: elementClear},
        {value: 'attributes', text: 'Attributes', component: attributesComponent, rowsDesc: elementClear},
        {value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
        {value: 'output', text: 'Complete', component: outputComponent},
        {value: 'import', text: 'Import', component: importComponent},
        {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'BIAT'}
    ];

    //remove practice related elements
    if (!settings.parameters.practiceBlock) {
        blocksDesc.splice(2,1); 
        tabs.splice(2,1);
    }

    function url(study_type, study_id, file_id)
    {
        return `${modelUrls.studyUrl}/${encodeURIComponent(study_id)}/${study_type}_generator/${encodeURIComponent(file_id)}`;
    }

    let save = (study_type, study_id, file_id, settings) => modelHelpers.fetchJson(url(study_type, study_id, file_id), {
        method: 'put',
        body: {settings}
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

    function controller(args, external = null){
        let ctrl = {
            study : args.study ? args.study : null,
            file : args.file ? args.file : null,
            err : m.prop([]),
            loaded : m.prop(false),
            notifications : createNotifications(),
            settings : clone(settings),
            external: external,

            do_save,
            is_settings_changed
        };

        function load(ctrl) {
            return ctrl.file.get()
                .catch(ctrl.err)
                .then(() => {
                    if (ctrl.file.content() !== '') {
                        let input = JSON.parse(ctrl.file.content());
                        ctrl.settings = updateSettings(ctrl.settings, input);
                        ctrl.prev_settings = clone(ctrl.settings);
                    }
                    ctrl.loaded(true);
                })
                .then(m.redraw);
        }

        function do_save(){
            ctrl.err([]);
            ctrl.settings.output = toString(ctrl.settings); // the server takes the data from here
            save('biat', m.route.param('studyId'), m.route.param('fileId'), ctrl.settings)
                .then(ctrl.study.get())
                .then(()=>ctrl.notifications.show_success(`BIAT Script successfully saved`))
                .then(m.redraw)
                .catch(err => ctrl.notifications.show_danger('Error Saving:' + err.message));
            delete ctrl.settings.output; //for updating the prev_settings without the output
            ctrl.prev_settings = clone(ctrl.settings);
        }

        function is_settings_changed(){
            return JSON.stringify(ctrl.prev_settings) !== JSON.stringify(ctrl.settings);
        }

        external ? null : load(ctrl);
        return ctrl;
    }
    function view(ctrl, args){
        if(!ctrl.external) {
            return !ctrl.loaded()
                ?
                m('.loader')
                :
                m('.container.space',
                    m('div', ctrl.notifications.view()),
                    m('h1', 'Create my BIAT script', [
                        ctrl.err().length === 0 ? '' : m('.row.space.alert.alert-danger', ctrl.err()),
                        m('button.btn btn btn-primary', {
                            onclick: () => ctrl.do_save(),
                            disabled: !ctrl.is_settings_changed(),
                            style: {float: 'right', 'margin-top': '7px', 'margin-right': '15px'}
                        }, 'Save'),
                    ]),
                    m.component(tabsComponent, tabs, ctrl.settings, settings, ctrl.external)
                );
        }
        return m('.container',
            m('div', ctrl.notifications.view()),
            m('h1', 'Create my BIAT script'),
            m.component(tabsComponent, tabs, ctrl.settings, settings, ctrl.external)
        );

    }

    //m.mount(document.documentElement, Main);
    m.mount(document.getElementById('dashboard'), biat);

}(modelHelpers, modelUrls));
//# sourceMappingURL=biat_index.js.map
