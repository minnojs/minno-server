export default args => m.component(stat_dialog, args);
import {dateRangePicker} from 'utils/dateRange';
import {get_stat, load_studies} from '../studyModel';
import formatDate from 'utils/formatDate';
import statisticsInstructions from './instructions';

let stat_dialog = {
    controller({study_id, versions, close}){
        const ctrl = {
            displayHelp: m.prop(false),
            data_study_id: m.prop(''),
            exp_id: m.prop(''),
            study_id:m.prop(study_id),
            versions,
            studies: m.prop([]),
            all_versions: m.prop(''),
            stat_data: m.prop(''),
            file_split: m.prop('taskName'),
            date_size: m.prop('day'),

            show_empty: m.prop(false),

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
            .then(m.redraw);
        return {ctrl, close};
    },
    view: ({ctrl, close}) => m('div', [
        m('.card-block', [
            m('.row', [
                m('.col-sm-12', [
                    m('.input-group', [m('strong', 'Study name'),
                        m('select.c-select.form-control',{onchange: e => select_study(ctrl, e.target.value)}, [
                            ctrl.studies().map(study=> m('option', {value:study.id, selected:study.id==ctrl.study_id()} , study.name))
                        ])
                    ]),
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
                        ]),
                        m('small.text-muted',  'The data for the study statistics by day is saved in 24 hour increments by date in USA eastern time (EST).')
                    ])
                ])
            ]),
            m('.row.space', [
                m('.col-sm-5', [
                    m('.form-group.row', [
                        m('.col-sm-3', [
                            m('label.form-control-label', 'Show by')
                        ]),
                        m('p.text-muted.btn-toolbar', [

                            dateSizeView(ctrl.date_size, 'day'),
                            dateSizeView(ctrl.date_size, 'month'),
                            dateSizeView(ctrl.date_size, 'year')                        ]),

                    ])
                ])
            ]),
            m('.row.space', [
                m('button.btn.btn-secondary.btn-sm', {onclick: ()=>ctrl.displayHelp(!ctrl.displayHelp())}, ['Toggle help ', m('i.fa.fa-question-circle')]),

                m('.btn-group.btn-group-sm.pull-right', [
                    button(ctrl.show_empty, 'Hide Empty', 'Hide Rows with Zero Started Sessions')
                ])
            ]),

            !ctrl.displayHelp() ? '' : m('.row', [
                m('.col-sm-12.p-a-2', statisticsInstructions())
            ]),

        ]),
        show_stat(ctrl),
        ctrl.error() ? m('.alert.alert-warning', ctrl.error()): '',
        ctrl.downloaded() && !ctrl.loaded() ?  '' : m('.loader'),
        m('.text-xs-right.btn-toolbar',[
            m('a.btn.btn-secondary.btn-sm', {onclick:()=>{close(null);}}, 'Close'),
            m('a.btn.btn-primary.btn-sm', {onclick:()=>{ask_get_stat(ctrl); }}, 'Show')
        ])
    ])
};

function ask_get_stat(ctrl){
    ctrl.error('');

    ctrl.downloaded(false);


    let correct_start_date = new Date(ctrl.dates.startDate());
    correct_start_date.setHours(0,0,0,0);

    let correct_end_date = new Date(ctrl.dates.endDate());
    correct_end_date.setHours(23,59,59,999);


    return get_stat(ctrl.study_id(), correct_start_date, correct_end_date, ctrl.date_size())


        .then(response => {
            const stat_data = response.stat_data;
            if (stat_data == null) return Promise.reject('There was a problem creating your file, please contact your administrator');

            ctrl.stat_data(response.stat_data);

        })
        .catch(err=>ctrl.error(err.message))
        .then(()=>ctrl.downloaded(true))
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




let dateSizeView = (date_size, value) => m('button.btn.btn-secondary.btn-sm', {

    class:  date_size()===value ? 'active' : '' ,
    onclick: () => {
        date_size(value);
    }}, value);



function sort_studies_by_name(study1, study2){
    return study1.name.toLowerCase() === study2.name.toLowerCase() ? 0 : study1.name.toLowerCase() > study2.name.toLowerCase() ? 1 : -1;
}



function select_study(ctrl, study_id){
    ctrl.study_id(study_id);
    ctrl.loaded.bind(null, false);
    const new_study = ctrl.studies().filter(study=>study.id==study_id)[0];
    ctrl.versions = new_study.versions;

}


function show_stat(ctrl){
    const stat2show = !ctrl.show_empty() ? ctrl.stat_data() : ctrl.stat_data().filter(row => row.starts !==0);
    return !stat2show
        ?
        ''
        :[m('table', {class:'table table-striped table-hover'}, [
            m('thead', [
                m('tr', [
                    m('th', 'Study Name'),
                    m('th', 'Version'),
                    m('th', 'Experiment Name'),
                    m('th', 'Earliest session'),
                    m('th', 'Latest session'),
                    m('th', 'Starts'),
                    m('th','Completes'),
                ])
            ]),
            m('tbody',
                stat2show.map(data => m('tr', [
                    m('td', data.study_name),
                    m('td',data.version),
                    m('td',data.experiment),
                    m('td',formatDate(new Date(data.earliest_session))),
                    m('td',formatDate(new Date(data.latest_session))),
                    m('td', data.starts),
                    m('td', data.completes)


                ]))
            )])
        ];
}

let button = (prop, text, title = '') => m('a.btn.btn-secondary', {
    class: prop() ? 'active' : '',
    onclick: () => prop(!prop()),
    title
}, text);

let radioButton = (prop, text) => m('label.c-input.c-radio', [
    m('input.form-control[type=radio]', {
        onclick: prop.bind(null, text),
        checked: prop() == text
    }),
    m('span.c-indicator'),
    text
]);
