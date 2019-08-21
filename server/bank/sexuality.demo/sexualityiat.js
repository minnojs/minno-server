define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.1/IAT/iat7.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();
	
    //Get the stimuli for the gay category
    let gayMedia = []; 
    for(let iImage = 0; iImage < global.gayImages.length; iImage++)
    {
	    gayMedia.push({image:global.gayImages[iImage]});
    }
    for(let iWord = 0; iWord < global.gayWords.length; iWord++)
    {
	    gayMedia.push({word:global.gayWords[iWord]});
    }

    return iatExtension({
    	 attribute1 : {
            name : 'Good', //Will appear in the data.
            title : {
                media : {word : 'Good'}, //Name of the category presented in the task.
                css : {color:'#0000FF','font-size':'1.8em'}, //Style of the category title.
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
            //Stimulus css (style)
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },	
        attribute2 :	{
            name : 'Bad', //Will appear in the data.
            title : {
                media : {word : 'Bad'}, //Name of the category presented in the task.
                css : {color:'#0000FF','font-size':'1.8em'}, //Style of the category title.
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
	    category1 : {
            name : 'Straight people', //Will appear in the data.
            title : {
                media : {word : 'Straight people'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : 
			[ //Stimuli content as PIP's media objects
			    {image: '06_hetero.jpg'},
			    {word: 'Straight'},
			    {word: 'Heterosexual'},
			    {word: 'Straight People'}
			], 
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
    	category2 :	{
            name : 'Gay people', //Will appear in the data.
            title : {
                media : {word : 'Gay people'}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : gayMedia, 
            //Stimulus css
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
		
        base_url : {//Where are your images at?
            image : global.baseURL
        },
        
       	fb_strong_Att1WithCatA_Att2WithCatB : 'Your data suggest a strong automatic preference for categoryA over categoryB.',
        fb_moderate_Att1WithCatA_Att2WithCatB : 'Your data suggest a moderate automatic preference for categoryA over categoryB.',
        fb_slight_Att1WithCatA_Att2WithCatB : 'Your data suggest a slight automatic preference for categoryA over categoryB.',
        fb_equal_CatAvsCatB : 'Your data suggest no automatic preference between categoryA and categoryB.',


        isTouch : API.getGlobal().$isTouch
    });
});







