define(['pipAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    var global  = API.getGlobal();
    var current = API.getCurrent();

    var version_id      = Math.random()>0.5 ? 2 : 1;

    var answers     = /*#*posible_answers*#*/;

    API.addCurrent({
        version_id   : version_id,
        answers      : answers,
        inst_welcome : 'images/inst_welcome_2c_short_'+version_id+'.jpg',
        inst_start   : 'images/inst_start_'+version_id+'.jpg',
        inst_bye     : 'images/inst_bye.jpg',

        fixation_duration : 1000,
        stimulus_duration : 500,
        response_duration : 1000,
        feedback_duration : 500,
        iti_duration      : 1500,

        score             : 0,
        minScore4exp      : 0
    });



    API.addSettings('canvas',{
        textSize         : 5,
        maxWidth         : 1200,
        proportions      : 0.65,
        borderWidth      : 0.4,
        background       : '#ffffff',
        canvasBackground : '#ffffff'
    });

    API.addSettings('base_url',{
        image : global.baseURL
    });

    /***********************************************
     // Stimuli
     ***********************************************/


    API.addStimulusSets({
        defaultStim: [{data : {alias:'default'}, css:{color:'black','font-size':'100px'}}],
        fixation : [{
            inherit:'defaultStim', data:{handle:'fixation', alias:'fixation'},
            media: '+'
        }],
        error : [{
            inherit:'defaultStim', data:{handle:'error', alias:'error'},
            media: {word: '!תשובה לא נכונה'}
        }],
        correct : [{
            inherit:'defaultStim', data:{handle:'correct', alias:'correct'},
            media: {word: '!תשובה נכונה'}
        }],
        timeoutmessage : [{
            inherit:'defaultStim', data:{handle:'timeoutmessage', alias:'timeoutmessage'},
            media: {word: 'תשובה לא זוהתה'}
        }]
    });


    API.addStimulusSets('inst_welcome',[
        {inherit:'defaultStim', data:{handle: 'instructions', alias:'instructions'},
            media:{image: current.inst_welcome}}
    ]);


    API.addStimulusSets('inst_start',[
        {inherit:'defaultStim', data:{handle: 'instructions', alias:'instructions'},
            media:{image: current.inst_start}}
    ]);

    API.addStimulusSets('inst_bye',[
        {inherit:'defaultStim', data:{handle: 'instructions', alias:'instructions'},
            media:{image: current.inst_bye}}
    ]);

    /***********************************************
     // INSTRUCTIONS TRIAL
     ***********************************************/

    API.addTrialSets('insts',{
        input: [
            {handle:'space',on:'space'}
        ],
        interactions: [
            {
                conditions: [{type:'begin'}],
                actions: [
                    {type:'showStim',handle:'instructions'}
                ]
            },
            {
                conditions: [{type:'inputEquals',value:'space'}],
                actions: [
                    {type:'hideStim',handle:'All'},
                    {type:'log'},
                    {type:'endTrial'}
                ]
            }
        ]
    });


    API.addTrialSets('inst_welcome',{
        inherit:'insts',
        stimuli : [
            {inherit:'inst_welcome'}
        ]
    });

    API.addTrialSets('inst_start',{
        inherit:'insts',
        stimuli : [
            {inherit:'inst_start'}
        ]
    });

    API.addTrialSets('inst_bye',{
        inherit:'insts',
        stimuli : [
            {inherit:'inst_bye'}
        ]
    });

    /***********************************************
     // Main trials
     ***********************************************/

    API.addTrialSets('main',[{
        data: {score:0},
        interactions: [
            {
                conditions: [{type:'begin'}],
                actions: [
                    {type:'showStim', handle:'fixation'},
                    {type:'custom', fn: function(a, b, trial){trial.data.stimuli_counter = 0;}},
                    {type:'trigger', handle:'showTarget', duration:current.fixation_duration}
                ]
            },
            {
                conditions:[{type:'inputEquals',value:'showTarget'}],
                actions: [
                    {type:'hideStim', handle:'fixation'},
                    {type:'resetTimer'},
                    {type:'setInput', input:{handle:current.answers[0], on: 'keypressed', key: current.answers[0]}},
                    {type:'setInput', input:{handle:current.answers[1],on: 'keypressed', key: current.answers[1]}},
                    {type:'showStim', handle: 'target'},
                    {type:'trigger',handle:'targetOut', duration:current.stimulus_duration}
                ]
            },
            /*#*sequence*#*/,
            {
                conditions: [{type:'inputEquals', value:'targetOut'}],
                actions: [
                    {type:'hideStim', handle:'target'},
                    {type:'trigger', handle:'timeout', duration:current.response_duration}
                ]
            },
            {
                conditions: [{type:'inputEqualsStim', property:'correct'}],
                actions: [
                    {type:'removeInput',handle:['All']},
                    {type:'setTrialAttr', setter:{score:1}},
                    {type:'log'},
                    {type:'custom',fn: function(){global.current.score++;}},
                    {type:'hideStim', handle:['All']},
                    {type:'trigger', handle:'ITI'}
                ]
            },
            {
                conditions: [{type:'inputEqualsStim', property:'correct'},
                    {type:'currentEquals',property:'is_practice', value:true}],
                actions: [
                    {type:'showStim', handle:'correct'},
                    {type:'trigger', handle:'clean',duration:current.feedback_duration}
                ]
            },
            {
                conditions: [{type:'inputEquals', value:current.answers},
                    {type:'inputEqualsStim', property:'correct', negate:true}],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:0}},
                    {type:'log'},
                    {type:'hideStim', handle:['All']},
                    {type:'trigger', handle:'ITI'}
                ]
            },
            {
                conditions: [{type:'inputEquals', value:current.answers},
                    {type:'inputEqualsStim', property:'correct', negate:true},
                    {type:'currentEquals',property:'is_practice', value:true}],
                actions: [
                    {type:'showStim', handle:'error'},
                    {type:'trigger', handle:'clean',duration:current.feedback_duration}
                ]
            },
            {
                conditions: [
                    {type:'inputEquals',value:'timeout'}],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:-1}},
                    {type:'log'},
                    {type:'hideStim', handle:['All']},
                    {type:'trigger', handle:'ITI'}
                ]
            },
            {
                conditions: [{type:'inputEquals',value:'timeout'},
                    {type:'currentEquals', property:'is_practice', value:true}],
                actions: [
                    {type:'showStim', handle:'timeoutmessage'},
                    {type:'trigger', handle:'clean',duration:current.feedback_duration}
                ]
            },
            {
                conditions: [{type:'inputEquals', value:'clean'}],
                actions:[
                    {type:'hideStim', handle:['All']}
                ]
            },

            {
                conditions: [{type:'inputEquals', value:'ITI'}],
                actions:[
                    {type:'custom',fn: function(){global.current.trial_count++;}},
                    {type:'removeInput', handle:['All']},
                    {type:'trigger', handle:'end',duration:'<%= current.is_practice ? current.feedback_duration+current.iti_duration : current.iti_duration %>'}
                ]
            },
            {
                conditions: [ {type:'inputEquals', value:'end'} ],
                actions: [ {type:'endTrial' }]
            }
        ],
        stimuli : [
            {inherit:'error'},
            {inherit:'correct'},
            {inherit:'timeoutmessage'},
            {inherit:'fixation'}
        ]
    }]);

    /***********************************************
     // Specific color trials
     ***********************************************/

    API.addTrialSets('endOfPractice',{
        input: [
            {handle:'end', on: 'timeout', duration: 0}
        ],
        interactions: [
            {
                conditions: [
                    {type:'custom',fn: function(){return global.current.score < global.current.minScore4exp;}}
                ],
                actions: [
                    {type:'custom',fn: function(){global.current.score=0;}},
                    {type:'goto',destination: 'previousWhere', properties: {practice:true}},
                    {type:'endTrial'}
                ]
            },
            {
                conditions: [
                    {type:'custom',fn: function(){return global.current.score >= global.current.minScore4exp;}}
                ],
                actions: [
                    {type:'custom',fn: function(){global.current.score=0;}},
                    {type:'goto',destination: 'nextWhere', properties: {exp:true}},
                    {type:'endTrial'}
                ]
            }
        ]
    });

    API.addTrialSets('startPractice',{
        input: [
            {handle:'end', on: 'timeout', duration: 0}
        ],
        interactions: [
            {
                conditions: [
                    {type:'custom',fn: function(){return true;}}
                ],
                actions: [
                    {type:'endTrial'}
                ]
            }
        ]
    });

    /*#*conditions_general*#*/

    API.addTrialSet('stimulus_trial', {
        inherit: {set:'main', merge:['stimuli']},
        stimuli: [
/*#*stimuli*#*/

        ]
    });

    /*#*conditions*#*/
    /***********************************************
     // Sequence
     ***********************************************/

    API.addSequence([
        {
            data: {practice:true},
            inherit : {set:"inst_welcome"}
        },
        {
            inherit : {set:"startPractice"}
        },
        {
            mixer: 'random',
            data: [
                /*#*sequencer_practice*#*/
            ]
        },
        {
            inherit: {set:"endOfPractice"}
        },
        {
            data: {exp:true},
            inherit : {set:"inst_start" }
        },
        {
            mixer: 'random',
            data: [
                /*#*sequencer_exp*#*/
            ]
        },
        {
            inherit : {set:"inst_bye" }
        }
    ]);
    return API.script;
});