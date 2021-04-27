'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let poolStudySchema = new Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
	/*_id: {
		type: String,//mongoose.ObjectId,	
		required: [true, 'An ID is required for pool studies']
	},*/
    deploy_id: {
        type: String,//mongoose.ObjectId,
        required: [true, 'An ID is required for pool studies']
    },
    study_status: {
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
    rules: {
        type: Object,
        default: {}
        //required: [true, 'A condition is required for pool studies']
    },
    pause_rules: {
        type: Object,
        default: {}
        //required: [true, 'An autopause is required for pool studies']
    }

}, {
    strict: false
});

module.exports = mongoose.model('PoolStudy', poolStudySchema);
