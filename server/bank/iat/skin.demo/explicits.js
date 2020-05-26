define(['questAPI'], function(Quest){
	
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, //Change to true if you don't want to show the submit button.
        v1style: 2,
        header: 'Questionnaire',
        decline: true,
        declineText: isTouch ? 'Decline' : 'Decline to Answer', 
        autoFocus:true, 
        progressBar: isTouch ? 'Page <%= pagesMeta.number %> out of 3' : 'Page <%= pagesMeta.number %> out of 6'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch ? 'Please select an answer, or click \'Decline\'' : 
                'Please select an answer, or click \'Decline to Answer\''
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 3 %>',
        helpText: 'Tip: For quick response, click to select your answer, and then click again to submit.'
    });

    API.addQuestionsSet('basicSelect',{
        inherit :'basicQ',
        type: 'selectOne'
    });
	
    API.addQuestionsSet('basicDropdown',{
        inherit :'basicQ',
        type : 'dropdown',
        autoSubmit:false
    });
	
    API.addQuestionsSet('therm',{
        inherit: 'basicSelect',
        answers: [
            {text:'10 - Extremely warm', value:10},
            {text:'9 - Very warm', value:9},
            {text:'8 - Moderately warm', value:8},
            {text:'7 - Somewhat warm', value:7},
            {text:'6 - Slightly warm', value:6},
            {text:'5 - Neither warm nor cold', value:5},
            {text:'4 - Slightly cold', value:4},
            {text:'3 - Somewhat cold', value:3},
            {text:'2 - Moderately cold', value:2},
            {text:'1 - Very cold', value:1},
            {text:'0 - Extremely cold', value:0}
        ]
    });
	
    /**
	*Specific questions
	*/	
    API.addQuestionsSet('att7',{
        inherit : 'basicSelect',
        name: 'att7',
        stem: 'Which statement best describes you?',
        answers: [
            {text:'I strongly prefer Dark Skinned People to Light Skinned People', value:1},
            {text:'I moderately prefer Dark Skinned People to Light Skinned People', value:2},
            {text:'I slightly prefer Dark Skinned People to Light Skinned People', value:3},
            {text:'I like Light Skinned People and Dark Skinned People equally', value:4},
            {text:'I slightly prefer Light Skinned People to Dark Skinned People', value:5},
            {text:'I moderately prefer Light Skinned People to Dark Skinned People', value:6},
            {text:'I strongly prefer Light Skinned People to Dark Skinned People', value:7}
		
        ]
    });
	
    API.addQuestionsSet('thermDark',{
        inherit : 'therm',
        name: 'Tdark',
        stem: 'How warm or cold do you feel towards <b>Dark Skinned People</b>?'
    });
    API.addQuestionsSet('thermLight',{
        inherit : 'therm',
        name: 'Tlight',
        stem: 'How warm or cold do you feel towards <b>Light Skinned People</b>?'
    });

    API.addQuestionsSet('myskin',{
        inherit : 'basicSelect',
        name: 'myskin',
        stem: 'I consider my skin tone to be:',
        answers: [
            {text:'Very light',value:1},
            {text:'Light',value:2},
            {text:'Somewhat light',value:3},
            {text:'Medium',value:4},
            {text:'Somewhat dark',value:5},
            {text:'Dark',value:6},
            {text:'Very dark',value:7},
        ]
    });
		
    API.addQuestionsSet('preferskin',{
        inherit : 'basicSelect',
        name: 'preferskin',
        stem: 'I would prefer my skin tone to:',
        answers: [
            {text:'Be much lighter',value:1},
            {text:'Be somewhat lighter',value:2},
            {text:'Stay the same',value:3},
            {text:'Be somewhat darker',value:4},
            {text:'Be much darker',value:5}
        ]
    });
	
    API.addQuestionsSet('comptoothers',{
        inherit : 'basicSelect',
        name: 'comptoothers',
        stem: 'Compared with others in my racial/ethnic group, I consider my skin-tone to be:',
        answers: [
            {text:'Much lighter',value:1},
            {text:'Somewhat lighter',value:2},
            {text:'About the same',value:3},
            {text:'Somewhat darker',value:4},
            {text:'Much darker',value:5}
        ]
    });


	
    if (isTouch)
    {//Only three questions for touch
        API.addSequence([
            {
                mixer : 'random', 
                data : [
                    {
                        mixer : 'random', 
                        wrapper:true, 
                        data : [
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'thermDark'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'thermLight'}							
                            }
                        ]
                    },
                    {
                        inherit:'basicPage', 
                        questions: {inherit:'att7'}
                    }
						
					
                ]
            }		
        ]);
    }
    else
    {
        API.addSequence([
            //First, we present the three direct liking questions.
            {
                mixer : 'random', 
                data : [
                    {
                        mixer : 'random', 
                        wrapper:true, 
                        data : [
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'thermDark'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'thermLight'}							
                            }
                        ]
                    },
                    {
                        inherit:'basicPage', 
                        questions: {inherit:'att7'}
                    },
					
                ]
            },
            //Next, all the other questions
            {
                mixer : 'random', 
                data : [
                    {
                        mixer : 'random', 
                        wrapper:true, 
                        data : [
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'myskin'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'preferskin'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'comptoothers'}
                            }
                        ]
                    }
                ]
            }
			
        ]);
    }
    return API.script;
});

