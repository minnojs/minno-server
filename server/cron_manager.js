
const connection    = Promise.resolve(require('mongoose').connection);
const data_server   = require('./data_server/controllers/controller');


function add_from_date(last_update) {
    return connection.then(function (db) {
        const studies = db.collection('studies');
        const data_usage = db.collection('data_usage');
        let current_date = new Date();
        current_date.setHours(0, 0, 0, 0);
        let last_date = new Date(last_update);
        let days2add = (current_date.getTime() - last_update.getTime()) / (1000 * 3600 * 24);

        let dates2add = [];
        for (let i = 0; i < days2add; i++)
            dates2add.push(new Date(last_date.setTime(last_date.getTime() + 24*3600000)));

        return Promise.all(
            dates2add.map(end_date =>
                studies.find({})
                    .toArray()
                    .then(all_studies => Promise.all(all_studies.flatMap(study => data_server.getStudyDailyData(study, end_date))))
                    .then(studies => data_usage.insertOne({date: end_date, studies}))));
    });
}


exports.get_daily_data = function () {
    return connection.then(function (db) {
        const data_usage = db.collection('data_usage');
        return data_usage.findOne( {},
            { sort: { date: -1 } })
            .then(data=>{
                if (data)
                    return add_from_date(data.date);
                return data_server.getFirstDate().then(first_data=>add_from_date(first_data));


            });
    });
}