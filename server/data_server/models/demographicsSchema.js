'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let demographicsSchema = new Schema({
    registration_id: {
        type: String,
        required: [true,'A registration_id is required']
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