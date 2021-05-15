'use strict';
const mongoose = require('mongoose'),
    Data2 = require('../models/poolStudySchema'),
    PoolStudy = mongoose.model('PoolStudy'),
    logger = require('../../logger'),
    PI = require('../../PI'),
    connection = Promise.resolve(require('mongoose').connection);
mongoose.set('useFindAndModify', false);


exports.insertPoolStudy = async function(deploy) {
    let poolStudy = generatePoolStudy(deploy);
    let newData = new PoolStudy(poolStudy);
    return await newData.save();
};
exports.updatePoolStudy = async function(study) {
    let poolStudy = generatePoolStudy(study);
	/*let updateObject={};
	if(!poolStudy.deploy_id)
	{
		throw 'cannot update research pool with a deploy_id';
	}
	updateObject.deploy_id=poolStudy.deploy_id;*/
    //let updateObject={priority:study.priority, target_number:study.target_number, pause_rules:study.pause_rules};
	//return await PoolStudy.findOneAndUpdate(updateObject, poolStudy);
    return await PoolStudy.findByIdAndUpdate(study._id, poolStudy,{new: true}).lean();
};

function generatePoolStudy(deploy)
{
	let poolStudy={};
	// if(deploy.running_id)
	// {
	// 	deploy._id=deploy.running_id;
	// }
	if(deploy.study_id){
    poolStudy.study_id = deploy.study_id;}
	if(deploy.version_id){
    poolStudy.version_id = deploy.version_id;}
    poolStudy._id = deploy._id;//mongoose.Types.ObjectId(deploy._id);
	if(deploy.priority){
    poolStudy.priority = deploy.priority;}
	if(deploy.email){
    poolStudy.email = deploy.email;}
	if(deploy.experiment_file){
    poolStudy.experiment_file = deploy.experiment_file;}
	if(deploy.rules){
    poolStudy.rules = deploy.rules;}
	if(deploy.target_number){
    poolStudy.target_number = deploy.target_number;}
	if(deploy.pause_rules){
    poolStudy.pause_rules = deploy.pause_rules;}
	if(deploy.version_hash){
    poolStudy.version_hash = deploy.version_hash;}
	if(deploy.study_name){
    poolStudy.study_name = deploy.study_name;}
	if(deploy.user_name){
    poolStudy.user_name = deploy.user_name;}
	if(deploy.study_status){
	poolStudy.study_status = deploy.study_status;}
	if(deploy.deploy_id){
    poolStudy.deploy_id = deploy.deploy_id;}
	if(deploy.starts){
    poolStudy.starts = deploy.starts;}
	if(deploy.completes){
    poolStudy.completes = deploy.completes;}
	if(deploy.multiple_sessions)
	{
		poolStudy.multiple_sessions=deploy.multiple_sessions;
	}
    return poolStudy;
}


exports.getAllPoolStudies = async function() {
	//await PoolStudy.deleteMany({});
    let results = await PoolStudy.find({}).lean();
    return results;
};

exports.getRunningPoolStudies = async function() {
    let cursor = PoolStudy.find({
        study_status: 'running'
    }).lean().cursor({
        batchSize: 10000
    });
    let results = [];
    for (let dataEntry = await cursor.next(); dataEntry != null; dataEntry = await cursor.next()) {
        //await exports.updatePoolStudy(dataEntry);
        results.push(dataEntry);
    }
    return results;
};
exports.deletePoolStudy = async function(poolStudy) {
	
    let results = await PoolStudy.findByIdAndRemove(poolStudy._id);
    return results;
};
exports.incrementStarts = async function(poolStudyId, count) {

    let results = await PoolStudy.findOneAndUpdate({
        _id: poolStudyId
    }, {
        $inc: {
            'starts': count
        }
    }).lean();
    return results;
};
exports.setStarts = async function(poolStudyId, count) {

    let results = await PoolStudy.findOneAndUpdate({
        _id: poolStudyId
    }, {
        'starts': count
    }).lean();
    return results;
};
exports.incrementCompletes = async function(poolStudyId, count) {

    let results = await PoolStudy.findOneAndUpdate({
        _id: poolStudyId
    }, {
        $inc: {
            'completes': count
        }
    }).lean();
    return results;
};
exports.setCompletes = async function(poolStudyId, count) {

    let results = await PoolStudy.findOneAndUpdate({
            _id: poolStudyId
        }, {
            'completes': count
        }).lean();
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
