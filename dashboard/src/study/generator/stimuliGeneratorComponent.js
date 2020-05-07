export default stimuli_view;

let stimuli_view = args => m.component(stimuliGeneratorComponent, args);


let stimuliGeneratorComponent = {
    controller({possible_stimuli, possible_conditions}){
        let ctrl = {
            default_css : ['top', 'bottom', 'left', 'right',  'color', 'fontSize'],
            num_of_stimuli:0,
            possible_stimuli,
            possible_conditions,
            do_add_stimulus,
            update_stimulus_field,
            update_stimulus_css_field,
            delete_stimulus,
            add_stimulus_to_sets,
            update_stimulus_field_4_sets,
            update_stimulus_css_4_sets,
            delete_stimulus_from_sets
        };

        if(possible_stimuli.length===0)
            ctrl.do_add_stimulus();

        function add_stimulus_to_sets(stimulus){
            const new_stimulus = {stimulus_name:stimulus.stimulus_name,
                media:'',
                default_times: stimulus.default_times,
                onset: stimulus.onset,
                offset: stimulus.offset,
                response:!!stimulus.response,
                response_key:'',
                css_data:{},
                css2use:[]};
            ctrl.possible_conditions().forEach(condition=>{
                condition.stimuli_sets.forEach(set=>set.push(new_stimulus));
            })
        }

        function update_stimulus_field_4_sets(stimulus_name, field, old_field, new_field){
            ctrl.possible_conditions().forEach(condition=>{
                condition.stimuli_sets.forEach(set=>{
                    set.forEach(stimulus=>{
                        stimulus[field] = stimulus.stimulus_name === stimulus_name ? new_field : stimulus[field];

                    });
                })
            })
        }

        function update_stimulus_css_4_sets(stimulus_obj, css, add){
            ctrl.possible_conditions().forEach(condition=>{
                condition.stimuli_sets.forEach(set=>{
                    set.forEach(stimulus=>{
                        if(stimulus.stimulus_name === stimulus_obj.stimulus_name){
                            if(add)
                                stimulus.css2use.push(css);
                            else
                                stimulus.css2use.splice(stimulus.css2use.findIndex(obj=>obj===css), 1);
                        }
                    });
                })
            })
        }

        function do_add_stimulus() {
            let possible_csss = {};
            ctrl.default_css.map(css=>possible_csss[css]= false);
            const new_stimulus = {stimulus_name:`stimulus_${++ctrl.num_of_stimuli}`,
                                  response:false,
                                  media_type:'text',
                                  css:possible_csss,
                                  default_times:true,
                                  onset:'0',
                                  offset:'0'};
            ctrl.possible_stimuli().push(new_stimulus);
            ctrl.add_stimulus_to_sets(new_stimulus);
        }

        function update_stimulus_field(id, field, value){
            if(ctrl.possible_stimuli()[id][field] === value)
                return;
            ctrl.update_stimulus_field_4_sets(ctrl.possible_stimuli()[id].stimulus_name, field, ctrl.possible_stimuli()[id][field], value);
            ctrl.possible_stimuli()[id][field] = value;
        }

        function update_stimulus_css_field(id, field){
            ctrl.possible_stimuli()[id].css[field] = !ctrl.possible_stimuli()[id].css[field];
            ctrl.update_stimulus_css_4_sets(ctrl.possible_stimuli()[id], field, ctrl.possible_stimuli()[id].css[field]);
        }

        function delete_stimulus_from_sets(stimulus_obj){
            ctrl.possible_conditions().forEach(condition=>{
                condition.stimuli_sets.forEach(set=>{
                    set.splice(set.findIndex(stimulus=> stimulus.stimulus_name === stimulus_obj.stimulus_name), 1);
                });
            })
        }


        function delete_stimulus(id){
            ctrl.delete_stimulus_from_sets(ctrl.possible_stimuli()[id]);
            ctrl.possible_stimuli().splice(id, 1);
        }

        return ctrl;
    },
    view(ctrl){
        return m('.row', [
            m('h4.space', 'Trial properties'),
            m('.row',[
                m('.col-sm-2',
                    m('strong', 'Stimulus name')
                ),
                m('.col-sm-2',
                    m('strong', 'Response')
                ),
                m('.col-sm-3',
                    m('strong', 'Visual properties')
                ),
                m('.col-sm-2',
                    m('strong', 'Media type')
                ),
                m('.col-sm-2',
                    m('strong', 'Times')
                )
            ]),

            ctrl.possible_stimuli().map(function(stimulus, id) {
                return m('row.col-sm-12',
                    [m('hr'), m('.col-sm-2',
                        m('label.input-group.space', [
                            m('input.form-control', {value: stimulus.stimulus_name, placeholder: 'stimulus name', onchange:function(){ctrl.update_stimulus_field(id, 'stimulus_name', this.value)}, onkeyup:function(){ctrl.update_stimulus_field(id, 'stimulus_name', this.value)}})
                        ])),
                        m('.col-sm-2',
                            m('div', m('label.c-input.c-radio', [
                                m('input[type=radio]', {
                                    onclick: ()=>ctrl.update_stimulus_field(id, 'response', true),
                                    checked: stimulus.response,
                                }), m('span.c-indicator'), ' With response'
                            ])),
                            m('div', m('label.c-input.c-radio', [
                                m('input[type=radio]', {
                                    onclick: ()=>ctrl.update_stimulus_field(id, 'response', false),
                                    checked: !stimulus.response,
                                }), m('span.c-indicator'), ' Without response'
                            ]))
                        ),
                        m('.col-sm-3',
                            m('row',[
                                ctrl.default_css.map(css=>
                                    m('.col-sm-3',
                                            m('label.c-input.checkbox',  [ m('input[type=checkbox]',{
                                                    onchange:  ()=> ctrl.update_stimulus_css_field(id, css),
                                                    checked: stimulus.css[css],
                                                }), m('span', css)
                                            ])
                                    )
                                )
                            ])),
                        m('.col-sm-2',
                            m('div', m('label.c-input.c-radio', [
                                m('input[type=radio]', {
                                    onclick: ()=>ctrl.update_stimulus_field(id, 'media_type', 'images'),
                                    checked: stimulus.media_type==='images',
                                }), m('span.c-indicator'), ' Images'
                            ])),
                            m('div', m('label.c-input.c-radio', [
                                m('input[type=radio]', {
                                    onclick: ()=>ctrl.update_stimulus_field(id, 'media_type', 'text'),
                                    checked: stimulus.media_type==='text',
                                }), m('span.c-indicator'), ' Text'
                            ]))
                        ),
                        m('.col-sm-2',[
                                m('div', m('label.c-input.c-radio', [
                                    m('input[type=radio]', {
                                        onclick: ()=>ctrl.update_stimulus_field(id, 'default_times', false),
                                        checked: !stimulus.default_times,
                                    }), m('span.c-indicator'), ' Variable'
                                ])),
                                m('div', m('label.c-input.c-radio', [
                                    m('input[type=radio]', {
                                        onclick: ()=>ctrl.update_stimulus_field(id, 'default_times', true),
                                        checked: stimulus.default_times,
                                    }), m('span.c-indicator'), ' Fixed'
                                ]))
                            ,
                            m('.row', {class: stimulus.default_times ? '' : 'disable_properties'},
                                    m('label.input-group', [
                                    'Onset',
                                    m('input.form-control', {disabled:!stimulus.default_times, type:'number', min:'0', value: stimulus.onset, placeholder: 'Onset', onchange:function(){ctrl.update_stimulus_field(id, 'onset', this.value)}})
                            ])),
                            m('.row', {class: stimulus.default_times ? '' : 'disable_properties'},
                                m('label.input-group', [
                                    'Offset',
                                    m('input.form-control', {disabled:!stimulus.default_times, type:'number', min:'0', value: stimulus.offset, placeholder: 'Offset', onchange:function(){ctrl.update_stimulus_field(id, 'offset', this.value)}})
                                ])
                            )
                        ]),
                        m('.col-sm-1',
                            ctrl.possible_stimuli().length===1 ? '' :
                            m('label.input-group.space', m('button.btn.btn-secondary.btn-sm.m-r-1', { onclick:function(){ctrl.delete_stimulus(id)}}, [
                                m('i.fa.fa-close'), ' '
                            ]))
                        )
                    ])
            }),
            m('.row.space',
                m('.col-sm-12', [
                    m('button.btn.btn-primary.btn-sm.m-r-1', {onclick:ctrl.do_add_stimulus},
                        [m('i.fa.fa-plus'), '  add stimulus']
                    )
                ])
            )
        ])


    }
};

