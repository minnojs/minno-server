import {get_deploys, update_deploy} from './deployListModel';
import sortTable from 'utils/sortTable';
import {duplicate_study, rename_study, update_study} from "../../../study/studyModel";
import messages from 'utils/messagesComponent';
import {print_rules} from '../../../ruletable/ruletableActions'
import formatDate from 'utils/formatDate_str';
import {testUrl} from 'modelUrls';


export default deployComponent;
let thConfig = (prop, current) => ({'data-sort-by':prop, class: current() === prop ? 'active' : ''});

let deployComponent = {
    controller(){
        let ctrl = {
            list: m.prop(''),
            list2show: m.prop(''),
            sortBy: m.prop('creation_date'),
            filter_by:m.prop('pending'),
            loaded:m.prop(false),
            testUrl,
            filter_requests,
            view_rules,
            update,
            update_priority,
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
            update_deploy(request._id, request.priority, status)
            .then(response =>ctrl.list(response))
            .then(()=>ctrl.list2show(ctrl.list()))
            .then(()=>filter_requests(ctrl.filter_by()))
            .then(m.redraw);
        }

        function update_priority(request, priority){
            request.priority = priority;
            m.redraw();
        }
        get_deploys()
            .then(response => ctrl.list(response))
            .then(()=>ctrl.list2show(ctrl.list()))
            .then(()=>filter_requests(ctrl.filter_by()))
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
                                m('td',
                                    m('', [
                                        request.study_name,  ' (' ,
                                        m('a.fab-button', {title:'Test the study', target:'_blank',  href:`${testUrl}/${request.experiment_file.id}/${request.version_hash}`}, request.experiment_file.descriptive_id),
                                        ')'
                                    ])

                                ),
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
