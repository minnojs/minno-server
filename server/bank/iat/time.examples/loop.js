/**
 * This tasks shows how you can repeat a single trail multiple times in order to create an interaction
 * The tasks allows you to use the up and down arrows to control a score counter
 * When the score hits 10, the player proceeds to the next trial (the end of the task).
 * This paradigm may allow the creation of tasks that require subjects to achieve specific scores before proceeding,
 * As well as simplify some more complex interactions.
 *
 * In the begin step we set `goto` to 'current' so that the default behaviour at the end of the trail is to repeat it.
 * When triggering the `end` interaction, we check the score and determine if the player is ready to advance to the 'next' trial.
 * Lookup goto in the minno-time API documentation to see the variations that `goto` supports.
 *
 **/
define(['timeAPI'], function(APIConstructor) {

    let API = new APIConstructor();
    let current = API.getCurrent();

    current.score = 0;

    API.addSequence([
        {
            reRender:true,
            input: [
                {handle:'up',on:'keypressed',key:38},
                {handle:'down',on:'keypressed',key:40}
            ],

            layout: [
                { media: 'Score: <%= current.score %>', css: { fontSize: '2em'} },
                { media: 'Use the up and down arrows to change the score', css: { color: 'green' }, location: {bottom: 40}} 
            ],

            interactions: [
                // by default repeat this trial
                {
                    conditions: [{type:'begin'}],
                    actions: [
                        { type:'goto', destination: 'current'}
                    ]
                },
                {
                    conditions: [
                        {type:'inputEquals',value:'up'}
                    ],
                    actions: [
                        {type:'setGlobalAttr', setter:function(global){ global.current.score++;}},
                        {type:'trigger',handle : 'end'}
                    ]
                },
                {
                    conditions: [
                        {type:'inputEquals',value:'down'}
                    ],
                    actions: [
                        {type:'setGlobalAttr', setter:function(global){ global.current.score--;}},
                        {type:'trigger',handle : 'end'}
                    ]
                },
                // if current.score is high enough proceed to next trial
                {
                    conditions: [
                        {type:'custom',fn: function(){ return current.score >= 10;}}
                    ],
                    actions: [
                        { type:'goto', destination: 'next'}
                    ]
                },
                {
                    conditions: [ {type:'inputEquals',value:'end'} ],
                    actions: [ {type:'endTrial'} ]
                }

            ]
        }
    ]);

    return API.script;
});
