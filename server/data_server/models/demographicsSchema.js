'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let demographicsSchema = new Schema({
    registrationId: {
        type: String,
        required: [true,'A registrationId is required']
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    demographics: {
        type: Object,
        default:{}
    }
});


module.exports = mongoose.model('Demographics', demographicsSchema);