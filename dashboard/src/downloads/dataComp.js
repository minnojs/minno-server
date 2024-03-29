import formatDate_str from '../utils/formatDate_str';

export default args => m.component(data_dialog, args);
import {dateRangePicker} from 'utils/dateRange';
import {get_data, delete_data, load_studies, get_requests, delete_request} from '../study/studyModel';
import {baseUrl} from 'modelUrls';
import formatDate from 'utils/formatDate';
import messages from 'utils/messagesComponent';

let data_dialog = {
    controller({exps, study_id, versions, close, delete_data, notifications}){
        function update_experiment(exp_id){
            ctrl.exp_id(Array.isArray(exp_id) ?  exp_id : exp_id.split(',') );
        }

        function update_version(version_id){
            ctrl.version_id(Array.isArray(version_id) ?  version_id : version_id.split(',') );
            update_exps(ctrl);
        }


        const ctrl = {
            data_study_id: m.prop(''),
            exp_id: m.prop(''),
            study_id:m.prop(parseInt(study_id)),
            exps,
            versions,
            delete_data,
            notifications,
            ask_delete_request,
            update_version,
            update_experiment,
            requests: m.prop([]),
            studies: m.prop([]),
            version_id: m.prop(''),
            all_exp_ids: m.prop(''),
            all_versions: m.prop(''),
            file_format: m.prop('csv'),
            file_split: m.prop('taskName'),

            loaded: m.prop(false),
            downloaded: m.prop(true),
            link: m.prop(''),
            error: m.prop(null),
            dates: {
                startDate: m.prop(daysAgo(3650)),
                endDate: m.prop(daysAgo(0))
            }
        };

        load_studies()
            .then(response =>
            {
                ctrl.studies(response.studies);
                ctrl.studies(ctrl.studies().filter(study=>study.has_data_permission).sort(sort_studies_by_name));
            })
            .then(()=>load_exps(ctrl))
            .then(()=>load_requests(ctrl))
        ;
        return {ctrl, close};
    },
    view: ({ctrl, close}) => m('div', [

        m('.card-block', [

            m('.input-group', [m('strong', 'Study name'),
                m('select.c-select.form-control',{onchange: e => select_study(ctrl, e.target.value)}, [
                    ctrl.studies().map(study=> m('option', {value:study.id, selected:study.id===ctrl.study_id()} , `${study.name} ${study.permission!=='archive' ? '' : '(archive study)' }`))
                ])
            ]),
            m('.row', [
                m('.col-sm-4', [
                    m('.input-group', [m('strong', 'Experimant id'),
                        m('select.c-select.form-control',{onchange: e => ctrl.update_experiment(e.target.value)}, [
                            ctrl.version_id() === '' ? '' :
                                ctrl.exps().length<=1 ? '' : m('option', {selected:true, value:ctrl.all_exp_ids()}, 'All experiments'),
                            ctrl.version_id() === '' ? '' :
                                ctrl.exps().map(exp=> m('option', {value:exp.id} , exp.descriptive_id))
                        ])
                    ])
                ]),
                m('.col-sm-5', [
                    m('.input-group', [m('strong', 'Version id'),
                        m('select.c-select.form-control',{onchange: e => ctrl.update_version(e.target.value)}, [
                            ctrl.versions.length<=1 ? '' : m('option', {value:ctrl.all_versions()}, 'All versions'),
                            ctrl.versions.map(version=> m('option', {selected:version.id===ctrl.versions.length, value:version.hash}, `V${version.id} - ${formatDate_str(version.creation_date)} (${version.state})`))
                        ])
                    ])
                ]),
                ctrl.delete_data ? '' : m('.col-sm-3', [
                    m('.input-group', [m('strong', 'Output type'),
                        m('select.c-select.form-control',{onchange: e => ctrl.file_format(e.target.value)}, [
                            m('option', {value:'csv'}, 'csv'),
                            m('option', {value:'tsv'}, 'tsv'),
                            m('option', {value:'json'}, 'json')
                        ])
                    ])
                ])
            ]),
            ctrl.delete_data ? '' : m('.row.space', [
                m('.col-sm-9', [
                    m('span', 'Split to files by (clear text to download in one file):'),
                    m('input.form-control', {
                        placeholder: 'File split variable',
                        value: ctrl.file_split(),
                        oninput: m.withAttr('value', ctrl.file_split)
                    })
                ])

            ]),
            m('.row.space', [
                m('.col-sm-12', [
                    m('.form-group', [
                        dateRangePicker(ctrl.dates),
                        m('p.text-muted.btn-toolbar', [
                            dayButtonView(ctrl.dates, 'Last 7 Days', 7),
                            dayButtonView(ctrl.dates, 'Last 30 Days', 30),
                            dayButtonView(ctrl.dates, 'Last 90 Days', 90),
                            dayButtonView(ctrl.dates, 'All time', 3650)
                        ])
                    ])
                ])
            ])
        ]),
        ctrl.loaded() ? '' : m('.loader'),
        ctrl.delete_data ? '' : show_requests(ctrl),
        ctrl.error() ? m('.alert.alert-warning', ctrl.error()): '',
        ctrl.loaded() && ctrl.exps().length<1 ? m('.alert.alert-info', 'You have no experiments yet') : '',

        ctrl.downloaded() ? '' : m('.loader'),
        m('.text-xs-right.btn-toolbar',[
            m('button.btn.btn-secondary.btn-sm', {onclick:()=>{close(null);}}, 'Close'),
            ctrl.delete_data ? '' :m('button.btn.btn-primary.btn-sm',  {disabled: ctrl.requests().filter(request=>request.status==='in progress').length, onclick:()=>{ask_get_data(ctrl);}}, 'Download'),
            !ctrl.delete_data ? '' : m('button.btn.btn-danger.btn-sm',  {onclick:()=>{ask_delete_data(ctrl);}}, 'Delete')
        ])
    ])
};

function ask_get_data(ctrl){
    ctrl.error('');
    if(ctrl.exp_id() ==='')
        return ctrl.error('Please select experiment id');

    ctrl.downloaded(false);


    let correct_start_date = new Date(ctrl.dates.startDate());
    correct_start_date.setHours(0,0,0,0);

    let correct_end_date = new Date(ctrl.dates.endDate());
    correct_end_date.setHours(23,59,59,999);
    
    return get_data(ctrl.study_id(), ctrl.exp_id(), ctrl.version_id(), ctrl.file_format(), ctrl.file_split(), correct_start_date, correct_end_date)
        .then(response => {
            const file_data = response.data_file;
            if (file_data == null) return Promise.reject('There was a problem creating your file, please contact your administrator');
            ctrl.link(`${baseUrl}/download?path=${file_data}`, file_data);
        })
        .catch(err=>ctrl.error(err.message))
        .then(()=>ctrl.downloaded(true))
        .then(()=>load_requests(ctrl))

        .then(m.redraw);
}



function ask_delete_data(ctrl){
    let close = messages.close;
    let error = m.prop('');
    let confirmation = m.prop('');
    let ok2remove = false;
    return messages.custom({
        content: {
            view(){
                return m('div', [
                    m('h3', 'Delete study data'),
                    m('strong', 'Are you sure? This will delete the study data permanently.'),
                    m('p', 'Please wrote below "delete" to confirm the deletion'),
                    m('input.form-control',  {  value: confirmation(), onkeyup: m.withAttr('value', confirmation)}),
                    !error() ? '' : m('p.alert.alert-danger', error()),
                    m('.text-xs-right.btn-toolbar.space',[
                        m('button.btn.btn-secondary.btn-sm', {onclick:()=>close(null)}, 'Cancel'),
                        m('button.btn.btn-danger.btn-sm', {onclick:()=>{ok2remove = true; close();}, disabled:confirmation()!=='delete'}, 'Delete')
                    ])

                ]);
            }
        }
    })
        .then(response => {
            if (ok2remove) {
                ctrl.error('');
                if (ctrl.exp_id() === '')
                    return ctrl.error('Please select experiment id');

                ctrl.downloaded(false);

                let correct_start_date = new Date(ctrl.dates.startDate());
                correct_start_date.setHours(0, 0, 0, 0);

                let correct_end_date = new Date(ctrl.dates.endDate());
                correct_end_date.setHours(23, 59, 59, 999);

                return delete_data(ctrl.study_id(), ctrl.exp_id(), ctrl.version_id(), correct_start_date, correct_end_date)
                    .catch(err => ctrl.error(err.message))
                    .then(() => ctrl.downloaded(true))
                    .then(() => load_requests(ctrl))
                    .then(()=>ctrl.notifications.show_success('Study data were successfully deleted'))
                    .then(m.redraw);
            }
        })
}
function ask_delete_request(study_id, request_id, ctrl){
    return delete_request(study_id, request_id)
        .then(()=>load_requests(ctrl))
        .then(m.redraw);

}

// helper functions for the day buttons
let daysAgo = (days) => {
    let d = new Date();
    d.setDate(d.getDate() - days);
    return d;
};
let equalDates = (date1, date2) => date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth();
let activeDate = ({startDate, endDate}, days) => equalDates(startDate(), daysAgo(days)) && equalDates(endDate(), new Date());
let dayButtonView = (dates, name, days) => m('button.btn.btn-secondary.btn-sm', {

    class: activeDate(dates, days)? 'active' : '',
    onclick: () => {
        dates.startDate(daysAgo(days));
        dates.endDate(new Date());
    }
}, name);



function sort_studies_by_name(study1, study2){
    return study1.name.toLowerCase() === study2.name.toLowerCase() ? 0 : study1.name.toLowerCase() > study2.name.toLowerCase() ? 1 : -1;
}



function select_study(ctrl, study_id){
    ctrl.study_id(study_id);
    ctrl.loaded.bind(null, false);
    const new_study = ctrl.studies().filter(study=>study.id==study_id)[0];
    ctrl.versions = new_study.versions;
    load_exps(ctrl);
    load_requests(ctrl);
}
function update_exps(ctrl){
    let experiments2show =  [];
    ctrl.version_id().map(id=>{
        const version2show = ctrl.versions.find(version=>version.hash===id);
        version2show.experiments.map(exp=>experiments2show.push(exp));
    });
    experiments2show = experiments2show.filter(exp=>!exp.inactive);
    ctrl.exps(experiments2show);
    ctrl.all_exp_ids(ctrl.exps().map(exp=>exp.id));
    ctrl.exp_id(ctrl.all_exp_ids());
    m.redraw();
}

function load_exps(ctrl){
    ctrl.all_versions(ctrl.versions.map(version=>version.hash));
    ctrl.version_id([ctrl.versions[0].hash]);
    update_exps(ctrl);
    m.redraw();
}

function load_requests(ctrl){
    get_requests(ctrl.study_id())
        .then(response => ctrl.requests(response.requests))
        .then(()=>{
            if (ctrl.requests().filter(request=>request.status==='in progress').length)
                setTimeout(()=>load_requests(ctrl), 1000);
        })
        .catch(ctrl.error)
        .then(ctrl.loaded.bind(null, true))
        .then(m.redraw);
}

function show_requests(ctrl){
    return ctrl.requests().length === 0
        ?
        ''
        :[m('table', {class:'table table-striped table-hover'}, [
            m('thead', [
                m('tr', [
                    // m('th', 'ID')
                    m('th', 'Date Added'),
                    m('th', 'File Size'),
                    m('th', 'Actions'),
                    m('th','Status'),
                ])
            ]),
            m('tbody',
                ctrl.requests().map(download => m('tr', [
                    m('td', [
                        formatDate(new Date(download.creation_date)),
                        '  ',
                        m('i.fa.fa-info-circle'),
                        m('.info-box.info-box4data',[
                            m('.card', [
                                m('.row-xs-10.list-group-item2.row-centered', [
                                    m('.col-xs-10',[
                                        m('strong', 'Request Details')
                                    ])
                                ]),

                                m('.row-xs-12.list-group-item2', [
                                    m('.col-xs-3',[
                                        m('strong', 'Creation Date: ')
                                    ]),
                                    m('.col-xs-7',[
                                        formatDate(new Date(download.creation_date))
                                    ])
                                ]),

                                m('.row-xs-10.list-group-item2', [
                                    m('.col-xs-3',
                                        m('strong', 'Start Date: ')
                                    ),
                                    m('.col-xs-3',
                                        formatDate(new Date(download.start_date))
                                    ),
                                    m('.col-xs-3',
                                        m('strong', 'End Date: ')
                                    ),
                                    m('.col-xs-2',
                                        formatDate(new Date(download.end_date))
                                    )
                                ]),
                                m('.row-xs-10.list-group-item2', [
                                    m('.col-xs-3',
                                        m('strong', 'File Format: ')
                                    ),
                                    m('.col-xs-3',
                                        download.file_format
                                    ),
                                    m('.col-xs-3',
                                        m('strong', 'File Split: ')
                                    ),
                                    m('.col-xs-2',
                                        download.file_split
                                    )
                                ]),
                                m('.row-xs-10.list-group-item2', [
                                    m('.col-xs-3',
                                        m('strong', 'Experimant Id: ')
                                    ),
                                    m('.col-xs-3', ''
                                        // download.exp_id.length>1 ? 'All' : ctrl.exps().filter(exp=> exp.ids==download.exp_id[0])[0].descriptive_id
                                    ),
                                    m('.col-xs-3',
                                        m('strong', 'Version Id: ')
                                    ),
                                    m('.col-xs-2', ''
                                        // download.version_id.length>1 ? 'All' : ctrl.versions.filter(version=> version.id==download.version_id[0])[0].version
                                    )
                                ])
                            ])
                        ])
                    ]),

                    m('td', size_format(download.size)),
                    m('td', !download.size ? '-' : [
                        m('a', {href:`${baseUrl}/download_data?path=${download.path}`, download:download.path , target: '_blank'}, m('i.fa.fa-download')),
                        m('i', ' | '),
                        m('a', {href:'..', onclick: function() {ask_delete_request(download.study_id, download._id, ctrl); return false;}}, m('i.fa.fa-close'))
                    ]),
                    m('td', m('span.label.label-success', download.status)),
                ]))
            )])
        ];
}

function size_format(bytes){
    if (!bytes)
        return '-';

    const thresh = 1024;

    const units =  ['B', 'KB','MB','GB','TB','PB','EB','ZB','YB'];
    let u = 0;
    while(Math.abs(bytes) >= thresh)
    {
        bytes /= thresh;
        u = u+1;
    }
    return bytes.toFixed(1)+' '+units[u];
}
