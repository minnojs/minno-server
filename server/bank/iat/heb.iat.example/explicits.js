define(['questAPI'], function(Quest){
	
    let API = new Quest();

    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, //Change to true if you don't want to show the submit button.
        v1style: 2,
        header: 'שאלון',
        decline: true,
        declineText: 'דלג על השאלה', 
        autoFocus:true, 
        progressBar: 'עמוד <%= pagesMeta.number %> מתוך 8'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true,
        errorMsg: {
            required: 'נא להשיב על השאלה, או לבחור לדלג על השאלה'
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 3 %>',
        helpText: 'ניתן להשיב במהירות באמצעות הקשה כפולה על התשובה המועדפת עליך.'
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
            {text:'10 - רגשות חמים במידה רבה מאוד', value:10},
            {text:'9 - רגשות חמים במידה רבה', value:9},
            {text:'8 - רגשות חמים במידה בינונית', value:8},
            {text:'7 - רגשות חמים במידת מה', value:7},
            {text:'6 - רגשות חמים במקצת', value:6},
            {text:'5 - בדיוק באמצע', value:5},
            {text:'4 - רגשות קרים במקצת', value:4},
            {text:'3 - רגשות קרים במידת מה', value:3},
            {text:'2 - רגשות קרים במידה בינונית', value:2},
            {text:'1 - רגשות קרים במידה רבה', value:1},
            {text:'0 - רגשות קרים במידה רבה מאוד', value:0}
        ]
    });
		
    API.addQuestionsSet('agree',{
        inherit: 'basicSelect',
        answers: [
            {text:'הסכמה מוחלטת', value:3},
            {text:'הסכמה בינונית', value:2},
            {text:'הסכמה קלה', value:1},
            {text:'נייטרלי', value:0},
            {text:'אי-הסכמה קלה', value:-1},
            {text:'אי-הסכמה בינונית', value:-2},
            {text:'אי-הסכמה מוחלטת', value:-3}
        ]
    });
	
    /**
	*Specific questions
	*/	
    
    API.addQuestionsSet('thermMiz',{
        inherit : 'therm',
        name: 'tmiz',
        stem: 'עד כמה חמים או קרים רגשותייך כלפי <b>מזרחים</b>?'
    });
    API.addQuestionsSet('thermAsh',{
        inherit : 'therm',
        name: 'tash',
        stem: 'עד כמה חמים או קרים רגשותייך כלפי <b>אשכנזים</b>?'
    });

	
    API.addQuestionsSet('prf',{
        inherit : 'basicSelect',
        name: 'prf',
        stem: 'איזו מההצהרות הבאות הכי מתאימה להעדפה שלך בין אשכנזים למזרחים?',
        answers: [
            {text:'יש לי העדפה חזקה לאשכנזים על-פני מזרחים',value:7},
            {text:'יש לי העדפה בינונית לאשכנזים על-פני מזרחים',value:6},
            {text:'יש לי העדפה חלשה לאשכנזים על-פני מזרחים',value:5},
            {text:'אין לי העדפה בין אשכנזים למזרחים',value:4},
            {text:'יש לי העדפה חלשה למזרחים על-פני אשכנזים',value:3},
            {text:'יש לי העדפה בינונית למזרחים על-פני אשכנזים',value:2},
            {text:'יש לי העדפה חזקה למזרחים על-פני אשכנזים',value:1}
			
        ]
    });
	
	   API.addQuestionsSet('intelligent',{
        inherit : 'agree',
        name: 'intelligent',
        stem: 'בממוצע, גברים ונשים ממוצא אשכנזי הם אינטליגנטים יותר מגברים ונשים ממוצא מזרחי'
    });
		
	   API.addQuestionsSet('nice',{
        inherit : 'agree',
        name: 'nice',
        stem: 'בממוצע, גברים ונשים ממוצא מזרחי הם נחמדים יותר מגברים ונשים ממוצא אשכנזי'
    });
		
	  API.addQuestionsSet('attractive',{
        inherit : 'agree',
        name: 'attractive',
        stem: 'בממוצע, גברים ונשים ממוצא מזרחי הם יותר מושכים מינית מגברים ונשים ממוצא אשכנזי'
    });
		
	  API.addQuestionsSet('moral',{
        inherit : 'agree',
        name: 'moral',
        stem: 'בממוצע, גברים ונשים ממוצא מזרחי הם יותר מוסריים מגברים ונשים ממוצא אשכנזי'
    });

	 API.addQuestionsSet('identity',{
        inherit : 'basicSelect',
        name: 'identity',
        stem: 'לאיזה מוצא את\\ה מרגיש\\ה שייכ\\ת יותר?',
        answers:[
            {text:'מזרחי, הרבה יותר'},
            {text:'מזרחי'},
            {text:'מזרחי, מעט יותר'},
            {text:'במידה שווה'},
            {text:'אשכנזי, מעט יותר'},
            {text:'אשכנזי'},
            {text:'אשכנזי, הרבה יותר'}
        ]
    });
		

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
                            questions: {inherit:'thermMiz'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermAsh'}							
                        }
                    ]
                },
			
                {
                    inherit:'basicPage', 
                    questions: {inherit:'prf'}
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
                    		text: '&nbsp&nbspמה מידת ההסכמה שלך עם האמירה הבאה?',
                            questions: {inherit:'intelligent'}
                        },
                        {
                            inherit:'basicPage', 
                    		text: '&nbsp&nbspמה מידת ההסכמה שלך עם האמירה הבאה?',
                            questions: {inherit:'nice'}							
                        },
                        {
                            inherit:'basicPage', 
                    		text: '&nbsp&nbspמה מידת ההסכמה שלך עם האמירה הבאה?',
                            questions: {inherit:'attractive'}							
                        },
                        {
                            inherit:'basicPage', 
                    		text: '&nbsp&nbspמה מידת ההסכמה שלך עם האמירה הבאה?',
                            questions: {inherit:'moral'}							
                        }
                    ]
                }
   	        ]
        },
        {
            inherit:'basicPage', 
            questions: {inherit:'identity'}
        }
    ]);
	
    return API.script;
});





