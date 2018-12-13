

define(['questAPI'], function(Quest){
    var API = new Quest();

	API.addQuestionsSet('basicSelect', 
	{
		type: 'selectOne',
		autoSubmit:true,
		numericValues:true, 
		required : true, 		
		errorMsg: {
			required: 
			"Please select an answer, or click 'Decline to Answer'"
		},
		helpText: 'Selecting an answer once colors it blue.<br/>You can change your answer by selecting another option.<br/>To confirm, click the selected (blue) button a second time.'   
	});
    
API.addPagesSet('qPage', 
	{
		progressBar: '<%= pagesMeta.number %> out of 7',
         header: 'Questionnaire',
		decline:true,
		v1style:2,
		numbered: false
	});

    API.addSequence([
    {mixer:'random', // declare the mixer
    data:[
    // 1. This is a page object
    {
        // It has a questions property
	inherit:'qPage',
        questions:[
            // 2a. But only one question
            {
                inherit : {set:'basicSelect'},
                name: 'mr1',
		stem: "Over the past few years, Black people have gotten more economically than they deserve.",
		answers: ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]
            }
        ]
    },
    {
        // It has a questions property
	inherit:'qPage',
        questions:[
            // 1a. This is the first question (a text input):
            {
                inherit : {set:'basicSelect'},
                name: 'mr2',
		stem: "Over the past few years, the government and news media have shown more respect for Black people than they deserve.",
		answers: ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]
            }
        ]
    },
    {
        // It has a questions property
	inherit:'qPage',
        questions:[
            // 1a. This is the first question (a text input):
            {
                inherit : {set:'basicSelect'},
                name: 'mr3',
		stem: "It is easy to understand the anger of Black people.",
		answers: ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]
            }
        ]
    },
    {
        // It has a questions property
	inherit:'qPage',
        questions:[
            // 1a. This is the first question (a text input):
            {
                inherit : {set:'basicSelect'},
                name: 'mr4',
		stem: "Discrimination against Black people is no longer a problem.",
		answers: ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]
    }
        ]
    },
    {
        // It has a questions property
	inherit:'qPage',
        questions:[
            // 1a. This is the first question (a text input):
            {
                inherit : {set:'basicSelect'},
                name: 'mr5',
		stem: "Black people are getting too demanding in their push for equal rights.",
		answers: ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]
            }
        ]
    },
    {
        // It has a questions property
	inherit:'qPage',
        questions:[
            // 1a. This is the first question (a text input):
            {
                inherit : {set:'basicSelect'},
                name: 'mr6',
		stem: "Black people should not push themselves where they are not wanted.",
		answers: ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]
            }
        ]
    },
    {
        // It has a questions property
	inherit:'qPage',
        questions:[
            // 1a. This is the first question (a text input):
            {
                inherit : {set:'basicSelect'},
                name: 'mr7',
		stem: "Black people have more influence upon school desegregation plans than they ought to have.",
		answers: ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]
            }
        ]
    }
    ]}
]);
	return API.script;
});
















