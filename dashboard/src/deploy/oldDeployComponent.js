import {get_deploy, update_deploy, edit_deploy, deploy2pool} from './forms/deployList/deployListModel';

export default reviewDeployDialog;
import formatDate from 'utils/formatDate_str';
import {testUrl} from 'modelUrls';
import {print_rules} from '../ruletable/ruletableActions';
import {get_deployer_rules} from '../ruletable/ruletableModel';

let reviewDeployDialog = {
    controller(){
        let ctrl = {
            is_review:m.prop(false),
            is_pending:m.prop(false),
            is_approved:m.prop(false),
            is_running:m.prop(false),
            edit_mode:m.prop(false),
            deployer_rules : m.prop(),
            pause_rules: m.prop(''),
            update,
            edit_deploy,
            change_edit_mode,
            save_deploy,
            was_changed,
            update_pause_rules,
            do_deploy,
            target_number:m.prop(''),
            comments:m.prop(''),
            reviewer_comments:m.prop(''),
            priority:m.prop(''),
            deploy2show:m.prop(),
            print_rules,
            study: {},
            versions:m.prop(),
            version:'',
            version_id:'',
            sent:false,
            error: m.prop(''),
            loaded: m.prop(false)
        };

        function update_pause_rules(rule_id){
            ctrl.pause_rules(ctrl.deployer_rules().find(rule=>rule.id===rule_id));
            m.redraw();
        }

        function update(status){
            update_deploy(ctrl.deploy2show()._id, ctrl.priority(), ctrl.pause_rules(), ctrl.reviewer_comments(), status)
                .then(m.route( `/deployList/`));
        }

        function change_edit_mode(mode){
            ctrl.edit_mode(mode);
            if(mode)
                ctrl.target_number(ctrl.deploy2show().target_number);
            m.redraw();
        }

        function was_changed(){
            return ctrl.comments()!== '' || (parseInt(ctrl.priority()) !== ctrl.deploy2show().priority || ctrl.target_number() !== ctrl.deploy2show().target_number);
        }

        function save_deploy(){
            if (!was_changed())
                return;
            let changed = [];
            if(parseInt(ctrl.priority()) !== ctrl.deploy2show().priority)
                changed.push('priority');
            if(ctrl.target_number() !== ctrl.deploy2show().target_number)
                changed.push('target_number');
            return edit_deploy(ctrl.deploy2show().study_id, ctrl.deploy2show().version_id, {deploy_id:ctrl.deploy2show()._id, priority:ctrl.priority(), target_number:ctrl.target_number(), comments:ctrl.comments(), changed:changed})
            .then((deploy=>m.route(`/deploy/${ctrl.deploy2show().study_id}/${deploy._id}`)));
        }

        function do_deploy(){
            return deploy2pool(ctrl.deploy2show()._id)
                .then((deploy=>m.route(`/deploy/${ctrl.deploy2show().study_id}/${deploy._id}`)));

        }

        function load() {
            get_deploy(m.route.param('deployId'))
            .then(request=> {
                ctrl.version_id = request.version_id;
                ctrl.deploy2show(request);
                ctrl.is_review(m.route() === `/review/${m.route.param('deployId')}`);
                ctrl.is_pending(ctrl.deploy2show().status==='pending');
                ctrl.is_approved(ctrl.deploy2show().status==='accept');
                ctrl.is_running(ctrl.deploy2show().status==='running');
                ctrl.priority(ctrl.deploy2show().priority);
            })
            .then(()=>
                !ctrl.is_review() || !ctrl.is_pending() ?  {} :
                    get_deployer_rules()
                    .then(results=>ctrl.deployer_rules(results.sets))
                    .then(()=>ctrl.pause_rules(ctrl.deployer_rules()[0]))
            )
            .then(()=>ctrl.loaded(true))
            .then(m.redraw);
        }
        load();
        return {ctrl};
    },
    view({ctrl}){
        if (ctrl.sent) return m('.deploy.centrify',[
            m('i.fa.fa-thumbs-up.fa-5x.m-b-1'),
            m('h5', ['The Deploy form was sent successfully ', m('a', {href:'/properties/'+ctrl.study.id, config: m.route}, 'Back to study')]),
        ]);
        return !ctrl.loaded()
            ?
            m('.loader')
            :
            m('.deploy.container', [
                m('.row',[
                    m('.col-sm-12', [
                        m('h3', 'Deploy Request'),
                    ])
                ]),
                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Creation Date:')
                    ]),
                    m('.col-sm-9',[
                        formatDate(ctrl.deploy2show().creation_date)
                    ]),
                ]),
                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Study Name:')
                    ]),
                    m('.col-sm-9',[
                        `${ctrl.deploy2show().study_name} (v${ctrl.deploy2show().version_id})`
                    ]),
                ]),
                !ctrl.is_review()
                    ?
                    ''
                    :
                    m('.row.space',[
                        m('.col-sm-3',[
                            m('strong', 'User name:')
                        ]),
                        m('.col-sm-9',[
                            ctrl.deploy2show().user_name, ' (',  m('a', {href:'mailto:'+ctrl.deploy2show().email}, ctrl.deploy2show().email), ')'
                        ]),
                    ]),

                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Status:')
                    ]),
                    m('.col-sm-9',[
                        ctrl.deploy2show().status !== 'paused' ? '' : m('strong.text-secondary', 'Paused'),
                        ctrl.deploy2show().status !== 'removed' ? '' : m('strong.text-primary', 'Removed'),

                        ctrl.deploy2show().status !== 'accept' ? '' : m('strong.text-info', 'Accept'),
                        ctrl.deploy2show().status !== 'accept2' ? '' : m('strong.text-info', 'Accept (changed)'),
                        ctrl.deploy2show().status !== 'reject' ? '' : m('strong.text-danger', 'Reject'),
                        ctrl.deploy2show().status !== 'pending' ? '' : m('strong.text-secondary', 'Pending'),
                        ctrl.deploy2show().status !== 'running' ? '' : m('strong.text-success', 'Running'),
                        ctrl.deploy2show().status !== 'running2' ? '' : m('strong.text-success', 'Running (changed)'),

                        !ctrl.deploy2show().ref_id ? '' :
                            [' ', ctrl.is_review() ? m('a', {href:`/review/${ctrl.deploy2show().ref_id}`, config: m.route}, m('strong', ' (change request)'))
                                :
                                m('a', {href:`/deploy/${ctrl.deploy2show().study_id}/${ctrl.deploy2show().ref_id}`, config: m.route}, m('strong', '(change request)'))
                            ]
                    ])
                ]),
                !ctrl.is_review() && ctrl.is_pending() ? '' :
                    m('.row.space',[
                        m('.col-sm-3',[
                            m('strong', 'Review Comments:')
                        ]),
                        m('.col-sm-9',[
                            ctrl.is_review() && ctrl.is_pending()
                                ?
                                m('textarea.form-control', {value: ctrl.reviewer_comments(), oninput:  m.withAttr('value', ctrl.reviewer_comments), placeholder:'Reviewer Comments'})
                                :
                                ctrl.deploy2show().reviewer_comments ? ctrl.deploy2show().reviewer_comments : 'None'
                        ])
                    ]),
                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Experiment File:')
                    ]),
                    m('.col-sm-9',
                        m('a.fab-button', {title:'Test the study', target:'_blank',  href:`${testUrl}/${ctrl.deploy2show().experiment_file.id}/${ctrl.deploy2show().version_hash}`}, ctrl.deploy2show().experiment_file.file_id)
                    )
                ]),
                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Target Number of Completed Study Sessions:'),
                    ]),
                    m('.col-sm-2', {class:!ctrl.deploy2show().changed  ? '' : !ctrl.deploy2show().changed.includes('target_number') ? '' : 'alert-warning'},[
                        ctrl.edit_mode()
                            ?
                            m('input.form-control.space', {value: ctrl.target_number(),  placeholder:'Target number', type:'number', min:'0', oninput:  m.withAttr('value', ctrl.target_number)})
                            :
                            ctrl.deploy2show().target_number
                    ]),
                ]),
                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Priority:'),
                    ]),
                    m('.col-sm-2', {class:!ctrl.deploy2show().changed ? '' : !ctrl.deploy2show().changed.includes('priority') ? '' : 'alert-warning'},[
                        ctrl.edit_mode() || (ctrl.is_review() && ctrl.is_pending())
                            ?
                            m('', {classes: !ctrl.deploy2show().changed || !ctrl.deploy2show().changed.includes('priority') ? '' :'has-warning'},
                                m('input.form-control', {classes: !ctrl.deploy2show().changed || !ctrl.deploy2show().changed.includes('priority') ? '' : '.form-control-warning', type:'number', min:'0', max:ctrl.is_review() ? '' : '26', value: ctrl.priority(),  placeholder:'priority', oninput:  m.withAttr('value', ctrl.priority)}))
                            :
                            ctrl.deploy2show().priority
                    ])
                ]),
                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Summary of Rule Logic:'),
                    ]),
                    m('.col-sm-9',[
                        ctrl.deploy2show().rules==='' ? 'None' :   ctrl.print_rules(ctrl.deploy2show().rules)
                    ]),
                ]),
                !ctrl.is_review() && ctrl.is_pending() ? ''
                    :
                    m('.row.space',[
                        m('.col-sm-3',[
                            m('strong', 'Pause Rule:'),
                            !ctrl.is_review() ? '' : m('p.small.text-muted',
                                m('a', {href:'/autupauseruletable', config: m.route, target:'_blank'}, 'Rules Generator')
                            )
                        ]),
                        m('.col-sm-2',[
                            !ctrl.is_review() || !ctrl.is_pending()
                                ?
                                ctrl.deploy2show().pause_rules.name
                                :
                                m('select.c-select.form-control',{onchange: e => {ctrl.update_pause_rules(e.target.value);}}, [
                                    ctrl.deployer_rules().map(rule=>
                                        m('option', {value:rule.id, selected:ctrl.pause_rules && ctrl.pause_rules.name===rule.name}, rule.name)
                                    )
                                ])
                        ])
                    ]),
                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Planned Procedure:'),
                        m('p.small.text-muted', '(if it\'s an extension of a prior approved study, make sure to explicitly describe how it is different from the previous approved study)')
                    ]),
                    m('.col-sm-9',[
                        ctrl.deploy2show().planned_procedure
                    ])
                ]),

                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Planned Sample Size and Justification:')
                    ]),
                    m('.col-sm-9',[
                        ctrl.deploy2show().sample_size
                    ])
                ]),

                m('.row.space',[
                    m('.col-sm-3',[
                        m('strong', 'Additional Comments:')
                    ]),
                    m('.col-sm-9',[
                        ctrl.edit_mode()
                            ?
                            m('textarea.form-control.danger_zone', {value: ctrl.comments(), oninput:  m.withAttr('value', ctrl.comments), placeholder:'* Comments'})
                            :
                            ctrl.deploy2show().comments ? ctrl.deploy2show().comments : 'None'
                    ])
                ]),

                !ctrl.error() ? '' : m('.alert.alert-danger', m('strong', 'Error: '), ctrl.error()),
                m('.row.space',[
                    m('.col-lg-12.text-lg-right',[
                        ctrl.is_review() ? [
                            m('.btn.btn-secondary.btn-md', {title:'Cancel', onclick: ()=>m.route('/deployList')},
                                m('i.fa.fa-undo', !ctrl.is_pending() ? ' Back' :' Cancel')
                            ), ' ',
                            !ctrl.is_pending() ? '' : ctrl.deploy2show().status !== 'pending' ? '' : m('.btn.btn-danger.btn-md', {title:'Reject', onclick: ()=>ctrl.update('reject')},
                                m('i.fa.fa-times', ' Reject')
                            ), ' ',
                            !ctrl.is_pending() ? '' : ctrl.deploy2show().status !== 'pending' ? '' : m('.btn.btn-primary.btn-md', {title:'Accept', onclick: ()=>ctrl.update('accept')},
                                m('i.fa.fa-check', ' Accept')
                            )
                        ]
                            :
                            [
                                ctrl.edit_mode() ?  '' : m('button.btn.btn-secondary', {onclick:()=>m.route( `/properties/${ctrl.deploy2show().study_id}`)}, 'Back to study'),
                                !ctrl.is_approved() || ctrl.edit_mode() ?  '' : [' ', m('.btn.btn-primary.btn-md', {title:'Edit', onclick: ()=>ctrl.change_edit_mode(true)}, m('i.fa.fa-edit', ' Edit'))],
                                !ctrl.is_approved() || ctrl.edit_mode() ?  '' : [' ', m('.btn.btn-danger.btn-md', {title:'Deploy', onclick: ()=> ctrl.do_deploy()}, m('i.fa.fa-paper-plane', ' Deploy'))],
                                !ctrl.is_running() || ctrl.edit_mode() ?  '' : [' ', m('.btn.btn-primary.btn-md', {title:'Edit', onclick: ()=>ctrl.change_edit_mode(true)}, m('i.fa.fa-edit', ' Change request'))],
                                !ctrl.edit_mode() ?  '' : [m('button.btn.btn-secondary', {onclick: ()=>ctrl.change_edit_mode(false)}, 'Cancel'), ' ', m('button.btn.btn-primary.btn-md', {disabled: !ctrl.was_changed(), title:'Accept', onclick: ()=>ctrl.save_deploy()}, m('i.fa.fa-save', ' Save'))]
                            ]
                    ])
                ]),
            ]);
    }
};