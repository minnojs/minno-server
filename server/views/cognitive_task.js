define(['pipAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    var current = API.getCurrent();

    var answers     = /*#*possible_answers*#*/;
    /*#*images2preload*#*/

    API.addCurrent({
        answers      : answers,
        /*#*instructions_var*#*/
        durations: {
            fixation: /*#*fixation_duration*#*/,
            iti: /*#*iti_duration*#*/,
            feedback_duration: /*#*feedback_duration*#*/
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



    /***********************************************
     // Stimuli
     ***********************************************/


    API.addStimulusSets({
        defaultStim    : [{css:{color:'black', 'font-size':'100px'}}],
        fixation       : [{inherit:'defaultStim', media: '+'}],
        error          : [{inherit:'defaultStim', media: '/*#*feedback_incorrect*#*/'}],
        correct        : [{inherit:'defaultStim', media: '/*#*feedback_correct*#*/'}],
        timeoutmessage : [{inherit:'defaultStim', media: '/*#*feedback_noresponse*#*/'}]
    });

    /***********************************************
     // INSTRUCTIONS TRIAL
     ***********************************************/

    API.addTrialSets('insts',{
        input: [
            {handle:'space',on:'space'}
        ],
        interactions: [
            {
                conditions: [{type:'inputEquals',value:'space'}],
                actions: [
                    {type:'log'},
                    {type:'endTrial'}
                ]
            }
        ]
    });

    /*#*instruction_welcome_imp*#*/
    /*#*instruction_start_imp*#*/
    /*#*instruction_end_imp*#*/

    /***********************************************
     // Main trials
     ***********************************************/

    API.addTrialSets('stimulus_trial',[{
        data: {score:0},
        interactions: [
            {
                conditions: [{type:'begin'}],
                actions: [
                    {type:'trigger', handle:'<%= current.durations.fixation ? "showFixation" : "show_stimuli" %>'},
                    {type:'custom', fn: function(a, b, trial){trial.data.stimuli_counter = 0;}}
                ]
            },

            {
                conditions:[{type:'inputEquals',value:'showFixation'}],
                actions: [
                    {type:'showStim', handle:'fixation'},
                    {type:'trigger', handle:'show_stimuli', duration: '<%= current.durations.fixation %>'}
                ]
            },

            {
                conditions:[{type:'inputEquals',value:'show_stimuli'}],
                actions: [
                    {type:'hideStim', handle:'fixation'}
                ]
            },


            /*#*trial_sequence*#*/,
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
                    {type:'custom',fn: function(){current.score++;}},
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
                    {type:'trigger', handle:'end', duration:'<%= current.durations.iti%>'}
                ]
            },
            {
                conditions: [
                    {type:'inputEquals', value:'ITI'},
                    {type:'trialEquals', property:'block', value:'practice', negate:true}
                ],
                actions:[
                    {type:'removeInput', handle:['All']},
                    {type:'trigger', handle:'end', duration:'<%= current.durations.iti%>'}
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
            {inherit:'fixation'},
            /*#*stimuli*#*/
        ]
    }]);

    /***********************************************
     // Specific color trials
     ***********************************************/

    API.addTrialSets('endOfPractice',{
        interactions: [
            {
                conditions: [
                    {type:'begin'},
                    {type:'custom',fn: function(){return current.score < current.minScore4exp;}}
                ],
                actions: [
                    {type:'custom',fn: function(){current.score=0;}},
                    {type:'goto',destination: 'previousWhere', properties: {practice:true}},
                    {type:'endTrial'}
                ]
            },
            {
                conditions: [
                    {type:'begin'},
                    {type:'custom',fn: function(){return current.score >= current.minScore4exp;}}
                ],
                actions: [
                    {type:'custom',fn: function(){current.score=0;}},
                    {type:'goto',destination: 'nextWhere', properties: {exp:true}},
                    {type:'endTrial'}
                ]
            }
        ]
    });


    API.addTrialSets('startPractice',{
        interactions: [
            {
                conditions: [
                    {type:'begin'}
                ],
                actions: [
                    {type:'endTrial'}
                ]
            }
        ]
    });

    /*#*conditions_general*#*/


    /*#*conditions*#*/
    /***********************************************
     // Sequence
     ***********************************************/

    API.addSequence([
        /*#*instruction_welcome_seq*#*/
        {
            mixer: 'random',
            data: [
                /*#*sequence_practice*#*/
            ]
        },
        /*#*instruction_start_seq*#*/
        {
            mixer: 'random',
            data: [
                /*#*sequence_exp*#*/
            ]
        },
        /*#*instruction_end_seq*#*/
    ]);
    return API.script;
});