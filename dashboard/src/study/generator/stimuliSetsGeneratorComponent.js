let stimuli_sets_view = args => m.component(stimuliSetsGeneratorComponent, args);

export default stimuli_sets_view;

let stimuliSetsGeneratorComponent = {
    controller({condition, possible_stimuli, possible_responses, imgs}){
        let ctrl = {
            imgs,
            condition,
            possible_stimuli,
            possible_responses,
            delete_stimuli_set,
            add_stimuli_set,
            update_stimulus_media,
            toggle_stimulus_response,
            update_stimulus_css
        };
        if(condition.stimuli_sets.length===0)
            ctrl.add_stimuli_set();

        function add_stimuli_set(){
            let stimuli_object = [];
            ctrl.possible_stimuli().forEach(function(stimulus){
                const css2use = Object.keys(stimulus.css).filter((key=>stimulus.css[key]));
                const css_data = {};
                css2use.forEach(css=>{css_data[css]= ''});

                stimuli_object.push({stimulus_name:stimulus.stimulus_name,
                                     media_type: stimulus.media_type,
                                     media:'',
                                     default_times: stimulus.default_times,
                                     onset: stimulus.onset,
                                     offset: stimulus.offset,
                                     relative_to: stimulus.relative_to,
                                     response:stimulus.response,
                                     response_key:'',
                                     css2use,
                                     css_data});
            });
            condition.stimuli_sets.push(stimuli_object);
        }

        function toggle_stimulus_response(set_id, stimulus_id, response_key){
            ctrl.condition.stimuli_sets[set_id][stimulus_id].response_key = response_key;
        }

        function delete_stimuli_set(set_id){
            ctrl.condition.stimuli_sets.splice(set_id, 1);
        }
        function update_stimulus_media(set_id, stimulus_id, media){
            ctrl.condition.stimuli_sets[set_id][stimulus_id].media = media;
        }
        function update_stimulus_css(set_id, stimulus_id, field, value){
            ctrl.condition.stimuli_sets[set_id][stimulus_id].css_data[field] = value;
        }

        return ctrl;
    },
    view(ctrl){
        return m('.row', [
                    m('row.col-sm-12', [
                        m('.row',[
                            m('.col-sm-2',
                                m('strong', 'Stimulus name')
                            ),
                            m('.col-sm-3',
                                m('strong', 'Media')
                            ),
                            m('.col-sm-2',
                                m('strong', 'Times')
                            ),

                            m('.col-sm-2',
                                m('strong', 'Visual properties')
                            ),
                            m('.col-sm-2',
                                m('strong', 'Response')
                            )
                        ]),
                        ctrl.condition.stimuli_sets.map(function(stimuli_set, set_id){
                            return stimuli_set.map(function(stimulus, stimulus_id) {
                                return m('row.col-sm-12',[
                                    stimulus_id>0 ?  '' : m('hr'),
                                    m('.col-sm-2', stimulus.stimulus_name),
                                    m('.col-sm-3',
                                        m('label.input-group.space', [
                                            stimulus.media_type === 'image'
                                            ?
                                            m('select.form-control', {onchange:function(){ctrl.update_stimulus_media(set_id, stimulus_id, this.value);}}, [
                                                m('option',{value:'', disabled: true, selected: stimulus.media === ''},  'Select image'),
                                                ctrl.imgs().map(img=>m('option',{value:img.path, selected: stimulus.media === img.path},  img.path))
                                            ])
                                            :
                                            m('input.form-control', {value: stimulus.media, placeholder: 'media', onchange:function(){ctrl.update_stimulus_media(set_id, stimulus_id, this.value);}}),
                                        ])
                                    ),



                                    m('.col-sm-2', {class: !stimulus.default_times ? '' : 'disable_properties'},[
                                        m('row', [
                                            'Onset ', m('input.form-control', {disabled:stimulus.default_times, type:'number', min:'0', value: stimulus.onset, placeholder: 'Onset'})
                                        ]),
                                        m('row', [
                                            'Offset ', m('input.form-control', {disabled:stimulus.default_times, type:'number', min:'0', value: stimulus.offset, placeholder: 'Offset'})
                                        ])
                                    ]),
                                    m('.col-sm-2',

                                        stimulus.css2use.length===0 ? '-' :
                                            stimulus.css2use.map(css2use=> m('row', [
                                                css2use, m('input.form-control', {value: stimulus.css_data[css2use], placeholder: css2use, onchange:function(){ctrl.update_stimulus_css(set_id, stimulus_id, css2use, this.value);}})
                                            ]))
                                    ),
                                    m('.col-sm-2', stimulus.response === 'without_response' ? '-' :
                                            ctrl.possible_responses().map((response, key_id)=>
                                                m('row',[
                                                    m('.col-sm-2', response.key.length !==1 ? '' :
                                                        m('div', m('label.c-input.c-radio', [
                                                            m('input[type=radio]', {
                                                                onclick: ()=>ctrl.toggle_stimulus_response(set_id, stimulus_id, key_id),
                                                                checked: stimulus.response_key === key_id,
                                                            }), m('span.c-indicator'), ` ${response.key}`
                                                        ]))
                                                    )]
                                            ))
                                    ),
                                    m('.col-sm-1',
                                        ctrl.condition.stimuli_sets.length === 1 ? '' :
                                        m('label.input-group.space', m('button.btn.btn-secondary.btn-sm.m-r-1', {onclick:function(){ctrl.delete_stimuli_set(set_id)}}, [
                                            m('i.fa.fa-close'), ' '
                                        ]))
                                    )

                                ])
                            })

                        }),
                        m('.row.space',
                            m('.col-sm-12', [
                                m('button.btn.btn-secondary.btn-sm.m-r-1', {onclick:function(){ctrl.add_stimuli_set()}},
                                    [m('i.fa.fa-plus'), '  add stimuli set']
                                )
                            ])
                        )
                    ])
        ]);
    }
};

