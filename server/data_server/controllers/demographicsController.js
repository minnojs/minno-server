'use strict';
const mongoose = require('mongoose'),
    Data2 = require('../models/demographicsSchema'),
    Demographics = mongoose.model('Demographics'),
    logger = require('../../logger');



exports.insertDemographics = async function(req,res) {
    let reqBody = req.body;
    reqBody = sanitizeMongoJson(reqBody);
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




exports.getUserDemographics = async function(registrationId) {

    let results = await Demographics.find({
        registration_Id: registrationId
    }, (err, dataRequests) => {
        if (err) {
            throw err;
        } else {
            if (dataRequests) {
                return dataRequests;
            } else {
                return {};
            }
        }


    });
    return results;
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
