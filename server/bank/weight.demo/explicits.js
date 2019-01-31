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
        progressBar: isTouch ? 'Page <%= pagesMeta.number %> out of 3' : 'Page <%= pagesMeta.number %> out of 15'
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
            'I strongly prefer Fat people to Thin people.',
            'I moderately prefer Fat people to Thin people.',
            'I slightly prefer Fat people to Thin people.',
            'I like Fat people and Thin people equally.',
            'I slightly prefer Thin people to Fat people.',
            'I moderately prefer Thin people to Fat people.',
            'I strongly prefer Thin people to Fat people.'
        ]
    });
	
    API.addQuestionsSet('thermFat',{
        inherit : 'therm',
        name: 'tfat',
        stem: 'How warm or cold do you feel towards <b>Fat people</b>?'
    });
    API.addQuestionsSet('thermThin',{
        inherit : 'therm',
        name: 'tthin',
        stem: 'How warm or cold do you feel towards <b>Thin people</b>?'
    });

    API.addQuestionsSet('myheight',{
        inherit : 'basicDropdown',
        name: 'myheight002',
        stem: 'Please indicate your height by selecting the most accurate option.',
        answers: [
            'below 3 ft 0 in :: below 91 cm', '3 ft 0 in :: 91 cm','3 ft 1 in :: 94 cm','3 ft 2 in :: 97 cm','3 ft 3 in :: 99 cm','3 ft 4 in :: 102 cm','3 ft 5 in :: 104 cm','3 ft 6 in :: 107 cm','3 ft 7 in :: 109 cm','3 ft 8 in :: 112 cm','3 ft 9 in :: 114 cm','3 ft 10 in :: 117 cm','3 ft 11 in :: 119 cm','4 ft 0 in :: 122 cm','4 ft 1 in :: 124 cm','4 ft 2 in :: 127 cm','4 ft 3 in :: 130 cm','4 ft 4 in :: 132 cm','4 ft 5 in :: 135 cm','4 ft 6 in :: 137 cm','4 ft 7 in :: 140 cm','4 ft 8 in :: 142 cm','4 ft 9 in :: 145 cm','4 ft 10 in :: 147 cm','4 ft 11 in :: 150 cm','5 ft 0 in :: 152 cm','5 ft 1 in :: 155 cm','5 ft 2 in :: 157 cm','5 ft 3 in :: 160 cm','5 ft 4 in :: 163 cm','5 ft 5 in :: 165 cm','5 ft 6 in :: 168 cm','5 ft 7 in :: 170 cm','5 ft 8 in :: 173 cm','5 ft 9 in :: 175 cm','5 ft 10 in :: 178 cm','5 ft 11 in :: 180 cm','6 ft 0 in :: 183 cm','6 ft 1 in :: 185 cm','6 ft 2 in :: 188 cm','6 ft 3 in :: 191 cm','6 ft 4 in :: 193 cm','6 ft 5 in :: 196 cm','6 ft 6 in :: 198 cm','6 ft 7 in :: 201 cm','6 ft 8 in :: 203 cm','6 ft 9 in :: 206 cm','6 ft 10 in :: 208 cm','6 ft 11 in :: 211 cm','7 ft 0 in :: 213 cm','above 7 ft 0 in :: above 213 cm'
        ]
    });
    API.addQuestionsSet('myweight',{
        inherit : 'basicDropdown',
        name: 'myweight002',
        stem: 'Please indicate your weight by selecting the most accurate option.',
        answers: [
            'below 50 lb :: 23 kg', '50 lb :: 23 kg','55 lb :: 25 kg','60 lb :: 27 kg','65 lb :: 30 kg','70 lb :: 32 kg','75 lb :: 34 kg','80 lb :: 36 kg','85 lb :: 39 kg','90 lb :: 41 kg','95 lb :: 43 kg','100 lb :: 45 kg','105 lb :: 48 kg','110 lb :: 50 kg','115 lb :: 52 kg','120 lb :: 55 kg','125 lb :: 57 kg','130 lb :: 59 kg','135 lb :: 61 kg','140 lb :: 64 kg','145 lb :: 66 kg','150 lb :: 68 kg','155 lb :: 70 kg','160 lb :: 73 kg','165 lb :: 75 kg','170 lb :: 77 kg','175 lb :: 80 kg','180 lb :: 82 kg','185 lb :: 84 kg','190 lb :: 86 kg','195 lb :: 89 kg','200 lb :: 91 kg','205 lb :: 93 kg','210 lb :: 95 kg','215 lb :: 98 kg','220 lb :: 100 kg','225 lb :: 102 kg','230 lb :: 105 kg','235 lb :: 107 kg','240 lb :: 109 kg','245 lb :: 111 kg','250 lb :: 114 kg','255 lb :: 116 kg','260 lb :: 118 kg','265 lb :: 120 kg','270 lb :: 123 kg','275 lb :: 125 kg','280 lb :: 127 kg','285 lb :: 130 kg','290 lb :: 132 kg','295 lb :: 134 kg','300 lb :: 136 kg','305 lb :: 139 kg','310 lb :: 141 kg','315 lb :: 143 kg','320 lb :: 145 kg','325 lb :: 148 kg','330 lb :: 150 kg','335 lb :: 152 kg','340 lb :: 155 kg','345 lb :: 157 kg','350 lb :: 159 kg','355 lb :: 161 kg','360 lb :: 164 kg','365 lb :: 166 kg','370 lb :: 168 kg','375 lb :: 170 kg','380 lb :: 173 kg','385 lb :: 175 kg','390 lb :: 177 kg','395 lb :: 180 kg','400 lb :: 182 kg','405 lb :: 184 kg','410 lb :: 186 kg','415 lb :: 189 kg','420 lb :: 191 kg','425 lb :: 193 kg','430 lb :: 195 kg','435 lb :: 198 kg','440 lb :: 200 kg','above 440 lb :: above 200kg'
        ]
    });
	
    API.addQuestionsSet('mostpref',{
        inherit : 'basicSelect',
        name: 'mostpref001',
        stem: 'Do most people prefer Fat people or Thin people?',
        answers: [
            'Most people strongly prefer Fat people to Thin people',
            'Most people somewhat prefer Fat people to Thin people',
            'Most people slightly prefer Fat people to Thin people',
            'Most people like Fat people and Thin people equally ',
            'Most people slightly prefer Thin people to Fat people',
            'Most people somewhat prefer Thin people to Fat people',
            'Most people strongly prefer Thin people to Fat people'
        ]
    });

    API.addQuestionsSet('easytolose',{
        inherit : 'basicSelect',
        name: 'easytolose001',
        stem: 'How easy or difficult would it be for you to lose 5 to 10 pounds if you wanted to?',
        answers: [
            'Very easy',
            'Moderately easy',
            'Somewhat easy',
            'Somewhat difficult',
            'Moderately difficult',
            'Very difficult'
        ]
    });

    API.addQuestionsSet('important',{
        inherit : 'basicSelect',
        name: 'important001',
        stem: 'How important is your weight to your sense of who you are?',
        answers: [
            'Not at all important',
            'Slightly important',
            'Moderately important',
            'Very important',
            'Extremely important'
        ]
    });

    API.addQuestionsSet('othersay',{
        inherit : 'basicSelect',
        name: 'othersay001',
        stem: 'Other people would say that I am:',
        answers: [
            'Very underweight',
            'Moderately underweight',
            'Slightly underweight',
            'Neither underweight nor overweight',
            'Slightly overweight',
            'Moderately overweight',
            'Very overweight'
        ]
    });

    API.addQuestionsSet('iam',{
        inherit : 'basicSelect',
        name: 'iam001',
        stem: 'Currently, I am:',
        answers: [
            'Very underweight',
            'Moderately underweight',
            'Slightly underweight',
            'Neither underweight nor overweight',
            'Slightly overweight',
            'Moderately overweight',
            'Very overweight'
        ]
    });

    API.addQuestionsSet('controlyou',{
        inherit : 'basicSelect',
        name: 'controlyou001',
        stem: 'How much control do you have over your weight?',
        answers: [
            'Complete control',
            'A lot of control',
            'Some control',
            'A little control',
            'No control'
        ]
    });

    API.addQuestionsSet('controlother',{
        inherit : 'basicSelect',
        name: 'controlother001',
        stem: 'How much control do people have over their weight?',
        answers: [
            'Complete control',
            'A lot of control',
            'Some control',
            'A little control',
            'No control'
        ]
    });

    API.addQuestionsSet('comptomost',{
        inherit : 'basicSelect',
        name: 'comptomost001',
        stem: 'Compared to most people I interact with, I am:',
        answers: [
            'Much thinner',
            'Moderately thinner',
            'Slightly thinner',
            'About the same',
            'Slightly fatter',
            'Moderately fatter',
            'Much fatter'
        ]
    });

    API.addQuestionsSet('identthin',{
        inherit : 'basicSelect',
        name: 'identthin001',
        stem: 'How much do you feel similar to people who are thin?',
        answers: [
            'Not at all similar',
            'Somewhat similar',
            'Moderately similar',
            'Very similar',
            'Extremely similar'
        ]
    });

    API.addQuestionsSet('identfat',{
        inherit : 'basicSelect',
        name: 'identfat001',
        stem: 'How much do you feel similar to people who are fat?',
        answers: [
            'Not at all similar',
            'Somewhat similar',
            'Moderately similar',
            'Very similar',
            'Extremely similar'
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
                                questions: {inherit:'thermFat'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'thermThin'}							
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
                                questions: {inherit:'thermFat'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'thermThin'}							
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
                                questions: {inherit:'identfat'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'identthin'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'comptomost'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'controlother'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'important'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'mostpref'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'easytolose'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'othersay'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'iam'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'controlyou'}							
                            }
                        ]
                    },
                    {
                        mixer : 'random', 
                        wrapper:true, 
                        data : [
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'myweight'}
                            },
                            {
                                inherit:'basicPage', 
                                questions: {inherit:'myheight'}							
                            }
                        ]
                    }
                ]
            }
			
        ]);
    }
    return API.script;
});


