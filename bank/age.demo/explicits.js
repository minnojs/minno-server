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
		progressBar: isTouch ? 'Page <%= pagesMeta.number %> out of 3' : 'Page <%= pagesMeta.number %> out of 11'
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
		
			
    API.addQuestionsSet('age',{
		inherit: 'basicDropdown',
		answers: [
			{text:'1',value:1},
			{text:'2',value:2},
			{text:'3',value:3},
			{text:'4',value:4},
			{text:'5',value:5},
			{text:'6',value:6},
			{text:'7',value:7},
			{text:'8',value:8},
			{text:'9',value:9},
			{text:'10',value:10},
			{text:'11',value:11},
			{text:'12',value:12},
			{text:'13',value:13},
			{text:'14',value:14},
			{text:'15',value:15},
			{text:'16',value:16},
			{text:'17',value:17},
			{text:'18',value:18},
			{text:'19',value:19},
			{text:'20',value:20},
			{text:'21',value:21},
			{text:'22',value:22},
			{text:'23',value:23},
			{text:'24',value:24},
			{text:'25',value:25},
			{text:'26',value:26},
			{text:'27',value:27},
			{text:'28',value:28},
			{text:'29',value:29},
			{text:'30',value:30},
			{text:'31',value:31},
			{text:'32',value:32},
			{text:'33',value:33},
			{text:'34',value:34},
			{text:'35',value:35},
			{text:'36',value:36},
			{text:'37',value:37},
			{text:'38',value:38},
			{text:'39',value:39},
			{text:'40',value:40},
			{text:'41',value:41},
			{text:'42',value:42},
			{text:'43',value:43},
			{text:'44',value:44},
			{text:'45',value:45},
			{text:'46',value:46},
			{text:'47',value:47},
			{text:'48',value:48},
			{text:'49',value:49},
			{text:'50',value:50},
			{text:'51',value:51},
			{text:'52',value:52},
			{text:'53',value:53},
			{text:'54',value:54},
			{text:'55',value:55},
			{text:'56',value:56},
			{text:'57',value:57},
			{text:'58',value:58},
			{text:'59',value:59},
			{text:'60',value:60},
			{text:'61',value:61},
			{text:'62',value:62},
			{text:'63',value:63},
			{text:'64',value:64},
			{text:'65',value:65},
			{text:'66',value:66},
			{text:'67',value:67},
			{text:'68',value:68},
			{text:'69',value:69},
			{text:'70',value:70},
			{text:'71',value:71},
			{text:'72',value:72},
			{text:'73',value:73},
			{text:'74',value:74},
			{text:'75',value:75},
			{text:'76',value:76},
			{text:'77',value:77},
			{text:'78',value:78},
			{text:'79',value:79},
			{text:'80',value:80},
			{text:'81',value:81},
			{text:'82',value:82},
			{text:'83',value:83},
			{text:'84',value:84},
			{text:'85',value:85},
			{text:'86',value:86},
			{text:'87',value:87},
			{text:'88',value:88},
			{text:'89',value:89},
			{text:'90',value:90},
			{text:'91',value:91},
			{text:'92',value:92},
			{text:'93',value:93},
			{text:'94',value:94},
			{text:'95',value:95},
			{text:'96',value:96},
			{text:'97',value:97},
			{text:'98',value:98},
			{text:'99',value:99},
			{text:'100',value:100},
			{text:'101',value:101},
			{text:'102',value:102},
			{text:'103',value:103},
			{text:'104',value:104},
			{text:'105',value:105},
			{text:'106',value:106},
			{text:'107',value:107},
			{text:'108',value:108},
			{text:'109',value:109},
			{text:'110',value:110},
			{text:'111',value:111},
			{text:'112',value:112},
			{text:'113',value:113},
			{text:'114',value:114},
			{text:'115',value:115}
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
			{text:'I strongly prefer Young people to Old people.',value:7},
			{text:'I moderately prefer Young people to Old people.',value:6},
			{text:'I slightly prefer Young people to Old people.',value:5},
			{text:'I like Young people and Old people equally.',value:4},
			{text:'I slightly prefer Old people to Young people.',value:3},
			{text:'I moderately prefer Old people to Young people.',value:2},
			{text:'I strongly prefer Old people to Young people.',value:1}
		]
	});
	
    API.addQuestionsSet('thermOld',{
		inherit : 'therm',
		name: 'Told_0to10',
		stem: 'How warm or cold do you feel towards <b>Old people</b>?'
	});
    API.addQuestionsSet('thermYoung',{
		inherit : 'therm',
		name: 'Tyoung_0to10',
		stem: 'How warm or cold do you feel towards <b>Young people</b>?'
	});


	API.addQuestionsSet('feel',{
		inherit : 'age',
		name: 'feel',
		stem: 'How old do you feel?'
	});

	API.addQuestionsSet('othersthink',{
		inherit : 'age',
		name: 'othersthink',
		stem: 'On average, how old do other people think you are?'
			
	});
			
	API.addQuestionsSet('choosetobe',{
		inherit : 'age',
		name: 'choosetobe',
		stem: 'If you could choose, what age would you be?'
	});


			
	API.addQuestionsSet('hopetolive',{
		inherit : 'age',
		name: 'hopetolive',
		stem: 'To what age do you hope to live?'
	});
		
			
	API.addQuestionsSet('ctoya',{
		inherit : 'age',
		name: 'ctoya',
		stem: 'The categories child, young adult, middle-aged, and old are commonly used to describe life stages. At what age do you believe that a person moves from one age category to the next?<br/><br/>A person moves from being a <b>child</b> to being a <b>young adult</b> at what age?'
	});	
			
						
	API.addQuestionsSet('yatoa',{
		inherit : 'age',
		name: 'yatoa',
		stem: 'The categories child, young adult, middle-aged, and old are commonly used to describe life stages. At what age do you believe that a person moves from one age category to the next?<br/><br/>A person moves from being a <b>young adult</b> to being an <b>adult</b> at what age?'
		
	});	
			
	API.addQuestionsSet('atoma',{
		inherit : 'age',
		name: 'atoma',
		stem: 'The categories child, young adult, middle-aged, and old are commonly used to describe life stages. At what age do you believe that a person moves from one age category to the next?<br/><br/>A person moves from being an <b>adult</b> to <b>middle-aged</b> at what age?'
	
	});	
			
			
						
	API.addQuestionsSet('matoo',{
		inherit : 'age',
		name: 'matoo',
		stem: 'The categories child, young adult, middle-aged, and old are commonly used to describe life stages. At what age do you believe that a person moves from one age category to the next?<br/><br/>A person moves from being <b>middle-aged</b> to being <b>old</b> at what age?'
	
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
								questions: {inherit:'thermOld'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'thermYoung'}							
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
								questions: {inherit:'thermOld'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'thermYoung'}							
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
				mixer : 'random', 
				data : [
					{
						mixer : 'random',
						wrapper:true, 
						data : [
							{
								inherit:'basicPage', 
								questions: {inherit:'feel'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'othersthink'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'choosetobe'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'hopetolive'}
							}
						]
					},
					{
					    mixer:'repeat',
					    times:1, 
					    wrapper:true,
					    data:[
					
							{
								inherit:'basicPage', 
								questions: {inherit:'ctoya'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'yatoa'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'atoma'}
							},
							{
								inherit:'basicPage', 
								questions: {inherit:'matoo'}
							}
						]
					}
				]
			}
		]);
	}
	return API.script;
});
