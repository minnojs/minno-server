import {deploy, get_study_prop} from './deployModel';
import classNames from 'utils/classNames';
import {formFactory, textInput, radioInput} from 'utils/formHelpers';
import rulesEditor from './rulesComponent';
export default deployComponent;

const ASTERIX = m('span.text-danger', '*');

let deployComponent = {
    controller(){
        const studyId = m.route.param('studyId');
        let form = formFactory();
        let ctrl = {
            sent:false,
            error: m.prop(''),
            folder_location: m.prop(''),
            researcher_email: m.prop(''),
            researcher_name: m.prop(''),
            target_number: m.prop(''),
            
            rulesValue: m.prop('parent'), // this value is defined by the rule generator
            rulesVisual: m.prop('None'),
            rulesComments: m.prop(''),
            rule_file: m.prop(''),
            exist_rule_file: m.prop(''),

            approved_by_a_reviewer: m.prop(''),
            zero_unnecessary_files: m.prop(''),

            // unnecessary
            completed_checklist: m.prop(''),
            approved_by_irb: m.prop(''),
            valid_study_name: m.prop(''),
            realstart: m.prop(''),

            experiment_file: m.prop(''),
            experiment_files: m.prop(''),
            launch_confirmation: m.prop(''),
            comments: m.prop('')   
            
        };

        get_study_prop(studyId)
            .then(response =>{
                ctrl.exist_rule_file(response.have_rule_file ? response.study_name+'.rules.xml' : '');
                ctrl.study_name = response.study_name;
                ctrl.researcher_name(response.researcher_name);
                ctrl.researcher_email(response.researcher_email);
                ctrl.folder_location(response.folder);
                ctrl.experiment_files(response.experiment_file.reduce((obj, row) => {obj[row.file_name] = row.file_name;
                    return obj;
                }, {}));
            })
            .catch(response => {
                ctrl.error(response.message);
            })
            .then(m.redraw);
    
        return {ctrl, form, submit, studyId};
        function submit(){
            form.showValidation(true);
            if (!form.isValid())
            {
                ctrl.error('Missing parameters');
                return;
            }

            deploy(studyId, ctrl)
                .then((response) => {
                    ctrl.rule_file(response.rule_file);
                    ctrl.sent = true;
                })
                .catch(response => {
                    ctrl.error(response.message);
                })
                .then(m.redraw);
        }
    },
    view({form, ctrl, submit}){
        if (ctrl.sent) return m('.deploy.centrify',[
            m('i.fa.fa-thumbs-up.fa-5x.m-b-1'),
            m('h5', ['The Deploy form was sent successfully ', m('a', {href:'/deployList', config: m.route}, 'View Deploy Requests')]),
            ctrl.rule_file() !='' ? m('h5', ['Rule File: ', m('a', {href: `/editor/${m.route.param('studyId')}/file/${ctrl.rule_file()}.xml`, config: m.route}, ctrl.rule_file())]) : ''
        ]);
        
        return m('.deploy.container', [
            m('h3', [
                'Request Deploy ',
                m('small', ctrl.study_name)
            ]),

            m('.row', [
                m('.col-sm-3', m('strong', 'Researcher Name: ')),
                m('.col-sm-9', ctrl.researcher_name())
            ]),
            m('.row', [
                m('.col-sm-3', m('strong', 'Researcher Email Address: ')),
                m('.col-sm-9', ctrl.researcher_email())
            ]),
            m('.row.m-b-1', [
                m('.col-sm-3', m('strong', 'Study Folder Location: ')),
                m('.col-sm-9', ctrl.folder_location())
            ]),

            radioInput({
                label:m('span', ['Name of Experiment File', ASTERIX]),
                prop: ctrl.experiment_file,
                values:ctrl.experiment_files(),
                form, required:true, isStack:true
            }),

            textInput({help: 'For private studies (not in the Project Implicit research pool), enter n/a', label:['Target Number of Completed Study Sessions', ASTERIX],  placeholder: 'Target Number of Completed Study Sessions', prop: ctrl.target_number, form, required:true, isStack:true}),

            m('.font-weight-bold', 'Participant Restrictions'),
            rulesEditor({value:ctrl.rulesValue, visual: ctrl.rulesVisual, comments: ctrl.rulesComments, exist_rule_file: ctrl.exist_rule_file}),

            m('.font-weight-bold', 'Study is ready for deploy: ', ASTERIX),
            m('.m-b-1', [
                checkbox({description: 'The study\'s study-id starts with my user name', prop: ctrl.valid_study_name, form, required:true, isStack:true}),
                checkbox({
                    description:  'This study has been approved by the appropriate IRB ', 
                    prop: ctrl.approved_by_irb,
                    required:true,
                    form, isStack:true
                }),
                checkbox({
                    description:  [
                        'The study is compliant with ',
                        m('a', {hxref:'https://docs.google.com/document/d/1pglAQELqNLWbV1yscE2IVd7G5xVgZ8b4lkT8PYeumu8/edit?usp=sharing', target:'_blank'}, 'PI Research Pool Guidelines and Required Elements & Study Conventions'),
                        ' .'
                    ],
                    prop: ctrl.completed_checklist,
                    form, isStack:true,
                    required:true
                }),
                checkbox({
                    description: 'My study folder includes ZERO files that aren\'t necessary for the study (e.g., word documents, older versions of files, items that were dropped from the final version)',
                    prop: ctrl.zero_unnecessary_files,
                    required:true,
                    form, isStack:true
                }),
                checkbox({description: 'I used a realstart and lastpage tasks', prop: ctrl.realstart, form, required:true, isStack:true})
            ]),
            radioInput({
                label:['Study has been approved by a *User Experience* Reviewer (Calvin Lai): ', ASTERIX],
                prop: ctrl.approved_by_a_reviewer,
                values: {
                    'No, this study is not for the Project Implicit pool.' : 'No, this study is not for the Project Implicit pool.',
                    'Yes' : 'Yes'
                },
                form, required:true, isStack:true
            }),

            radioInput({
                label: ['If you are building this study for another researcher (e.g. a contract study), has the researcher received the standard final launch confirmation email and confirmed that the study is ready to be launched? ', ASTERIX],
                prop: ctrl.launch_confirmation,
                values: {
                    'No,this study is mine': 'No,this study is mine',
                    'Yes' : 'Yes'
                },
                form, required:true, isStack:true
            }),

            textInput({isArea: true, label: m('span', 'Additional comments'),  placeholder: 'Additional comments', prop: ctrl.comments, form, isStack:true}),
            !ctrl.error() ? '' : m('.alert.alert-warning', m('strong', 'Error: '), ctrl.error()),
            m('button.btn.btn-primary', {onclick: submit}, 'Request Deploy')
        ]);
    }
};

let checkbox = args => m.component({
    controller({prop, form, required}){
        let validity = () => !required || prop();
        if (!form) throw new Error('Form not defined');
        form.register(validity);

        return {validity, showValidation: form.showValidation};
    },
    view: (ctrl, {prop, description = '', help, required, form}) => m('.checkmarked', 
        { onclick: ()=>prop(!prop()) },
        [
            m('i.fa.fa-fw', {
                class: classNames({
                    'fa-square-o' : !prop(),
                    'fa-check-square-o' : prop(),
                    'text-success' : required && form.showValidation() && prop(),
                    'text-danger' : required && form.showValidation() && !prop()
                })
            }),
            m.trust('&nbsp;'),
            description,
            !help ? '' : m('small.text-muted', help)
        ])
}, args);
