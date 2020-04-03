import {get_collaborations, remove_collaboration, add_collaboration, update_permission, make_pulic, add_link, revoke_link} from './generatorModel';
import messages from 'utils/messagesComponent';
import {copyUrl} from 'utils/copyUrl';

export default generatorComponent;

let generatorComponent = {
    controller(){
        let ctrl = {

            stimuli:m.prop([]),
            possible_responses:m.prop([{key:''}]),
            conditions: m.prop([]),
            update_possible_response,
            delete_possible_response,

            do_add_stimulus,
            toggle_response,
            update_stimulus_field,
            delete_stimulus,

            do_add_condition,
            update_condition_name,

            add_stimuli_set,
            update_stimulus_media,
            toggle_stimulus_response
        };

        function load() {
            ctrl.loaded = true;
        }


        function update_possible_response(id, value) {
            if(value!=='' && ctrl.possible_responses().filter(response=>response.key===value).length>1)
                value = '';

            if (value.length>1)
                value = value[value.length - 1];

            ctrl.possible_responses()[id].key = value;
            const empty_keys = ctrl.possible_responses().filter(response=>response.key==='');
            if(empty_keys.length===0)
                ctrl.possible_responses().push({key:''});
        }

        function delete_possible_response(id){
            ctrl.possible_responses().splice(id, 1);
            const empty_keys = ctrl.possible_responses().filter(response=>response.key==='');
            if(empty_keys.length===0)
                ctrl.possible_responses().push({key:''});
        }

        function do_add_stimulus() {
            ctrl.stimuli().push({stimulus_name:'', response:false, css:''});
        }



        function toggle_response(id, varable, state){
            if(ctrl.stimuli()[id][varable].enable === state)
                return;
            ctrl.stimuli()[id][varable] = state;
        }


        function update_stimulus_field(id, field, name){
            ctrl.stimuli()[id][field] = name;
            // console.log(ctrl.stimuli());
        }



        function delete_stimulus(id){
            ctrl.stimuli().splice(id, 1);
        }


        function do_add_condition() {
            ctrl.conditions().push({condition_name:'', stimuli_sets:[]});
        }

        function update_condition_name(id, name){
            ctrl.conditions()[id].condition_name = name;
            // console.log(ctrl.stimuli());
        }
        function add_stimuli_set(id){
            let stimuli_object = [];
            ctrl.stimuli().forEach(function(stimulus){
                stimuli_object.push({stimulus_name:stimulus.stimulus_name, media:'', response:!!stimulus.response, response_key:'', css:stimulus.css});
            });
            ctrl.conditions()[id].stimuli_sets.push(stimuli_object);
        }

        function toggle_stimulus_response(condition_id, set_id, stimulus_id, response_key){
            ctrl.conditions()[condition_id].stimuli_sets[set_id][stimulus_id].response_key = response_key;
        }

        function update_stimulus_media(condition_id, set_id, stimulus_id, media){
            ctrl.conditions()[condition_id].stimuli_sets[set_id][stimulus_id].media = media;
            // console.log(ctrl.stimuli());
        }


        load();
        return ctrl;
    },
    view(ctrl){
        return  !ctrl.loaded
            ?
            m('.loader')
            :
            m('.container.sharing-page', [
                m('h4', 'Possible responses'),
                m('.row',[
                    ctrl.possible_responses().map(function(response, id) {
                        return m('row',[
                            m('.col-sm-2',
                                m('label.input-group.space', [
                                    m('input.form-control.col-sm-1', {value: response.key, placeholder: 'key', onchange:function(){ctrl.update_possible_response(id, this.value)}, onkeyup:function(){ctrl.update_possible_response(id, this.value)}}),
                                    id===0 || (!response.key && id === (ctrl.possible_responses().length-1)) ? '' : m('.input-group-addon', {onclick:function(){ctrl.delete_possible_response(id)}}, m('i.fa.fa-fw.fa-close'))
                                ])
                            )
                        ])

                    })
                ]),


                m('h4.space', 'Trial properties'),
                m('.row',[
                    m('.col-sm-3',
                        m('strong', 'Stimulus name')
                    ),
                    m('.col-sm-3',
                        m('strong', 'Response')
                    ),
                    m('.col-sm-5',
                        m('strong', 'Visual properties')
                    )
                ]),


                ctrl.stimuli().map(function(stimulus, id) {
                    return m('row.col-sm-12',
                        [m('.col-sm-3',
                            m('label.input-group.space', [
                                m('input.form-control', {value: stimulus.stimulus_name, placeholder: 'stimulus name', onchange:function(){ctrl.update_stimulus_field(id, 'stimulus_name', this.value)}})
                        ])),
                        m('.col-sm-3',
                                m('div', m('label.c-input.c-radio', [
                                    m('input[type=radio]', {
                                        onclick: ()=>ctrl.toggle_response(id, 'response', true),
                                        checked: stimulus.response,
                                    }), m('span.c-indicator'), ' With response'
                                ])),
                                m('div', m('label.c-input.c-radio', [
                                    m('input[type=radio]', {
                                        onclick: ()=>ctrl.toggle_response(id, 'response', false),
                                        checked: !stimulus.response,
                                    }), m('span.c-indicator'), ' Without response'
                                ]))
                            ),
                            m('.col-sm-5',
                                m('label.input-group.space', [
                                    m('input.form-control', {value: stimulus.css, placeholder: 'css', onchange:function(){ctrl.update_stimulus_field(id, 'css', this.value)}})
                            ])),
                            m('.col-sm-1',
                                m('label.input-group.space', m('button.btn.btn-secondary.btn-sm.m-r-1', {onclick:function(){ctrl.delete_stimulus(id)}}, [
                                m('i.fa.fa-close'), ' '
                            ]))),
                        ])
                }),

                m('.row.space',
                    m('.col-sm-12', [
                        m('button.btn.btn-secondary.btn-sm.m-r-1', {onclick:ctrl.do_add_stimulus},
                            [m('i.fa.fa-plus'), '  add stimulus']
                        )
                    ])
                ),

                m('h4.space', 'Conditions'),


                ctrl.conditions().map(function(condition, condition_id) {
                    return  [m('row.col-sm-12',
                                m('.col-sm-3',
                                    m('label.input-group.space', [
                                        m('input.form-control', {value: condition.condition_name, placeholder: 'condition name', onchange:function(){ctrl.update_condition_name(condition_id,  this.value)}}),
                                    ]))
                                ),
                                m('row.col-sm-12', [
                                    m('.row',[
                                        m('.col-sm-2',
                                            m('strong', 'Stimulus name')
                                        ),
                                        m('.col-sm-3',
                                            m('strong', 'Media')
                                        ),
                                        m('.col-sm-3',
                                            m('strong', 'Visual properties')
                                        ),
                                        m('.col-sm-3',
                                            m('strong', 'Response')
                                        )
                                    ]),
                                    condition.stimuli_sets.map(function(stimuli_set, set_id){
                                        return stimuli_set.map(function(stimulus, stimulus_id) {
                                            return m('row.col-sm-12',[
                                                m('.col-sm-2', stimulus.stimulus_name),
                                                m('.col-sm-3',
                                                    m('label.input-group.space', [
                                                        m('input.form-control', {value: stimulus.media, placeholder: 'media', onchange:function(){ctrl.update_stimulus_media(condition_id, set_id, stimulus_id, this.value);}}),
                                                    ])
                                                ),
                                                m('.col-sm-3',
                                                    m('label.input-group.space', [
                                                        m('input.form-control', {value: 'css', placeholder: 'media', onchange:function(){}}),
                                                    ])

                                                ),
                                                ('.col-sm-3',
                                                    !stimulus.response ? '' : ctrl.possible_responses().map(function(response, id) {
                                                        return m('row',[
                                                            m('.col-sm-1',
                                                                response.key.length !==1 ? '' :
                                                                m('div', m('label.c-input.c-radio', [
                                                                    m('input[type=radio]', {
                                                                        onclick: ()=>ctrl.toggle_stimulus_response(condition_id, set_id, stimulus_id, response.key),
                                                                        checked: stimulus.response_key === response.key,
                                                                    }), m('span.c-indicator'), response.key
                                                                ]))                                                            )
                                                        ])})
                                                    // m('label.input-group.space', [
                                                    //     m('input.form-control', {value: stimulus.media, placeholder: 'media', onchange:function(){}}),
                                                    // ])

                                                )
                                            ])
                                    })

                                }),
                                m('.row.space',
                                    m('.col-sm-12', [
                                        m('button.btn.btn-secondary.btn-sm.m-r-1', {onclick:function(){ctrl.add_stimuli_set(condition_id)}},
                                            [m('i.fa.fa-plus'), '  add stimuli set']
                                        )
                                    ])
                                )
                            ])]

                }),
                m('.row.space',
                    m('.col-sm-12', [
                        m('button.btn.btn-secondary.btn-sm.m-r-1', {onclick:ctrl.do_add_condition},
                            [m('i.fa.fa-plus'), '  add condition']
                        )
                    ])
                ),


            ]);
    }
};

const focus_it = (element, isInitialized) => {
    if (!isInitialized) setTimeout(() => element.focus());};

function getAbsoluteUrl(url) {
    const a = document.createElement('a');
    a.href=url;
    return a.href;
}

function copy(text){
    return new Promise((resolve, reject) => {
        let input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select(); s

        try {
            document.execCommand('copy');
        } catch(err){
            reject(err);
        }

        input.parentNode.removeChild(input);
    });
}
