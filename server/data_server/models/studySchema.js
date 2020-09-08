'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
let counter = mongoose.model('counter', CounterSchema);

let studySchema = new Schema({
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
    let doc = this;
    counter.findByIdAndUpdate({_id: 'studyId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.studyId = counter.seq;
        next();
    });
});

module.exports = mongoose.model('Study', studySchema);