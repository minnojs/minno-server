'use strict';
var config = require.main.require('../config'),
	mongoose = require('mongoose'),
	Data = require('../models/dataSchema'),
	DataRequest = require('../models/dataRequestSchema'),
	Study = require('../models/studySchema'), //created model loading here
	DataRequest = mongoose.model('DataRequest'),
	Data = mongoose.model('Data'),
	experimentSessionSchema=require('../models/experimentSessionSchema'),
	experimentSessionSchema = mongoose.model('ExperimentSession'),
	sanitize = require("sanitize-filename");
	

var fs = require('fs-extra');
var convert = require('mongoose_schema-json');
var archiver = require('archiver-promise');
const varSplit = ".";
const nullDataValue = '';
const defaultDataFilename = '_data';
const defaultValueName = 'data'; // name used for non json items in data arrays
const dataPrefix = ''; //prefix for items in the data array
const dataFileLocation = config.base_folder;
const dataFolder = config.dataFolder;
const maxRowsInMemory=100000;

exports.insertData = function(req, res) {
	var newData = new Data(req.body);
	var reqBody = req.body;
	if(newData.sessionId<0)
	{
		res.json('{message:"data not saved due to negative sessionID"}');
		return;
	}
	newData.save(function(err, data) {
		if (err)
			res.send(err);
		res.json(data);
	});
};
exports.insertExperimentSession = async function(params) {
	if(params.sessionId<0)
	{
		return null;
	}
	var newData = new experimentSessionSchema(params);
	newData.save(function(err, data) {
		if (err)
			console.log(err);
		return true;
	});
};


exports.getDownloadRequests = function(studyIds) {
	return new Promise(function(resolve, reject) {
		DataRequest.find({
			requestId: {
				$in: studyIds
			}
		}, (err, dataRequests) => {
			if (err) {
				reject(err);
			} else {
				resolve(dataRequests);
			}


		})
	});
};
/**
additionalColumns: an array with strings of additional fields to include in the output
dateSize: How to group date fields.  'day' 'month' 'year' are the options.  defaults 'day'
**/
exports.getStatistics = async function(studyId, versionId,  startDate, endDate, dateSize, additionalColumns) 	
{
if (typeof studyId == 'undefined' || !studyId)
	throw new Error("Error: studyId must be specified");
	var findObject = {};
	var files = {};
	var dataMaps = {};
	var processedData = [];
	var pos = 0;
	var rowSplitString = '\t';
	var fileSuffix = '.txt';
	var fileConfig = {};
	var dataCount=0;
	var sortB=true;
	findObject.studyId = studyId;
	if(Array.isArray(studyId))
	{
		findObject.studyId ={};
		findObject.studyId.$in=studyId;
	}
	if (typeof startDate !== 'undefined' && startDate) {
		findObject.createdDate = {};
		findObject.createdDate.$gt = new Date(startDate);
	}
	if (typeof endDate !== 'undefined' && endDate) {
		if (typeof findObject.createdDate == 'undefined' || !findObject.createdDate) {
			findObject.createdDate = {};
		}
		findObject.createdDate.$lt = new Date(endDate);
	}
	if(typeof versionId !== 'undefined' && versionId)
	{
		if(Array.isArray(versionId))
		{
			versionId.forEach(function(vId) {
				vId=vId.toString();
			});
			findObject.versionId={};
			findObject.versionId.$in=versionId;
		}
			else
			{
				findObject.versionId=versionId.toString();
	}
	}
	var fieldsToFind="descriptiveId -_id createdDate version ";
	if(typeof dateSize == 'undefined' || dateSize!='day' && dateSize!='month' && dateSize!='year')
	{
		dateSize='none';
	}
	if(additionalColumns!=null)
	{
		additionalColumns.forEach(function(element) {
			fieldsToFind+=" "+element;
		});
	}
	var dataMap=new Map();
	var cursor = experimentSessionSchema.find(findObject,fieldsToFind).lean().cursor({ batchSize: 10000 });//;
	for (let dataEntry = await cursor.next(); dataEntry != null; dataEntry = await cursor.next()) {
		if(dateSize!='none')
		{
			dataEntry.createdDate=formatDate(dataEntry.createdDate,dateSize);
		}
		else
		{
			var currentDate=dataEntry.createdDate;
			delete dataEntry.createdDate;
		}
		var dataHash=JSON.stringify(dataEntry).hashCode();
		
		if(!dataMap.has(dataHash))
		{
			dataEntry['#earliest_session']=currentDate;
			dataEntry['#latest_session']=currentDate;
			dataEntry['#totalsessions']=1;
			dataMap.set(dataHash,dataEntry);
		}
		else
		{
			dataEntry=dataMap.get(dataHash);
			dataEntry['#totalsessions']++;
			if(dataEntry['#earliest_session']>currentDate)
			{
				dataEntry['#earliest_session']=currentDate;
			}
			if(dataEntry['#latest_session']<currentDate)
			{
				dataEntry['#latest_session']=currentDate;
			}
			dataMap.set(dataHash,dataEntry);
		}
			
	}
	var output=new Array(dataMap.size);
	var pos=0;
	for (let key of dataMap.keys())
	{
		output[pos]=dataMap.get(key);
		pos++;
	}
	return output;



};

exports.getData2 = function(req, res) {
	res.send(exports.getData(req.get('studyId')));
}
exports.getData = async function(studyId, fileFormat, fileSplitVar, startDate, endDate,versionId) {
	if (typeof studyId == 'undefined' || !studyId)
		throw new Error("Error: studyId must be specified");
	var findObject = {};
	var files = {};
	var dataMaps = {};
	var processedData = [];
	var pos = 0;
	var rowSplitString = '\t';
	var fileSuffix = '.txt';
	var fileConfig = {};
	var dataCount=0;
	var useDataArray=true;
	findObject.studyId = studyId;
	if(Array.isArray(studyId))
	{
		findObject.studyId ={};
		findObject.studyId.$in=studyId;
	}
	if (typeof startDate !== 'undefined' && startDate) {
		findObject.createdDate = {};
		findObject.createdDate.$gt = new Date(startDate);
	}
	if (typeof endDate !== 'undefined' && endDate) {
		if (typeof findObject.createdDate == 'undefined' || !findObject.createdDate) {
			findObject.createdDate = {};
		}
		findObject.createdDate.$lt = new Date(endDate);
	}
	if(typeof versionId !== 'undefined' && versionId)
	{
		if(Array.isArray(versionId))
		{
			versionId.forEach(function(vId) {
				vId=vId.toString();
			});
			findObject.versionId={};
			findObject.versionId.$in=versionId;
		}
			else
			{
				findObject.versionId==versionId.toString();
	}
	}
	if (fileFormat == 'csv') {
		rowSplitString = ',';
		fileSuffix = '.csv';
	}
	if (fileFormat == 'tsv') {
		rowSplitString = '\t';
	}
	
	var currentTime = new Date();
	currentTime = currentTime.getTime();
	var dataObject = {
		studyId: studyId,
		details: findObject,
		requestId: currentTime
	};
	
	var newDataRequest = new DataRequest(dataObject);
	var newMapArray=[maxRowsInMemory];
	var cursor = Data.find(findObject).lean().cursor({ batchSize: 10000 });//;
	for (let dataEntry = await cursor.next(); dataEntry != null; dataEntry = await cursor.next()) {
		var newMaps = getInitialVarMap(dataEntry);
		if(useDataArray){
		newMapArray[dataCount]=newMaps;
		dataCount++;}
		if(dataCount>=maxRowsInMemory) //query is too large to store in memory
		{
			useDataArray=false;
			dataCount=0;
			newMapArray=[]; 
		}
		newMaps.forEach(function(newMap) {
			updateMap(dataMaps, newMap, fileSplitVar);
		});
			
	};

	if (Object.keys(dataMaps).length == 0) {

        throw {status:500, message: 'ERROR: No data!'};
		
	}
	cursor = experimentSessionSchema.find(findObject).lean().cursor({ batchSize: 10000 });//;
	try{
	for (let dataEntry = await cursor.next(); dataEntry != null; dataEntry = await cursor.next()) {
		var newMaps = getInitialVarMap(dataEntry);
		if(useDataArray){
		newMapArray[dataCount]=newMaps;
		dataCount++;}
		if(dataCount>=maxRowsInMemory) //query is too large to store in memory
		{
			useDataArray=false;
			dataCount=0;
			newMapArray=[]; 
		}
		newMaps.forEach(function(newMap) {
			updateMap(dataMaps, newMap, fileSplitVar);
		});
			
	};}
	catch(e)
	{
		console.log(e);
	}
	await fileSetup(fileConfig);
if(useDataArray  && typeof fileFormat !== 'undefined' && fileFormat!=='json')
{
	for(var x=0;x<dataCount;x++){
		var newMaps=newMapArray[x];
		for await (var newMap of newMaps)
		{
			
						if (fileSplitVar==null || fileSplitVar == '' || newMap[fileSplitVar] == null || newMap[fileSplitVar] == '') {
							var filename = defaultDataFilename;
						} else {
							var filename = newMap[fileSplitVar];
						}
						var dataMap = dataMaps[filename];
						var row = mapToRow(dataMap, newMap, filename);			
					    writeDataRowToFile(row, dataMap, filename, rowSplitString, fileSuffix, files, fileConfig);
		}
	}
	
}
	else
{
	cursor = cursor = Data.find(findObject).lean().cursor({ batchSize: 10000 });
	var dataCount=0;
	for (let dataEntry = await cursor.next(); dataEntry != null; dataEntry = await cursor.next()) {
		dataCount++;
		if(typeof fileFormat !== 'undefined' && fileFormat=='json')
		{
			 writeDataFile(JSON.stringify(dataEntry), defaultDataFilename, fileSuffix, files, fileConfig) ;
			continue;
		}
		//dataEntry = JSON.parse(JSON.stringify(dataEntry));
		newMaps = getInitialVarMap(dataEntry);
		for await (var newMap of newMaps)
		{
			
						if (fileSplitVar==null || fileSplitVar == '' || newMap[fileSplitVar] == null || newMap[fileSplitVar] == '') {
							var filename = defaultDataFilename;
						} else {
							var filename = newMap[fileSplitVar];
						}
						var dataMap = dataMaps[filename];
						var row = mapToRow(dataMap, newMap, filename);	
					    writeDataRowToFile(row, dataMap, filename, rowSplitString, fileSuffix, files, fileConfig);
		}
	}
	cursor = experimentSessionSchema.find(findObject).lean().cursor({ batchSize: 10000 });
	for (let dataEntry = await cursor.next(); dataEntry != null; dataEntry = await cursor.next()) {
		dataCount++;
		if(typeof fileFormat !== 'undefined' && fileFormat=='json')
		{
			 writeDataFile(JSON.stringify(dataEntry), defaultDataFilename, fileSuffix, files, fileConfig) ;
			continue;
		}
		//dataEntry = JSON.parse(JSON.stringify(dataEntry));
		newMaps = getInitialVarMap(dataEntry);
		for await (var newMap of newMaps)
		{
			
						if (fileSplitVar==null || fileSplitVar == '' || newMap[fileSplitVar] == null || newMap[fileSplitVar] == '') {
							var filename = defaultDataFilename;
						} else {
							var filename = newMap[fileSplitVar];
						}
						var dataMap = dataMaps[filename];
						var row = mapToRow(dataMap, newMap, filename);	
					    writeDataRowToFile(row, dataMap, filename, rowSplitString, fileSuffix, files, fileConfig);
		}
	}

}
	
	await closeFiles(files);
	if(dataCount==0  && useDataArray==true) {
		throw {status:500, message: 'ERROR: No data!'};
	}
	return zipFiles(fileConfig);


};
var asyncForEach = async function(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array)
	}
}
var mapToRow = function(dataMap, newMap, filename) {
	
	var row = new Array(Object.keys(dataMap).length);
	row.fill(nullDataValue);
	Object.keys(newMap).forEach(function(key) {
		row[dataMap[key]] = newMap[key];
	});
	return row;
}
exports.newStudyInstance = function(req, res) {
	var study = {
		studyId: req.params.studyId,
		conditions: req.params.conditions,
		userAgent: req.headers['user-agent'],
		referrer: req.header('Referer')
	};
	var newStudy = new Study(study);
	newStudy.save(function(err, study) {
		if (err)
			res.send(err);
		res.json(study);
	});
};

var getInitialVarMap = function(data) {
	var varMap = {};
	var varMaps = [];

	Object.keys(data).forEach(function(key) {

		if (key[0] == '_') {
			return varMap;
		}
		var item = data[key];
		if (key != 'data') //TODO: what to do if collision happens
		{
			if (varMap[key] == null) {
				varMap[key] = item;
			}
		}
	});
	var item = data.data;
	/*try {
		item = JSON.parse(item);
	} catch (e) {}*/
	var pushVarMaps = false;
	if ((item!=null && item.length > 0 && typeof item == 'object')) {
		item.forEach(function(row, index) {
			if (Object.keys(row).length > 0 && typeof row == 'object') {
				varMaps.push(getVarMap(row, dataPrefix,  Object.assign({}, varMap)));//JSON.parse(JSON.stringify(varMap))));

			} else {
				if (varMap[defaultValueName + varSplit + index] == null) {
					varMap[defaultValueName + varSplit + index] = row;
					pushVarMaps = true;
				}
			}

		});
	} else {
		varMap[defaultValueName] = item;
		pushVarMaps = true;
	}
	if (pushVarMaps) {
		varMaps.push(varMap);
	}
	return varMaps;
}
var getVarMap = function(data, prefix, map) {
	if (Array.isArray(data)) {
		var x = 1;
		data.forEach(function(row) {
			if (Object.keys(row).length > 0 && typeof row == 'object') {
				map = getVarMap(row, prefix + x + varSplit, map);

			} else {
				if (map[prefix + x] == null) {
					map[prefix + x] = row;
				}
			}
			x++;
		});
		return map;
	}
	Object.keys(data).forEach(function(key) {
		var item = data[key];
		if (typeof(item)== 'undefined' || item === null) {
			return;
		}


		/*try {
			if (typeof item == 'object'){
			item = JSON.parse(item);}
		} catch (e) {}*/
		if (Array.isArray(item)) {
			map = getVarMap(item, prefix + key + varSplit, map);
		} else {
			if (typeof item == 'object') {
				Object.keys(item).forEach(function(key2) {
					var item2 = item[key2];
					if (typeof item2 == 'object') {
						map = getVarMap(item[key2], prefix + key + varSplit + key2 + varSplit, map);
					} else {
						if (typeof(map[prefix + key + varSplit + key2])=='undefined' || map[prefix + key + varSplit + key2] === null) {
							map[prefix + key + varSplit + key2] = item2;
						}
					}
				});
			} else {
				if (typeof(map[prefix + key])=='undefined' || map[prefix + key] === null) //TODO: what to do if collision happens
				{
					map[prefix + key] = item;

				}
			}
		}
	});

	return map;
}
var updateMap = function(dataMaps, newMap, splitVar) {
	var filename, dataMap;
	if (!splitVar || splitVar == '' || newMap[splitVar] == null || newMap[splitVar] == '') {
		filename = defaultDataFilename;
	} else {
		filename = newMap[splitVar];
	}
	if (dataMaps[filename] == null) {
		dataMap = {};
	} else {
		dataMap = dataMaps[filename];
	}
	var pos = Object.keys(dataMap).length;
	Object.keys(newMap).forEach(function(key) {
		if (typeof(dataMap[key])== 'undefined' || dataMap[key] === null) {
			dataMap[key] = pos;
			pos++;
		}
	});
	dataMaps[filename] = dataMap;
}

var getDateString = function(daysFromPresent) {
	var date = new Date();
	date.setDate(date.getDate() + daysFromPresent)
	var dd = date.getDate();
	var mm = date.getMonth();
	var yyyy = date.getFullYear();

	var dateString = dd + '.' + mm + '.' + yyyy;

	return dateString;
}
var formatDate = function(date,dateSize)
{
	var dd = date.getDate();
	var mm = date.getMonth();
	var yyyy = date.getFullYear();

	if(dateSize=='day'){
	return dd + '.' + mm + '.' + yyyy;}
	if(dateSize=='month')
	{
		return mm + '.' + yyyy;
	}
	if(dateSize=='year')
	{
		return ''+yyyy;
	}
}
var zipFolder = async function(zipPath, zipFolder) {
	var output = fs.createWriteStream(zipPath);
	var archive = archiver('zip', {
		zlib: {
			level: 9
		} // Sets the compression level.
	});

	// listen for all archive data to be written
	// 'close' event is fired only when a file descriptor is involved
	output.on('close', function() {
	//	console.log(archive.pointer() + ' total bytes');
	//	console.log('archiver has been finalized and the output file descriptor has closed.');
	});

	// This event is fired when the data source is drained no matter what was the data source.
	// It is not part of this library but rather from the NodeJS Stream API.
	// @see: https://nodejs.org/api/stream.html#stream_event_end
	output.on('end', function() {
		//console.log('Data has been drained');
	});

	// good practice to catch warnings (ie stat failures and other non-blocking errors)
	archive.on('warning', function(err) {
		if (err.code === 'ENOENT') {
			// log warning
		} else {
			// throw error
			throw new Error(err);
		}
	});

	// good practice to catch this error explicitly
	archive.on('error', function(err) {
		throw new Error(err);
	});

	// pipe archive data to the file
	await archive.pipe(output);
	await archive.directory(zipFolder, false);
	await archive.finalize();
}
var fileSetup = async function(fileConfig) {
	var dataPath = dataFolder + '/';
	var currentDate = getDateString(0);
		var currentTime = new Date();
		currentTime = currentTime.getTime();
	var zipName=currentTime+makeid(8);
	var filePrefix = dataFileLocation + dataPath;
	if (!fs.existsSync(filePrefix)) {
		await fs.mkdir(filePrefix);
	}
	fileConfig.zipPath = filePrefix + zipName + '.zip';
	filePrefix += zipName + '/';
	await fs.mkdir(filePrefix);
	fileConfig.filePrefix = filePrefix;
	fileConfig.zipName = zipName + '.zip';
}
var makeid= function(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
var closeFiles= async function(files)
{
	for (var key in files) {
	    await files[key].end();
	};
}
var writeDataFile = async function(data, filename, fileSuffix, files, fileConfig) {
	if (fileSuffix == null) {
		fileSuffix = '.txt';
	}
	filename = sanitize(filename);
	filename = fileConfig.filePrefix + filename + fileSuffix;
		if (!files[filename])
		{
		var wstream = fs.createWriteStream(filename);
		files[filename] = wstream;
	}
		await files[filename].write(data);		
}
var writeDataRowToFile = async function(row, map, filename, rowSplitString, fileSuffix, files, fileConfig) {
	if (fileSuffix == null) {
		fileSuffix = '.txt';
	}
	if (rowSplitString == null) {
		rowSplitString = '\t';
	}
	var headers = '';
	var splitPos = -1;
	var fileMap = {};
	filename = sanitize(filename);
	filename = fileConfig.filePrefix + filename + fileSuffix;
	if (!files[filename]) {
		var initialRow = '';
		var reverseMap = new Array(Object.keys(map).length);
		Object.keys(map).forEach(function(key) {
			reverseMap[map[key]] = key;
		});
		initialRow += reverseMap[0];
		for (var y = 1; y < reverseMap.length; y++) {
			initialRow += rowSplitString + reverseMap[y];
		}
		initialRow += '\n';
		var wstream = fs.createWriteStream(filename);
		files[filename] = wstream;
		await wstream.write(initialRow);
	}
	var csvRow = arrayToCsvString(row, rowSplitString);
	await files[filename].write(csvRow);
}

var zipFiles = async function(fileConfig) {
	await zipFolder(fileConfig.zipPath, fileConfig.filePrefix);
	fs.remove(fileConfig.filePrefix); //don't need to wait on folder to be deleted after it has been zipped
	return fileConfig.zipName;
}

var csvEscape = function(theString) {
	if (typeof(theString)!=undefined && theString!==null) {
		theString = theString + '';
	} else {
		return '';
	}
	var needToEscape = false;
	if (theString.includes("\"") || theString.includes(",") || theString.includes("\n") || theString.includes("\t")) {
		var newString = '';
		newString += '"';
		for (var x = 0; x < theString.length; x++) {
			newString += theString[x];
			if (theString[x] == '"') {
				newString += '"'; //escape double quotes this way
			}
		}

		newString += '"';
		return newString;
	} else {
		return theString
	}
}

var arrayToCsvString = function(theArray, separator) {
	var newString = '';
	if (theArray.length == 0) {
		return '';
	}
	newString += csvEscape(theArray[0]);
	for (var x = 1; x < theArray.length; x++) {
		newString += separator + csvEscape(theArray[x]);
	}
	newString += '\n';
	return newString;
}
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
