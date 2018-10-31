define(['managerAPI'], function(Manager) {
    var API = new Manager();

    API.setName('mgr');
    API.addSettings('skip',true);
    API.addSettings('skin','demo');

    API.addGlobal({
        baseURL: './images/',
        posWords : API.shuffle([
            'Love', 'Cheer', 'Friend', 'Pleasure',
            'Adore', 'Cheerful', 'Friendship', 'Joyful', 
            'Smiling','Cherish', 'Excellent', 'Glad', 
            'Joyous', 'Spectacular', 'Appealing', 'Delight', 
            'Excitement', 'Laughing', 'Attractive','Delightful', 
            'Fabulous', 'Glorious', 'Pleasing', 'Beautiful', 
            'Fantastic', 'Happy', 'Lovely', 'Terrific', 
            'Celebrate', 'Enjoy', 'Magnificent', 'Triumph'
        ]), 
        negWords : API.shuffle([
            'Abuse', 'Grief', 'Poison', 'Sadness', 
            'Pain', 'Despise', 'Failure', 'Nasty', 
            'Angry', 'Detest', 'Horrible', 'Negative', 
            'Ugly', 'Dirty', 'Gross', 'Evil', 
            'Rotten','Annoy', 'Disaster', 'Horrific',  
            'Scorn', 'Awful', 'Disgust', 'Hate', 
            'Humiliate', 'Selfish', 'Tragic', 'Bothersome', 
            'Hatred', 'Hurtful', 'Sickening', 'Yucky'
        ])
    });

    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: 'Continue'
        }],

        realstart: [{
            inherit: 'instructions',
            name: 'realstart',
            templateUrl: 'realstart.jst',
            title: 'Consent',
            piTemplate: true,
            header: 'Welcome'
        }],

		instiat_age: [{
			inherit: 'instructions',
			name: 'instiat',
			templateUrl: 'instiat_age.jst',
			title: 'IAT Instructions',
			piTemplate: true,
			header: 'Implicit Association Test'
		}],

        explicits: [{
            type: 'quest',
            name: 'explicits',
            scriptUrl: 'explicits.js'
        }],

        ageiat: [{
            type: 'time',
            name: 'ageiat',
            scriptUrl: 'ageiat.js'
        }],

        debriefing: [{
            type: 'quest',
            name: 'debriefing',
            scriptUrl: 'debriefing.js'
        }],

        lastpage: [{
            type: 'message',
            name: 'lastpage',
            templateUrl: 'lastpage.jst',
            title: 'End',
            piTemplate: true,
            buttonHide: true,
            last:true,
            header: 'You have completed the study'
        }]
    });

    API.addSequence([
        {inherit: 'realstart'},
        {
            mixer:'random',
            data:[
                {inherit: 'explicits'},
                {
                    mixer: 'wrapper',
                    data: [
                        {inherit: 'instiat_age'},
                        {inherit: 'ageiat'}
                    ]
                }
            ]
        },
        {inherit: 'debriefing'},
        {inherit: 'lastpage'}
    ]);

    return API.script;
});
