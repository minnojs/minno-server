import {get_users, get_participants, delete_request, update_role, get_requests} from './participantsModel';
import {baseUrl} from 'modelUrls';

import messages from 'utils/messagesComponent';
import {dateRangePicker} from 'utils/dateRange';
import formatDate from 'utils/formatDate';



export default participantsComponent;

let participantsComponent = {
    controller(){
        let ctrl = {
            file_format: m.prop('csv'),
            demographic: m.prop('without'),
            dates: {
                pertains_to: m.prop('registration'),
                startDate: m.prop(daysAgo(3650)),
                endDate: m.prop(daysAgo(0))
            },
            error:m.prop(''),
            downloaded:m.prop(false),
            ask_get_participants,
            ask_delete_request,
            users:m.prop(),
            requests:m.prop([]),
            loaded:m.prop(false),
            col_error:m.prop(''),
            password:m.prop('')
        };

        function load_requests(ctrl){
            get_requests()
                .then(response => ctrl.requests(response.requests))
                .then(()=>{
                    if (ctrl.requests().filter(request=>request.status==='in progress').length)
                        setTimeout(()=>load_requests(ctrl), 5000);
                })
                .catch(ctrl.error)
                .then(ctrl.loaded.bind(null, true))
                .then(m.redraw);
        }

        function ask_delete_request(request_id){
            return delete_request(request_id)
                .then(()=>load_requests(ctrl))
                .then(m.redraw);

        }

        function ask_get_participants(){
            ctrl.error('');
            ctrl.downloaded(false);

            let correct_start_date = new Date(ctrl.dates.startDate());
            correct_start_date.setHours(0,0,0,0);

            let correct_end_date = new Date(ctrl.dates.endDate());
            correct_end_date.setHours(23,59,59,999);

            return get_participants(ctrl.file_format(), ctrl.dates.pertains_to(), ctrl.demographic(), correct_start_date, correct_end_date)
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

        function load() {
            get_users()
                .then(response =>ctrl.users(response.users))
                .then(()=>ctrl.loaded(true))
                .then(()=>load_requests(ctrl))

                .catch(error => {
                    ctrl.col_error(error.message);
                }).then(m.redraw);
        }
        load();
        return ctrl;
    },
    view(ctrl){
        return  !ctrl.loaded()
            ?
            m('.loader')
            :
            m('.container.participants-page', [
                m('.row.double_space',[
                    m('.col-sm-12', [
                        m('h3', 'Participation Data')
                    ])
                ]),
                m('.row', [

                    m('.col-sm-3', [
                        m('.input-group', [m('strong', 'Output type'),
                            m('select.c-select.form-control',{onchange: e => ctrl.file_format(e.target.value)}, [
                                m('option', {value:'csv'}, 'csv'),
                                m('option', {value:'tsv'}, 'tsv'),
                                m('option', {value:'json'}, 'json')
                            ])
                        ])
                    ]),
                    m('.col-sm-3', [
                        m('.input-group', [m('strong', 'Date range pertains to'),
                            m('select.c-select.form-control',{onchange: e => ctrl.dates.pertains_to(e.target.value)}, [
                                m('option', {value:'registration'}, 'Registration'),
                                m('option', {value:'activity'}, 'Activity')
                            ])
                        ])
                    ]),
                    m('.col-sm-3', [
                        m('.input-group', [m('strong', 'Demographic data'),
                            m('select.c-select.form-control',{onchange: e => ctrl.demographic(e.target.value)}, [
                                m('option', {value:'without'}, 'Exclude demographic data'),
                                m('option', {value:'with'}, 'Include demographic data')
                            ])
                        ])
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
                ]),
                m('.row.space',
                    m('.col-sm-12',
                        m('.btn-group.btn-group-sm.pull-right',
                            m('button.btn.btn-primary.btn-sm',  {disabled: ctrl.requests().filter(request=>request.status==='in progress').length, onclick:()=>{ctrl.ask_get_participants()}}, 'Download')
                        )
                    )
                ),
                ctrl.requests().length === 0
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
                                    m('a', {href:'javascript:void(0);', onclick: function() {ctrl.ask_delete_request(download._id); return false;}}, m('i.fa.fa-close'))
                                ]),
                                m('td', m('span.label.label-success', download.status)),
                            ]))
                        )])                    ]
            ]);
    }
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

let daysAgo = (days) => {
    let d = new Date();
    d.setDate(d.getDate() - days);
    return d;
};

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
