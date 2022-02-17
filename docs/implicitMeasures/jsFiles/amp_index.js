/**
    * @preserve minnojs-amp-dashboard v1.0.0
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
                exampleBlock: true,
                fixationDuration: 0,
                showRatingDuration: 300,
                responses: 2,
                sortingLabel1: 'Pleasant', //Response is coded as 0.
                sortingLabel2: 'Unpleasant',  //Response is coded as 1.
                randomizeLabelSides: false, //If false, then label1 is on the left, and label2 is on the right.
                rightkey: 'i',
                leftkey: 'e',
                fixationStimulus: { //The fixation stimulus
                    css: {color: '#000000', 'font-size': '3em'},
                    media: {word: '+'}
                },
                maskStimulus: { //The mask stimulus
                    css: {color: '000000', 'font-size': '3em'},
                    media: {image: 'ampmask.jpg'}
                },
                base_url: {image: external ? 'https://baranan.github.io/minno-tasks/images/ampImages' : './images'}
            },
            exampleBlock: {
                exampleTargetStimulus:
                    {
                        nameForLogging: 'exampleTarget', //Will be used in the logging
                        sameAsTargets: true //Use the same media array as the first targetCat.
                    },
                exampleFixationStimulus: { //The fixation stimulus in the example block
                    css: {color: '000000', 'font-size': '3em'},
                    media: {word: '+'}
                },
                exampleMaskStimulus: { //The mask stimulus in the example block
                    css: {color: '000000', 'font-size': '3em'},
                    media: {image: 'ampmaskr.jpg'}
                },
                examplePrimeStimulus: {
                    nameForLogging: 'examplePrime', //Will be used in the logging
                    //An array of all media objects for this category.
                    mediaArray: [{word: 'Table'}, {word: 'Chair'}]
                },
                exampleBlock_fixationDuration: -1,
                exampleBlock_primeDuration: 100,
                exampleBlock_postPrimeDuration: 100,
                exampleBlock_targetDuration: 300
            },
            primeStimulusCSS: { //The CSS for all the prime stimuli.
                primeDuration: 100,
                postPrimeDuration: 100,
                color: '#0000FF',
                'font-size': '2.3em'
            },
            //primeCats: [
            prime1: {
                nameForFeedback: 'positive words',  //Will be used in the user feedback
                name: 'positive', //Will be used in the logging
                //An array of all media objects for this category.
                mediaArray: [{word: 'Wonderful'}, {word: 'Great'}]
            },
            prime2:{
                nameForFeedback: 'negative words',  //Will be used in the user feedback
                name: 'negative', //Will be used in the logging
                mediaArray: [{word: 'Awful'}, {word: 'Horrible'}]
            },
            //],
            targetStimulusCSS: { //The CSS for all the target stimuli (usually irrelevant because the targets are Chinese pictographs).
                targetDuration: 100,
                color: '#0000FF',
                'font-size': '2.3em'},
            //targetCats: [
            targetCategory:{
                nameForFeedback : 'Chinese symbol',  //The name of the targets (used in the instructions)
                name: 'chinese',  //Will be used in the logging
                //An array of all media objects for this category. The default is pic1-pic200.jpg
                mediaArray: [
                    {image: 'pic1.jpg'}, {image: 'pic2.jpg'}, {image: 'pic3.jpg'}, {image: 'pic4.jpg'}, {image: 'pic5.jpg'}, {image: 'pic6.jpg'}, {image: 'pic7.jpg'}, {image: 'pic8.jpg'}, {image: 'pic9.jpg'},
                    {image: 'pic10.jpg'}, {image: 'pic11.jpg'}, {image: 'pic12.jpg'}, {image: 'pic13.jpg'}, {image: 'pic14.jpg'}, {image: 'pic15.jpg'}, {image: 'pic16.jpg'}, {image: 'pic17.jpg'}, {image: 'pic18.jpg'}, {image: 'pic19.jpg'},
                    {image: 'pic20.jpg'}, {image: 'pic21.jpg'}, {image: 'pic22.jpg'}, {image: 'pic23.jpg'}, {image: 'pic24.jpg'}, {image: 'pic25.jpg'}, {image: 'pic26.jpg'}, {image: 'pic27.jpg'}, {image: 'pic28.jpg'}, {image: 'pic29.jpg'},
                    {image: 'pic30.jpg'}, {image: 'pic31.jpg'}, {image: 'pic32.jpg'}, {image: 'pic33.jpg'}, {image: 'pic34.jpg'}, {image: 'pic35.jpg'}, {image: 'pic36.jpg'}, {image: 'pic37.jpg'}, {image: 'pic38.jpg'}, {image: 'pic39.jpg'},
                    {image: 'pic40.jpg'}, {image: 'pic41.jpg'}, {image: 'pic42.jpg'}, {image: 'pic43.jpg'}, {image: 'pic44.jpg'}, {image: 'pic45.jpg'}, {image: 'pic46.jpg'}, {image: 'pic47.jpg'}, {image: 'pic48.jpg'}, {image: 'pic49.jpg'},
                    {image: 'pic50.jpg'}, {image: 'pic51.jpg'}, {image: 'pic52.jpg'}, {image: 'pic53.jpg'}, {image: 'pic54.jpg'}, {image: 'pic55.jpg'}, {image: 'pic56.jpg'}, {image: 'pic57.jpg'}, {image: 'pic58.jpg'}, {image: 'pic59.jpg'},
                    {image: 'pic60.jpg'}, {image: 'pic61.jpg'}, {image: 'pic62.jpg'}, {image: 'pic63.jpg'}, {image: 'pic64.jpg'}, {image: 'pic65.jpg'}, {image: 'pic66.jpg'}, {image: 'pic67.jpg'}, {image: 'pic68.jpg'}, {image: 'pic69.jpg'},
                    {image: 'pic70.jpg'}, {image: 'pic71.jpg'}, {image: 'pic72.jpg'}, {image: 'pic73.jpg'}, {image: 'pic74.jpg'}, {image: 'pic75.jpg'}, {image: 'pic76.jpg'}, {image: 'pic77.jpg'}, {image: 'pic78.jpg'}, {image: 'pic79.jpg'},
                    {image: 'pic80.jpg'}, {image: 'pic81.jpg'}, {image: 'pic82.jpg'}, {image: 'pic83.jpg'}, {image: 'pic84.jpg'}, {image: 'pic85.jpg'}, {image: 'pic86.jpg'}, {image: 'pic87.jpg'}, {image: 'pic88.jpg'}, {image: 'pic89.jpg'},
                    {image: 'pic90.jpg'}, {image: 'pic91.jpg'}, {image: 'pic92.jpg'}, {image: 'pic93.jpg'}, {image: 'pic94.jpg'}, {image: 'pic95.jpg'}, {image: 'pic96.jpg'}, {image: 'pic97.jpg'}, {image: 'pic98.jpg'}, {image: 'pic99.jpg'},
                    {image: 'pic110.jpg'}, {image: 'pic111.jpg'}, {image: 'pic112.jpg'}, {image: 'pic113.jpg'}, {image: 'pic114.jpg'}, {image: 'pic115.jpg'}, {image: 'pic116.jpg'}, {image: 'pic117.jpg'}, {image: 'pic118.jpg'}, {image: 'pic119.jpg'},
                    {image: 'pic120.jpg'}, {image: 'pic121.jpg'}, {image: 'pic122.jpg'}, {image: 'pic123.jpg'}, {image: 'pic124.jpg'}, {image: 'pic125.jpg'}, {image: 'pic126.jpg'}, {image: 'pic127.jpg'}, {image: 'pic128.jpg'}, {image: 'pic129.jpg'},
                    {image: 'pic130.jpg'}, {image: 'pic131.jpg'}, {image: 'pic132.jpg'}, {image: 'pic133.jpg'}, {image: 'pic134.jpg'}, {image: 'pic135.jpg'}, {image: 'pic136.jpg'}, {image: 'pic137.jpg'}, {image: 'pic138.jpg'}, {image: 'pic139.jpg'},
                    {image: 'pic140.jpg'}, {image: 'pic141.jpg'}, {image: 'pic142.jpg'}, {image: 'pic143.jpg'}, {image: 'pic144.jpg'}, {image: 'pic145.jpg'}, {image: 'pic146.jpg'}, {image: 'pic147.jpg'}, {image: 'pic148.jpg'}, {image: 'pic149.jpg'},
                    {image: 'pic150.jpg'}, {image: 'pic151.jpg'}, {image: 'pic152.jpg'}, {image: 'pic153.jpg'}, {image: 'pic154.jpg'}, {image: 'pic155.jpg'}, {image: 'pic156.jpg'}, {image: 'pic157.jpg'}, {image: 'pic158.jpg'}, {image: 'pic159.jpg'},
                    {image: 'pic160.jpg'}, {image: 'pic161.jpg'}, {image: 'pic162.jpg'}, {image: 'pic163.jpg'}, {image: 'pic164.jpg'}, {image: 'pic165.jpg'}, {image: 'pic166.jpg'}, {image: 'pic167.jpg'}, {image: 'pic168.jpg'}, {image: 'pic169.jpg'},
                    {image: 'pic170.jpg'}, {image: 'pic171.jpg'}, {image: 'pic172.jpg'}, {image: 'pic173.jpg'}, {image: 'pic174.jpg'}, {image: 'pic175.jpg'}, {image: 'pic176.jpg'}, {image: 'pic177.jpg'}, {image: 'pic178.jpg'}, {image: 'pic179.jpg'},
                    {image: 'pic180.jpg'}, {image: 'pic181.jpg'}, {image: 'pic182.jpg'}, {image: 'pic183.jpg'}, {image: 'pic184.jpg'}, {image: 'pic185.jpg'}, {image: 'pic186.jpg'}, {image: 'pic187.jpg'}, {image: 'pic188.jpg'}, {image: 'pic189.jpg'},
                    {image: 'pic190.jpg'}, {image: 'pic191.jpg'}, {image: 'pic192.jpg'}, {image: 'pic193.jpg'}, {image: 'pic194.jpg'}, {image: 'pic195.jpg'}, {image: 'pic196.jpg'}, {image: 'pic197.jpg'}, {image: 'pic198.jpg'}, {image: 'pic199.jpg'},
                    {image: 'pic200.jpg'}
                ]
            },
            //],
            blocks: {
                trialsInExample: 3,trialsInBlock: [40, 40, 40]
            },
            text: { //Instructions text for the 2-responses version.
                exampleBlockInst: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' +
                    'Press the key <B>rightKey</B> if the targetCat is more rightAttribute than average. ' +
                    'Hit the <b>leftKey</b> key if it is more leftAttribute than average.<br/><br/>' +
                    'The items appear and disappear quickly.  ' +
                    'Remember to ignore the item that appears before the targetCat and evaluate only the targetCat.<br/><br/></p>' +
                    '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' +
                    'When you are ready to try a few practice responses, hit the <b>space bar</b>.</p>' +
                    '<p style="font-size:12px; text-align:center; font-family:arial">' +
                    '<color="000000">[Round 1 of nBlocks]</p></div>',
                firstBlockInst: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' +
                    "See how fast it is? Don't worry if you miss some. " +
                    'Go with your gut feelings.<br/><br/>' +
                    'Concentrate on each targetCat and rate it as more rightAttribute than the average targetCat with the <b>rightKey</b> key, ' +
                    'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' +
                    'Evaluate each targetCat and not the item that appears before it. ' +
                    'Those items are sometimes distracting.<br/><br/>' +
                    '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' +
                    'Ready? Hit the <b>space bar</b>.</p>' +
                    '<p style="font-size:12px; text-align:center; font-family:arial">' +
                    '<color="000000">[Round 2 of nBlocks]</p></div>',
                middleBlockInst: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' +
                    'Continue to another round of this task. ' +
                    'The rules are exactly the same:<br/><br/>' +
                    'Concentrate on the targetCat and rate it as more rightAttribute than average with the <b>rightKey</b> key, ' +
                    'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' +
                    'Evaluate each targetCat and not the item that appears before it. ' +
                    'Those items are sometimes distracting. Go with your gut feelings.<br/><br/>' +
                    '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' +
                    'Ready? Hit the <b>space bar</b>.</p>' +
                    '<p style="font-size:12px; text-align:center; font-family:arial">' +
                    '<color="000000">[Round blockNum of nBlocks]</p></div>',
                lastBlockInst: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' +
                    'Ready for the FINAL round? ' +
                    'The rules are exactly the same:<br/><br/>' +
                    'Concentrate on the targetCat and rate it as more rightAttribute than average with the <b>rightKey</b> key, ' +
                    'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' +
                    'Evaluate each targetCat and not the item that appears before it. ' +
                    'Those items are sometimes distracting. Go with your gut feelings.<br/><br/>' +
                    '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' +
                    'Ready? Hit the <b>space bar</b>.</p>' +
                    '<p style="font-size:12px; text-align:center; font-family:arial">' +
                    '<color="000000">[Round blockNum of nBlocks]</p></div>',
                endText: '<div><p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial"><color="FFFFFF">' +
                    'You have completed the task<br/><br/>Press "space" to continue to next task.</p></div>',
            },
            text_seven: { //Instructions text for the 7-responses version.
                exampleBlockInst7: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' +
                    'Rate your feelings toward the targetCats from <i>Extremely negativeAdj</i> to <i>Extremely positiveAdj</i>. ' +
                    'The items appear and disappear quickly.  ' +
                    'Remember to ignore the item that appears before the targetCat and evaluate only the targetCat.<br/><br/></p>' +
                    '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' +
                    'When you are ready to try a few practice responses, hit the <b>space bar</b>.</p>' +
                    '<p style="font-size:12px; text-align:center; font-family:arial">' +
                    '<color="000000">[Round 1 of nBlocks]</p></div>',
                firstBlockInst7: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' +
                    "See how fast it is? Don't worry if you miss some. " +
                    'Go with your gut feelings.<br/><br/>' +
                    'Concentrate on each targetCat and rate it based on your own feelings. ' +
                    'Evaluate each targetCat and not the item that appears before it. ' +
                    'Those items are sometimes distracting.<br/><br/>' +
                    'Notice: you can respond with your mouse or the keys 1-7.<br/><br/>' +
                    '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' +
                    'Ready? Hit the <b>space bar</b>.</p>' +
                    '<p style="font-size:12px; text-align:center; font-family:arial">' +
                    '<color="000000">[Round 2 of nBlocks]</p></div>',
                middleBlockInst7: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' +
                    'Continue to another round of this task. ' +
                    'The rules are exactly the same:<br/><br/>' +
                    'Concentrate on each targetCat and rate it based on your own feelings. ' +
                    'Evaluate each targetCat and not the item that appears before it. ' +
                    'Those items are sometimes distracting.<br/><br/>' +
                    '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' +
                    'Ready? Hit the <b>space bar</b>.</p>' +
                    '<p style="font-size:12px; text-align:center; font-family:arial">' +
                    '<color="000000">[Round blockNum of nBlocks]</p></div>',
                lastBlockInst7: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' +
                    'Ready for the FINAL round? ' +
                    'The rules are exactly the same:<br/><br/>' +
                    'Concentrate on each targetCat and rate it based on your own feelings. ' +
                    'Evaluate each targetCat and not the item that appears before it. ' +
                    'Those items are sometimes distracting.<br/><br/>' +
                    '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' +
                    'Ready? Hit the <b>space bar</b>.</p>' +
                    '<p style="font-size:12px; text-align:center; font-family:arial">' +
                    '<color="000000">[Round blockNum of nBlocks]</p></div>',
                endText: '<div><p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial"><color="FFFFFF">' +
                    'You have completed the task<br/><br/>Press "space" to continue to next task.</p></div>',
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

    function checkPrime(element, name_to_display, error_msg){
        let containsImage = false;
        //check for missing titles and names
        if(element.name !== undefined) {
            if (element.name.length === 0)
                error_msg.push(name_to_display + ' name for logging is missing');
        }
        //In AMP, prime and target has additional fields
        if(element.nameForFeedback !== undefined){
            if(element.nameForFeedback.length === 0)
                error_msg.push(name_to_display+' name for feedback is missing');
        }
        if(element.nameForLogging !== undefined){
            if(element.nameForLogging.length === 0)
                error_msg.push(name_to_display+' name for logging is missing');
        }

        let mediaArray = element.mediaArray;

        //if there an empty stimuli list
        if (mediaArray.length === 0)
            error_msg.push(name_to_display+' stimuli list is empty, please enter at least one stimulus.');

        //check if the stimuli contains images
        for(let i = 0; i < mediaArray.length ;i++)
            if(mediaArray[i].image) containsImage = true;

        return containsImage;
    }
    function checkStimulus(element, name_to_display, type, error_msg) {
        if(element.media[type].length === 0){
            error_msg.push(name_to_display+' is missing.');
        }
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

    let iatOutputComponent = {
        controller: controller$a,
        view: view$a
    };

    function controller$a(settings, defaultSettings, blocksObject){
        let error_msg = [];
        error_msg = validityCheck(error_msg, settings);

        return {error_msg, createFile, settings};

        function createFile(settings, fileType){
            return function(){
                let output,textFileAsBlob;
                let downloadLink = document.createElement('a');
                if (fileType === 'JS') {
                    output = toString(settings);
                    textFileAsBlob = new Blob([output], {type:'text/plain'});
                    downloadLink.download = 'IAT.js'; }
                else {
                    output = updateSettings$1(settings);
                    textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
                    downloadLink.download = 'AMP.json'; }
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

    function validityCheck(error_msg, settings){
        //Parameters Tab
        let textParameters= {
            sortingLabel1: 'First Sorting Label',
            sortingLabel2: 'Second Sorting Label',
            rightkey: 'Right key',
            leftkey: 'Left key'
        };
        Object.entries(textParameters).forEach(([key, value]) => {
            if(!settings.parameters[key].length)
                error_msg.push(value+' is missing');
        });
        checkStimulus(settings.parameters.fixationStimulus, 'Fixation stimulus', 'word' ,error_msg);
        checkStimulus(settings.parameters.maskStimulus, 'Mask stimulus', 'image' ,error_msg);
        //Prime, Target & Example Categories
        let temp1 = checkPrime(settings.prime1, 'First Prime Category\'s', error_msg);
        let temp2 = checkPrime(settings.prime2, 'Second Prime Category\'s', error_msg);
        let temp3 = checkPrime(settings.targetCategory, 'Target Category\'s', error_msg);
        let temp4 = false;
        if(settings.parameters.exampleBlock)
            temp4 = checkPrime(settings.exampleBlock.examplePrimeStimulus, 'Example Prime stimulus\'' ,error_msg);

        //Blocks tab
        if(!settings.blocks.trialsInBlock.reduce((a, b) => a + b, 0))
            error_msg.push('All the block\'s trials equals to 0, that will result in not showing the task at all');
        if(settings.parameters.exampleBlock && !settings.blocks.trialsInExample)
            error_msg.push('The example block in the Parameters tab is checked but the the ' +
                'number of trials in example block (in the Blocks tab) is set to 0. ' +
                'Please beware and change the parameters accordingly.');

        //Example Block Check
        if(settings.parameters.exampleBlock){
            if(settings.exampleBlock.exampleTargetStimulus.nameForLogging.length === 0)
                error_msg.push('Example Target stimulus\' name for logging is missing');
            checkStimulus(settings.exampleBlock.exampleFixationStimulus, 'Example Fixation stimulus', 'word' ,error_msg);
            checkStimulus(settings.exampleBlock.exampleMaskStimulus, 'Example Mask stimulus', 'image' ,error_msg);
        }

        //If  one of the categories is using an image and the user didn't set a base_url
        let containsImage = temp1 || temp2 || temp3 || temp4;
        if(settings.parameters.base_url.image.length === 0 && containsImage)
            error_msg.push('Image\'s url is missing and there is an image in the study');

        return error_msg;
    }

    function toString(settings, external){
        return toScript(updateSettings$1(settings), external);
    }

    function updateMediaSettings$1(settings) {
        //update PrimeCats and TargetCats names to be compatible to AMP
        let settings_output = clone(settings);

        settings_output.primeDuration = settings_output.primeStimulusCSS.primeDuration;
        delete settings_output.primeStimulusCSS.primeDuration;
        settings_output.postPrimeDuration = settings_output.primeStimulusCSS.postPrimeDuration;
        delete settings_output.primeStimulusCSS.postPrimeDuration;
        delete settings_output.primeStimulusCSS.targetDuration;
        settings_output.targetDuration = settings_output.targetStimulusCSS.targetDuration;
        delete settings_output.targetStimulusCSS.targetDuration;
        delete settings_output.targetStimulusCSS.postPrimeDuration;
        delete settings_output.targetStimulusCSS.primeDuration;

        settings_output.primeCats = [{ //To order the attributes
            nameForFeedback: settings_output.prime1.nameForFeedback,
            nameForLogging: settings_output.prime1.name,
            mediaArray: settings_output.prime1.mediaArray}, {
            nameForFeedback: settings_output.prime2.nameForFeedback,
            nameForLogging: settings_output.prime2.name,
            mediaArray: settings_output.prime2.mediaArray}];

        delete settings_output.prime1;
        delete settings_output.prime2;

        settings_output.targetCats=[{
            nameForLogging: settings_output.targetCategory.name,
            mediaArray: settings_output.targetCategory.mediaArray}];
        settings_output.targetCat = settings.targetCategory.nameForFeedback;
        delete settings_output.targetCategory;

        settings_output.parameters.leftKey = settings.parameters.leftkey;
        settings_output.parameters.rightKey = settings.parameters.rightkey;
        delete settings_output.parameters.leftkey;
        delete settings_output.parameters.rightkey;

        return settings_output;
    }

    function updateSettings$1(settings){
        settings = updateMediaSettings$1(settings);

        let output={
            primeStimulusCSS: settings.primeStimulusCSS,
            primeDuration: settings.primeDuration,
            postPrimeDuration: settings.postPrimeDuration,
            primeCats: settings.primeCats,
            targetStimulusCSS: settings.targetStimulusCSS,
            targetDuration: settings.targetDuration,
            targetCat: settings.targetCat,
            targetCats: settings.targetCats
        };
        Object.assign(output, settings.blocks);
        if(settings.parameters.exampleBlock){
            Object.assign(output, settings.exampleBlock);
        }
        //delete settings.parameters.exampleBlock; //Remove an internal use flag
        if(settings.parameters.isQualtrics)
            output.isQualtrics = settings.parameters.isQualtrics;
        delete settings.parameters.isQualtrics;

        Object.assign(output, settings.parameters);
        settings.parameters.responses === 2 ?
            Object.assign(output, settings.text)
            : Object.assign(output, settings.text_seven);
        return output;
    }

    function toScript(output, external){
        let textForInternal = '//Note: This script was created by the IAT wizard.\n//Modification of this file won\'t be reflected in the wizard.\n';
        let script = `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/amp/qualtrics/qamp.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/amp/amp4.js'}'], function(APIConstructor, iatExtension){\n\tvar API = new APIConstructor(); return iatExtension(${JSON.stringify(output,null,4)});});`;
        external === false ? script = textForInternal + script : '';
        return script;
    }

    function view$a(ctrl,settings){
        return viewOutput(ctrl, settings, toString);
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

    function view$9(ctrl){
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

    let exampleComponent = {
        controller:controller$8,
        view:view$8
    };

    function controller$8(settings, defaultSettings, exampleParameters){
        let exampleBlock = settings.exampleBlock;
        let element = settings.exampleBlock.examplePrimeStimulus;
        let stimuliList = defaultSettings.exampleBlock.examplePrimeStimulus.mediaArray;
        let fields = {
            newStimulus : m.prop(''),
            selectedStimuli: m.prop(''),
        };
        return {fields, reset, clear, set, get, exampleParameters,
            addStimulus, updateSelectedStimuli, removeChosenStimuli, removeAllStimuli, resetStimuliList};

        function reset(){showClearOrReset(exampleBlock, defaultSettings.exampleBlock, 'reset');}
        function clear(){showClearOrReset(exampleBlock, exampleParameters.slice(-1)[0],'clear');}

        function get(name, object, parameter){
            if(object && parameter){
                if (parameter === 'font-size')
                    return parseFloat((exampleBlock[name][object][parameter].replace('em','')));
                return exampleBlock[name][object][parameter];
            }
            if(name && object) return exampleBlock[name][object];
            return exampleBlock[name];
        }
        function set(name, object, parameter){
            return function(value){
                if(name.includes('Duration')) return exampleBlock[name] = Math.abs(value);
                if(object && parameter) {
                    if (parameter === 'font-size'){
                        value = Math.abs(value);
                        if (value === 0){
                            showRestrictions('Font\'s size must be bigger than 0.', 'error');
                            return exampleBlock[name][object][parameter];
                        }
                        return exampleBlock[name][object][parameter] = value + 'em';
                    }
                    return exampleBlock[name][object][parameter] = value;
                }
                if(name && object) return exampleBlock[name][object] = value;
                return exampleBlock[name] = value;
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

    function view$8(ctrl){
        return m('.space' , [
            ctrl.exampleParameters.slice(0,-1).map(function(row){
                return m('.row.line', [
                    m('.col-md-4',
                        row.desc ?
                            [
                                m('span', [' ', row.label, ' ']),
                                m('i.fa.fa-info-circle.text-muted',{title:row.desc})
                            ]
                            : m('span', [' ', row.label])
                    ),
                    m('.col-md-3.col-lg-2', m('input[type=number].form-control',{placeholder:'0', onchange: m.withAttr('value', ctrl.set(row.name, 'number')), value: ctrl.get(row.name), min:0}))
                ]);
            }),
            m('.row.space',
                m('.col-md-5',
                    m('p.h4','Example Target Stimulus: ',
                        m('i.fa.fa-info-circle.text-muted',{
                            title:'Here you can set the number of trials in each block.\nBelow you can add add additional blocks.'}
                        )
                    )
                )
            ),
            m('.row.space.line',[
                m('.col-md-4',[
                    m('span', [' ', 'Example Target Stimulus']),
                ]),
                m('.col-md-8',[
                    m('.row',[
                        m('.col-sm-5', m('span' ,'Name of target stimulus for logging: ')),
                        m('.col-sm-4', m('input[type=text].form-control', {value:ctrl.get('exampleTargetStimulus', 'nameForLogging') ,onchange:m.withAttr('value', ctrl.set('exampleTargetStimulus', 'nameForLogging'))}))
                    ]),
                    m('.row.space',[
                        m('.col-sm-5', m('span' ,'Use the same media array as the first Target Category')),
                        m('.col-sm-4', m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set('exampleTargetStimulus', 'sameAsTargets')), checked: ctrl.get('exampleTargetStimulus', 'sameAsTargets')}))
                    ])
                ])
            ]),
            m('.row.line',[
                m('.col-md-4','Example Fixation Stimulus'),
                editStimulusObject('exampleFixationStimulus', ctrl.get, ctrl.set)
            ]),
            m('.row.line',[
                m('.col-md-4', 'Example Mask Stimulus'),
                editStimulusObject('exampleMaskStimulus', ctrl.get, ctrl.set)
            ]),
            m('.row.space.line',[
                m('.col-md-4',[
                    m('span', [' ', 'Example Prime Stimulus']),
                ]),
                m('.col-md-8',[
                    m('.row',[
                        m('.col-sm-5', m('span' ,'Name of prime stimulus for logging: ')),
                        m('.col-sm-4', m('input[type=text].form-control', {value:ctrl.get('examplePrimeStimulus', 'nameForLogging') ,onchange:m.withAttr('value', ctrl.set('examplePrimeStimulus', 'nameForLogging'))}))
                    ]),
                    m('.row.space',[
                        m('.col-sm-5', 'Media objects for this category'),
                        m('.col-sm-5',
                            m('input[type=text].form-control',
                                {placeholder:'Enter media content here', 'aria-label':'Enter media content', 'aria-describedby':'basic-addon2', value: ctrl.fields.newStimulus(), oninput: m.withAttr('value', ctrl.fields.newStimulus)}),
                            m('.btn-group btn-group-toggle', [
                                m('button[type=button].btn btn-secondary',
                                    {disabled:!ctrl.fields.newStimulus().length, id:'addWord', onclick: (e) => ctrl.addStimulus(e)},[
                                        m('i.fa.fa-plus'), 'Add Word'
                                    ]),
                                m('button[type=button].btn btn-secondary', {disabled:!ctrl.fields.newStimulus().length, id:'addImage', onclick: (e) => ctrl.addStimulus(e)},[
                                    m('i.fa.fa-plus'), 'Add Image'
                                ])
                            ]),
                            m('select.form-control', {multiple : 'multiple', size : '4' ,onchange:(e) => ctrl.updateSelectedStimuli(e)},[
                                ctrl.get('examplePrimeStimulus', 'mediaArray').map(function(object){
                                    let value = object.word ? object.word : object.image;
                                    let option = value + (object.word ? ' [Word]' : ' [Image]');
                                    return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
                                })
                            ]),
                            m('.btn-group-vertical.space',[
                                m('button.btn btn btn-warning', {title:'To select multiple stimuli, please press the ctrl key while selecting the desired stimuli', disabled: !ctrl.fields.selectedStimuli().length, onclick:ctrl.removeChosenStimuli},'Remove Chosen Stimuli'),
                                m('button.btn btn btn-warning', {onclick:ctrl.removeAllStimuli},'Remove All Stimuli'),
                                m('button.btn btn btn-warning', {onclick: ctrl.resetStimuliList},'Reset Stimuli List')
                            ])
                        ),
                    ])
                ])
            ]), resetClearButtons(ctrl.reset, ctrl.clear)
        ]);
    }

    let blocksComponent = {
        controller:controller$7,
        view:view$7
    };
    const deafaultNumOfTrials = 40;
    function controller$7(settings, defaultSettings, rows){
        let blocks = settings.blocks;
        let trialsInBlock = blocks.trialsInBlock;
        let chooseFlag = m.prop(false);
        let chosenBlocksList = m.prop([]);
        let chooseClicked = m.prop(false);
        return {trialsInBlock, set, get, rows, showReset, showClear,
            chooseFlag, chosenBlocksList, chooseClicked, unChooseCategories,
            chooseBlocks, addBlock, updateChosenBlocks, showRemoveBlocks};

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
                trialsInBlock.length = 3;
                Object.assign(blocks.trialsInBlock, clone(defaultSettings.blocks.trialsInBlock));
                blocks.trialsInExample = defaultSettings.blocks.trialsInExample;
                chosenBlocksList().length = 0;
            }
        }
        function showClear(){
            beforeClearReset('clear', clear);
            function clear(){
                for (let i = 0; i < trialsInBlock.length; i++) trialsInBlock[i] = 0;
                settings.blocks.trialsInExample = 0;
            }
        }
        function get(name, index){
            if(name === 'trialsInBlock')
                return trialsInBlock[index];
            return blocks[name];
        }
        function set(name, index){
            if(name === 'trialsInBlock')
                return function(value){return trialsInBlock[index] = Math.abs(Math.round(value));};
            return function(value){return blocks[name] = value;};
        }
        function updateChosenBlocks(e, index){
            if (chosenBlocksList().includes(index) && !e.target.checked){
                let i = chosenBlocksList().indexOf(index);
                if (i !== -1)
                    chosenBlocksList().splice(i, 1);
                return;
            }
            if (e.target.checked) chosenBlocksList().push(index);
        }
        function chooseBlocks(){
            if (blocks.length < 2) {
                showRestrictions('It\'s not possible to remove more blocks because there must be at least one block.', 'error');
                return;
            }
            chooseFlag(true);
            if(!chooseClicked()){  //show info message only for the first time the choose button has been clicked
                showRestrictions('To choose blocks to remove, please tik the checkbox near the wanted block, and to remove them click the \'Remove Choosen Blocks\' button.','info');
                chooseClicked(true);
            }
        }
        function addBlock(){
            trialsInBlock.push(deafaultNumOfTrials);
        }
        function unChooseCategories(){
            chooseFlag(false);
            chosenBlocksList().length = 0;
        }
        function showRemoveBlocks(){
            if ((trialsInBlock.length - chosenBlocksList().length) < 1){
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
                    trialsInBlock.splice(chosenBlocksList()[i],1);

                chosenBlocksList().length = 0;
                chooseFlag(false);
            }
        }
    }
    function view$7(ctrl){
        return m('.space' , [
            m('.row.line', [
                m('.col-md-3',
                    m('span', [' ', 'Trials In Example Block', ' ']),
                    m('i.fa.fa-info-circle.text-muted',{title:'Change to 0 if you don\'t want an example block'})
                ),
                m('.col-md-3.col-lg-2.space',
                    m('input[type=number].form-control',{onchange: m.withAttr('value', ctrl.set('trialsInExample')), value: ctrl.get('trialsInExample'), min:0}))
            ]),
            m('.row.line',
                m('.col-md-5',
                    m('p.h4','Number of Trials in Each Block: ',
                        m('i.fa.fa-info-circle.text-muted',{
                            title:'Here you can set the number of trials in each block.\nBelow you can add add additional blocks.'}
                        )
                    )
                )
            ),
            ctrl.trialsInBlock.map(function(block, index) {
                return m('.row.line', [
                    m('.col-md-3',[
                        !ctrl.chooseFlag() ? ' ' :
                            m('input[type=checkbox]', {checked : ctrl.chosenBlocksList().includes(index), onclick: (e) => ctrl.updateChosenBlocks(e, index)}),
                        m('span', [' ','Block '+parseInt(index+1)])
                    ]),
                    m('.col-md-3.col-lg-2.space',
                        m('input[type=number].form-control',{onchange: m.withAttr('value', ctrl.set('trialsInBlock', index)), value: ctrl.get('trialsInBlock', index), min:0})
                    )
                ]);
            }),
            m('.row.space',
                m('.col-md-9',
                    m('.btn-group btn-group-toggle',[
                        m('button.btn btn btn-info',{onclick: ctrl.addBlock}, 
                            m('i.fa.fa-plus'),' Add Block'),
                        !ctrl.chooseFlag() ?
                            m('button.btn btn btn-warning',{onclick: ctrl.chooseBlocks},
                                m('i.fa.fa-check'), ' Choose Blocks to Remove')
                            : m('button.btn btn btn-warning',{onclick: ctrl.unChooseCategories},[
                                m('i.fa.fa-minus-circle'), ' Un-Choose Categories to Remove']),
                        !ctrl.chosenBlocksList().length ? '' :
                            m('button.btn btn btn-danger',{onclick: ctrl.showRemoveBlocks, disabled: !ctrl.chosenBlocksList().length},
                                m('i.fa.fa-minus-square'), ' Remove Chosen Blocks'),
                    ])
                )
            ), resetClearButtons(ctrl.showReset, ctrl.showClear)
        ]);
    }

    let importComponent = {
        controller:controller$6,
        view:view$6
    };

    function view$6(ctrl){
        return viewImport(ctrl);
    }

    function controller$6(settings) {
        return {handleFile, updateSettings};

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
    function updateMediaSettings(settings) {
        //update attributes to be compatible to EP so that primeComponent & primeDesignComp can be used for AMP also.

        settings.prime1 = settings.primeCats[0];
        settings.prime2 = settings.primeCats[1];
        delete settings.primeCats;
        settings.prime1.name = settings.prime1.nameForLogging;
        settings.prime2.name = settings.prime2.nameForLogging;

        let temp = settings.targetCats[0];
        delete settings.targetCats;
        settings.targetCategory = temp;
        settings.targetCategory.name = settings.targetCategory.nameForLogging;
        settings.targetCategory.nameForFeedback = settings.targetCat;
        delete settings.targetCategory.nameForLogging;
        delete settings.targetCat;

        return settings;
    }
    function updateSettings(settings, input) {
        //updating the settings variable in parameters group according
        //to the DefaultSettings file pattern
        let parameters = ['isQualtrics', 'exampleBlock',
            'fixationDuration',
            'showRatingDuration', 'responses',
            'sortingLabel1', 'sortingLabel2',
            'randomizeLabelSides', 'rightKey', 'leftKey',
            'fixationStimulus', 'maskStimulus', 'base_url'
        ];
        parameters.forEach(parameter => {settings.parameters[parameter] = input[parameter];});
        settings.parameters.leftkey = input.leftKey;
        settings.parameters.rightkey = input.rightKey;

        //settings.parameters.exampleBlock = input.trialsInExample !== 0;
        if(settings.parameters.exampleBlock){
            let exampleBlock = [
                'exampleTargetStimulus', 'exampleFixationStimulus',
                'exampleMaskStimulus', 'exampleBlock_fixationDuration',
                'exampleBlock_primeDuration', 'exampleBlock_postPrimeDuration',
                'exampleBlock_targetDuration', 'examplePrimeStimulus',
            ];
            exampleBlock.forEach(parameter => {settings.exampleBlock[parameter] = input[parameter];});
        }
        let variousParams = [
            'primeStimulusCSS', 'primeCats', 'targetStimulusCSS', 'targetCats', 'targetCat'
        ];
        variousParams.forEach(parameter => {settings[parameter] = input[parameter];});

        let blocks = ['trialsInBlock', 'trialsInExample'];
        blocks.forEach(parameter => {settings.blocks[parameter] = input[parameter];});

        let primeParam = ['primeDuration', 'postPrimeDuration'];
        primeParam.forEach(parameter => {settings.primeStimulusCSS[parameter] = input[parameter];});

        settings.targetStimulusCSS.targetDuration = input.targetDuration;

        let textParams = [];
        if(input.responses === '2'){
            textParams = ['exampleBlockInst', 'firstBlockInst',
                'middleBlockInst', 'lastBlockInst', 'endText'
            ];
            textParams.forEach(param => {settings.text[param] = input[param];});
        }
        else {
            textParams = ['exampleBlockInst7', 'firstBlockInst7',
                'middleBlockInst7', 'lastBlockInst7', 'endText'
            ];
            textParams.forEach(param => {settings.text_seven[param] = input[param];});
        }

        settings = updateMediaSettings(settings);
        m.redraw();

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

    let elementComponent$2 = {
        controller:controller$5,
        view:view$5,
    };

    function controller$5(object, settings, stimuliList){
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
        controller: controller$4,
        view: view$4,
    };

    function controller$4(object, settings,stimuliList, startStimulusList ,index){
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

    function view$4(ctrl) {
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
        controller:controller$3,
        view:view$3,
    };

    function controller$3(object, settings, stimuliList, taskType){
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

    function view$3(ctrl) {
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
        controller:controller$2,
        view:view$2
    };

    function controller$2(taskType, settings, elementName){
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

    function view$2(ctrl, taskType){
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
        controller:controller$1,
        view:view$1
    };

    function controller$1(settings, defaultSettings, clearElement) {
        return {reset, clear};

        function reset(curr_tab){showClearOrReset(settings[curr_tab], defaultSettings[curr_tab],'reset');}
        function clear(curr_tab){
            curr_tab.includes('StimulusCSS') ?
                showClearOrReset(settings[curr_tab], clearElement[1], 'clear')
                : showClearOrReset(settings[curr_tab], clearElement[0], 'clear');
        }
    }

    function view$1(ctrl, settings, defaultSettings, clearElement, taskType, currTab) {
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

    let parametersDesc = [
        {name: 'isQualtrics',options:['Regular','Qualtrics'], label:'Regular script or Qualtrics?', desc: ['If you want this IAT to run from Qualtrics, read ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/'}, 'this blog post '),'to see how.']},
        {name: 'exampleBlock', label:'Example Block', desc: ['Should the task start with an example block?']},
        {name: 'responses', label: 'Number of responses options', options:[2,7], desc: 'Change to 7 for a 1-7 rating'},
        {name: 'leftkey', label: 'Left Key'},
        {name: 'rightkey', label: 'Right Key'},
        {name: 'sortingLabel1', label: 'First Sorting Label',desc: 'Response is coded as 0.'},
        {name: 'sortingLabel2', label: 'Second Sorting Label', desc: 'Response is coded as 1. '},
        {name: 'randomizeLabelSides',label:'Randomize Label Sides', desc: 'If false, then label1 is on the left, and label2 is on the right.'},
        {name: 'maskStimulus', label: 'Mask Stimulus', desc: 'The mask stimulus '},
        {name: 'fixationDuration', label: 'Fixation Duration', desc: 'No fixation by default'},
        {name: 'fixationStimulus', label: 'Fixation Stimulus', desc: 'Change the fixation stimulus here'},
        {name: 'showRatingDuration', label: 'Show Rating Duration ', desc: 'In the 7-responses option, for how long to show the selected rating.'},
        {name: 'base_url', label: 'Image\'s URL', desc: 'If your task has any images, enter here the path to that images folder. ' +
                'It can be a full url, or a relative URL to the folder that will host this script'},
        //Clearing Object
        {
            leftkey: '', rightkey: '',
            sortingLabel1:'', sortingLabel2:'',
            randomizeLabelSides: false,
            maskStimulus:{css : {color:'#000000', 'font-size':'1em'}, media : {image:''}},
            fixationDuration:0,
            fixationStimulus:{css : {color:'#000000', 'font-size':'1em'}, media : {word:''}},
            showRatingDuration: '', base_url:{image:''}
        }
    ];

    let textDesc=[
        {name: 'exampleBlockInst', nameSeven:'exampleBlockInst7', label:'Example Block\'s Instructions', desc:'Example Block\'s Instructions'},
        {name: 'firstBlockInst', nameSeven:'firstBlockInst7', label:'First Block\'s Instructions', desc:'First Block\'s Instructions'},
        {name: 'middleBlockInst', nameSeven:'middleBlockInst7', label:'Middle Block\'s Instructions', desc: 'Middle Block\'s Instructions'},
        {name: 'lastBlockInst', nameSeven:'lastBlockInst7', label:'Last Block\'s Instructions', desc: 'Last Block\'s Instructions'},
        {name: 'endText', nameSeven:'endText', label:'End Block\'s Instructions', desc: 'End Block\'s Instructions'},
        {exampleBlockInst: '', firstBlockInst: '', middleBlockInst:'', lastBlockInst:'', endText:''},
        {exampleBlockInst7: '', firstBlockInst7: '', middleBlockInst7:'', lastBlockInst7:'', endText:''}
    ];

    let blocksDesc = [
        {name: 'trialsInExample', label: 'Number of trials in example block', desc: 'Change to 0 if you don\'t want an example block'},
        {name: 'trialsInBlock', label: 'Number of trials in a block', desc: 'Number of trials in each block'},
        {trialsInExample: 0, trialsInBlock: [0,0,0]}
    ];

    let exampleBlock = [
        {name: 'exampleBlock_fixationDuration', label: 'Fixation Duration'},
        {name: 'exampleBlock_primeDuration', label: 'Prime Duration'},
        {name: 'exampleBlock_postPrimeDuration', label: 'Post Prime Duration'},
        {name: 'exampleBlock_targetDuration', label: 'Target Duration'},
        {   exampleBlock_fixationDuration: 0,
            exampleBlock_primeDuration: 0,
            exampleBlock_postPrimeDuration: 0,
            exampleBlock_targetDuration:0,
            exampleTargetStimulus: {nameForLogging: '', sameAsTargets: false},
            exampleFixationStimulus: {css: {color: '000000', 'font-size': '1em'}, media: {word: ''}},
            exampleMaskStimulus: {css: {color: '000000', 'font-size': '1em'}, media: {image: ''}},
            examplePrimeStimulus: {nameForLogging: '', mediaArray: []}
        }
    ];

    let targetClear = [
        {
            name: '',
            nameForFeedback : '',
            mediaArray : []
        },
        {
            targetDuration: 0,
            color: '#000000',
            'font-size': '1em',
            primeDuration: 0,
            postPrimeDuration: 0,
        }
    ];

    let targetTab = {
        'targetCategory':{text: 'Target Category'},
        'targetStimulusCSS':{text:'Target Appearance'}
    };

    let primeClear = [
        {
            name : '',
            nameForFeedback: '',
            mediaArray : []
        },
        { //CSS cleared
            targetDuration: 0,
            primeDuration: 0,
            postPrimeDuration: 0,
            color: '#000000',
            'font-size': '1em'
        }
    ];

    let primesTabs = {
        'prime1':{text: 'First Category'},
        'prime2':{text: 'Second Category'},
        'primeStimulusCSS':{text:'Prime Appearance'}
    };


    let tabs = {
        'parameters':{text: 'General parameters', component: parametersComponent$1, rowsDesc: parametersDesc },
        'blocks':{text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
        'exampleBlock':{text: 'Example Block', component: exampleComponent, rowsDesc: exampleBlock},
        'prime': {
            text: 'Prime Categories',
            component: categoriesComponent,
            rowsDesc: primeClear,
            subTabs: primesTabs,
            type: 'AMP'
        },
        'categories':{
            text: 'Target Category',
            component: categoriesComponent,
            rowsDesc: targetClear,
            subTabs: targetTab,
            type: 'AMP'
        },
        'text':{text: 'Texts', component: textComponent, rowsDesc: textDesc},
        'output':{text: 'Complete', component: iatOutputComponent, rowsDesc: blocksDesc},
        'import':{text: 'Import', component: importComponent},
        'help':{text: 'Help', component: helpComponent, rowsDesc:'AMP'}
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

    const amp = (args, external) => m.component(ampComponent, args, external);

    let ampComponent = {
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
            tabs.blocks.rowsDesc; //blockDesc inside output attribute
            error_msg = validityCheck(error_msg, ctrl.settings);
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
            save('amp', studyId, fileId, ctrl.settings)
                .then (() => saveToJS('amp', studyId, jsFileId, toString(ctrl.settings, ctrl.external)))
                .then(ctrl.study.get())
                .then(() => ctrl.notifications.show_success(`AMP Script successfully saved`))
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
        return m('.container-fluid',[
            pageHeadLine('AMP'),
            m.component(messages),
            m.component(tabsComponent, tabs, ctrl.settings, ctrl.defaultSettings, ctrl.external)
        ]);
    }

    m.mount(document.getElementById('dashboard'), amp({}, true));

}());
//# sourceMappingURL=amp_index.js.map
