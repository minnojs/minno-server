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


const ejs = require('ejs');



function save_file(user_id, study_id, responses, stimuli, conditions_data) {
    // const conditions2 = [
    //     {'cong' : [
    //             {'stimulus1': { media: '1', css:{left: '100px', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+', css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '2', correct:1, css:{left: '', right:'100px', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //             {'stimulus1': { media: '2', css:{left: '100px', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+', css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '4', correct:1, css:{left: '', right:'100px', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //             {'stimulus1': { media: '4', css:{left: '100px', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+', css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '8', correct:1, css:{left: '', right:'100px', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //
    //             {'stimulus1': { media: '1',  css:{left: '', right:'100px', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+', css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '2', correct:0, css:{left: '100px', right:'', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //             {'stimulus1': { media: '2', css:{left: '', right:'100px', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+', css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '4', correct:0, css:{left: '100px', right:'', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //             {'stimulus1': { media: '4', css:{left: '', right:'100px', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+',  css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '8', correct:0, css:{left: '100px', right:'', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //         ]},
    //     {'incong' : [
    //             {'stimulus1': { media: '2', css:{left: '100px', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+',  css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '1', correct:0, css:{left: '', right:'100px', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //             {'stimulus1': { media: '4',  css:{left: '100px', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+',  css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '2', correct:0, css:{left: '', right:'100px', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //             {'stimulus1': { media: '8',  css:{left: '100px', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+',  css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '4', correct:0, css:{left: '', right:'100px', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //
    //             {'stimulus1': { media: '2',  css:{left: '', right:'100px', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+',  css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '1', correct:1, css:{left: '100px', right:'', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //             {'stimulus1': { media: '4',  css:{left: '', right:'100px', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+',  css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '2', correct:1, css:{left: '100px', right:'', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //             {'stimulus1': { media: '8',  css:{left: '', right:'100px', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus0': { media: '+',  css:{left: '', right:'', fontSize:'50px'}, times:{duration: 500, onset: 0}},
    //                 'stimulus2': { media: '4', correct:1, css:{left: '100px', right:'', fontSize:'200px'}, times:{duration: 500, onset: 100}}},
    //         ]},
    // ];

    let conditions = [];
    conditions_data.forEach(condition=>{
        // conditions[condition.condition_name] = [];
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
    // console.log(JSON.stringify(conditions));
    // console.log(conditions);



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
        media_props.push(`media: '<%= trialData.media_${stimulus_name} %>'`);
        if(stimulus.response)
            stimuli_props.push(`correct: '<%= trialData.correct_${stimulus_name} %>'`);
        stimuli_data.push(`{handle:'${stimulus.stimulus_name}', times:{${times_props.join(', ')}}, css: {${css_props.join(', ')}}, ${media_props.join(', ')}, data:{${stimuli_props.join(', ')}}}`);
    });


    const stimuli_str = stimuli_data.join(', \n');

    let conditions_str = '';
    let cond_names = [];
    let times = [];
    conditions.forEach(condition=>{
        // console.log(condition);
        Object.entries(condition).forEach(([cond_name, cond_data]) => {
            let str = `\n\tAPI.addTrialSet('${cond_name}', [\n\t`;
            cond_names.push(cond_name);
            cond_data = cond_data.map(cond=> {
                let props = [];
                Object.entries(cond).forEach(([stimulus_name, data]) => {
                    props.push(`media_${stimulus_name}: '${data.media}'`);
                    props.push(`css_${stimulus_name}: ${JSON.stringify(data.css_data)}`);
                    times.push({[stimulus_name]:{onset: data.onset-0, duration: data.offset-data.onset}});
                    props.push(`times_${stimulus_name}: ${JSON.stringify({onset: data.onset-0, duration: data.offset-data.onset})}`);
                    if (data.response)
                        props.push(`correct_${stimulus_name}: current.answers[${data.response_key}]`);
                });
                return `\t{inherit: 'stimulus_trial',  data: {${props.join(', ')}}}`;
            });
            str += cond_data.join(',\n \t')+'\n\t]);';
            conditions_str += str;
        });
    });




    let sequence = [];

    let inputs = [];
    responses.forEach((key, value)=>!value ? '' : inputs.push(`{type:'setInput', input:{handle:current.answers[${value}], on: 'keypressed', key: current.answers[${value}]}}`));
    const inputs_str = inputs.join(', \n\t\t\t');




    stimuli.forEach(stimulus=>
    {
        const response = !stimulus.response ? '' : inputs_str;
        sequence.push( `
            {
            conditions:[{type:'inputEquals',value:'show_stimuli'}],
                actions: [
                    {type:'trigger',handle:'show_${stimulus['stimulus_name']}', duration: '<%= trialData.times_${stimulus['stimulus_name']}.onset %>'}
                ]
            },
            {
            conditions:[{type:'inputEquals',value:'show_${stimulus['stimulus_name']}'}],
                actions: [
                    {type:'showStim', handle: '${stimulus['stimulus_name']}'},
                    {type:'trigger',handle:'hide_${stimulus['stimulus_name']}', duration: '<%= trialData.times_${stimulus['stimulus_name']}.duration %>'},
                    ${response}
                ]
            },
            {
            conditions:[{type:'inputEquals',value:'hide_${stimulus['stimulus_name']}'}],
                actions: [
                    {type:'hideStim', handle: '${stimulus['stimulus_name']}'},
                    {type:'custom', fn: function(a, b, trial){trial.data.stimuli_counter++;}}
                ]
            }`);
    });

    sequence.push(`
    {
            conditions:[
            {type:'custom', fn: function(a, b, trial){console.log(trial.data.stimuli_counter); return trial.data.stimuli_counter===${stimuli.length}}],

                actions: [
                    {type:'custom', fn: function(a, b, trial){trial.data.stimuli_counter = 0;}},
                    {type:'hideStim', handle:'all'}, 
                    {type:'trigger', handle:'timeout'} // set response deadline - trial ends when it is due
                ]
            }
    `);
    const sequence_str = sequence.join(', \n\t');


    return has_write_permission(user_id, study_id)
        .then(function({study_data}){
            return fs.readFile(config.base_folder+'/server/views/cognitive_task.js', 'utf8', function(err, contents) {
                contents = contents.replace('/*#*conditions*#*/', conditions_str);
                contents = contents.replace('/*#*stimuli*#*/', stimuli_str);
                contents = contents.replace('/*#*sequence*#*/', sequence_str);

                // console.log(contents);
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

module.exports = {save_file};
