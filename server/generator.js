const config = require('../config');



const fs           = require('fs-extra');
const path         = require('path');
const dropbox      = require('./dropbox');

const studies_comp = require('./studies');
const {has_write_permission} = studies_comp;
const {get_file_content}   = require('./files');


function get_properties(user_id, study_id, file_id) {
    return get_file_content(user_id, study_id, file_id);
}


function save_file(user_id, study_id, file_id, responses, stimuli, conditions_data, constants) {
    let conditions = [];
    conditions_data.forEach(condition=>{
        let stimuli_sets = [];
        condition.stimuli_sets.forEach(set=>{
            let stimuli = {};
            set.forEach(stimulus=>stimuli[stimulus.stimulus_name]=stimulus);
            stimuli_sets.push(stimuli);
        });
        conditions.push({[condition.condition_name]: stimuli_sets});
    });




    return has_write_permission(user_id, study_id)
        .then(function({study_data}){
            return fs.readFile(config.base_folder+'/server/views/cognitive_task.js', 'utf8', function(err, contents) {


                contents = write_possible_answers(contents, responses);
                contents = write_constants(contents, constants);
                contents = write_instructions(contents, constants.instructions);
                contents = write_conditions(contents, conditions, responses);
                contents = write_stimuli(contents, stimuli);
                contents = write_trial_sequence(contents, stimuli, responses);
                contents = write_sequence(contents, conditions_data);

                const properties = {responses, stimuli, conditions_data, constants};
                fs.writeFile(path.join(config.user_folder, study_data.folder_name, file_id), JSON.stringify(properties), 'utf8');
                const output_file = `${path.parse(file_id).name}.js`;
                return fs.writeFile(path.join(config.user_folder, study_data.folder_name, output_file), contents, 'utf8')
                    .then(function(){
                        const file_url = path.join('..',config.user_folder,study_data.folder_name, output_file);
                        return studies_comp.update_modify(study_id)
                            .then(dropbox.upload_users_file(user_id, study_id, path.resolve(path.join(config.user_folder,study_data.folder_name, output_file))))
                            .then(()=>({id: output_file, content: contents, url: file_url}));
                    });
            });
        });
}


function write_possible_answers(contents, responses) {
    contents = contents.replace('/*#*possible_answers*#*/', JSON.stringify(responses.filter(response=>!!response.key).map(response=>response.key)));
    return contents;
}


function write_images2preload(contents, images2preload) {
    contents = contents.replace('/*#*images2preload*#*/', images2preload.length ===0 ? '' : `API.addSettings('preloadImages', ${JSON.stringify(images2preload)})`);
    return contents;
}

function write_constants(contents, constants) {
    contents = contents.replace('/*#*fixation_duration*#*/', constants.durations.fixation);
    contents = contents.replace('/*#*iti_duration*#*/', constants.durations.iti);
    contents = contents.replace('/*#*feedback_duration*#*/', constants.durations.feedback);

    contents = contents.replace('/*#*feedback_correct*#*/', constants.feedback.correct);
    contents = contents.replace('/*#*feedback_incorrect*#*/', constants.feedback.incorrect);
    contents = contents.replace('/*#*feedback_noresponse*#*/', constants.feedback.noresponse);
    return contents;
}

function write_instructions(contents, instructions){
    const has_wellcome = instructions.welcome!=='None' && instructions.welcome!=='';
    const has_start = instructions.start!=='None' && instructions.start!=='';
    const has_end = instructions.end!=='None' && instructions.end!=='';
    let instructions_var = [];
    if (has_wellcome)
        instructions_var.push(`inst_welcome: '${instructions.welcome}'`);
    if (has_start)
        instructions_var.push(`inst_start: '${instructions.start}'`);
    if (has_end)
        instructions_var.push(`inst_end: '${instructions.end}'`);

    contents = contents.replace('/*#*instructions_var*#*/', instructions_var.length===0 ? '' : `instructions :{${instructions_var.join(',')}},`);

    const instruction_welcome_imp = !has_wellcome ? '' :
        'API.addTrialSets(\'inst_welcome\',{\n\t\t'+
        'inherit:\'insts\',\n\t\t'+
        'layout: [{media: {image: current.instructions.inst_welcome}}]\n\t'+
        '});';
    const instruction_start_imp = !has_start ? '' :
        'API.addTrialSets(\'inst_start\',{\n\t\t'+
        'inherit:\'insts\',\n\t\t'+
        'layout: [{media: {image: current.instructions.inst_start}}]\n\t'+
        '});';
    const instruction_end_imp = !has_end ? '' :
        'API.addTrialSets(\'inst_end\',{\n\t\t'+
        'inherit:\'insts\',\n\t\t'+
        'layout: [{media: {image: current.instructions.inst_end}}]\n\t'+
        '});';

    contents = contents.replace('/*#*instruction_welcome_imp*#*/', instruction_welcome_imp);
    contents = contents.replace('/*#*instruction_start_imp*#*/', instruction_start_imp);
    contents = contents.replace('/*#*instruction_end_imp*#*/', instruction_end_imp);

    const instruction_welcome_seq = !has_wellcome ? '' : '{inherit : {set:"inst_welcome"}},';
    const instruction_start_seq = !has_start ? '':  '{inherit : {set:"inst_start"}},';
    const instruction_end_seq = !has_end ? '' : '{inherit : {set:"inst_end"}}';

    contents = contents.replace('/*#*instruction_welcome_seq*#*/', instruction_welcome_seq);
    contents = contents.replace('/*#*instruction_start_seq*#*/', instruction_start_seq);
    contents = contents.replace('/*#*instruction_end_seq*#*/', instruction_end_seq);

    return contents;
}


function write_conditions(contents, conditions) {
    let images2preload = [];

    let conditions_str = '';
    conditions.forEach(condition=>{
        Object.entries(condition).forEach(([cond_name, cond_data]) => {
            let str = `\n\tAPI.addTrialSet('${cond_name}', [\n\t`;
            cond_data = cond_data.map(cond=> {
                let props = [];
                Object.entries(cond).forEach(([stimulus_name, data]) => {
                    props.push(`media_${stimulus_name}: '${data.media}'`);
                    props.push(`css_${stimulus_name}: ${JSON.stringify(data.css_data)}`);
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
    contents = contents.replace('/*#*conditions*#*/', conditions_str);
    contents = write_images2preload(contents, images2preload);
    return contents;
}


function write_stimuli(contents, stimuli) {
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
        stimuli_data.push(`{handle:'${stimulus.stimulus_name}', times:{${times_props.join(', ')}}, css: {${css_props.join(', ')}}, ${media_props.join(', ')}, data:{${stimuli_props.join(', ')}}}`);
    });

    contents = contents.replace('/*#*stimuli*#*/', stimuli_data.join(', \n'));

    return contents;
}

function write_trial_sequence(contents, stimuli, responses) {
    let trial_sequence = [];
    let inputs = [];
    responses.forEach((key, value)=>!key ? '' : inputs.push(`{type:'setInput', input:{handle:current.answers[${value}], on: 'keypressed', key: current.answers[${value}]}}`));
    const inputs_str = inputs.join(', \n\t\t\t\t\t');

    let last_stimulus = '';
    stimuli.forEach(stimulus=>
    {
        const response = stimulus.response === 'without_response' ? '' : `${inputs_str},`;
        const onset_triger = stimulus.relative_to === 'trial_onset' ? 'show_stimuli' : `hide_${last_stimulus}`;
        trial_sequence.push( `
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
                    ${stimulus.response === 'without_response' ? '' :  `{type:'resetTimer'},`}
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

    trial_sequence.push(`
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
    contents = contents.replace('/*#*trial_sequence*#*/', trial_sequence.join(', \n\t'));

    return contents;
}
function write_sequence(contents, conditions_data) {

    let sequence = [];
    conditions_data.forEach(condition=> {
        condition.repetitions.forEach((block, block_id)=>{
            sequence[block_id] = [];
        });
    });
    conditions_data.forEach(condition=> {
        condition.repetitions.forEach((block, block_id)=>{
            if (block>0)
                sequence[block_id].push(`{
                mixer: 'repeat',
                times: ${block},
                data: [
                    {inherit:{set:'${condition.condition_name}', type:'equalDistribution', n: ${block}, seed: '${condition.condition_name}_${block_id}'}, data:{block: '${block_id > 0 ? 'exp' : 'practice'}'}}
                ]
            }`);
        });
    });
    contents = contents.replace('/*#*sequence_practice*#*/', sequence[0].join(', \n\t\t'));
    contents = contents.replace('/*#*sequence_exp*#*/', sequence[1].join(', \n\t\t'));
    return contents;
}
module.exports = {get_properties, save_file};
