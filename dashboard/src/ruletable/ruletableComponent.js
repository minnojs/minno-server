export default ruletableComponent;
import {createNotifications} from 'utils/notifyComponent';
import {save_new_set, remove_set, update_set, get_rules, get_deployer_rules} from './ruletableModel';
import {print_rules} from './ruletableActions';
import get_all_rules  from './rules';

const notifications= createNotifications();

let ruletableComponent = {
    controller(){
        let ctrl = {
            all_rules: m.prop([]),
            sets: m.prop([]),
            sets2show:m.prop([]),
            new_set: m.prop(''),
            notifications,
            error: m.prop(''),
            loaded:m.prop(false),
            filter_sets,
            add_new_set,
            save_new_set,
            remove_set,
            update_set,
            push_set,
            push_sub_set,
            remove_sub_set,
            update_set_comparator,
            update_set_name,
            push_rule,
            remove_rule,
            set_field,
            set_comparator,
            set_value,
            save,
            remove,
            edit_set,
            download_set,
            cancel,
            print_rules
        };
        const deployer = m.route() === '/autupauseruletable' || m.route() === '/autupauseruletable/';
        function load() {
            deployer ?
                get_deployer_rules()
                    .then(response => {
                        ctrl.loaded(true);
                        ctrl.sets(response.sets ? response.sets : []);
                        ctrl.sets2show(ctrl.sets());
                        get_all_rules(true)
                            .then(all_rules => ctrl.all_rules = all_rules);
                    })
                    .catch(error => {
                        ctrl.error(error.message);
                    })
                    .then(m.redraw)
                :
                get_rules()
                    .then(response => {
                        ctrl.loaded(true);
                        ctrl.sets(response.sets ? response.sets : []);
                        ctrl.sets2show(ctrl.sets());
                        get_all_rules()
                            .then(all_rules => ctrl.all_rules = all_rules)
                            .then(m.redraw);
                    })
                    .catch(error => {
                        ctrl.error(error.message);
                    }).then(m.redraw);
        }


        function save(save_new){
            if (!ctrl.new_set().edit)
                return ctrl.save_new_set(ctrl.new_set(), deployer)
                    .then(new_set=>ctrl.sets().push(new_set.rules))
                    .then(ctrl.sets2show(ctrl.sets()))
                    .then(ctrl.new_set(''))
                    .then(m.redraw);

            delete ctrl.new_set().edit;
            if (save_new)
                return ctrl.save_new_set(ctrl.new_set(), deployer)
                    .then(new_set=>ctrl.sets().push(new_set.rules))
                    .then(ctrl.sets2show(ctrl.sets()))
                    .then(ctrl.new_set(''))
                    .then(m.redraw);
            return ctrl.update_set(ctrl.new_set(), deployer)
                .then(ctrl.sets(ctrl.sets().map(set=> set.id===ctrl.new_set().id ? ctrl.new_set() : set)))
                .then(ctrl.sets2show(ctrl.sets()))
                .then(()=>ctrl.new_set(''))
                .then(m.redraw);
        }
        function remove(set_id){
            ctrl.remove_set(set_id, deployer)
                .then(ctrl.sets(ctrl.sets().filter(set=>set.id!==set_id)))
                .then(ctrl.sets2show(ctrl.sets()))
                .then(m.redraw);
        }
        function filter_sets(str){
            ctrl.sets2show(ctrl.sets().filter(set=>set.name.match(new RegExp(str, 'i'))));
            m.redraw();
        }

        function edit_set(set){
            set['edit'] = true;
            ctrl.new_set(JSON.parse(JSON.stringify(set)));
        }
        function download_set(set){
            const data2save = new Blob([JSON.stringify(set)], {type: 'application/json'});
            let downloadLink = document.createElement('a');
            downloadLink.download = set.name+'.json';
            downloadLink.href = window.URL.createObjectURL(data2save);
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
        }
        function cancel(){
            ctrl.new_set('');
        }

        function init_set(){
            return {comparator:'&&', comparator_str:'All', name: '', sub_sets: [], data:[empty_rule()]};
        }

        function empty_rule(){
            return {field:'', field_text:'', comparator_text: '', comparator:'', value:'', value_text:''};
        }

        function set_field(user_rule, value, text){
            user_rule.field             = value;
            user_rule.field_text        = text;
            user_rule.comparator        = '';
            user_rule.comparator_text   = '';
            user_rule.value             = '';
            user_rule.value_text        = '';
            m.redraw();
        }

        function set_comparator(user_rule, value, text){
            user_rule.comparator        = value;
            user_rule.comparator_text   = text;
        }

        function set_value(user_rule, value, text, numeric = false){
            user_rule.value         = numeric ? parseInt(value) : value;
            user_rule.value_text    = text;
        }

        function update_set_comparator(set, comparator, comparator_str){
            set.comparator_str = comparator_str;
            set.comparator     = comparator;
        }

        function update_set_name(set, name){
            set.name = name;
        }

        function add_new_set(){
            ctrl.new_set(init_set());
        }

        function push_sub_set(set){
            set.sub_sets.push(init_set());
        }

        function push_set(set){
            set.push(init_set());
        }

        function remove_sub_set(set, parent){
            set.data = [];
            return parent.sub_sets = parent.sub_sets.filter(set=>set.data.length>0);
        }

        function push_rule(set){
            set.data.push(empty_rule());
        }
        function remove_rule(set, user_condition){
            set.data = set.data.filter(user_rule => user_rule.field!==user_condition.field ||
                                                      user_rule.comparator!==user_condition.comparator ||
                                                      user_rule.value!==user_condition.value);
        }
        load();
        return ctrl;
    },
    view(ctrl){
        function check_rules(set){
            const check = set.data.filter(rule=>rule.comparator==='' || rule.comparator==='' || rule.value==='').length>0;
            const nested_check = set.sub_sets.map(sub_set=>check_rules(sub_set)).filter(sub_set=>sub_set).length>0;
            return check || nested_check;
        }

        function check_set_name(){
            return ctrl.new_set().name==='';
        }

        function show_set(set, parent = false){
            return m('.rules_frame.rules_border', [
                m('.row', [
                    parent ? '' :
                        m('.col-sm-2.space',
                            m('input.form-control.space', {value: set.name, onchange: e => {ctrl.update_set_name(set, e.target.value);}, onkeyup: e => {ctrl.update_set_name(set, e.target.value);}, placeholder:'Set name'})
                        ),
                    m('.col-sm-2.space',
                        m('select.c-select.form-control.space',{onchange: e => {ctrl.update_set_comparator(set, e.target.value, e.target.selectedOptions[0].text);}}, [
                            m('option', {value:'&&', selected:set.comparator==='&&'}, 'All'),
                            m('option', {value:'||', selected:set.comparator==='||'}, 'Any')
                        ])
                    ),
                    m('.col-sm-2.space',
                        !parent ? '' : m('a.btn.btn-secondary', {onclick: ()=>ctrl.remove_sub_set(set, parent)}, m('i.fa.fa-minus-circle.space', ' Remove group' ))
                    ),
                ]),
                !set.data.length ?
                    m('.row',
                        m('.col-sm-10.space', ''),
                        m('.col-sm-2.space',
                            m('.btn-set.btn-set-sm.space', [
                                m('a.btn.btn-secondary', {onclick: ()=>ctrl.push_rule(set)}, m('i.fa.fa-plus-circle.space')),
                            ])
                        )
                    )
                    :
                    set.data.map(user_rule=>{
                        const condition_data = user_rule.field === '' ? '' : ctrl.all_rules.find(rule=>rule.nameXML===user_rule.field);
                        return m('.row',
                            m('.col-sm-4.space',
                                m('.input-set.space', [
                                    m('select.c-select.form-control.space',{onchange: e => {ctrl.set_field(user_rule, e.target.value, e.target.selectedOptions[0].text);}}, [
                                        m('option', {value:'', selected:user_rule.field==='', disabled:true}, 'Condition'),
                                        ctrl.all_rules.map(rule=> m('option', {value:rule.nameXML, selected:user_rule.field===rule.nameXML}, rule.name))
                                    ])
                                ])
                            ),

                            m('.col-sm-2.space',
                                m('.input-set.space', [
                                    !condition_data ? '' :
                                        !condition_data.equal.length ? ctrl.set_comparator(user_rule, ' ', ' ') :
                                            condition_data.equal.length === 1
                                                ?
                                                [ctrl.set_comparator(user_rule, ' ', ' '),
                                                    m('select.c-select.form-control.space', {disabled:true, onchange: e => {ctrl.set_comparator(user_rule, e.target.value, e.target.value);}}, [
                                                        m('option', {disabled:true, selected:true}, condition_data.equal[0]+':'),
                                                    ])
                                                ]
                                                :
                                                m('select.c-select.form-control.space', {onchange: e => {ctrl.set_comparator(user_rule, e.target.value, e.target.selectedOptions[0].text);}}, [
                                                    m('option', {value:'', selected:user_rule.comparator==='', disabled:true}, 'Comparator'),
                                                    condition_data.equal.map((comparator, comparator_id)=> m('option', {selected:user_rule.comparator===condition_data.equalXML[comparator_id], value:condition_data.equalXML[comparator_id]}, comparator))
                                                ])
                                ])
                            ),
                            m('.col-sm-4.space',
                                m('.input-set.space', [
                                    !condition_data || !condition_data.values.length ? ctrl.set_value(user_rule, ' ', ' ')  :
                                        condition_data.values.length === 1 ?
                                    m('input.form-control.space', {value:user_rule.value, type:condition_data.numeric ? 'number' : 'text', min:'0', onchange: e => {ctrl.set_value(user_rule, e.target.value, e.target.value);}, onkeyup: e => {ctrl.set_value(user_rule, e.target.value, e.target.value, condition_data.numeric);}, placeholder:condition_data.values[0]})
                                            :

                                            m('select.c-select.form-control.space',{onchange: e => {ctrl.set_value(user_rule, e.target.value, e.target.selectedOptions[0].text);}}, [
                                                m('option', {value:'', selected:user_rule.value==='', disabled:true}, 'Value'),
                                                condition_data.values.map((value, val_id)=>
                                                    typeof value === 'object'
                                                        ?
                                                        m('optgroup.rule_optgroup', {disabled:true, selected:user_rule.value===value, label:value.type})
                                                        :
                                                        m('option', {selected:user_rule.value===condition_data.valuesXML[val_id], value:condition_data.valuesXML[val_id]}, value)
                                                )
                                            ])
                                ])
                            ),
                            m('.col-sm-2.space',
                                m('.btn-set.btn-set-sm.double_space', [
                                    m('a.btn.btn-secondary', {onclick: ()=>ctrl.push_rule(set)}, m('i.fa.fa-plus-circle')),
                                    m('a.btn.btn-secondary', {onclick: ()=>ctrl.remove_rule(set, user_rule)}, m('i.fa.fa-minus-circle'))
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
            m('.container', [
                m('div', ctrl.notifications.view()),

                m('.row.space',[
                    m('.col-sm-12', [
                        m('h3', ' Rules Generator')
                    ]),
                    m('.col-sm-12', [
                        m('strong', 'How to Use:'),
                        m('','Create sets of conditions that define who can take your study. Make sure that all the conditions that are listed in an “All” can be true and that at least one of the conditions listed in an “Any” can be true. The box below shows the conditions in plain words. A red “Rule is not ready” will appear whenever the rules are not ready to use. Once finished, press the \'Save\' button and the rule will be saved to the study\'s properties.')
                    ])
                ]),

                m('.row.space',[
                    m('.col-sm-5', [
                        m('h3', 'Existing Sets')
                    ])
                ]),
                m('.row',[
                    m('.col-sm-2',
                        m('strong', 'Set name')
                    ),
                    m('.col-sm-7',
                        m('strong', 'Summary of Rule Logic')
                    ),
                    m('.col-sm-3',
                        m('strong', 'Actions')
                    )
                ]),
                ctrl.sets().length===0 ? '' :
                    m('.row',[
                        m('.col-sm-2.space',
                            m('input.form-control.space', {onchange: e => {ctrl.filter_sets(e.target.value);}, onkeyup: e => {ctrl.filter_sets(e.target.value);}, placeholder:'Search...'})
                        )
                    ]),
                ctrl.sets2show().map(set=>
                    m('.row.list-group-item.rules_frame',[
                        m('.col-sm-2', [
                            m('', set.name)
                        ]),
                        m('.col-sm-7',
                            ctrl.print_rules(set)
                        ),
                        m('.col-sm-3', [
                            m('btn-group', [

                                m('a.btn.btn-sm.btn-secondary', {onclick:()=>ctrl.edit_set(set)}, [
                                    m('i.fa.fa-edit'),
                                    ' Edit'
                                ]),
                                m('a.btn.btn-sm.btn-secondary', {onclick:()=>ctrl.download_set(set)}, [
                                    m('i.fa.fa-download'),
                                    ' Export'
                                ]),
                                m('a.btn.btn-sm.btn-secondary', {onclick:()=>ctrl.remove(set.id)}, [
                                    m('i.fa.fa-remove'),
                                    ' Remove'
                                ])
                            ])
                        ])
                    ])
                ),
                ctrl.new_set()!==''  ? '' : m('.row.double_space',[
                    m('.col-sm-12', [
                        m('button.btn.btn-primary.pull-right', {onclick: ()=>ctrl.add_new_set()}, [
                            m('i.fa.fa-plus'), '  Create a new set of rules '
                        ])
                    ])
                ]),

                !ctrl.new_set() ? '' : [
                    m('.rules_string.rules_border', [
                        m('strong', 'Summary of Rule Logic:'),
                        m('', ctrl.print_rules(ctrl.new_set())),
                        m('.warning_text', check_set_name() ? 'Set name cannot be empty' : ''),
                        m('.warning_text', check_rules(ctrl.new_set()) ? 'Rule is not ready' : ''),
                        m('.success_text', !check_rules(ctrl.new_set()) && !check_set_name() ? 'Rule is ready' : '')
                    ]),
                    show_set(ctrl.new_set()),

                    m('.row.double_space',[
                        m('.col-sm-12', [
                            !ctrl.new_set().edit ? '' :
                                m('button.btn.btn-secondary.pull-right', {disabled:check_rules(ctrl.new_set())||check_set_name(), onclick: ()=>ctrl.save(true)}, [
                                    m('i.fa.fa-save'), ' Save new'
                                ]),

                            m('button.btn.btn-secondary.pull-right', {disabled:check_rules(ctrl.new_set())||check_set_name(), onclick: ()=>ctrl.save()}, [
                                m('i.fa.fa-save'), ' Save '
                            ]),
                            m('button.btn.btn-secondary.pull-right', {onclick: ()=>ctrl.cancel()}, [
                                ' Cancel '
                            ])
                        ])
                    ])
                ],
            ]);
    }
};