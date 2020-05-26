import {save} from './generatorModel';
import responses_view from './responsesGeneratorComponent';
import stimuli_view from './stimuliGeneratorComponent';
import conditions_view from "./conditionsGeneratorComponent";

export default generatorComponent;


let generatorComponent = {
    controller(){
        let possible_responses = m.prop([]);
        let possible_stimuli = m.prop([]);
        let possible_conditions = m.prop([]);
        let loaded = false;
        function load() {
             loaded = true;
        }
        function do_save(){
            save(m.route.param('studyId'), possible_responses, possible_stimuli, possible_conditions);
        }
        load();
        return {do_save, loaded, possible_responses, possible_stimuli, possible_conditions};
    },
    view({do_save, loaded, possible_responses, possible_stimuli, possible_conditions}){
        return  !loaded
            ?
            m('.loader')
            :
            m('.generetor', [
                responses_view({possible_responses}),
                m('hr'),
                stimuli_view({possible_stimuli, possible_conditions}),
                m('hr'),
                conditions_view({possible_conditions, possible_stimuli, possible_responses}),
                m('.row.space.central_panel',
                    m('.col-sm-12.', [
                        m('button.btn.btn-primary.btn-sm.m-r-1', {onclick:()=>do_save()},
                            [m('i.fa.fa-save'), '  Save']
                        )
                    ])
                )

            ]);
    }
};