define(['managerAPI'], function(Manager) {
    let API = new Manager();

    API.setName('mgr');
    API.addSettings('skip',true);
    API.addSettings('skin','demo');

    //Randomize which of the three possible stimulus sets we are going to use for the gay category
    let gaySet = API.shuffle(['gay','lesbian','general'])[0];
    let gayWords = ['Gay People', 'Homosexual']; //All gay sets have this word
    let gayImages = [];

    //Fill the sets of words and images for the gay categories, based on the gay-set condition
    switch (gaySet){
        case 'lesbian': 
            gayWords.push('Lesbians');
            gayWords.push('Gay Women');
            gayImages.push('07_lesbian.jpg');
            break;
        case 'gay':
            gayWords.push('Gay');
            gayWords.push('Gay Men');
            gayImages.push('05_gay.jpg');
            break;
        default:
            gayWords.push('Gay');
            gayImages.push('07_lesbian.jpg');
            gayImages.push('05_gay.jpg');
    }

    API.addGlobal({
        gaySet : gaySet,
        gayWords : gayWords,
        gayImages : gayImages,
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

        instiat_sexuality: [{
            inherit: 'instructions',
            name: 'instiat',
            templateUrl: 'instiat_sexuality.jst',
            title: 'IAT Instructions',
            piTemplate: true,
            header: 'Implicit Association Test'
        }],

        explicits: [{
            type: 'quest',
            name: 'explicits',
            scriptUrl: 'explicits.js'
        }],

        sexualityiat: [{
            type: 'time',
            name: 'sexualityiat',
            scriptUrl: 'sexualityiat.js'
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
        { type: 'post', path: ['gaySet'] },
        {inherit: 'realstart'},
        {
            mixer:'random',
            data:[
                {inherit: 'explicits'},
                {
                    mixer: 'wrapper',
                    data: [
                        {inherit: 'instiat_sexuality'},
                        {inherit: 'sexualityiat'}
                    ]
                }
            ]
        },
        {inherit: 'debriefing'},
        {inherit: 'lastpage'}
    ]);

    return API.script;
});
