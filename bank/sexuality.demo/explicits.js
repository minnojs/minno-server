define(['questAPI'], function(Quest){
	
	var API = new Quest();
	var isTouch = API.getGlobal().$isTouch;
	
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
		progressBar: isTouch ? 'Page <%= pagesMeta.number %> out of 5' : 'Page <%= pagesMeta.number %> out of 12'
	});
	
    /**
	* Question prototypes
	*/
	API.addQuestionsSet('basicQ',{
		decline: 'true',
		required : true, 		
		errorMsg: {
			required: isTouch ? "Please select an answer, or click 'Decline'" : 
			"Please select an answer, or click 'Decline to Answer'"
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
		name: 'att',
		stem: 'Which statement best describes you?',
		answers: [
			{text:'I strongly prefer Straight people to Gay people.',value:7},
			{text:'I moderately prefer Straight people to Gay people.',value:6},
			{text:'I slightly prefer Straight people to Gay people.',value:5},
			{text:'I like Gay people and Straight people equally.',value:4},
			{text:'I slightly prefer Gay people to Straight people.',value:3},
			{text:'I moderately prefer Gay people to Straight people.',value:2},
			{text:'I strongly prefer Gay people to Straight people.',value:1},
		]
	});
	
    API.addQuestionsSet('thermStraightMen',{
		inherit : 'therm',
		name: 'Tstraightmen',
		stem: 'Please rate how warm or cold you feel toward the following group.<br/><br/><b>Straight men</b>'
	});
    API.addQuestionsSet('thermGayMen',{
		inherit : 'therm',
		name: 'Tgaymen',
		stem: 'Please rate how warm or cold you feel toward the following group.<br/><br/><b>Gay men</b>'
	});
    
    
      API.addQuestionsSet('thermStraightWomen',{
		inherit : 'therm',
		name: 'Tstraightwomen',
		stem: 'Please rate how warm or cold you feel toward the following group.<br/><br/><b>Straight women</b>'
	});
    API.addQuestionsSet('thermGayWomen',{
		inherit : 'therm',
		name: 'Tgayleswomen',
		stem: 'Please rate how warm or cold you feel toward the following group.<br/><br/><b>Gay/Lesbian women</b>'
	});

	
    API.addQuestionsSet('sexuality',{
		inherit : 'basicSelect',
		name: 'sexuality001',
		stem: 'Do you consider yourself to be:',
		answers: [
			{text:'Heterosexual or Straight',value:1},
			{text:'Lesbian or Gay',value:2},
			{text:'Bisexual',value:3},
			{text:'Queer',value:4},
			{text:'Other',value:5}
		]
	});

	API.addQuestionsSet('contactmet',{
		inherit : 'basicSelect',
		name: 'contactmet_num',
		stem: 'Have you ever met a gay person?',
		answers: [
			{text:'Yes',value:1},
			{text:'No',value:2}
		]
	});

	API.addQuestionsSet('contactfriendly',{
		inherit : 'basicSelect',
		name: 'contactfriendly_num',
		stem: 'Do you have friendly interactions with gay people on a regular basis?',
		answers: [
			{text:'Yes',value:1},
			{text:'No',value:2}
		]
	});
	
	API.addQuestionsSet('contactfamily',{
		inherit : 'basicSelect',
		name: 'contactfamily_num',
		stem: 'Do you have a family member who is gay?',
		answers: [
			{text:'Yes',value:1},
			{text:'No',value:2}
		]
	});
	
	API.addQuestionsSet('contactfriend',{
		inherit : 'basicSelect',
		name: 'contactfriend_num',
		stem: 'Do you have a friend who is gay?',
		answers: [
			{text:'Yes',value:1},
			{text:'No',value:2}
					]
	});

	API.addQuestionsSet('relationslegal',{
		inherit : 'basicSelect',
		name: 'relationslegal',
		stem: 'Do you think homosexual relations between consenting adults should or should not be legal?',
		answers: [
			{text:'Should be legal',value:1},
			{text:'Should not be legal',value:2},
			{text:'No opinion',value:3}
		]
	});

	API.addQuestionsSet('marriagerights',{
		inherit : 'basicSelect',
		name: 'marriagerights',
		stem: 'Do you think marriages between same-sex partners should or should not be recognized by the law as valid, with the same rights as traditional marriages?',
		answers: [
			{text:'Should be valid',value:1},
			{text:'Should not be valid',value:2},
			{text:'No opinion',value:3}
		]
	});

	API.addQuestionsSet('serverights',{
		inherit : 'basicSelect',
		name: 'serverights',
		stem: 'Do you think it should be legal for business owners to refuse to serve same-sex partners?',
		answers: [
			{text:'Should be legal',value:1},
			{text:'Should not be legal',value:2},
			{text:'No opinion',value:3}
		]
	});

	API.addQuestionsSet('adoptchild',{
		inherit : 'basicSelect',
		name: 'adoptchild',
		stem: 'Do you think it should be legal for same-sex partners to adopt a child?',
		answers: [
		    {text:'Should be legal',value:1},
			{text:'Should not be legal',value:2},
			{text:'No opinion',value:3}
		]
	});

	API.addQuestionsSet('transgender',{
		inherit : 'basicSelect',
		name: 'transgender',
		stem: 'Which of the following statements best reflects your belief?',
		answers: [
			{text:'Transgender people should use the bathroom/locker rooms of the sex they were assigned at birth',value:1},
			{text:'Transgender people should use the bathrooms/locker rooms of their preferred gender identity',value:2}
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
								questions: {inherit:'thermStraightMen'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'thermGayMen'}							
							}
						]
					},
					
					{
						mixer : 'random', 
						wrapper:true, 
						data : [
							{
								inherit:'basicPage', 
								questions: {inherit:'thermStraightWomen'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'thermGayWomen'}							
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
			    mixer:'random',
			    data: [
			
			{
				mixer : 'random', 
				wrapper:true,
				data : [
					{
						mixer : 'random', 
						wrapper:true, 
						data : [
							{
								inherit:'basicPage', 
								questions: {inherit:'thermStraightMen'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'thermGayMen'}							
							}
						]
					},
					
					{
						mixer : 'random', 
						wrapper:true, 
						data : [
							{
								inherit:'basicPage', 
								questions: {inherit:'thermStraightWomen'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'thermGayWomen'}							
							}
						]
					}
				]
			},
					{
						inherit:'basicPage', 
						questions: {inherit:'att7'}
					}
				]
			},		
			//Next, all the other questions
			
	    {
	        mixer:'random',
	        data: [
		
			{
			    inherit:'basicPage',
			    questions:[
			        {inherit:'sexuality',required:true}
			]
			},
			
			{
				inherit:'basicPage', 
				questions: [
				{inherit:'contactmet', required:true},
							
						
					{		
			            mixer: 'multiBranch',
						remix:true,
						branches: [
					        {
							conditions:[{compare:'questions.contactmet_num.response',to:1}],
							data: [{inherit:'contactfriendly'}, {inherit:'contactfamily'}, {inherit:'contactfriend'}]
					            
					        }, 
						]
					}
				]
			},
		
			
								
				
				
		            {
							mixer : 'random', 
							wrapper:true, 
							data : [
							{
								inherit:'basicPage', 
								questions: {inherit:'relationslegal'}
							},
							
							{
								inherit:'basicPage', 
								questions: {inherit:'marriagerights'}
							},
							
							{
								inherit:'basicPage', 
								questions: {inherit:'serverights'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'adoptchild'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'transgender'}
							}
						]
					}
				]
	        }
				
		
				
			
				
			
			
		]);
	}
	return API.script;
});


