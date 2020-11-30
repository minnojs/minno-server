import {get_deploys, update_deploy} from './deployListModel';
import sortTable from 'utils/sortTable';
import {duplicate_study, rename_study, update_study} from "../../../study/studyModel";
import messages from 'utils/messagesComponent';
import {print_rules} from '../../../ruletable/ruletableActions'
import formatDate from 'utils/formatDate_str';


export default deployComponent;
let thConfig = (prop, current) => ({'data-sort-by':prop, class: current() === prop ? 'active' : ''});

let deployComponent = {
    controller(){
        let ctrl = {
            list: m.prop(''),
            sortBy: m.prop('creation_date'),
            view_rules,
            accept,
            update,
            update_priority,
            print_rules
        };

        function view_rules(e, rules){
            e.preventDefault();
            return  messages.alert({
                header:'Summary of Rule Logic',
                content: m('.space', [
                    ctrl.print_rules(rules),
                ])
            });
        }

        function accept(deploy_id, priority){
            accept_deploy(deploy_id)
            .then(response =>ctrl.list(response))
            .then(m.redraw);

        }

        function update(request, status){
            update_deploy(request._id, request.priority, status)
            .then(response =>ctrl.list(response))
            .then(m.redraw);
        }

        function update_priority(request, priority){
            request.priority = priority;
            m.redraw();
        }
        get_deploys()
            .then(response =>{ctrl.list(response);
            })
            .catch(error => {
                throw error;
            })
            .then(m.redraw);
        return {ctrl};
    },
    view({ctrl}){
        let list = ctrl.list;
        return ctrl.list().length === 0
            ?
            m('.loader')
            :
            m('', [
                m('table.table table-nowrap table-striped table-hover', {onclick:sortTable(list, ctrl.sortBy)}, [
                    m('thead',[
                        m('tr', [
                            m('th', thConfig('creation_date', ctrl.sortBy), 'Creation date'),
                            m('th', thConfig('experiment_file', ctrl.sortBy), 'Study details'),
                            m('th', 'Rules'),
                            m('th', thConfig('user_name', ctrl.sortBy), 'Researcher name'),
                            m('th', thConfig('target_number', ctrl.sortBy), 'Target number'),
                            m('th', thConfig('priority', ctrl.sortBy), 'Priority'),
                            m('th', thConfig('approved_by_a_reviewer', ctrl.sortBy), 'Approved by a reviewer'),
                            m('th', thConfig('launch_confirmation', ctrl.sortBy), 'Launch confirmation'),
                            m('th', thConfig('comments', ctrl.sortBy), 'Comments'),
                            m('th', thConfig('status', ctrl.sortBy), 'Actions')
                        ])
                    ]),

                    m('tbody',
                        list().map(request=>
                            m('tr',{class:[request.status==='reject' ?  'table-danger' : request.status==='accept' ? 'table-success' : '']},[
                                m('td', formatDate(request.creation_date)),
                                m('td', request.study_name + ' (' + request.experiment_file +')'),
                                m('td', request.rules ==='' ? 'None' : m('a',{href:'', onclick:(e)=>ctrl.view_rules(e, request.rules)}, 'View')),
                                m('td', [request.user_name, ' (',  m('a', {href:'mailto:'+request.email}, request.email), ')']),
                                m('td', request.target_number),
                                m('td',
                                    request.status ? request.priority :
                                        m('input.form-control.space', {value: request.priority,  placeholder:'priority', onkeyup: e=>ctrl.update_priority(request, e.target.value), onchange: e=>ctrl.update_priority(request, e.target.value)})
                                ),
                                m('td', request.approved_by_a_reviewer),
                                m('td', request.launch_confirmation),
                                m('td', request.comments),
                                m('td',
                                    m('.btn-group', [

                                        request.status ? '' : m('.btn.btn-primary', {onclick: e=>ctrl.update(request, 'accept')},  [
                                            m('i.fa.fa-check'),
                                        ]),
                                        request.status ? '' : m('.btn.btn-danger', {onclick: e=>ctrl.update(request, 'reject')},  [
                                            m('i.fa.fa-times'),
                                        ])
                                    ])
                                )
                            ])
                        )
                    )
                ])
            ]);


                // m('table', {class:'table table-nowrap table-striped table-hover',onclick:sortTable(list, ctrl.sortBy)}, [
                // m('thead', [
                //     m('tr', [
                //         m('th', thConfig('CREATION_DATE',ctrl.sortBy), 'Creation date'),
                //         m('th', thConfig('FOLDER_LOCATION',ctrl.sortBy), 'Folder location'),
                //         m('th', thConfig('RULE_FILE',ctrl.sortBy), 'Rule file'),
                //         m('th', thConfig('RESEARCHER_EMAIL',ctrl.sortBy), 'Researcher email'),
                //         m('th', thConfig('RESEARCHER_NAME',ctrl.sortBy), 'Researcher name'),
                //         m('th', thConfig('TARGET_NUMBER',ctrl.sortBy), 'Target number'),
                //         m('th', thConfig('APPROVED_BY_A_REVIEWER',ctrl.sortBy), 'Approved by a reviewer'),
                //         m('th', thConfig('EXPERIMENT_FILE',ctrl.sortBy), 'Experiment file'),
                //         m('th', thConfig('LAUNCH_CONFIRMATION',ctrl.sortBy), 'Launch confirmation'),
                //         m('th', thConfig('COMMENTS',ctrl.sortBy), 'Comments')
                //     ])
                // ]),
                // m('tbody', [
                //     ctrl.list().map(study => m('tr', [
                //         m('td', study.CREATION_DATE),
                //         m('td', m('a', {href:study.FOLDER_LOCATION}, study.FOLDER_LOCATION)),
                //         m('td', study.RULE_FILE),
                //         m('td', m('a', {href:'mailto:' + study.RESEARCHER_EMAIL}, study.RESEARCHER_EMAIL)),
                //         m('td', study.RESEARCHER_NAME),
                //         m('td', study.TARGET_NUMBER),
                //         m('td', study.APPROVED_BY_A_REVIEWER),
                //         m('td', study.EXPERIMENT_FILE),
                //         m('td', study.LAUNCH_CONFIRMATION),
                //         m('td', study.COMMENTS)
                //     ]))
                // ])
            // ]);
    }
};
