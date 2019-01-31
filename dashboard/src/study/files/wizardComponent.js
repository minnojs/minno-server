import {formFactory, textInput, checkboxInput, maybeInput, arrayInput} from 'utils/formHelpers';
import {createFile} from './sidebar/fileActions';
import ratingWizard from './wizards/ratingWizard';
export default wizardComponent;

let wizardComponent = {
    controller({study}){
        let path = m.prop('');
        let form = formFactory();
        let submit = () => {
            form.showValidation(true);
            if (form.isValid()){
                createFile(study, path, compileScript(script) );
            }
            
        };

        let compileScript = script => () => {
            script.basicPage.questions = [
                {inherit: {type:script.randomize() ? 'exRandom' : 'sequential', set:'questionList'}}
            ];
            script.sequence = [
                {
                    mixer:'repeat',
                    times: script.times() || script.questionList().length,
                    data:[
                        {inherit: 'basicPage'}
                    ]
                }
            ];

            return ratingWizard(script);
        };


        let script ={
            basicPage: {
                header: m.prop(''),
                decline: m.prop(true),
                autoFocus:true
            },
            basicSelect: {
                type: 'selectOne',
                autoSubmit: m.prop(false),
                numericValues: m.prop(true),
                help: m.prop('<%= pagesMeta.number < 3 %>'),
                helpText: m.prop('Tip: For quick response, click to select your answer, and then click again to submit.'),
                answers: m.prop([
                    'Very much',
                    'Somewhat',
                    'Undecided',
                    'Not realy',
                    'Not at all'
                ]) 
            },
            questionList: m.prop([
                {stem:'Do you like chocolate?', name:'q1', inherit:'basicSelect'},
                {stem:'Do you like bannanas?', name:'q2', inherit:'basicSelect'}
            ]),
            times: m.prop(false),
            randomize: m.prop(true),
            sequence: [
                {
                    mixer: 'repeat',
                    times: m.prop(10),
                    data: [
                        {inherit:'basicPage'}
                    ]
                }
            ]
        };
        return {path, form, submit, script};
    },
    view({form,submit, script, path}){      
        let basicPage = script.basicPage;
        let basicSelect = script.basicSelect;

        return m('.wizard.container', [
            m('h3', 'Rating wizard'),
            m('p', 'This wizard is responsible for rating stuff'),
            textInput({label:'File Name',  placeholder: 'Path to file', prop: path ,form, required:true}), 

            m('h4', 'Basic Page'),
            textInput({label:'Header',  placeholder: 'Page header', help: 'The header for all pages.', prop: basicPage.header,form}), 
            checkboxInput({label: 'Decline', description: 'Allow users to decline', prop: basicPage.decline, form}),

            m('h4', 'Basic Select'),
            checkboxInput({label: 'autoSubmit', description: 'Submit upon second click', prop: basicSelect.autoSubmit, form}),
            arrayInput({label: 'answers', prop: (basicSelect.answers), rows:7,  form, isArea:true, help: 'Each row here represents an answer option', required:true}),
            checkboxInput({label: 'numericValues', description: 'Responses are recorded as numbers', prop: basicSelect.numericValues, form}),
            maybeInput({label:'help', help: 'If and when to display the help text (use templates to control the when part)', prop: basicSelect.help,form}),
            basicSelect.help()
                ? textInput({label:'helpText',  help: 'The instruction text for using this type of question', prop: basicSelect.helpText,form, isArea: true})
                : '',

            m('h4', 'Sequence'),
            checkboxInput({label: 'Randomize', description: 'Randomize questions', prop: script.randomize, form}),
            maybeInput({label: 'Choose', help:'Set a number of questions to choose from the pool. If this option is not selected all questions will be used.', form, prop: script.times}),
            arrayInput({label: 'questions', prop: script.questionList, toArr: (stem, index) => ({stem, name: `q${index}`, inherit:'basicSelect'}), fromArr: q => q.stem, rows:20,  form, isArea:true, help: 'Each row here represents a questions', required:true}),
            m('.row', [
                m('.col-cs-12.text-xs-right', [
                    !form.showValidation() || form.isValid()
                        ? m('button.btn.btn-primary', {onclick: submit}, 'Create')  
                        : m('button.btn.btn-danger', {disabled: true}, 'Not Valid')
                ])
            ])
        ]); 
    } 
};
