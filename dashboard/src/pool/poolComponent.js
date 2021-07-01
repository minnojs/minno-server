import {getAllPoolStudies} from './poolModel';
import {play, pause, unpause, remove, edit, create, reset} from './poolActions';

import sortTable from 'utils/sortTable';
import formatDate from 'utils/formatDate';
import {testUrl} from 'modelUrls';
import messages from 'utils/messagesComponent';
import {load_studies} from '../study/studyModel';

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

        function permissionFilter (study){
            if(ctrl.permissionChoice() === 'my')
                return  ctrl.studies().includes(study.study_id);
            return ctrl.studies();
        }

        function globalFilter (study){
            if (ctrl.globalSearch() === '')
                return true;
            return study.study_name && study.study_name.toLowerCase().includes(ctrl.globalSearch().toLowerCase()) || study.experiment_file.descriptive_id && study.experiment_file.descriptive_id.toLowerCase().includes(ctrl.globalSearch().toLowerCase());
        }

        const ctrl = {
            view_rules, play, pause, unpause, remove, edit, reset, create,
            canCreate: false,
            studies: m.prop([]),
            list: m.prop([]),
            globalSearch: m.prop(''),
            globalFilter,
            permissionChoice: m.prop('my'),
            permissionFilter,
            sortBy: m.prop(),
            error: m.prop(''),
            loaded: m.prop()
        };
        load_studies()
            .then(response => response.studies)
            .then(ctrl.studies)
            .then(()=>ctrl.studies(ctrl.studies().filter(study=>study.permission==='owner' || study.permission==='can edit').map(study=>study.id)))
            .then(()=>getAllPoolStudies())

            .then(ctrl.list)
            .then(ctrl.loaded)
            .catch(ctrl.error)
            .then(m.redraw);
        return ctrl;
    },
    view: ctrl => {
        let list = ctrl.list().filter(study=>study.study_status!=='removed').filter(study=>ctrl.permissionFilter(study)).filter(study=>ctrl.globalFilter(study));
        return ctrl.error()
            ?
            m('.alert.alert-warning',
                m('strong', 'Warning!! '), ctrl.error().message
            )
            :
            m('.pool', [

                m('h2', 'Study pool'),
                m('.row', [
                    m('.col-sm-2',
                        m('input.form-control', {placeholder: 'Global Search ...', oninput: m.withAttr('value', ctrl.globalSearch)})
                    ),
                    m('.col-sm-3',
                        m('select.c-select.form-control', {onchange: e => ctrl.permissionChoice(e.target.value)}, [
                            m('option', {value:'my'}, 'Show only my studies'),
                            m('option', {value:'all'}, 'Show all studies')
                        ])
                    )
                ]),
                m('table', {class:'table table-striped table-hover',onclick:sortTable(ctrl.list, ctrl.sortBy)}, [
                    m('thead', [
                        m('tr', [
                            m('th', {colspan:TABLE_WIDTH - 1}, [
                            ]),
                            m('th', [
                                m('a.btn.btn-secondary', {href:'/pool/history', config:m.route}, [
                                    m('i.fa.fa-history'), '  History'
                                ])
                            ])
                        ]),
                        m('tr', [
                            m('th', thConfig('studyName', ctrl.sortBy), 'Study'),
                            m('th', thConfig('studyUrl', ctrl.sortBy), 'Experiment File'),
                            m('th', 'Rules'),
                            m('th', 'Autopause'),
                            m('th', thConfig('completedSessions', ctrl.sortBy), 'Completion'),
                            m('th', thConfig('creationDate', ctrl.sortBy), 'Date'),
                            m('th', thConfig('status', ctrl.sortBy), 'Status'),
                            m('th','Actions')
                        ])
                    ]),
                    m('tbody', [

                        list.length === 0
                            ?
                            m('tr.table-info',
                                m('td.text-xs-center', {colspan: TABLE_WIDTH},
                                    m('strong', ''),
                                    ctrl.loaded()
                                        ?
                                        ctrl.permissionChoice() === 'my' ? 'None of your studies is in the Study pool right now' : 'The pool is empty'
                                        : 'Loading...'
                                )
                            )
                            :
                            list.map(study => m('tr', [
                                // ### ID
                                m('td', `${study.study_name} (v${study.version_id})`),
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
                                    study.starts ? (100 * study.completes / study.starts).toFixed(1) + '% ' : 'n/a ',
                                    m('i.fa.fa-info-circle'),
                                    m('.info-box', [
                                        m('.card', [
                                            m('.card-header', 'Completion Details'),
                                            m('ul.list-group.list-group-flush',[
                                                m('li.list-group-item', [
                                                    m('strong', 'Target Completions: '), study.completes
                                                ]),
                                                m('li.list-group-item', [
                                                    m('strong', 'Started Sessions: '), study.starts
                                                ]),
                                                m('li.list-group-item', [
                                                    m('strong', 'Completed Sessions: '), study.completes
                                                ])
                                            ])
                                        ])
                                    ])
                                ]),

                                // ### Date
                                m('td', formatDate(new Date(study.createdDate))),

                                // ### Status
                                m('td', [
                                    {
                                        running: m('span.label.label-success', 'Running'),
                                        paused: m('span.label.label-info', 'Paused'),
                                        reject: m('span.label.label-danger', 'Stopped')
                                    }[study.study_status]
                                ]),

                                // ### Actions
                                m('td', [
                                    study.$pending
                                        ?
                                        m('.l', 'Loading...')
                                        :
                                        m('.btn-group', [
                                            study.study_status !== 'running' ? '' :  m('button.btn.btn-sm.btn-secondary', {disabled: !ctrl.studies().includes(study.study_id), onclick: ctrl.pause.bind(null, study)}, [
                                                m('i.fa.fa-pause')
                                            ]),
                                            study.study_status !== 'paused' ? '' :m('button.btn.btn-sm.btn-secondary', {disabled: !ctrl.studies().includes(study.study_id), onclick: ctrl.unpause.bind(null, study)}, [
                                                m('i.fa.fa-play')
                                            ]),
                                            // {m.route(`/deploy/${ctrl.study.id}/${ctrl.study.versions.length===id+1 ? '': version.id}`);}}
                                            m('button.btn.btn-sm.btn-secondary', {disabled: !ctrl.studies().includes(study.study_id), onclick: ()=>m.route(`/deploy/${study.study_id}/${study.deploy_id}`)}, [
                                                m('i.fa.fa-edit')
                                            ]),
                                            m('button.btn.btn-sm.btn-secondary', {disabled: !ctrl.studies().includes(study.study_id), onclick: ctrl.remove.bind(null, study)}, [
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
let thConfig = (prop, current) => ({'data-sort-by':prop, class: current === prop ? 'active' : ''});






