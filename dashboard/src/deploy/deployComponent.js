export default args => m.component(deployDialog, args);

import {deploy, get_study_prop} from './deployModel';
import classNames from 'utils/classNames';
import {formFactory, textInput, radioInput} from 'utils/formHelpers';
import rulesEditor from './rulesComponent';

const ASTERISK = m('span.text-danger.font-weight-bold', '*');

let deployDialog = {
    controller({study, close}){
        let form = formFactory();
        let ctrl = {
            sent:false,
            error: m.prop(''),
            study,
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

        // get_study_prop(study)
        //     .then(response =>{
        //         ctrl.exist_rule_file(response.have_rule_file ? response.study_name+'.rules.xml' : '');
        //         ctrl.study_name = response.study_name;
        //
        //         ctrl.experiment_files(response.experiment_file.reduce((obj, row) => {obj[row.file_name] = row.file_name;
        //             return obj;
        //         }, {}));
        //     })
        //     .catch(response => {
        //         ctrl.error(response.message);
        //     })
        //     .then(m.redraw);
        return {ctrl, form, submit, study};
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
            m('.row',[
                m('.col-sm-12', [
                    m('h3', [
                        'Request Deploy ',
                        m('small', ctrl.study.name)
                    ]),
                ])
            ]),



            m('.row.space',[
                m('.col-sm-3',[
                    ASTERISK, ' Name of Experiment File'
                ])
            ]),

            m('.row.space',[
                m('.col-sm-3',[
                    m('select.c-select.form-control.space',{onchange: e => {}}, [
                        m('option', {value:'', selected:ctrl.experiment_file()==='', disabled:true}, 'Select experiment file'),
                        ctrl.study.files().filter(file=>file.exp_data).map(file=>
                            m('option', {value:file.name, selected:ctrl.experiment_file()===file.name}, file.name)
                        )
                    ])
                ])
            ]),

            m('.row.space',[
                m('.col-sm-5',[
                    ASTERISK, ' Target Number of Completed Study Sessions'
                ])
            ]),

            m('.row',[
                m('.col-sm-5',[
                    m('input.form-control', {value: ctrl.target_number(), onchange:  m.withAttr('value', ctrl.target_number), onkeyup: m.withAttr('value', ctrl.target_number), placeholder:'Target Number of Completed Study Sessions'})
                ])
            ]),
            m('.row',[
                m('.col-sm-12',[
                    m('small.text-muted', 'For private studies (not in the Project Implicit research pool), enter n/a')
                ])
            ]),

            m('.row.space',[
                m('.col-sm-12',[
                    m('h5', 'Participant Restrictions')
                ])
            ]),


            rulesEditor({value:ctrl.rulesValue, visual: ctrl.rulesVisual, comments: ctrl.rulesComments, exist_rule_file: ctrl.exist_rule_file}),

            m('.row.space',[
                m('.col-sm-12',[
                     m('.font-weight-bold', 'Study is ready for deploy: ')
                ])
            ]),

            m('.row.space',[
                m('.col-sm-12',{onclick: () => ctrl.approved_by_irb(!ctrl.approved_by_irb())},[
                    ASTERISK, m('i.fa.fa-fw', {
                        class: classNames({'fa-square-o' : !ctrl.approved_by_irb(), 'fa-check-square-o' : ctrl.approved_by_irb()})
                    }), 'This study has been approved by the appropriate IRB '

                ])
            ]),
            m('.row.space',[
                m('.col-sm-12',{onclick: () => ctrl.completed_checklist(!ctrl.completed_checklist())},[
                    ASTERISK, m('i.fa.fa-fw', {
                        class: classNames({'fa-square-o' : !ctrl.completed_checklist(), 'fa-check-square-o' : ctrl.completed_checklist()})
                    }), 'The study is compliant with ',
                    m('a', {href:'https://docs.google.com/document/d/1pglAQELqNLWbV1yscE2IVd7G5xVgZ8b4lkT8PYeumu8/edit?usp=sharing', target:'_blank'}, 'PI Research Pool Guidelines and Required Elements & Study Conventions'),
                    ' .'
                ])
            ]),

            m('.row.space',[
                m('.col-sm-12',{onclick: () => ctrl.zero_unnecessary_files(!ctrl.zero_unnecessary_files())},[
                    ASTERISK, m('i.fa.fa-fw', {
                        class: classNames({'fa-square-o' : !ctrl.zero_unnecessary_files(), 'fa-check-square-o' : ctrl.zero_unnecessary_files()})
                    }), 'My study folder includes ZERO files that aren\'t necessary for the study (e.g., word documents, older versions of files, items that were dropped from the final version)'

                ])
            ]),

            m('.row.space',[
                m('.col-sm-12',{onclick: () => ctrl.realstart(!ctrl.realstart())},[
                    ASTERISK, m('i.fa.fa-fw', {
                        class: classNames({'fa-square-o' : !ctrl.realstart(), 'fa-check-square-o' : ctrl.realstart()})
                    }), 'I used a realstart and lastpage tasks'

                ])
            ]),


            m('.row.space',[
                m('.col-sm-12',[
                    ASTERISK, ' Study has been approved by a *User Experience* Reviewer (Calvin Lai): '
                ])
            ]),

            m('.row',[
                m('.col-sm-5',[
                    m('select.c-select.form-control.space',{onchange: m.withAttr('value', ctrl.approved_by_a_reviewer)}, [
                        m('option', {value:'', selected:ctrl.approved_by_a_reviewer()==='', disabled:true}, 'Select answer'),
                        m('option', {value:'No, this study is not for the Project Implicit pool.', selected:ctrl.approved_by_a_reviewer()==='No, this study is not for the Project Implicit pool.'}, 'No, this study is not for the Project Implicit pool.'),
                        m('option', {value:'Yes', selected:ctrl.approved_by_a_reviewer()==='yes'}, 'Yes'),
                    ])
                ])
            ]),


            m('.row.space',[
                m('.col-sm-12',[
                    ASTERISK, ' If you are building this study for another researcher (e.g. a contract study), has the researcher received the standard final launch confirmation email and confirmed that the study is ready to be launched? '
                ])
            ]),

            m('.row',[
                m('.col-sm-5',[
                    m('select.c-select.form-control.space',{onchange: m.withAttr('value', ctrl.launch_confirmation)}, [
                        m('option', {value:'', selected:ctrl.launch_confirmation()==='', disabled:true}, 'Select answer'),
                        m('option', {value:'No,this study is mine.', selected:ctrl.launch_confirmation()==='No,this study is mine.'}, 'No,this study is mine.'),
                        m('option', {value:'Yes', selected:ctrl.launch_confirmation()==='yes'}, 'Yes'),
                    ])
                ])
            ]),


            m('.row.space',[
                m('.col-sm-12',[
                    'Additional comments'
                ])
            ]),

            m('.row',[
                m('.col-sm-12',[
                    m('textarea.form-control', {value: ctrl.comments(), onchange:  m.withAttr('value', ctrl.comments), onkeyup: m.withAttr('value', ctrl.comments), placeholder:'Additional comments'})
                ])
            ]),

            !ctrl.error() ? '' : m('.alert.alert-warning', m('strong', 'Error: '), ctrl.error()),
            m('.row.space',[
                m('.col-sm-12.text-sm-right',[
                    m('button.btn.btn-primary', {onclick: submit}, 'Request Deploy')
                ])
            ]),
        ]);
    }
};

