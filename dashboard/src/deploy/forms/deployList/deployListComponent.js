import {get_deploys, update_deploy} from './deployListModel';
import sortTable from 'utils/sortTable';
import {duplicate_study, rename_study, update_study} from "../../../study/studyModel";
import messages from 'utils/messagesComponent';
import {print_rules} from '../../../ruletable/ruletableActions'
import formatDate from 'utils/formatDate_str';
import {testUrl} from 'modelUrls';
import {get_deployer_rules} from "../../../ruletable/ruletableModel";


export default deployComponent;
let thConfig = (prop, current) => ({'data-sort-by':prop, class: current() === prop ? 'active' : ''});

let deployComponent = {
    controller(){
        let ctrl = {
            list: m.prop(''),
            list2show: m.prop(''),
            deployer_rules: m.prop([]),
            sortBy: m.prop('creation_date'),
            filter_by:m.prop('pending'),
            loaded:m.prop(false),
            testUrl,
            filter_requests,
            view_rules,
            update,
            update_priority,
            update_pause_rules,
            print_rules
        };

        function filter_requests(status){
            ctrl.filter_by(status);
            if(status==='all')
                return ctrl.list2show(ctrl.list());
            ctrl.list2show(ctrl.list().filter(request=>request.status===status));
        }
        function view_rules(e, rules){
            e.preventDefault();
            return  messages.alert({
                header:'Summary of Rule Logic',
                content: m('.space', [
                    ctrl.print_rules(rules),
                ])
            });
        }


        function update(request, status){
            update_deploy(request._id, request.priority, request.pause_rules, status)
            .then(response =>ctrl.list(response))
            .then(()=>ctrl.list2show(ctrl.list()))
            .then(()=>filter_requests(ctrl.filter_by()))
            .then(m.redraw);
        }

        function update_priority(request, priority){
            request.priority = priority;
            m.redraw();
        }

        function update_pause_rules(request, rule_id){
            request.pause_rules =  ctrl.deployer_rules().find(rule=>rule.id===rule_id);
            m.redraw();
        }
        get_deploys()
            .then(response => ctrl.list(response))
            .then(()=>ctrl.list2show(ctrl.list()))
            .then(()=>filter_requests(ctrl.filter_by()))
            .then(()=>get_deployer_rules())
            .then(results=>ctrl.deployer_rules(results.sets))
            .then(()=>ctrl.loaded(true))
            .catch(error => {
                throw error;
            })
            .then(m.redraw);
        return {ctrl};
    },
    view({ctrl}){
        let list = ctrl.list2show;
        return !ctrl.loaded()
            ?
            m('.loader')
            :
            m('', [
                m('.row.space', [
                    m('.col-xs-1.space',
                        m('strong', 'Show only')
                    ),
                    m('.col-xs-1',
                        m('select.c-select.form-control.space',{onchange: e => {ctrl.filter_requests(e.target.value)}}, [
                            m('option', {value:'pending', selected:ctrl.filter_by()==='pending'}, 'Pending'),
                            m('option', {value:'accept', selected:ctrl.filter_by()==='accept'}, 'Accepted'),
                            m('option', {value:'reject', selected:ctrl.filter_by()==='reject'}, 'Rejected'),
                            m('option', {value:'all', selected:ctrl.filter_by()==='all'}, 'All')
                        ])
                    ),
                    m('.col-xs-10',
                        m('.text-xs-right',[
                            m('a.btn.btn-primary.btn-xs', {href: '/autupauseruletable', config: m.route}, 'AutoPause rules')
                        ])
                    ),
                ]),
                m('table.table table-nowrap table-striped table-hover', {onclick:sortTable(list, ctrl.sortBy)}, [
                    m('thead',[
                        m('tr', [
                            m('th', thConfig('creation_date', ctrl.sortBy), 'Creation date'),
                            m('th', thConfig('experiment_file', ctrl.sortBy), 'Study details'),
                            m('th', 'Rules'),
                            m('th', thConfig('user_name', ctrl.sortBy), 'Researcher name'),
                            m('th', thConfig('target_number', ctrl.sortBy), 'Target number'),
                            m('th', thConfig('priority', ctrl.sortBy), 'Priority'),
                            m('th', thConfig('launch_confirmation', ctrl.sortBy), 'Launch confirmation'),
                            m('th', thConfig('comments', ctrl.sortBy), 'Comments'),
                            m('th', thConfig('status', ctrl.sortBy), 'Actions')
                        ])
                    ]),

                    m('tbody',
                        list().map(request=>
                            m('tr',{class:[request.status==='reject' ?  'table-danger' : request.status==='accept' ? 'table-success' : '']},[
                                m('td', formatDate(request.creation_date)),
                                m('td',
                                    m('', [
                                        request.study_name,  ' (' ,
                                        m('a.fab-button', {title:'Test the study', target:'_blank',  href:`${testUrl}/${request.experiment_file.id}/${request.version_hash}`}, request.experiment_file.descriptive_id),
                                        ')'
                                    ])

                                ),
                                m('td', [
                                    request.status === 'pending'  && !request.pause_rules ? ctrl.update_pause_rules(request, ctrl.deployer_rules()[0].id) : '',
                                    request.rules ==='' ? 'None' : m('a',{href:'', onclick:(e)=>ctrl.view_rules(e, request.rules)}, 'View'),
                                    request.status !== 'pending' ? m('', m('a',{href:'', onclick:(e)=>ctrl.view_rules(e, request.pause_rules)}, request.pause_rules ? request.pause_rules.name : '')) :

                                    m('select.c-select.form-control.space',{onchange: e => {ctrl.update_pause_rules(request, e.target.value)}}, [
                                        ctrl.deployer_rules().map(rule=>
                                            m('option', {value:rule.id, selected:request.pause_rules && request.pause_rules.name===rule.name}, rule.name)
                                        )
                                    ])
                                ]),
                                m('td', [request.user_name, ' (',  m('a', {href:'mailto:'+request.email}, request.email), ')']),

                                m('td', request.target_number),
                                m('td',
                                    request.status ? request.priority :
                                        m('input.form-control.space', {value: request.priority,  placeholder:'priority', onkeyup: e=>ctrl.update_priority(request, e.target.value), onchange: e=>ctrl.update_priority(request, e.target.value)})
                                ),
                                m('td', request.launch_confirmation),
                                m('td', request.comments),
                                m('td',
                                    m('.btn-group', [

                                        request.status !== 'pending' ? '' : m('.btn.btn-primary.btn-sm', {title:'Accept', onclick: e=>ctrl.update(request, 'accept')},  [
                                            m('i.fa.fa-check'),
                                        ]),
                                        request.status !== 'pending' ? '' : m('.btn.btn-danger.btn-sm', {title:'Reject', onclick: e=>ctrl.update(request, 'reject')},  [
                                            m('i.fa.fa-times'),
                                        ]),
                                    ])
                                )
                            ])
                        )
                    )
                ])
            ]);
    }
};
