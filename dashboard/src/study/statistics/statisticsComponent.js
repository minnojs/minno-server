import {getStatistics} from './statisticsModel';
import statisticsForm from './statisticsFormComponent';
import statisticsTable from './statisticsTableComponent';
import statisticsInstructions from './instructions';
export default statisticsComponent;

let statisticsComponent = {
    controller(){
        let displayHelp = m.prop(false);
        let tableContent = m.prop('');

        let loading = m.prop(false);
        let query = {
            source: m.prop('Pool:Current'),
            startDate: m.prop(firstDayInPreviousMonth(new Date())),
            endDate: m.prop(new Date()),
            study: m.prop(''),
            task: m.prop(''),
            studyType: m.prop('Both'),
            studydb: m.prop('Any'),
            sortstudy: m.prop(true),
            sorttask: m.prop(false),
            sorttask_sent: m.prop(false),
            sortgroup: m.prop(false),
            sorttime: m.prop('None'),
            sorttime_sent: m.prop('None'),
            showEmpty: m.prop(false),
            firstTask: m.prop(''),
            lastTask: m.prop(''),
            error: m.prop(''),
            rows:m.prop([])
        };

        return {query, submit, displayHelp, tableContent,loading};

        function submit(){
            loading(true);
            getStatistics(query)
                .then(tableContent)
                .catch(response => {
                    query.error(response.message);
                })
                .then(loading.bind(null, false))
                .then(query.sorttask_sent(query.sorttask()))
                .then(query.sorttime_sent(query.sorttime()))
                .then(m.redraw);
        }

        function firstDayInPreviousMonth(yourDate) {
            return new Date(yourDate.getFullYear(), yourDate.getMonth() - 1, 1);
        }
    },
    view: ({query, tableContent, submit, displayHelp, loading}) => m('.container.statistics', [
        m('h3', 'Statistics'),
        m('.row', [
            statisticsForm({query})
        ]),
        m('.row', [
            m('.col-sm-12',[
                m('button.btn.btn-secondary.btn-sm', {onclick: ()=>displayHelp(!displayHelp())}, ['Toggle help ', m('i.fa.fa-question-circle')]),
                m('a.btn.btn-primary.pull-right', {onclick:submit}, 'Submit'),
                !tableContent()  ? '' : m('a.btn.btn-secondary.pull-right.m-r-1', {config:downloadFile(query.study() ? `${query.study()}.csv` : 'stats.csv', tableContent(), query)}, 'Download CSV')
            ])
        ]),
        !displayHelp() ? '' : m('.row', [
            m('.col-sm-12.p-a-2', statisticsInstructions())
        ]),
        m('.row.m-t-1', [
            loading()
                ? m('.loader')
                : statisticsTable({tableContent, query})
        ])
    ])
};

let downloadFile = (filename, text, query) => element => {
    let json = text.data;
    json = !query.showEmpty() ? json : json.filter(row => row.starts !== 0);

    let fields = ['studyName', !query.sorttask_sent() ? '' : 'taskName', query.sorttime_sent()==='All' ? '' : 'date', 'starts', 'completes', !query.sortgroup() ? '' : 'schema'].filter(n => n);

    let replacer = function(key, value) { return value === null ? '' : value;};
    let csv = json.map(function(row){
        return fields.map(function(fieldName){
            return JSON.stringify(row[fieldName], replacer);
        }).join(',');
    });
    csv.unshift(fields.join(',')); // add header column


    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv.join('\r\n') ));
    element.setAttribute('download', filename);
};
