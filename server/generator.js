const config = require('../config');
const zipFolder = require('zip-a-folder');
const request_dep = require('request');
const progress = require('request-progress');



const fs           = require('fs-extra');
const formidable   = require('formidable');
const urlencode    = require('urlencode');
const path         = require('path');
const studies_comp = require('./studies');
const experiments  = require('./experiments');
const dropbox      = require('./dropbox');
const utils        = require('./utils');
const {has_read_permission, has_write_permission, has_read_data_permission} = studies_comp;
const urljoin       = require('url-join');
const url = require('url');
const connection    = Promise.resolve(require('mongoose').connection);
const {get_file_content}   = require('./files');


const ejs = require('ejs');


function get_properties(user_id, study_id) {
    return get_file_content(user_id, study_id, 'properties.js');
}


function save_file(user_id, study_id, responses, stimuli, conditions_data, constants) {
    let conditions = [];
    conditions_data.forEach(condition=>{
        let stimuli_sets = [];
        condition.stimuli_sets.forEach(set=>
        {
            let stimuli = {};
            set.forEach(stimulus=>
                stimuli[stimulus.stimulus_name]=stimulus);
            stimuli_sets.push(stimuli);
        });
        conditions.push({[condition.condition_name]: stimuli_sets});
    });


    var images2preload = [];



    let stimuli_data = [];

    stimuli.forEach(stimulus=>
    {
        let stimuli_props = [];
        let css_props = [];
        let times_props = [];
        let media_props = [];
        const stimulus_name = stimulus.stimulus_name;
        times_props.push(`onset: '<%= trialData.times_${stimulus_name}.onset %>'`);
        times_props.push(`duration: '<%= trialData.times_${stimulus_name}.duration %>'`);
        const css2use = Object.keys(stimulus.css).filter((key=>stimulus.css[key]));
        css2use.map((css_prop)=>{
            css_props.push(`${css_prop}: '<%= trialData.css_${stimulus_name}.${css_prop} %>'`);
        });

        media_props.push(stimulus.media_type=== 'text' ? `media: '<%= trialData.media_${stimulus_name} %>'` : `media: {image :'<%= trialData.media_${stimulus_name}  %>'}`);
        if(stimulus.response)
            stimuli_props.push(`correct: '<%= trialData.correct_${stimulus_name} %>'`);
        stimuli_data.push(`\t\t\t{handle:'${stimulus.stimulus_name}', times:{${times_props.join(', ')}}, css: {${css_props.join(', ')}}, ${media_props.join(', ')}, data:{${stimuli_props.join(', ')}}}`);
    });
    const posible_answers = JSON.stringify(responses.filter(response=>!!response.key).map(response=>response.key));

    const stimuli_str = stimuli_data.join(', \n');

    let conditions_str = '';
    let cond_names = [];
    let times = [];
    conditions.forEach(condition=>{
        Object.entries(condition).forEach(([cond_name, cond_data]) => {
            let str = `\n\tAPI.addTrialSet('${cond_name}', [\n\t`;
            cond_names.push(cond_name);
            cond_data = cond_data.map(cond=> {
                let props = [];
                Object.entries(cond).forEach(([stimulus_name, data]) => {
                    const absolute_time = data.relative_to==='trial_onset';


                    props.push(`media_${stimulus_name}: '${data.media}'`);

                    props.push(`css_${stimulus_name}: ${JSON.stringify(data.css_data)}`);
                    times.push({[stimulus_name]:{onset: absolute_time ? data.onset-0 : 0, duration: data.offset-data.onset}});

                    props.push(`times_${stimulus_name}: ${JSON.stringify({onset: data.onset-0, duration: data.offset-data.onset})}`);
                    if(data.media_type=== 'image' && !images2preload.includes(data.media))
                        images2preload.push(data.media);

                    if (data.response !=='without_response')
                        props.push(`correct_${stimulus_name}: current.answers[${data.response_key}]`);
                });
                return `\t{inherit: 'stimulus_trial', data: {${props.join(', ')}}}`;
            });
            str += cond_data.join(',\n \t')+'\n\t]);';
            conditions_str += str;
        });
    });

    let sequence = [];
    let inputs = [];
    responses.forEach((key, value)=>!key ? '' : inputs.push(`{type:'setInput', input:{handle:current.answers[${value}], on: 'keypressed', key: current.answers[${value}]}}`));
    const inputs_str = inputs.join(', \n\t\t\t\t\t');



    let last_stimulus = '';
    stimuli.forEach(stimulus=>
    {
        const response = stimulus.response === 'without_response' ? '' : `${inputs_str},`;
        const onset_triger = stimulus.relative_to === 'trial_onset' ? 'show_stimuli' : `hide_${last_stimulus}`;
        sequence.push( `
            {
                conditions:[{type:'inputEquals',value:'${onset_triger}'}],
                actions: [
                    {type:'trigger',handle:'show_${stimulus['stimulus_name']}', duration: '<%= trialData.times_${stimulus['stimulus_name']}.onset %>'}
                ]
            },
            {
                conditions:[{type:'inputEquals',value:'show_${stimulus['stimulus_name']}'}],
                actions: [
                    ${response}
                    {type:'showStim', handle: '${stimulus['stimulus_name']}'},
                    ${stimulus.response === 'without_response' ? '' :  "{type:'resetTimer'},"}
                    {type:'trigger',handle:'hide_${stimulus['stimulus_name']}', duration: '<%= trialData.times_${stimulus['stimulus_name']}.duration %>'}
                   
                ]
            },
            {
                conditions:[{type:'inputEquals',value:'hide_${stimulus['stimulus_name']}'}],
                actions: [
                    {type:'hideStim', handle: '${stimulus['stimulus_name']}'},
                    {type:'custom', fn: function(a, b, trial){trial.data.stimuli_counter++;}}
                ]
            }`);
        last_stimulus = stimulus['stimulus_name'];
    });

    sequence.push(`
            {
                conditions:[
                    {type:'custom', fn: function(a, b, trial){return trial.data.stimuli_counter===${stimuli.length};}}
                ],
                actions: [
                        {type:'custom', fn: function(a, b, trial){trial.data.stimuli_counter = 0;}},
                        {type:'hideStim', handle:'all'}, 
                        {type:'trigger', handle:'timeout'} 
                    ]
            }`);
    const sequence_str = sequence.join(', \n\t');



    let sequencer = [];
    conditions_data.forEach(condition=> {
        condition.repetitions.forEach((block, block_id)=>{
            sequencer[block_id] = [];
        });
    });
    conditions_data.forEach(condition=> {
        condition.repetitions.forEach((block, block_id)=>{
            if (block>0)
                sequencer[block_id].push(`{
                mixer: 'repeat',
                times: ${block},
                data: [
                    {inherit:{set:'${condition.condition_name}', type:'equalDistribution', n: ${block}, seed: '${condition.condition_name}_${block_id}'}, data:{block: '${block_id > 0 ? 'exp' : 'practice'}'}}
                ]
            }`);
        });
    });




    return has_write_permission(user_id, study_id)
        .then(function({study_data}){
            return fs.readFile(config.base_folder+'/server/views/cognitive_task.js', 'utf8', function(err, contents) {


                contents = contents.replace('/*#*fixation_duration*#*/', constants.fixation);
                contents = contents.replace('/*#*iti_duration*#*/', constants.iti);

                contents = contents.replace('/*#*posible_answers*#*/', posible_answers);
                contents = contents.replace('/*#*conditions*#*/', conditions_str);
                contents = contents.replace('/*#*stimuli*#*/', stimuli_str);
                contents = contents.replace('/*#*sequence*#*/', sequence_str);
                contents = contents.replace('/*#*sequencer_practice*#*/', sequencer[0].join(', \n\t\t'));
                contents = contents.replace('/*#*sequencer_exp*#*/', sequencer[1].join(', \n\t\t'));
                contents = contents.replace('/*#*images2preload*#*/', JSON.stringify(images2preload));

                const properties = {responses, stimuli, conditions_data, constants};
                fs.writeFile(path.join(config.user_folder, study_data.folder_name, 'exp.prop'), JSON.stringify(properties), 'utf8');

                return fs.writeFile(path.join(config.user_folder, study_data.folder_name, 'exp.js'), contents, 'utf8')
                    .then(function(){
                        const file_url = path.join('..',config.user_folder,study_data.folder_name, 'exp.js');
                        return studies_comp.update_modify(study_id)
                            .then(dropbox.upload_users_file(user_id, study_id, path.resolve(path.join(config.user_folder,study_data.folder_name, 'exp.js'))))
                            .then(()=>({id: 'exp.js', content: conditions, url: file_url}));
                    });
            });

        });
}

module.exports = {get_properties, save_file};
