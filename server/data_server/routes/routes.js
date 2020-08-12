'use strict';
module.exports = function(app) {
    const controller = require('../controllers/controller');

    app.route('/data')
    .put(controller.insertData);
    app.route('/data').get(controller.getData);
    app.route('/study/start/:studyId')
    .get(controller.newStudyInstance);
};