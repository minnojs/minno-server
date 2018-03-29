'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose);

var studySchema = new Schema({
  studyId: {
    type: String,
    required: 'A studyID is required for data posts'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  userAgent: {
    type: String
  },
  referrer: {
    type: String
  },
  conditions: {
    type: Object
  }
  
});
studySchema.plugin(autoIncrement.plugin, { model: 'Study', field: 'sessionId' });

module.exports = mongoose.model('Study', studySchema);