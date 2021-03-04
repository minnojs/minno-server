'use strict';
const mongoose = require('mongoose'),
    Data2 = require('../models/poolStudySchema'),
    PoolStudy = mongoose.model('PoolStudy'),
    logger = require('../../logger');



exports.insertPoolStudy = async function(poolStudy) {
    let newData = new PoolStudy(poolStudy);

    await newData.save(function(err, data) {
        if (err) {
            console.log(err);
            logger.error({
                message: err
            });
        }
        return data;
    });
};



exports.getAllPoolStudies = async function() {

    let results = await PoolStudy.find({}, (err, dataRequests) => {
        if (err) {
            throw err;
        } else {
            return dataRequests;
        }


    });
    return results;
};

exports.getRunningPoolStudies = async function() {

    let results = await PoolStudy.find({
        status: 'running'
    }, (err, dataRequests) => {
        if (err) {
            throw err;
        } else {
            if (dataRequests) {
                return dataRequests;
            } else {
                return [];
            }
        }


    });
    return results;
};
exports.deletePoolStudy = async function(poolStudy) {

    let results = await PoolStudy.deleteOne(poolStudy, (err, dataRequests) => {
        if (err) {
            throw err;
        } else {
            return dataRequests;
        }



    });
    return results;
};
exports.incrementStarts = async function(poolStudyId, count) {

    let results = await PoolStudy.findOneAndUpdate({
        _id: poolStudyId
    }, {
        $inc: {
            'starts': count
        }
    }, (err, dataRequests) => {
        if (err) {
            throw err;
        } else {
            return dataRequests;
        }



    });
    return results;
};
exports.setStarts = async function(poolStudyId, count) {

    let results = await PoolStudy.findOneAndUpdate({
        _id: poolStudyId
    }, {
        'starts': count
    }, (err, dataRequests) => {
        if (err) {
            throw err;
        } else {
            return dataRequests;
        }



    });
    return results;
};
exports.incrementCompletes = async function(poolStudyId, count) {

    let results = await PoolStudy.findOneAndUpdate({
        _id: poolStudyId
    }, {
        $inc: {
            'completes': count
        }
    }, (err, dataRequests) => {
        if (err) {
            throw err;
        } else {
            return dataRequests;
        }
    });
    return results;
};
exports.setCompletes = async function(poolStudyId, count) {

    let results = await PoolStudy.findOneAndUpdate({
        _id: poolStudyId
    }, {
        'completes': count
    },
    (err, dataRequests) => {
        if (err) {
            throw err;
        } else {
            return dataRequests;
        }
    });
    return results;
};

String.prototype.hashCode = function() {
    let hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
