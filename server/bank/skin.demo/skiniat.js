define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.1/IAT/iat6.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();
    let isTouch = API.getGlobal().$isTouch;
    
    let darkMedia = []; 
    for(let dImage = 0; dImage < global.darkImages.length; dImage++)
    {
	    darkMedia.push({image:global.darkImages[dImage]});
    }
	
	 let lightMedia = []; 
    for(let lImage = 0; lImage < global.lightImages.length; lImage++)
    {
	    lightMedia.push({image:global.lightImages[lImage]});
    }
	
    
    return iatExtension({
        category1 : {
            name : 'Dark Skinned People', //Will appear in the data.
            title : {
                media : isTouch ? {word:global.darkLabelText} : {image:global.darkImagesLabel}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia :  darkMedia, 
    	    
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category2 :    {
            name : 'Light Skinned People', //Will appear in the data.
            title : {
                media : isTouch ? {word:global.lightLabelText} : {image:global.lightImagesLabel}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia :  lightMedia, 
    		//Stimulus css (style)
    		stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
        attribute1 :
		{
		    name : 'Bad',
		    title : {
		        media : {word : 'Bad'},
		        css : {color:'#0000FF','font-size':'1.8em'},
		        height : 4 //Used to position the "Or" in the combined block.
		    },
		    stimulusMedia : [ //Stimuli content as PIP's media objects
		        {word: global.negWords[0]},
		        {word: global.negWords[1]},
		        {word: global.negWords[2]},
		        {word: global.negWords[3]},
		        {word: global.negWords[4]},
		        {word: global.negWords[5]},
		        {word: global.negWords[6]},
		        {word: global.negWords[7]}
		    ],
		    //Stimulus css
		    stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
        attribute2 :
		{
		    name : 'Good',
		    title : {
		        media : {word : 'Good'},
		        css : {color:'#0000FF','font-size':'1.8em'},
		        height : 4 //Used to position the "Or" in the combined block.
		    },
		    stimulusMedia : [ //Stimuli content as PIP's media objects
		        {word: global.posWords[0]},
		        {word: global.posWords[1]},
		        {word: global.posWords[2]},
		        {word: global.posWords[3]},
		        {word: global.posWords[4]},
		        {word: global.posWords[5]},
		        {word: global.posWords[6]},
		        {word: global.posWords[7]}
		    ],
		    //Stimulus css
		    stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
        base_url : {//Where are your images at?
            image : global.baseURL
        },
        isTouch : global.$isTouch
    });
});
