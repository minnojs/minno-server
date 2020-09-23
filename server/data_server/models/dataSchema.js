'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let dataSchema = new Schema({
    sessionId: {
        type: String,
        required: [true,'A sessionID is required for data posts']
    },
    studyId: {
        type: String,
        required: [true,'A studyID is required for data posts']
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    data: {
        type: Schema.Types.Mixed,
        uniqueItems: true,
        items: {
            type: Schema.Types.Mixed
        },
        required: [true,'A data array required for data posts']
    }
},
{ strict: false });


module.exports = mongoose.model('Data', dataSchema);
