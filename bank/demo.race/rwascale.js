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
		progressBar: '<%= pagesMeta.number %> out of 20',
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
                name: 'rwaf1',
		stem: 'Our country desperately needs a mighty leader who will do what has to be done to destroy the radical new ways and sinfulness that are ruining us.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf2',
		stem: 'Gays and lesbians are just as healthy and moral as anybody else.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf3',
		stem: 'It is always better to trust the judgment of the proper authorities in government and religion than to listen to the noisy rabble-rousers in our society who are trying to create doubt in people\'s minds.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf4',
		stem: 'Atheists and others who have rebelled against the established religions are no doubt every bit as good and virtuous as those who attend church regularly.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf5',
		stem: 'The only way our country can get through the crisis ahead is to get back to our traditional values, put some tough leaders in power, and silence the troublemakers spreading bad ideas.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf6',
		stem: 'There is absolutely nothing wrong with nudist camps.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf7',
		stem: 'Our country needs free thinkers who have the courage to defy traditional ways, even if this upsets many people.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf8',
		stem: 'Our country will be destroyed someday if we do not smash the perversions eating away at our moral fiber and traditional beliefs.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf9',
		stem: 'Everyone should have their own lifestyle, religious beliefs, and sexual preferences, even if it makes them different from everyone else.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf10',
		stem: 'The &#145;old-fashioned ways&#146; and the &#145;old-fashioned values&#146; still show the best way to live.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf11',
		stem: 'You have to admire those who challenged the law and the majority&#8217;s view by protesting for women&#8217;s abortion rights, for animal rights, or to abolish school prayer.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf12',
		stem: 'What our country really needs is a strong, determined leader who will crush evil, and take us back to our true path.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf13',
		stem: 'Some of the best people in our country are those who are challenging our government, criticizing religion, and ignoring the normal way things are supposed to be done.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf14',
		stem: 'God&#8217;s laws about abortion, pornography and marriage must be strictly followed before it is too late, and those who break them must be strongly punished.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf15',
		stem: 'There are many radical, immoral people in our country today, who are trying to ruin it for their own godless purposes, whom the authorities should put out of action.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf16',
		stem: 'A &#145;woman&#8217;s place&#146; should be wherever she wants to be.  The days when women are submissive to their husbands and social conventions belong strictly in the past.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
            }
        ]
    },
     // It has a questions property
    {
	inherit:'qPage',
        questions:[
            // 2a. But only one question
            {
                inherit : {set:'basicSelect'},
                name: 'rwaf17',
		stem: 'Our country will be great if we honor the ways of our forefathers, do what the authorities tell us to do, and get rid of the &#145;rotten apples&#146 who are ruining everything.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf18',
		stem: 'There is no &#145;ONE right way&#146; to live life; everybody has to create their own way.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf19',
		stem: 'Homosexuals and feminists should be praised for being brave enough to defy traditional family values.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
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
                name: 'rwaf20',
		stem: 'This country would work a lot better if certain groups of troublemakers would just shut up and accept their group\'s traditional place in society.',
		answers: ['Very strongly disagree','Strongly disagree', 'Moderately disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Moderately agree', 'Strongly agree', 'Very strongly agree']
    }
        ]
    }
    ]}
]);
	return API.script;
});














