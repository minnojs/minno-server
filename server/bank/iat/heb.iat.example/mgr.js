define(['managerAPI'], function(Manager) {
    var API = new Manager();

    API.setName('mgr');
    API.addSettings('rtl', true);
    API.addSettings('skip',true);

    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: 'Continue'
        }],

        realstart: [{
            inherit: 'instructions',
            name: 'realstart',
            templateUrl: 'realstart.jst',
            title: 'טופס הסכמה',
            piTemplate: true,
            header: 'ברוכים הבאים'
        }],

		instiat: [{
			inherit: 'instructions',
			name: 'instiat',
			templateUrl: 'instiat.jst',
			title: 'הוראות למטלת המיון',
			piTemplate: true,
			header: 'מבחן אסוציאציות חבויות'
		}],

        explicits: [{
            type: 'quest',
            name: 'explicits',
            scriptUrl: 'explicits.js'
        }],

        iat: [{
            type: 'time',
            name: 'iat',
            scriptUrl: 'iat.js'
        }],

        debriefing: [{
            name: 'debriefing',
            type: 'message',
            templateUrl: 'debriefing.jst'
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
						{inherit: 'instiat'},
						{inherit: 'iat'}
					]
				}
			]
		},
		{inherit: 'debriefing'}
	]);

    return API.script;
});
