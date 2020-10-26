import studyFactory from '../files/fileCollectionModel';
import {createNotifications} from 'utils/notifyComponent';

export default ruletableComponent;
const notifications= createNotifications();


import all_rules  from './rules';



let ruletableComponent = {
    controller(){
        let ctrl = {
            all_rules,
            sets: [],
            notifications,
            error: m.prop(''),
            study_name:m.prop(),
            loaded:m.prop(false),
            push_set,
            push_sub_set,
            remove_sub_set,
            update_set_type,
            update_set_name,
            push_rule,
            remove_rule,
            set_condition,
            set_expression,
            set_value,
            save,
            study,
        };

        function save(){

            // const check = ctrl.sets.maprules.filter(rule=>rule.expression==='' || rule.expression==='' || rule.value==='');
        }

        function init_set(){
            return {type:'All', name: '', sub_sets: [], rules:[empty_rule()]};
        }

        function empty_rule(){
            return {condition:'', condition_text:'', expression_text: '', expression:'', value:'', value_text:''};
        }

        function set_condition(user_rule, value, text){
            user_rule.condition  = value;
            user_rule.condition_text  = text;

            user_rule.expression = '';
            user_rule.expression_text= '';
            user_rule.value      = '';
            user_rule.value_text      = '';
            m.redraw();
        }


        function set_expression(user_rule, value, text){
            user_rule.expression = value;
            user_rule.expression_text = text;
        }

        function set_value(user_rule, value, text){
            user_rule.value = value;
            user_rule.value_text = text;
        }

        function update_set_type(set, type){
            set.type = type;
        }


        function update_set_name(set, name){
            set.name = name;
        }



        if (ctrl.sets.length===0)
            ctrl.sets = [init_set()];

        function push_sub_set(set){
            set.sub_sets.push(init_set());
        }

        function push_set(set){
            set.push(init_set());
        }

        function remove_sub_set(set, parent){
            set.rules = [];
            if(parent)
                return parent.sub_sets = parent.sub_sets.filter(set=>set.rules.length>0);
            return ctrl.sets = ctrl.sets.filter(set=>set.rules.length>0);
        }

        function push_rule(set){
            set.rules.push(empty_rule());
        }

        function remove_rule(set, user_condition){
            set.rules = set.rules.filter(user_rule=>  user_rule.condition!==user_condition.condition ||
                                                                    user_rule.expression!==user_condition.expression ||
                                                                    user_rule.value!==user_condition.value);
        }

        let study;
        function load() {
            ctrl.study = studyFactory(m.route.param('studyId'));
            return ctrl.study.get()
                .then(()=>{
                    ctrl.study_name(ctrl.study.name);
                    ctrl.loaded(true);
                })
                .then(m.redraw);
        }
        load();
        return ctrl;
    },
    view(ctrl){

        function check_sets(sets){
            return sets.map(sub_set=>check_rules(sub_set)).filter(sub_set=>sub_set).length>0;
        }

        function check_rules(set){
            const check = set.rules.filter(rule=>rule.expression==='' || rule.expression==='' || rule.value==='').length>0;
            const nested_check = set.sub_sets.map(sub_set=>check_rules(sub_set)).filter(sub_set=>sub_set).length>0;
            return check || nested_check;
        }

        function check_names(){
            return ctrl.sets.filter(set=>set.name==='').length>0;
        }
        function print_rules(set){
            const clean_rules = set.rules.map(rule=>(rule.condition==='' ? '_' : rule.condition_text) + ' ' + (rule.expression==='' ? '_' : rule.expression_text) + ' ' + (rule.value==='' ? '_' : rule.value_text));
            const sub_sets_data =  set.sub_sets.map(sub_set=> print_rules(sub_set));

            const print_both = set.rules.length>0 && set.sub_sets.length>0 ? ', ' : '';
            const set_name = !set.name ? '' : set.name + ': ';
            return set_name + set.type + ' {'+ clean_rules.join(', ') +  print_both + sub_sets_data.join(', ')+ '} ' ;
        }

        function show_set(set, parent = false){
            return m('.rules_frame', [

                m('.row',
                    [
                        parent ? '' :
                            m('.col-sm-2.space',
                                m('input.form-control.space', {value: set.name, onchange: e => {ctrl.update_set_name(set, e.target.value);}, onkeyup: e => {ctrl.update_set_name(set, e.target.value);}, placeholder:'Set name'})
                            ),

                        m('.col-sm-2.space',
                            m('select.c-select.form-control.space',{onchange: e => {ctrl.update_set_type(set, e.target.value);}}, [
                                m('option', {value:'All', selected:set.type==='All'}, 'All'),
                                m('option', {value:'Any', selected:set.type==='Any'}, 'Any')
                            ])
                        ),
                        m('.col-sm-2.space',
                            m('a.btn.btn-secondary', {onclick: ()=>ctrl.remove_sub_set(set, parent)}, m('i.fa.fa-minus-circle.space', parent ? ' Remove group' : ' Remove set'))
                        ),
                    ]
                ),
                !set.rules.length ?
                    m('.row',
                        m('.col-sm-10.space', ''),
                        m('.col-sm-2.space',
                            m('.btn-set.btn-set-sm.space', [
                                m('a.btn.btn-secondary', {onclick: ()=>ctrl.push_rule(set)}, m('i.fa.fa-plus-circle.space')),
                            ])
                        )
                    )
                :
                set.rules.map(user_rule=>{
                    const condition_data = user_rule.condition === '' ? '' : ctrl.all_rules.find(rule=>rule.nameXML===user_rule.condition);
                    return m('.row',
                        m('.col-sm-4.space',
                            m('.input-set.space', [
                                m('select.c-select.form-control.space',{onchange: e => {ctrl.set_condition(user_rule, e.target.value, e.target.selectedOptions[0].text);}}, [
                                    m('option', {value:'', selected:user_rule.condition==='', disabled:true}, 'Condition'),
                                    ctrl.all_rules.map(rule=> m('option', {value:rule.nameXML, selected:user_rule.condition===rule.name}, rule.name))
                                ])
                            ])
                        ),

                        m('.col-sm-2.space',
                            m('.input-set.space', [
                                !condition_data ? '' :
                                    !condition_data.equal.length ? ctrl.set_expression(user_rule, ' ', ' ') :
                                    condition_data.equal.length === 1 ?
                                        [ctrl.set_expression(user_rule, ' ', ' '),
                                            m('select.c-select.form-control.space', {disabled:true, onchange: e => {ctrl.set_expression(user_rule, e.target.value, e.target.value);}}, [
                                                m('option', {disabled:true, selected:true}, condition_data.equal[0]+':'),
                                            ])]

                                        :
                                        m('select.c-select.form-control.space', {onchange: e => {ctrl.set_expression(user_rule, e.target.value, e.target.selectedOptions[0].text);}}, [
                                            m('option', {value:'', selected:user_rule.expression==='', disabled:true}, 'Expression'),
                                            condition_data.equal.map((expression, expression_id)=> m('option', {selected:user_rule.expression===condition_data.equalXML[expression_id], value:condition_data.equalXML[expression_id]}, expression))
                                        ])
                            ])
                        ),

                        m('.col-sm-4.space',
                            m('.input-set.space', [
                                !condition_data || !condition_data.values.length ? ctrl.set_value(user_rule, ' ', ' ')  :
                                    condition_data.values.length === 1 ?
                                        m('input.form-control.space', {value: user_rule.value, onchange: e => {ctrl.set_value(user_rule, e.target.value, e.target.value);}, onkeyup: e => {ctrl.set_value(user_rule, e.target.value, e.target.value);}, placeholder:condition_data.values[0]})
                                        :
                                        m('select.c-select.form-control.space',{onchange: e => {ctrl.set_value(user_rule, e.target.value, e.target.selectedOptions[0].text);}}, [
                                            m('option', {value:'', selected:user_rule.value==='', disabled:true}, 'Value'),
                                            condition_data.values.map((value, val_id)=>
                                                    typeof value === "object"
                                                ?

                                                 m('optset.rule_optset', {disabled:true, selected:user_rule.value===value, label:value.type}, value.type)
                                                        :
                                                 m('option', {selected:user_rule.value===condition_data.valuesXML[val_id], value:condition_data.valuesXML[val_id]}, value)

                                            )
                                        ])
                            ])
                        ),
                        m('.col-sm-2.space',
                            m('.btn-set.btn-set-sm.space', [
                                m('a.btn.btn-secondary', {onclick: ()=>ctrl.push_rule(set)}, m('i.fa.fa-plus-circle.space')),
                                m('a.btn.btn-secondary', {onclick: ()=>ctrl.remove_rule(set, user_rule)}, m('i.fa.fa-minus-circle.space'))
                            ])
                        )

                    );
                }),

                m('.row.space', [
                    m('.col-sm-3.space',
                        m('.text-xs-left.btn-toolbar.btn-set.btn-set-sm', [
                            m('a.btn.btn-secondary', {onclick: ()=>ctrl.push_sub_set(set)}, m('i.fa.fa-plus-circle.space',' Add group' )),
                        ])
                    ),
            ]),
                set.sub_sets.map(sub_set=>{
                    return show_set(sub_set, set);
                }),
            ]);
        }
        return  !ctrl.loaded()
            ?
            m('.loader')
            :
            m('.container.sharing-page', [

                m('div', ctrl.notifications.view()),
                m('.row',[

                    m('.col-sm-12', [
                        m('h3', [ctrl.study_name(), ': Rules Generator'])
                    ]),
                    m('.col-sm-12', [
                        m('strong', 'How to Use:'),
                        m('','Create a sets of conditions that define who can take your study. Make sure that all the conditions that are listed in an “All” must be true and that at least one of the conditions listed in an “Any” must be true. The  box below shows the conditions in plain words. A red “Rule is not ready” will appear whenever the rules are not ready to use. Once finished, press the \'Save\' button and the rule will be saved to the study\'s properties.')
                    ])
                ]),
                m('.card-text',
                m('button.btn.btn-primary', {disabled:check_sets(ctrl.sets)||check_names(), onclick: ()=>ctrl.save()}, 'save')),
                    m('.rules_string', [
                    m('strong', 'Summary of Rule Logic:'),
                    m('', ctrl.sets.map(set=>m('.double_space', print_rules(set)))),
                    m('.warning_text', check_sets(ctrl.sets) ? 'Rule is not ready' : ''),
                    m('.warning_text', check_names() ? 'Set names cannot be empty' : ''),
                    m('.success_text', !check_sets(ctrl.sets) && !check_names() ? 'Rule is ready' : '')
                ]),
                m('.row.space', [
                    m('.col-sm-3.space',
                        m('.text-xs-left.btn-toolbar.btn-set.btn-set-sm', [
                            m('a.btn.btn-secondary', {onclick: ()=>ctrl.push_set(ctrl.sets)}, m('i.fa.fa-plus-circle.space', ' Add set'))
                        ])
                    )
                ]),
                ctrl.sets.map(set=>show_set(set))


            ]);
    }
};