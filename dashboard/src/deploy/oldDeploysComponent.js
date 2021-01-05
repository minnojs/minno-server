import {update_deploy} from "./deployModel";

export default args => m.component(oldDeploysDialog, args);
import {print_rules} from '../ruletable/ruletableActions'
import formatDate from 'utils/formatDate_str';

let oldDeploysDialog = {
    controller({deploy2show, version_id, close}){
        let ctrl = {
            deploy2show,
            edit_deploy,
            update_deploy_param,
            cancel_deploy,
            was_changed,
            save_deploy
        };
        function cancel_deploy(deploy){
            deploy.edit = false;
            m.redraw();
        }

        function edit_deploy(deploy){
            deploy.edit = true;
            deploy.new_comments = '';
            deploy.new_priority = deploy.priority;
            deploy.new_target_number = deploy.target_number;
            m.redraw();
        }
        function was_changed(deploy){
            return parseInt(deploy.new_priority) !== deploy.priority || deploy.new_target_number !== deploy.target_number;
        }

        function save_deploy(deploy){
            if (!was_changed(deploy))
                return;
            update_deploy(m.route.param('studyId'), version_id, {deploy_id:deploy._id, priority:deploy.new_priority, target_number:deploy.new_target_number, comments:deploy.new_comments})
            m.redraw();
        }

        function update_deploy_param(deploy, param, val){
            deploy['new_'+param] = val;
            m.redraw();
        }

        return {deploy2show, ctrl, close};
    },
    view({deploy2show, ctrl, close}){
        return m('.deploy.container', [
            m('.row',[
                m('.col-sm-12', [
                    m('h3', [
                        'Old Deploy Requests',
                    ]),
                ])
            ]),
            m('table.table.table-sm.table-striped.table-hover',[
                m('thead',[
                    m('tr', [
                        m('td',[
                            m('strong.space', 'Creation date')
                        ]),
                        m('td',[
                            m('strong.space', 'Experiment File')
                        ]),
                        m('td',[
                            m('strong.space', 'Target Number'),
                        ]),
                        m('td',[
                            m('strong.space', 'Priority')
                        ]),
                        m('td',[
                            m('strong.space', 'Launch confirmation')
                        ]),
                        m('td',[
                            m('strong.space', 'Summary of Rule Logic')
                        ]),
                        m('td',[
                            m('strong.space', 'Comments')
                        ]),
                        m('td',[
                            m('strong.space', 'Change')
                        ])
                    ])
                ]),
                m('tbody', [
                    deploy2show.map(deploy=>
                         deploy.sets.map(set=>
                            m('tr', {class:[set.status==='reject' ?  'table-danger' : set.status==='accept' ? 'table-success' : '']}, [
                                m('td',[
                                    formatDate(deploy.creation_date)
                                ]),
                                m('td',[
                                    set.experiment_file ? set.experiment_file.descriptive_id : ''
                                ]),

                                m('td', {style:{width:'10%'}}, [
                                    set.edit ?
                                        m('input.form-control', {placeholder: 'Target Number' ,value:set.new_target_number, oninput:(e=>ctrl.update_deploy_param(set, 'target_number', e.target.value))})
                                    :
                                    set.target_number
                                ]),
                                m('td',{style:{width:'10%'}},[
                                    set.edit ?
                                        m('input.form-control', {width:'100%', placeholder: 'Priority' , type:'number', min:'0', max:'26', value:set.new_priority, oninput:(e=>ctrl.update_deploy_param(set, 'priority', e.target.value))})
                                        :
                                        set.priority
                                ]),

                                m('td',[
                                    deploy.launch_confirmation==='Yes' ? 'Yes' : 'No'
                                ]),

                                m('td',[
                                    set.rules === '' ? 'None' : print_rules(set.rules)
                                ]),

                                m('td',[
                                    set.edit ?
                                        m('textarea.form-control.fixed_textarea', {cols: 100, placeholder: 'comments', value: set.new_comments,  oninput:(e=>ctrl.update_deploy_param(set, 'comments', e.target.value))})
                                        :
                                        deploy.comments
                                ]),
                                m('td',[
                                    m('.btn-toolbar.btn-group', [
                                        !set.edit ?
                                        m('button.btn.btn-primary.btn-sm', {title:'Edit', onclick: e=>ctrl.edit_deploy(set)},  [
                                            m('i.fa.fa-edit')
                                        ])
                                        :
                                        [
                                            m('button.btn.btn-danger.btn-sm', {disabled: !ctrl.was_changed(set), title:'Update', onclick: e=>ctrl.save_deploy(set)},  [
                                                m('i.fa.fa-save')
                                            ]),
                                            m('button.btn.btn-secondary.btn-sm', {title:'Cancel', onclick: e=>ctrl.cancel_deploy(set)},  [
                                                m('i.fa.fa-times')
                                            ])
                                        ]
                                    ]),
                                ])
                            ])
                        )
                    )
                ])
            ]),

            m('.row.space',[
                m('.col-sm-12.text-sm-right',
                    m('button.btn.btn-primary', {onclick: close}, 'Close')
                )
            ]),
        ]);
    }
};