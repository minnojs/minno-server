define(['questAPI'], function(Quest){
	
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
    API.addSettings('DEBUG', {level: 'error'});
	
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
        progressBar: isTouch ? 'Page <%= pagesMeta.number %> out of 3' : 'Page <%= pagesMeta.number %> out of 8'
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
		
    API.addQuestionsSet('agree',{
        inherit: 'basicSelect',
        answers: [
            {text:'Strongly agree', value:3},
            {text:'Moderately agree', value:2},
            {text:'Slightly agree', value:1},
            {text:'Neutral', value:0},
            {text:'Slightly disagree', value:-1},
            {text:'Moderately disagree', value:-2},
            {text:'Strongly disagree', value:-3}
        ]
    });
	
    /**
	*Specific questions
	*/	
    
    API.addQuestionsSet('thermArab',{
        inherit : 'therm',
        name: 'tarab',
        stem: 'How warm or cold do you feel towards <b>Arab Muslims</b>?'
    });
    API.addQuestionsSet('thermOther',{
        inherit : 'therm',
        name: 'tother',
        stem: 'How warm or cold do you feel towards <b>Other People</b>?'
    });

	
    API.addQuestionsSet('att7',{
        inherit : 'basicSelect',
        name: 'att7',
        stem: 'Which statement best describes you?',
        answers: [
            {text:'I strongly prefer Other People to Arab Muslims',value:7},
            {text:'I moderately prefer Other People to Arab Muslims',value:6},
            {text:'I slightly prefer Other People to Arab Muslims',value:5},
            {text:'I like Other People and Arab Muslims equally',value:4},
            {text:'I slightly prefer Arab Muslims to Other People',value:3},
            {text:'I moderately prefer Arab Muslims to Other People',value:2},
            {text:'I strongly prefer Arab Muslims to Other People',value:1}
			
        ]
    });
	
	   API.addQuestionsSet('ems1',{
        inherit : 'agree',
        name: 'ems1',
        stem: 'Because of today\'s standards I try to appear nonprejudiced toward Arab Muslims.'
    });
		
	   API.addQuestionsSet('ems4',{
        inherit : 'agree',
        name: 'ems4',
        stem: 'I attempt to appear nonprejudiced toward Arab Muslims in order to avoid disapproval from others.'
    });
		
	  API.addQuestionsSet('ims3',{
        inherit : 'agree',
        name: 'ims3',
        stem: 'I am personally motivated by my beliefs to be nonprejudiced toward Arab Muslims.'
    });
		
	  API.addQuestionsSet('ims4',{
        inherit : 'agree',
        name: 'ims4',
        stem: 'Because of my personal values, I believe that using stereotypes about Arab Muslims is wrong.'
    });
		
	  API.addQuestionsSet('religiouspref',{
        inherit : 'basicSelect',
        name: 'religiouspref',
        stem: 'What is your religious preference:',
        answers:[
            {text:'Protestant',value:1},
            {text:'Roman Catholic',value:2},
            {text:'Orthodox Christian',value:3},
            {text:'Jewish',value:4},
            {text:'Muslim',value:5},
            {text:'Hindu',value:6},
            {text:'Buddhist',value:7},
            {text:'Something else',value:8}		
        ]
    });
	
	  API.addQuestionsSet('muslimType',{
        inherit : 'basicSelect',
        name: 'muslimtype',
        stem: 'Are you:',
        answers:[
            {text:'Shi\'a',value:1},
            {text:'Sunni',value:2},
            {text:'Nation of Islam',value:3},
            {text:'Another tradition',value:4}
        ]
    });
	
	 API.addQuestionsSet('muslimIdentify',{
        inherit : 'basicSelect',
        name: 'muslimidentify',
        stem: 'In terms of your ethnicity, heritage, or cultural background, do you identify as Arabic?',
        answers:[
            {text:'Yes',value:1},
            {text:'No',value:2}
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
                                questions: {inherit:'thermArab'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'thermOther'}							
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
                                questions: {inherit:'thermArab'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'thermOther'}							
                            }
                        ]
                    },
				
                    {
                        inherit:'basicPage', 
                        questions: {inherit:'att7'}
                    }
                ]
            },
			
            {
                mixer : 'random', 
                data : [
                    {
                        mixer : 'random', 
                        wrapper:true, 
                        data : [
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'ems1'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'ems4'}							
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'ims4'}							
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'ims3'}							
                            }
                        ]
                    },	
					
					
                    {
                        inherit:'basicPage', 
                        questions:[
							    {inherit:'religiouspref'},
					
                            {		
			            mixer: 'branch',
                                remix:true,
                                conditions:[{compare:'questions.religiouspref.response',to:5}],
                                data: [{inherit:'muslimType'}]
                            },
					            
						
			        {		
			            mixer: 'branch',
                                remix:true,
					    conditions:{or:[{compare:'questions.muslimtype.response',to:1},
							            {compare:'questions.muslimtype.response',to:2},
							            {compare:'questions.muslimtype.response',to:3},
							            {compare:'questions.muslimtype.response',to:4}]},
                                data: [{inherit:'muslimIdentify'}]
		    	    }
	   	        ]
	        }	
                ]
            }
		
		
			
        ]);
    }
    return API.script;
});





