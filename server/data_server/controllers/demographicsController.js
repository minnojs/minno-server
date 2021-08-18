'use strict';
const mongoose = require('mongoose'),
    Data2 = require('../models/demographicsSchema'),
    Demographics = mongoose.model('Demographics'),
    logger = require('../../logger');



exports.insertDemographics = async function(req,res) {
    let reqBody = req.body;
    reqBody = sanitizeMongoJson(reqBody);
    reqBody.demographics=reqBody.data[0].demographics.DATASET.demographics;
	
    let newData = new Demographics(reqBody);

    await newData.save(function(err) {
        if (err) {
            logger.error({
                message: err
            });
        }
        res.status(200).json({result:'success'});
    });
};
exports.addStartedSession = async function(registrationId,studyId,studyName) {
    if (!registrationId || !studyId || !studyName || registrationId < 0) {
        return null;
    }
	let currentDemographics = await exports.getUserDemographics(registrationId);
	let previousStudies=currentDemographics.previousStudies;
	if(!previousStudies){
	previousStudies={};}
	previousStudies[studyId]=studyName;
	currentDemographics.previousStudies=previousStudies;
    let results = await Demographics.findOneAndUpdate({
        registrationId: registrationId
    }, {
        demographics:currentDemographics
    }, (err, dataRequests) => {
        if (err) {
            throw err;
        } else {
            return dataRequests;
        }


    });
    return results;
};




exports.getUserDemographics = async function(registrationId) {
    let results = await Demographics.findOne({
        registrationId: registrationId
    }).lean();
    if(!results)
    {
        return null;
    }
    return results.demographics;
};
let sanitizeMongoJson = function(mongoJson) {
    if (Array.isArray(mongoJson)) {
        mongoJson.forEach(element => sanitizeMongoJson(element));
    } else {
        if (mongoJson instanceof Object) {
            mongoJson = sanitizeMongo(mongoJson);
            for (let key in mongoJson) {
                mongoJson[key] = sanitizeMongoJson(mongoJson[key]);
            }
        }
    }
    return mongoJson;
};
let sanitizeMongo = function(v) {
    if (v instanceof Object) {
        for (let key in v) {
            if (/^\$/.test(key)) {
                delete v[key];
            }
        }
    }
    return v;
};
