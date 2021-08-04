'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let dataRequestSchema = new Schema({
    exptId: {
        type: String,
        required: [true,'A exptId is required']
    },
    requestId: {
        type: String,
        required: [true,'A requestId is required']
    },
    status: {
        type: String,
        default: 'running'
    },
    url: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    details: {
        type: Schema.Types.Mixed
    }
});


module.exports = mongoose.model('DataRequest', dataRequestSchema);