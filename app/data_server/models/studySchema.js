'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

var studySchema = new Schema({
  studyId: {
    type: String,
    required: [true,'A studyID is required for data posts']
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
studySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'studyId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.studyId = counter.seq;
        next();
    });
});

module.exports = mongoose.model('Study', studySchema);