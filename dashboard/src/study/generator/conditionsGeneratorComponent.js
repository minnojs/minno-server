import stimuli_sets_view from "./stimuliSetsGeneratorComponent";


let conditions_view = args => m.component(conditionsGeneratorComponent, args);

export default conditions_view;

let conditionsGeneratorComponent = {
    controller({mode, possible_conditions, possible_stimuli, possible_responses, imgs}){
        let ctrl = {
            mode,
            num_of_conditions:0,
            do_add_condition,
            update_condition_name,
            update_repetitions
        };

        function do_add_condition() {
            possible_conditions().push({repetitions:['0', '0'], condition_name:`condition_${++ctrl.num_of_conditions}`, stimuli_sets:[]});
            possible_conditions(possible_conditions());
        }

        function update_repetitions(id, block, value){
            possible_conditions()[id].repetitions[block] = value;
            possible_conditions(possible_conditions());
        }

        function update_condition_name(id, name){
            possible_conditions()[id].condition_name = name;
            possible_conditions(possible_conditions());
        }
        if(possible_conditions().length===0)
            ctrl.do_add_condition();

        return {ctrl, possible_conditions, possible_stimuli, possible_responses, imgs};
    },
    view({ctrl, possible_conditions, possible_stimuli, possible_responses, imgs}){
        return m('.row',  {style:{display: ctrl.mode()==='conditions' ? 'block': 'none'}},[
            m('h4.space', 'Conditions'),
            m('.row.col-sm-12',[
                m('.col-sm-2',
                    m('strong', 'Condition name')
                ),
                m('.col-sm-2',
                    m('strong', 'Trials in practice')
                ),
                m('.col-sm-2',
                    m('strong', 'Trials in experiment')
                ),
            ]),
            possible_conditions().map(function(condition, condition_id) {
                return  [m('row.col-sm-12',
                    m('.col-sm-2',
                        m('label.input-group.space', [
                            m('input.form-control', {value: condition.condition_name, placeholder: 'condition name', onchange:function(){ctrl.update_condition_name(condition_id,  this.value)}}),
                        ])
                    ),
                    m('.col-sm-2',
                        m('label.input-group.space', [
                            m('input.form-control.col-sm-1', {value: condition.repetitions[0], type:'number', min:'0', placeholder: 'Trials in practice', onchange:function(){ctrl.update_repetitions(condition_id,  0, this.value)}}),
                        ])
                    ),
                    m('.col-sm-2',
                        m('label.input-group.space', [
                            m('input.form-control.col-sm-1', {value: condition.repetitions[1], type:'number', min:'0', placeholder: 'Trials in experiment', onchange:function(){ctrl.update_repetitions(condition_id,  1, this.value)}}),
                        ])
                    )
                ),
                    stimuli_sets_view({condition, possible_stimuli, possible_responses, imgs})
            ]}),


            m('.row.space',
                m('.col-sm-13', [
                    m('button.btn.btn-primary.btn-sm.m-r-1', {onclick:ctrl.do_add_condition},
                        [m('i.fa.fa-plus'), '  add condition']
                    )
                ])
            ),

        ]);


    }
};

