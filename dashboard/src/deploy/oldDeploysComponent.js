export default args => m.component(oldDeploysDialog, args);
import {print_rules} from '../ruletable/ruletableActions'

import {deploy} from './deployModel';
import classNames from 'utils/classNames';
import {get_rules} from "../ruletable/ruletableModel";

const ASTERISK = m('span.text-danger.font-weight-bold', '* ');

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
            m('.row.space',[
                m('.col-sm-2',[
                    m('strong.space', 'Creation date')
                ]),
                m('.col-sm-2',[
                    m('strong.space', 'Experiment File')
                ]),
                m('.col-sm-1',[
                    m('strong.space', 'Target Number'),
                ]),
                m('.col-sm-1',[
                    m('strong.space', 'Priority')
                ]),

                m('.col-sm-1',[
                    m('strong.space', 'Approved')
                ]),
                m('.col-sm-1',[
                    m('strong.space', 'Another researcher')
                ]),
                m('.col-sm-4',[
                    m('strong.space', 'Summary of Rule Logic')
                ])
            ]),
            deploy2show.map(deploy=>
                deploy.sets.map(set=>
                    m('.row',[

                        m('.col-sm-2',[
                            deploy.creation_date
                        ]),
                        m('.col-sm-2',[
                            set.experiment_file
                        ]),

                        m('.col-sm-1',[
                            set.target_number
                        ]),
                        m('.col-sm-1',[
                            set.priority
                        ]),

                        m('.col-sm-1',[
                            deploy.approved_by_a_reviewer==='Yes' ? 'Yes' : 'No'
                        ]),
                        m('.col-sm-1',[
                            deploy.launch_confirmation==='Yes' ? 'Yes' : 'No'
                        ]),

                        m('.col-sm-4',[
                            set.rules === '' ? 'None' : print_rules(set.rules)
                        ])
                    ])
                )
            ),


            m('.row.space',[
                m('.col-sm-12.text-sm-right',
                    m('button.btn.btn-primary', {onclick: close}, 'Close')
                )
            ]),
        ]);
    }
};