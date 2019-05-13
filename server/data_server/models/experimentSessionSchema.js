'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var experimentSessionSchema = new Schema({
  sessionId: {
    type: String,
    required: [true,'A sessionID is required']
  },
  studyId: {
    type: String,
    required: [true,'A studyID is required']
  },
  versionId: {
    type: String,
    required: [true,'A version is required']
  },
  descriptiveId: {
    type: String
  },
  version: {
    type: String
  },
  state: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
},
{ strict: false });


module.exports = mongoose.model('ExperimentSession', experimentSessionSchema);
