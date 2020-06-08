import {save} from "../../generator/generatorModel";
import responses_view from "../../generator/responsesGeneratorComponent";
import constants_view from "../../generator/constantsGeneratorComponent";

import stimuli_view from "../../generator/stimuliGeneratorComponent";
import conditions_view from "../../generator/conditionsGeneratorComponent";
import classNames from 'utils/classNames';

export default propEditor;


const propEditor = args => m.component(propEditorComponent, args);

const propEditorComponent = {
    controller: function({file, study}){
        let ctrl = {
            err : m.prop(),

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
            fixation : m.prop('0'),
            iti : m.prop('0')

        };

        let imgs   = m.prop([]);

        function modeClass(value) { return ctrl.mode() === value ? 'active' : ''; }
        function update_mode(value) {return ctrl.mode(value); }

        function load() {
            return file.get()
                .catch(ctrl.err)
                .then(() => {
                    const content = JSON.parse(file.content());
                    possible_responses(content.responses);
                    possible_stimuli(content.stimuli);
                    possible_conditions(content.conditions_data);
                    constants.fixation(content.constants && content.constants.fixation ? content.constants.fixation : '0');
                    constants.iti(content.constants && content.constants.iti ? content.constants.iti : '0');

                    imgs(study.files().filter(file=>!file.isDir && ['png', 'jpg'].includes(file.type)));
                    ctrl.loaded(true);
            })
            .then(m.redraw);

        }
        function do_save(){
            save(m.route.param('studyId'), possible_responses().filter(response=>!!response.key), possible_stimuli, possible_conditions, constants)
                .then(study.get());
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
                m('.btn-toolbar.editor-menu', [
                    m('.btn-group.btn-group-sm.pull-xs-left', [
                        m('a.btn.btn-secondary', { title:'Save', onclick:()=>ctrl.update_mode('constants'),
                            class: ctrl.modeClass('constants')},[
                            m('strong', 'Constants')
                        ]),
                        m('a.btn.btn-secondary', { title:'Save', onclick:()=>ctrl.update_mode('stimuli'),
                            class: ctrl.modeClass('stimuli')},[
                            m('strong', 'Stimuli')
                        ]),
                        m('a.btn.btn-secondary', { title:'Save', onclick:()=>ctrl.update_mode('conditions'),
                            class: ctrl.modeClass('conditions')},[
                            m('strong', 'Conditions')
                        ])

                    ]),

                ]),
                ctrl.mode() !== 'constants' ? '' : responses_view({possible_responses}),
                ctrl.mode() !== 'constants' ? '' : constants_view({fixation: constants.fixation, iti: constants.iti}),
                ctrl.mode() !== 'stimuli' ? '' : stimuli_view({possible_stimuli, possible_conditions}),
                ctrl.mode() !== 'conditions' ? '' : conditions_view({possible_conditions, possible_stimuli, possible_responses, imgs}),
                m('.row.space.central_panel',
                    m('.col-sm-12.', [
                        m('button.btn.btn-primary.btn-sm.m-r-1', {onclick:()=>ctrl.do_save()},
                            [m('i.fa.fa-save'), '  Save']
                        )
                    ])
                )

            ]);
    }
};