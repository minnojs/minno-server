/**
 * minno-time does not come with a built in way to do complex animations.
 * This is a simple example for how to animate a stimulus across the screen.
 *
 * We use a custom action to activate the animation, and grab the specific trial using it's handle.
 * Then we simply use vanilla javascript to get the animation going (see the animation function below).
 * You can copy the function into your task and reuse it for your needs.
 * Documentation for the function can be found in the comment just above it.
 * Note that any resize of the screen will return the stimuli to their original location.
 */

define(['pipAPI'], function(APIconstructor) {
    let API = new APIconstructor();

    API.addSettings('base_url','images/');

    API.addSequence([
        {
            input: [{handle:'space', on: 'space'}], 
            stimuli: [
                {
                    handle:'left',
                    media: {image:'green.jpg'},
                    size: {height:20,width:20},
                    location: {top:10, right:10}
                },
                {
                    handle:'right',
                    media: {image:'blue.jpg'},
                    size: {height:20,width:20},
                    location: {top:10,left:10}
                }
            ],
            interactions: [
                {
                    conditions: [{type: 'begin'}],
                    actions: [
                        {type:'showStim', handle:'All'},
                        {type:'custom', fn: function(action, input, trial){
                            animate(trial.canvas, 'left', { duration: 2000, topShift: 0.60, leftShift: -0.60});
                            animate(trial.canvas, 'right', { duration: 2000, leftShift: 0.60});
                        }}
                    ]
                },
                {
                    conditions: [{type:'inputEquals',value:'end'}],
                    actions: [{type:'endTrial'}]
                }
            ]
        }
    ]);

    return API.script;

    /**
     * This function animates a single stimulus on the vertical and horizontal axis.
     *
     * @param canvas HTMLelement The canvas element grabbed from the trial
     * @param handle String The handle for the stimulus to be animated
     * @param opts.duration Integer The duration of the animation
     * @param opts.leftShift Float How much the element should be moved horizontaly in percent of the canvas. May be negative.
     * @param opts.topShift Float How much the element should be moved vertically in percent of the canvas. May be negative.
     **/
    function animate(canvas, handle, opts){
        let canvasSize = canvas.getBoundingClientRect();
        let el = document.querySelector('[data-handle="' + handle + '"]');

        let leftStart = el.offsetLeft;
        let topStart = el.offsetTop;
        let startTime = performance.now();
        let duration = opts.duration;

        loop();

        function loop(){
            let delta = performance.now() - startTime;
            opts.leftShift && (el.style.left = (leftStart + opts.leftShift * canvasSize.width * Math.min(duration, delta)/duration) + 'px');
            opts.topShift && (el.style.top = (topStart + opts.topShift * canvasSize.height * Math.min(duration, delta)/duration) + 'px');
            if (delta < duration) requestAnimationFrame(loop);
        }
    }
});
