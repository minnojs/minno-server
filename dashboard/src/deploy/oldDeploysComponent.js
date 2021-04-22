export default args => m.component(oldDeploysDialog, args);
import {print_rules} from '../ruletable/ruletableActions';
import formatDate from 'utils/formatDate_str';

let oldDeploysDialog = {
    controller({deploy2show, version_id, close}){
        let ctrl = {
            deploy2show,
            version_id
        };
        return {deploy2show, ctrl, close};
    },
    view({deploy2show, ctrl, close}){
        return m('.deploy.container', [
            m('.row',[
                m('.col-sm-12', [
                    m('h3', [
                        'Old Deploy Requests',
                        m('small', ` (v${ctrl.version_id})`)
                    ]),
                ])
            ]),
            m('table.table.table-sm.table-striped.table-hover',[
                m('thead',[
                    m('tr', [
                        m('th', m('strong.space', 'Creation date')),
                        m('th', m('strong.space', 'Experiment File')),
                        m('th', m('strong.space', 'Target Number')),
                        m('th', m('strong.space', 'Priority')),
                        m('th', m('strong.space', 'Summary of Rule Logic')),
                        m('th', m('strong.space', 'Status')),
                        m('th', m('strong.space', 'Full details'))
                    ])
                ]),
                m('tbody', [
                    deploy2show.map(deploy=>
                        deploy.sets.map(set=>
                            m('tr', [
                                m('td', formatDate(deploy.creation_date)),
                                m('td', !set.experiment_file ? '' : set.experiment_file.descriptive_id),
                                m('td', set.target_number),
                                m('td', set.priority),
                                m('td',{style:{width:'30%'}}, [
                                    set.rules === '' ? 'None' : print_rules(set.rules)
                                ]),
                                m('td', [
                                    set.status !== 'accept' ? '' : m('strong.text-info', 'Accept'),
                                    set.status !== 'reject' ? '' : m('strong.text-danger', 'Reject'),
                                    set.status !== 'running' && set.status !== 'running2' ? '' : m('strong.text-success', 'Running'),

                                    set.status !==  'pending' ? '' : m('strong.text-secondary', 'Pending')
                                ]),

                                m('td',
                                    m('a', {href:`/deploy/${m.route.param('studyId')}/${set._id}`, config: m.route, onclick:close, hashchange:close}, 'Full details')
                                )
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