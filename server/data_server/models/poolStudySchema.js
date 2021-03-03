'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let poolStudySchema = new Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'running'
    },
    priority: {
        type: Number,
        default: 26
    },
    starts: {
        type: Number,
        default: 0
    },
    completes: {
        type: Number,
        default: 0
    },
    condition: {
        type: Object,
        required: [true, 'A condition is required for pool studies']
    },
    autopause: {
        type: Object,
        required: [true, 'An autopause is required for pool studies']
    }

}, {
    strict: false
});

module.exports = mongoose.model('PoolStudy', poolStudySchema);
