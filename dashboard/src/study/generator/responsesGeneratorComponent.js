export default responses_view;

let responses_view = args => m.component(responsesGeneratorComponent, args);


let responsesGeneratorComponent = {
    controller({mode, possible_responses}){
        let ctrl = {
            mode,
            possible_responses,
            update_possible_response:update_possible_response,
            delete_possible_response:delete_possible_response
        };

        if(possible_responses().length===0 || possible_responses().filter(response=>!response.key).length===0) {
            possible_responses().push({key: ''});
        }

        function update_possible_response(id, value) {
            if(value!=='' && ctrl.possible_responses().filter(response=>response.key===value).length>1){
                value = '';
            }
            if (value.length>1)
                value = value[value.length - 1];

            ctrl.possible_responses()[id].key = value;

            const empty_keys = ctrl.possible_responses().filter(response=>response.key==='');
            if(empty_keys.length===0 && value){
                ctrl.possible_responses().push({key:''});
            }
        }

        function delete_possible_response(id){
            ctrl.possible_responses().splice(id, 1);
            const empty_keys = ctrl.possible_responses().filter(response=>response.key==='');
            if(empty_keys.length===0)
                ctrl.possible_responses().push({key:''});
        }
        return ctrl;
    },
    view(ctrl){
        return m('.row',  {style:{display: ctrl.mode()==='constants' ? 'block': 'none'}},[
            m('h4.space', 'Possible responses'),
            m('.row',[
                ctrl.possible_responses().map(function(response, id) {
                    return m('row', [
                        m('.col-sm-2',
                            m('label.input-group.space',  [
                                m('input.form-control.col-sm-1', {value: response.key, placeholder: 'key', onchange:function(){ctrl.update_possible_response(id, this.value);}, onkeyup:function(){ctrl.update_possible_response(id, this.value);}}),
                                id===0 || (!response.key && id === (ctrl.possible_responses().length-1)) ? '' : m('.input-group-addon', {onclick:function(){ctrl.delete_possible_response(id);}}, m('i.fa.fa-fw.fa-close'))
                            ])
                        )
                    ]);
                })
            ])
        ]);


    }
};

