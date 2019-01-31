define(['managerAPI'], function(Manager) {
    var API = new Manager();

    API.setName('mgr');
    API.addSettings('skip',true);
    API.addSettings('skin','demo');

    var set = API.shuffle(['A','B'])[0];
    var lightImages = [];
    var darkImages = [];
    var lightImagesLabel = [];
    var darkImagesLabel = [];
    var lightLabelText = ['Light Skinned People'];
    var darkLabelText = ['Dark Skinned People'];

    //Fill the sets of words and images for the gay categories, based on the gay-set condition
    if (set == 'A') {
        darkImages.push('tone0031b.jpg');
        darkImages.push('tone0051b.jpg');
        darkImages.push('tone0061b.jpg');
        darkImages.push('tone0081b.jpg');
        darkImages.push('tone0111b.jpg');
        darkImages.push('tone0121b.jpg');
        lightImages.push('tone0041a.jpg');
        lightImages.push('tone0071a.jpg');
        lightImages.push('tone0091a.jpg');
        lightImages.push('tone0101a.jpg');
        lightImages.push('tone0131a.jpg');
        lightImages.push('tone0141a.jpg');
        lightImagesLabel = 'label2a.jpg';
        darkImagesLabel = 'label1b.jpg';
    } else {
        darkImages.push('tone0071b.jpg');
        darkImages.push('tone0131b.jpg');
        darkImages.push('tone0091b.jpg');
        darkImages.push('tone0101b.jpg');
        darkImages.push('tone0141b.jpg');
        darkImages.push('tone0041b.jpg');
        lightImages.push('tone0081a.jpg');
        lightImages.push('tone0031a.jpg');
        lightImages.push('tone0061a.jpg');
        lightImages.push('tone0111a.jpg');
        lightImages.push('tone0051a.jpg');
        lightImages.push('tone0121a.jpg');
        lightImagesLabel ='label1a.jpg';
        darkImagesLabel ='label2b.jpg';
    }


    API.addGlobal({
        set : set,
        darkImages : darkImages,
        lightImages: lightImages,
        lightImagesLabel: lightImagesLabel,
        darkImagesLabel: darkImagesLabel,
        lightLabelText: lightLabelText,
        darkLabelText: darkLabelText,

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

        instiat_skin: [{
            inherit: 'instructions',
            name: 'instiat',
            templateUrl: 'instiat_skin.jst',
            title: 'IAT Instructions',
            piTemplate: true,
            header: 'Implicit Association Test'
        }],

        explicits: [{
            type: 'quest',
            name: 'explicits',
            scriptUrl: 'explicits.js'
        }],

        skiniat: [{
            type: 'time',
            name: 'skiniat',
            scriptUrl: 'skiniat.js'
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
        { type: 'post', path: ['set'] },
        {inherit: 'realstart'},
        {
            mixer:'random',
            data:[
                {inherit: 'explicits'},
                {
                    mixer: 'wrapper',
                    data: [
                        {inherit: 'instiat_skin'},
                        {inherit: 'skiniat'}
                    ]
                }
            ]
        },
        {inherit: 'debriefing'},
        {inherit: 'lastpage'}
    ]);

    return API.script;
});
