import {save} from '../../generator/generatorModel';
import responses_view from '../../generator/responsesGeneratorComponent';
import constants_view from '../../generator/constantsGeneratorComponent';

import stimuli_view from '../../generator/stimuliGeneratorComponent';
import conditions_view from '../../generator/conditionsGeneratorComponent';
import {createNotifications} from 'utils/notifyComponent';


const propEditor = args => m.component(propEditorComponent, args);

const propEditorComponent = {
    controller: function({file, study}){
        let ctrl = {
            err : m.prop([]),
            is_locked:m.prop(study.is_locked),

            notifications: createNotifications(),

            mode : m.prop('constants'),
            loaded : m.prop(false),

            modeClass,
            update_mode,
            do_save

        };
        let possible_responses = m.prop([]);
        let possible_stimuli = m.prop([]);
        let possible_conditions = m.prop([]);
        let constants = {
            durations : {
                fixation: m.prop('0'),
                iti: m.prop('0'),
                feedback: m.prop('0'),

            },
            feedback:{
                correct : m.prop(''),
                incorrect : m.prop(''),
                noresponse : m.prop('')
            },
            instructions:{
                welcome : m.prop(''),
                start : m.prop(''),
                end : m.prop('')
            }
        };
        let imgs   = m.prop([]);

        function modeClass(value) { return ctrl.mode() === value ? 'active' : ''; }
        function update_mode(value) {return ctrl.mode(value); }

        function load() {
            imgs(study.files().filter(file=>!file.isDir && ['png', 'jpg'].includes(file.type)));

            return file.get()
                .catch(ctrl.err)
                .then(() => {
                    if(file.content()==='')
                        return ctrl.loaded(true);
                    const content = JSON.parse(file.content());
                    possible_responses(content.responses);
                    possible_stimuli(content.stimuli);
                    possible_conditions(content.conditions_data);
                    constants.durations.fixation(content.constants.durations.fixation ? content.constants.durations.fixation : '0');
                    constants.durations.iti(content.constants.durations.iti ? content.constants.durations.iti : '0');
                    constants.durations.feedback(content.constants.durations.feedback ? content.constants.durations.feedback : '0');

                    constants.feedback.correct(content.constants.feedback.correct ? content.constants.feedback.correct : '');
                    constants.feedback.incorrect(content.constants.feedback.incorrect ? content.constants.feedback.incorrect : '');
                    constants.feedback.noresponse(content.constants.feedback.noresponse ? content.constants.feedback.noresponse : '');

                    constants.instructions.welcome(content.constants.instructions.welcome ? content.constants.instructions.welcome : '');
                    constants.instructions.start(content.constants.instructions.start ? content.constants.instructions.start : '');
                    constants.instructions.end(content.constants.instructions.end ? content.constants.instructions.end : '');

                    ctrl.loaded(true);
                })
                .then(m.redraw);
        }
        function do_save(){
            ctrl.err([]);
            save(m.route.param('studyId'), m.route.param('fileId'), possible_responses().filter(response=>!!response.key), possible_stimuli, possible_conditions, constants)
                .then(study.get())
                .then(()=>ctrl.notifications.show_success(`Experiment successfully saved`))
                .then(m.redraw);
        }
        load();

        return {ctrl, possible_conditions, possible_stimuli, possible_responses, imgs, constants};
    },

    view({ctrl, possible_conditions, possible_stimuli, possible_responses, imgs, constants}){
        return  !ctrl.loaded()
            ?
            m('.loader')
            :
            m('.generetor', [
                m('div', ctrl.notifications.view()),
                m('.btn-toolbar.editor-menu', [
                    m('.btn-group.btn-group-sm.pull-xs-left', [

                        m('a.btn.btn-secondary', {onclick:()=>ctrl.update_mode('constants'),
                            class: ctrl.modeClass('constants')},[
                            m('strong', 'Constants')
                        ]),
                        m('a.btn.btn-secondary', {onclick:()=>ctrl.update_mode('stimuli'),
                            class: ctrl.modeClass('stimuli')},[
                            m('strong', 'Stimuli')
                        ]),
                        m('a.btn.btn-secondary', {onclick:()=>ctrl.update_mode('conditions'),
                            class: ctrl.modeClass('conditions')},[
                            m('strong', 'Conditions')
                        ])

                    ]),

                ]),
                responses_view({is_locked:ctrl.is_locked, mode: ctrl.mode, possible_responses}),
                constants_view({is_locked:ctrl.is_locked, mode: ctrl.mode, constants, imgs}),
                stimuli_view({is_locked:ctrl.is_locked, mode: ctrl.mode, possible_stimuli, possible_conditions}),
                conditions_view({is_locked:ctrl.is_locked, mode: ctrl.mode, possible_conditions, possible_stimuli, possible_responses, imgs}),

                ctrl.err().length === 0 ? '' : m('.row.space.alert.alert-danger', ctrl.err()),
                ctrl.is_locked() ? '' :

                m('.row.space.central_panel',
                    m('.col-sm-12.', [
                        m('button.btn.btn-primary.btn-sm.m-r-1', {onclick:()=>ctrl.do_save()},
                            [m('i.fa.fa-save'), '  Save']
                        ),

                    ])),
            ]);
    }
};


export default propEditor;
