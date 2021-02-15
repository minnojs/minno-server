import {getAllPoolStudies, STATUS_PAUSED, STATUS_RUNNING} from './poolModel';
import {play, pause, remove, edit, create, reset} from './poolActions';
import {getAuth} from 'login/authModel';
import sortTable from 'utils/sortTable';
import formatDate from 'utils/formatDate';
import {testUrl} from 'modelUrls';
import messages from 'utils/messagesComponent';

import {print_rules} from '../ruletable/ruletableActions';

export default poolComponent;

const TABLE_WIDTH = 8;

let poolComponent = {
    controller: () => {

        function view_rules(e, rules){
            e.preventDefault();
            return  messages.alert({
                header:'Summary of Rule Logic',
                content: m('.space', [
                    print_rules(rules),
                ])
            });
        }

        const ctrl = {
            view_rules, play, pause, remove, edit, reset, create,
            canCreate: false,
            list: m.prop([]),
            globalSearch: m.prop(''),
            sortBy: m.prop(),
            error: m.prop(''),
            loaded: m.prop()
        };

        getAuth().then((response) => {ctrl.canCreate = response.role === 'SU';});
        getAllPoolStudies()
            .then(ctrl.list)
            .then(ctrl.loaded)
            .catch(ctrl.error)
            .then(m.redraw);
        return ctrl;
    },
    view: ctrl => {
        let list = ctrl.list;
        return m('.pool', [
            m('h2', 'Study pool'),
            ctrl.error()
                ?
                m('.alert.alert-warning',
                    m('strong', 'Warning!! '), ctrl.error().message
                )
                :
                m('table', {class:'table table-striped table-hover',onclick:sortTable(list, ctrl.sortBy)}, [
                    m('thead', [
                        m('tr', [
                            m('th', {colspan:TABLE_WIDTH - 1}, [
                                m('input.form-control', {placeholder: 'Global Search ...', oninput: m.withAttr('value', ctrl.globalSearch)})
                            ]),
                            m('th', [
                                m('a.btn.btn-secondary', {href:'/pool/history', config:m.route}, [
                                    m('i.fa.fa-history'), '  History'
                                ])
                            ])
                        ]),
                        ctrl.canCreate ? m('tr', [
                            m('th.text-xs-center', {colspan:TABLE_WIDTH}, [
                                m('button.btn.btn-secondary', {onclick:ctrl.create.bind(null, list)}, [
                                    m('i.fa.fa-plus'), '  Add new study'
                                ])
                            ])
                        ]) : '',
                        m('tr', [
                            m('th', thConfig('studyName',ctrl.sortBy), 'Study'),
                            m('th', thConfig('studyUrl',ctrl.sortBy), 'Experiment File'),
                            m('th', 'Rules'),
                            m('th', 'Autopause'),
                            m('th', thConfig('completedSessions',ctrl.sortBy), 'Completion'),
                            m('th', thConfig('creationDate',ctrl.sortBy), 'Date'),
                            m('th', thConfig('status',ctrl.sortBy), 'Status'),
                            m('th','Actions')
                        ])
                    ]),
                    m('tbody', [
                        list().length === 0
                            ?
                            m('tr.table-info',
                                m('td.text-xs-center', {colspan: TABLE_WIDTH},
                                    m('strong', 'Heads up! '), 
                                    ctrl.loaded()
                                        ? 'None of your studies is in the Research Pool right now'
                                        : 'Loading...'
                                )
                            )
                            :
                            list().map(study => m('tr', [
                                // ### ID
                                m('td', study.study_name),
                                m('td', m('a.fab-button', {title:'Test the study', target:'_blank',  href:`${testUrl}/${study.experiment_file.id}/${study.version_hash}`}, study.experiment_file.descriptive_id)),


                                // ### Study url
                                m('td', [
                                    m('a', {href:'', onclick:e=>ctrl.view_rules(e, study.rules)}, 'Rules')
                                ]),

                                // ### Rules url
                                m('td', [
                                    m('a', {href:'', onclick:e=>ctrl.view_rules(e, study.pause_rules)}, !study.pause_rules ? '' : study.pause_rules.name)
                                ]),


                                // ### Completions
                                m('td', [
                                    study.startedSessions ? (100 * study.completedSessions / study.startedSessions).toFixed(1) + '% ' : 'n/a ',
                                    m('i.fa.fa-info-circle'),
                                    m('.info-box', [
                                        m('.card', [
                                            m('.card-header', 'Completion Details'),
                                            m('ul.list-group.list-group-flush',[
                                                m('li.list-group-item', [
                                                    m('strong', 'Target Completions: '), study.targetCompletions
                                                ]),
                                                m('li.list-group-item', [
                                                    m('strong', 'Started Sessions: '), study.startedSessions
                                                ]),
                                                m('li.list-group-item', [
                                                    m('strong', 'Completed Sessions: '), study.completedSessions
                                                ])
                                            ])
                                        ])
                                    ])
                                ]),

                                // ### Date
                                m('td', formatDate(new Date(study.creationDate))),

                                // ### Status
                                m('td', [
                                    {
                                        accept: m('span.label.label-success', 'Running'),
                                        pending: m('span.label.label-info', 'Paused'),
                                        reject: m('span.label.label-danger', 'Stopped')
                                    }[study.status]
                                ]),

                                // ### Actions
                                m('td', [
                                    study.$pending
                                        ?
                                        m('.l', 'Loading...')
                                        :
                                        m('.btn-group', [
                                            study.studyStatus === STATUS_PAUSED ? m('button.btn.btn-sm.btn-secondary', {disabled: true, onclick: ctrl.play.bind(null, study)}, [
                                                m('i.fa.fa-play')
                                            ]) : '',
                                            study.studyStatus === STATUS_RUNNING ? m('button.btn.btn-sm.btn-secondary', {disabled: true, onclick: ctrl.pause.bind(null, study)}, [
                                                m('i.fa.fa-pause')
                                            ]) : '',
                                            m('button.btn.btn-sm.btn-secondary', {disabled: true, onclick: ctrl.edit.bind(null, study)}, [
                                                m('i.fa.fa-edit')
                                            ]),
                                            m('button.btn.btn-sm.btn-secondary', {disabled: true, onclick: ctrl.reset.bind(null, study)}, [
                                                m('i.fa.fa-refresh')
                                            ]),
                                            m('button.btn.btn-sm.btn-secondary', {disabled: true, onclick: ctrl.remove.bind(null, study, list)}, [
                                                m('i.fa.fa-close')
                                            ])
                                        ])
                                ])
                            ]))
                    ])
                ])
        ]);
    }
};

// @TODO: bad idiom! should change things within the object, not the object itself.
let thConfig = (prop, current) => ({'data-sort-by':prop, class: current() === prop ? 'active' : ''});

function studyFilter(ctrl){
    return study =>
        includes(study.studyId, ctrl.globalSearch()) ||
        includes(study.studyUrl, ctrl.globalSearch()) ||
        includes(study.rulesUrl, ctrl.globalSearch());

    function includes(val, search){
        return typeof val === 'string' && val.includes(search);
    }
}
