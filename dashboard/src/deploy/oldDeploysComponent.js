export default args => m.component(oldDeploysDialog, args);
import {print_rules} from '../ruletable/ruletableActions'
import formatDate from 'utils/formatDate_str';

let oldDeploysDialog = {
    controller({deploy2show, close}){
        let ctrl = {
            deploy2show,
        };
        return {deploy2show, close};
    },
    view({deploy2show, close}){
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
                            m('strong.space', 'Approved by a reviewer')
                        ]),
                        m('td',[
                            m('strong.space', 'Launch confirmation')
                        ]),
                        m('td',[
                            m('strong.space', 'Summary of Rule Logic')
                        ]),
                        m('td',[
                            m('strong.space', 'Comments')
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
                                    set.experiment_file
                                ]),

                                m('td',[
                                    set.target_number
                                ]),
                                m('td',[
                                    set.priority
                                ]),

                                m('td',[
                                    deploy.approved_by_a_reviewer==='Yes' ? 'Yes' : 'No'
                                ]),
                                m('td',[
                                    deploy.launch_confirmation==='Yes' ? 'Yes' : 'No'
                                ]),

                                m('td',[
                                    set.rules === '' ? 'None' : print_rules(set.rules)
                                ]),

                                m('td',[
                                    deploy.comments
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