import {save, get_properties} from './generatorModel';
import responses_view from './responsesGeneratorComponent';
import stimuli_view from './stimuliGeneratorComponent';
import conditions_view from "./conditionsGeneratorComponent";
import {get_collaborations} from "../sharing/sharingModel";

export default generatorComponent;


let generatorComponent = {
    controller(){
        let possible_responses = m.prop([]);
        let possible_stimuli = m.prop([]);
        let possible_conditions = m.prop([]);
        let loaded = m.prop(false);;
        let erros = m.prop([]);
        function load() {
            get_properties(49)
                .then((properties)=>
                {
                    const content = JSON.parse(properties.content);
                    possible_responses(content.responses);
                    possible_stimuli(content.stimuli);
                    possible_conditions(content.conditions_data);

                    loaded(true);})
                .catch(error => {
                    erros(error.message);
                    console.log({error:erros()})
                }).then(m.redraw);

        }
        // loaded = true;
        function do_save(){
            console.log(possible_responses());
            save(m.route.param('studyId'), possible_responses().filter(response=>!!response.key), possible_stimuli, possible_conditions);
        }
        load();

        return {do_save, loaded, possible_responses, possible_stimuli, possible_conditions};
    },
    view({do_save, loaded, possible_responses, possible_stimuli, possible_conditions}){
        return  !loaded()
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