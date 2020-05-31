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

        durations: {
            feedback_duration: 500,
            iti_duration: 1500
        },
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
                    {type:'trigger', handle:'show_stimuli'},
                    {type:'custom', fn: function(a, b, trial){trial.data.stimuli_counter = 0;}}
                ]
            },

            /*#*sequence*#*/,
            {
                conditions: [{type:'inputEquals', value:'targetOut'}],
                actions: [
                    {type:'hideStim', handle:'target'},
                    {type:'trigger', handle:'timeout'}
                ]
            },

            {
                conditions: [{type:'inputEqualsStim', property:'correct'}],
                actions: [
                    {type:'removeInput',handle:['All']},
                    {type:'setTrialAttr', setter:{score:1}},
                    {type:'log'},
                    {type:'custom',fn: function(){global.current.score++;}},
                    {type:'custom', fn: function(a, b, trial){trial.data.feedback = 'correct';}},
                    {type:'hideStim', handle:['All']},
                    {type:'trigger', handle:'ITI'}
                ]
            },

            {
                conditions: [
                    {type:'inputEquals', value:current.answers},
                    {type:'inputEqualsStim', property:'correct', negate:true}
                ],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:0}},
                    {type:'log'},
                    {type:'custom', fn: function(a, b, trial){trial.data.feedback = 'error';}},
                    {type:'hideStim', handle:['All']},
                    {type:'trigger', handle:'ITI'}
                ]
            },
            {
                conditions: [
                    {type:'inputEquals',value:'timeout'}],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:-1}},
                    {type:'log'},
                    {type:'custom', fn: function(a, b, trial){trial.data.feedback = 'timeoutmessage';}},
                    {type:'trigger', handle:'ITI'}
                ]
            },
            {
                conditions: [
                    {type:'inputEquals', value:'ITI'},
                    {type:'trialEquals', property:'block', value:'practice'},
                    {type:'trialEquals', property:'feedback', value:'correct'}
                ],
                actions:[
                    {type:'showStim', handle:'correct'},
                    {type:'trigger', handle:'end_practice',duration: '<%= current.durations.feedback_duration %>'}
                ]
            },
            {
                conditions: [
                    {type:'inputEquals', value:'ITI'},
                    {type:'trialEquals', property:'block', value:'practice'},
                    {type:'trialEquals', property:'feedback', value:'error'}
                ],
                actions:[
                    {type:'showStim', handle:'error'},
                    {type:'trigger', handle:'end_practice',duration: '<%= current.durations.feedback_duration %>'}
                ]
            },
            {
                conditions: [
                    {type:'inputEquals', value:'ITI'},
                    {type:'trialEquals', property:'block', value:'practice'},
                    {type:'trialEquals', property:'feedback', value:'timeoutmessage'}
                ],
                actions:[
                    {type:'showStim', handle:'timeoutmessage'},
                    {type:'trigger', handle:'end_practice',duration: '<%= current.durations.feedback_duration %>'}
                ]
            },
            {
                conditions: [
                    {type:'inputEquals', value:'end_practice'}
                ],
                actions:[
                    {type:'hideStim', handle:['All']},
                    {type:'trigger', handle:'end', duration:'<%= current.durations.iti_duration%>'}
                ]
            },
            {
                conditions: [
                    {type:'inputEquals', value:'ITI'},
                    {type:'trialEquals', property:'block', value:'practice', negate:true}
                ],
                actions:[
                    {type:'removeInput', handle:['All']},
                    {type:'trigger', handle:'end', duration:'<%= current.durations.iti_duration%>'}
                ]
            },
            {
                conditions: [{type:'inputEquals', value:'end'}],
                actions: [{type:'endTrial'}]
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