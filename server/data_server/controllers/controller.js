'use strict';
const config = require.main.require('../config'),
    mongoose = require('mongoose'),
    Data2 = require('../models/dataSchema'),
    DataRequest2 = require('../models/dataRequestSchema'),
    Study = require('../models/studySchema'), // created model loading here
    DataRequest = mongoose.model('DataRequest'),
    Data = mongoose.model('Data'),
    experimentSessionSchema2 = require('../models/experimentSessionSchema'),
    experimentSessionSchema = mongoose.model('ExperimentSession'),
    sanitize = require('sanitize-filename');
mongoose.set('strictQuery', true);
const logger = require('../../logger');

let fs = require('fs-extra');
// var convert = require('mongoose_schema-json');
const varSplit = '.';
const nullDataValue = '';
const defaultDataFilename = '_data';
const defaultValueName = 'data'; // name used for non json items in data arrays
const dataPrefix = ''; // prefix for items in the data array
const dataFileLocation = config.base_folder;
const dataFolder = config.dataFolder;
let maxRowsInMemory = config.data_rows;
if (typeof maxRowsInMemory == 'undefined') {
    maxRowsInMemory = 100000;
}


exports.insertData = function(req, res) {
    let reqBody = req.body;
    reqBody = sanitizeMongoJson(reqBody);
    let newData = new Data(reqBody);
    if (newData.sessionId < 0) {
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
    if (params.sessionId < 0) {
        return null;
    }
    let newData = new experimentSessionSchema(params);
    newData.save(function(err) {
        if (err)
            logger.error({ message: err });
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
        });
    });
};

/**
 additionalColumns: an array with strings of additional fields to include in the output
 dateSize: How to group date fields.  'day' 'month' 'year' are the options.  defaults 'day'
 **/
exports.getStatistics = async function(studyId, versionId, startDate, endDate, dateSize, additionalColumns) {
    if (typeof studyId == 'undefined' || !studyId)
        throw new Error('Error: studyId must be specified');
    let findObject = {};
    let pos = 0;
    findObject.studyId = studyId;
    if (Array.isArray(studyId)) {
        findObject.studyId = {};
        findObject.studyId.$in = studyId;
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
    if (typeof versionId !== 'undefined' && versionId) {
        if (Array.isArray(versionId)) {
            versionId.forEach(function(vId, index, versionId) {
                versionId[index] = vId.toString();
            });
            findObject.versionId = {};
            findObject.versionId.$in = versionId;
        } else {
            findObject.versionId = versionId.toString();
        }
    }
    let fieldsToFind = 'descriptiveId -_id createdDate version ';
    if (typeof dateSize == 'undefined' || dateSize != 'day' && dateSize != 'month' && dateSize != 'year') {
        dateSize = 'none';
    }
    if (additionalColumns != null) {
        additionalColumns.forEach(function(element) {
            fieldsToFind += ' ' + element;
        });
    }
    let dataMap = new Map(), currentDate = null;
    let cursor = experimentSessionSchema.find(findObject, fieldsToFind).lean().cursor({ batchSize: 10000 });
    for (let dataEntry = await cursor.next(); dataEntry != null; dataEntry = await cursor.next()) {
        if (dateSize != 'none') {
            dataEntry.createdDate = formatDate(dataEntry.createdDate, dateSize);
        } else {
            currentDate = dataEntry.createdDate;
            delete dataEntry.createdDate;
        }
        let dataHash = JSON.stringify(dataEntry).hashCode();

        if (!dataMap.has(dataHash)) {
            dataEntry['#earliest_session'] = currentDate;
            dataEntry['#latest_session'] = currentDate;
            dataEntry['#totalsessions'] = 1;
            dataMap.set(dataHash, dataEntry);
        } else {
            dataEntry = dataMap.get(dataHash);
            dataEntry['#totalsessions']++;
            if (dataEntry['#earliest_session'] > currentDate) {
                dataEntry['#earliest_session'] = currentDate;
            }
            if (dataEntry['#latest_session'] < currentDate) {
                dataEntry['#latest_session'] = currentDate;
            }
            dataMap.set(dataHash, dataEntry);
        }
    }
    let output = new Array(dataMap.size);
    pos = 0;
    for (let key of dataMap.keys()) {
        output[pos] = dataMap.get(key);
        pos++;
    }
    return output;
};


exports.getData2 = function(req, res) {
    res.send(exports.getData(req.get('studyId')));
};

exports.getData = async function (
    studyId,
    fileFormat,
    fileSplitVar,
    startDate,
    endDate,
    versionId
) {
    const debugStart = Date.now();

    function debug(label, data) {
        const elapsed = ((Date.now() - debugStart) / 1000).toFixed(2);

        if (typeof data === 'undefined') {
            console.log(`[GETDATA ${elapsed}s] ${label}`);
        } else {
            console.log(`[GETDATA ${elapsed}s] ${label}`, data);
        }
    }

    debug('========== START ==========');

    // ============================================================
    // VALIDATION
    // ============================================================

    if (typeof studyId === 'undefined' || !studyId) {
        throw new Error('Error: studyId must be specified');
    }

    let findObject = {};
    let files = {};
    let dataMaps = {};
    let rowSplitString = '\t';
    let fileSuffix = '.txt';
    let fileConfig = {};
    let dataCount = 0;
    let useDataArray = true;

    // ============================================================
    // BUILD QUERY
    // ============================================================

    findObject.studyId = studyId;

    if (Array.isArray(studyId)) {
        findObject.studyId = {
            $in: studyId
        };
    }

    if (typeof startDate !== 'undefined' && startDate) {
        findObject.createdDate = {
            $gt: new Date(startDate)
        };
    }

    if (typeof endDate !== 'undefined' && endDate) {
        if (
            typeof findObject.createdDate === 'undefined' ||
            !findObject.createdDate
        ) {
            findObject.createdDate = {};
        }

        findObject.createdDate.$lt = new Date(endDate);
    }

    if (typeof versionId !== 'undefined' && versionId) {
        if (Array.isArray(versionId)) {
            versionId.forEach(function (vId, index) {
                versionId[index] = vId.toString();
            });

            findObject.versionId = {
                $in: versionId
            };
        } else {
            // Fixed the original assignment bug
            findObject.versionId = versionId.toString();
        }
    }

    if (fileFormat === 'csv') {
        rowSplitString = ',';
        fileSuffix = '.csv';
    }

    if (fileFormat === 'tsv') {
        rowSplitString = '\t';
    }

    debug('findObject', findObject);
    debug('fileFormat', fileFormat);
    debug('fileSplitVar', fileSplitVar);
    debug('startDate', startDate);
    debug('endDate', endDate);
    debug('versionId', versionId);
    debug('maxRowsInMemory', maxRowsInMemory);

    // ============================================================
    // COUNT DOCUMENTS
    // ============================================================

    debug('COUNT: starting Data.countDocuments()');

    const dataDocumentsCount =
        await Data.countDocuments(findObject);

    debug('COUNT: Data', dataDocumentsCount);

    debug(
        'COUNT: starting experimentSessionSchema.countDocuments()'
    );

    const experimentDocumentsCount =
        await experimentSessionSchema.countDocuments(findObject);

    debug(
        'COUNT: experimentSessionSchema',
        experimentDocumentsCount
    );

    const expectedTotal =
        dataDocumentsCount + experimentDocumentsCount;

    debug('COUNT: TOTAL', expectedTotal);

    // ============================================================
    // DATA - NO CURSOR
    // ============================================================

    debug('DATA: starting find()');

    const dataDocuments = await Data
        .find(findObject)
        .sort({ _id: 1 })
        .lean();

    debug('DATA: find() finished', {
        expected: dataDocumentsCount,
        received: dataDocuments.length
    });

    if (dataDocuments.length !== dataDocumentsCount) {
        debug('WARNING: Data count mismatch', {
            countDocuments: dataDocumentsCount,
            find: dataDocuments.length
        });
    }

    // ============================================================
    // EXPERIMENT - NO CURSOR
    // ============================================================

    debug('EXPERIMENT: starting find()');

    const experimentDocuments =
        await experimentSessionSchema
            .find(findObject)
            .sort({ _id: 1 })
            .lean();

    debug('EXPERIMENT: find() finished', {
        expected: experimentDocumentsCount,
        received: experimentDocuments.length
    });

    if (
        experimentDocuments.length !==
        experimentDocumentsCount
    ) {
        debug(
            'WARNING: experiment count mismatch',
            {
                countDocuments: experimentDocumentsCount,
                find: experimentDocuments.length
            }
        );
    }

    // ============================================================
    // VERIFY TOTAL DOCUMENT COUNT
    // ============================================================

    const totalDocumentsRead =
        dataDocuments.length +
        experimentDocuments.length;

    debug('VERIFY: total documents', {
        expected: expectedTotal,
        received: totalDocumentsRead,
        difference:
            expectedTotal - totalDocumentsRead
    });

    // ============================================================
    // BUILD DATA MAPS
    // ============================================================

    debug('MAPS: starting');

    /*
     * Keep the same processing order as the original code:
     * Data documents first, followed by experiment documents.
     */
    const allDocuments = dataDocuments.concat(
        experimentDocuments
    );

    let totalMapsCreated = 0;
    let documentIndex = 0;

    for (const dataEntry of allDocuments) {
        documentIndex++;

        if (documentIndex === 1) {
            debug('MAPS: first document', {
                id: dataEntry._id
            });
        }

        if (documentIndex % 100 === 0) {
            debug('MAPS: progress', {
                documentIndex,
                totalDocuments: allDocuments.length,
                percent:
                    allDocuments.length > 0
                        ? (
                            (documentIndex /
                                allDocuments.length) *
                            100
                        ).toFixed(2)
                        : 0
            });
        }

        const newMaps =
            getInitialVarMap(dataEntry);

        if (!newMaps) {
            debug(
                'MAPS: getInitialVarMap returned empty',
                {
                    id: dataEntry._id
                }
            );

            continue;
        }

        if (typeof newMaps.length !== 'undefined') {
            totalMapsCreated += newMaps.length;
        }

        /*
         * Keep the original memory threshold logic.
         * With 901 documents and maxRowsInMemory = 100000,
         * this threshold should not be reached.
         */
        if (useDataArray) {
            dataCount++;
        }

        if (dataCount >= maxRowsInMemory) {
            debug(
                'MAPS: maxRowsInMemory reached',
                {
                    dataCount,
                    maxRowsInMemory
                }
            );

            useDataArray = false;
            dataCount = 0;
        }

        for (const newMap of newMaps) {
            updateMap(
                dataMaps,
                newMap,
                fileSplitVar
            );
        }
    }

    debug('MAPS: finished', {
        documentsProcessed: documentIndex,
        totalDocuments: allDocuments.length,
        totalMapsCreated,
        dataMapsCount: Object.keys(dataMaps).length,
        useDataArray,
        dataCount
    });

    // ============================================================
    // NO DATA CHECK
    // ============================================================

    if (Object.keys(dataMaps).length === 0) {
        throw {
            status: 500,
            message: 'ERROR: No data!'
        };
    }

    // ============================================================
    // FILE SETUP
    // ============================================================

    debug('FILE SETUP: START');

    await fileSetup(fileConfig);

    debug('FILE SETUP: DONE');

    // ============================================================
    // WRITE DATA
    // ============================================================

    debug('WRITE: START');

    let rowsWrittenAttempted = 0;
    let dataRowsGenerated = 0;
    let experimentRowsGenerated = 0;

    /*
     * We use the documents that were already loaded above.
     * There is no second database query and no cursor.
     */

    // ============================================================
    // WRITE DATA DOCUMENTS
    // ============================================================

    for (let i = 0; i < dataDocuments.length; i++) {
        const dataEntry = dataDocuments[i];

        if ((i + 1) % 100 === 0) {
            debug('WRITE DATA: progress', {
                document: i + 1,
                total: dataDocuments.length,
                rowsWrittenAttempted
            });
        }

        // ========================================================
        // JSON
        // ========================================================

        if (
            typeof fileFormat !== 'undefined' &&
            fileFormat === 'json'
        ) {
            rowsWrittenAttempted++;

            writeDataFile(
                JSON.stringify(dataEntry),
                defaultDataFilename,
                fileSuffix,
                files,
                fileConfig
            );

            continue;
        }

        // ========================================================
        // CSV / TSV
        // ========================================================

        const newMaps =
            getInitialVarMap(dataEntry);

        if (!newMaps) {
            continue;
        }

        for (const newMap of newMaps) {
            let filename = null;

            if (
                fileSplitVar == null ||
                fileSplitVar === '' ||
                newMap[fileSplitVar] == null ||
                newMap[fileSplitVar] === ''
            ) {
                filename = defaultDataFilename;
            } else {
                filename = newMap[fileSplitVar];
            }

            const dataMap = dataMaps[filename];

            if (!dataMap) {
                debug(
                    'WRITE DATA: WARNING - dataMap not found',
                    {
                        filename,
                        documentId: dataEntry._id
                    }
                );
            }

            const row = mapToRow(
                dataMap,
                newMap,
                filename
            );

            dataRowsGenerated++;
            rowsWrittenAttempted++;

            writeDataRowToFile(
                row,
                dataMap,
                filename,
                rowSplitString,
                fileSuffix,
                files,
                fileConfig
            );
        }
    }

    debug('WRITE DATA: finished', {
        documents: dataDocuments.length,
        rows: dataRowsGenerated
    });

    // ============================================================
    // WRITE EXPERIMENT DOCUMENTS
    // ============================================================

    for (
        let i = 0;
        i < experimentDocuments.length;
        i++
    ) {
        const dataEntry =
            experimentDocuments[i];

        if ((i + 1) % 100 === 0) {
            debug(
                'WRITE EXPERIMENT: progress',
                {
                    document: i + 1,
                    total: experimentDocuments.length,
                    rowsWrittenAttempted
                }
            );
        }

        // ========================================================
        // JSON
        // ========================================================

        if (
            typeof fileFormat !== 'undefined' &&
            fileFormat === 'json'
        ) {
            rowsWrittenAttempted++;

            writeDataFile(
                JSON.stringify(dataEntry),
                defaultDataFilename,
                fileSuffix,
                files,
                fileConfig
            );

            continue;
        }

        // ========================================================
        // CSV / TSV
        // ========================================================

        const newMaps =
            getInitialVarMap(dataEntry);

        if (!newMaps) {
            continue;
        }

        for (const newMap of newMaps) {
            let filename = null;

            if (
                fileSplitVar == null ||
                fileSplitVar === '' ||
                newMap[fileSplitVar] == null ||
                newMap[fileSplitVar] === ''
            ) {
                filename = defaultDataFilename;
            } else {
                filename = newMap[fileSplitVar];
            }

            const dataMap = dataMaps[filename];

            if (!dataMap) {
                debug(
                    'WRITE EXPERIMENT: WARNING - dataMap not found',
                    {
                        filename,
                        documentId: dataEntry._id
                    }
                );
            }

            const row = mapToRow(
                dataMap,
                newMap,
                filename
            );

            experimentRowsGenerated++;
            rowsWrittenAttempted++;

            writeDataRowToFile(
                row,
                dataMap,
                filename,
                rowSplitString,
                fileSuffix,
                files,
                fileConfig
            );
        }
    }

    debug('WRITE EXPERIMENT: finished', {
        documents: experimentDocuments.length,
        rows: experimentRowsGenerated
    });

    // ============================================================
    // WRITE SUMMARY
    // ============================================================

    debug('WRITE: FINISHED', {
        dataDocuments: dataDocuments.length,
        experimentDocuments: experimentDocuments.length,
        dataRowsGenerated,
        experimentRowsGenerated,
        rowsWrittenAttempted,
        files: Object.keys(files)
    });

    // ============================================================
    // CLOSE FILES
    // ============================================================

    debug('CLOSE FILES: START', {
        files: Object.keys(files),
        fileCount: Object.keys(files).length
    });

    await closeFiles(files);

    debug('CLOSE FILES: DONE');

    // ============================================================
    // ZIP
    // ============================================================

    debug('ZIP: START');

    const zipResult = await zipFiles(fileConfig);

    debug('ZIP: DONE');

    // ============================================================
    // FINAL RESULT
    // ============================================================

    debug('========== END ==========');

    debug('FINAL RESULT', {
        expectedDataDocuments:
        dataDocumentsCount,

        actualDataDocuments:
        dataDocuments.length,

        expectedExperimentDocuments:
        experimentDocumentsCount,

        actualExperimentDocuments:
        experimentDocuments.length,

        expectedTotalDocuments:
        expectedTotal,

        actualTotalDocuments:
        totalDocumentsRead,

        dataRowsGenerated,

        experimentRowsGenerated,

        rowsWrittenAttempted,

        filesCreated:
        Object.keys(files).length
    });

    return zipResult;
};


exports.getStudyDailyData = async function(study, end_date) {
    return Promise.all(study.versions.map(version => this.getDailyData(version.hash, end_date)))
        .then(versions => Object.values(versions).reduce((acc, val) => acc + val, 0))
        .then(total_data => ({ id: study._id, total_data }));
};

exports.getDailyData = async function(version_id, date) {
    let findObject = {};
    findObject.versionId = version_id;
    let start_date = new Date();
    start_date.setTime(date.getTime() - 24 * 3600000); // Yesterday!
    start_date.setHours(0, 0, 0, 0);

    let end_date = new Date();
    end_date.setTime(start_date.getTime() + 24 * 3600000); // Yesterday!
    end_date.setHours(0, 0, 0, 0);

    findObject.createdDate = {};
    findObject.createdDate.$gt = start_date;
    findObject.createdDate.$lt = end_date;
    return Data.find(findObject).then(
        docs => !docs || !docs.length ? 0 : Buffer.byteLength(JSON.stringify(docs), "utf-8")
    );
};




exports.getFirstDate = async function() {
    return Data.findOne({ sessionId: 1 })
        .then(data => data.createdDate);
};

exports.deleteData = async function(studyId, startDate, endDate, versionId) {
    if (typeof studyId == 'undefined' || !studyId)
        throw new Error('Error: studyId must be specified');
    let findObject = {};
    findObject.studyId = studyId;
    if (Array.isArray(studyId)) {
        findObject.studyId = {};
        findObject.studyId.$in = studyId;
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
    if (typeof versionId !== 'undefined' && versionId) {
        if (Array.isArray(versionId)) {
            versionId.forEach(function(vId, index, versionId) {
                versionId[index] = vId.toString();
            });
            findObject.versionId = {};
            findObject.versionId.$in = versionId;
        } else
            findObject.versionId == versionId.toString();
    }

    return Data.deleteMany(findObject);
};

let mapToRow = function(dataMap, newMap) {
    let row = new Array(Object.keys(dataMap).length);
    row.fill(nullDataValue);
    Object.keys(newMap).forEach(function(key) {
        row[dataMap[key]] = newMap[key];
    });
    return row;
};

exports.newStudyInstance = function(req, res) {
    let study = {
        studyId: req.params.studyId,
        conditions: req.params.conditions,
        userAgent: req.headers['user-agent'],
        referrer: req.header('Referer')
    };
    let newStudy = new Study(study);
    newStudy.save(function(err, study) {
        if (err)
            res.send(err);
        res.json(study);
    });
};

let getInitialVarMap = function(data) {
    let varMap = {};
    let varMaps = [];
    Object.keys(data).forEach(function(key) {
        if (key[0] == '_') {
            return varMap;
        }
        let item = data[key];
        if (key != 'data') { // TODO: what to do if collision happens
            if (varMap[key] == null) {
                varMap[key] = item;
            }
        }
    });
    let item = data.data;
    let pushVarMaps = false;
    if ((item != null && item.length > 0 && typeof item == 'object')) {
        item.forEach(function(row, index) {
            if (Object.keys(row).length > 0 && typeof row == 'object') {
                varMaps.push(getVarMap(row, dataPrefix, Object.assign({}, varMap)));
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
};

let getVarMap = function(data, prefix, map) {
    if (data == null) {
        return map;
    }
    if (Array.isArray(data)) {
        let x = 1;
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
        let item = data[key];
        if (typeof(item) == 'undefined' || item === null) {
            return;
        }

        if (Array.isArray(item)) {
            map = getVarMap(item, prefix + key + varSplit, map);
        } else {
            if (typeof item == 'object') {
                Object.keys(item).forEach(function(key2) {
                    let item2 = item[key2];
                    if (item2 !== null && typeof item2 == 'object') {
                        map = getVarMap(item[key2], prefix + key + varSplit + key2 + varSplit, map);
                    } else {
                        if (typeof(map[prefix + key + varSplit + key2]) == 'undefined' || map[prefix + key + varSplit + key2] === null) {
                            map[prefix + key + varSplit + key2] = item2;
                        }
                    }
                });
            } else {
                if (typeof(map[prefix + key]) == 'undefined' || map[prefix + key] === null) { // TODO: what to do if collision happens
                    map[prefix + key] = item;
                }
            }
        }
    });

    return map;
};

let updateMap = function(dataMaps, newMap, splitVar) {
    let filename, dataMap;
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
    let pos = Object.keys(dataMap).length;
    Object.keys(newMap).forEach(function(key) {
        if (typeof(dataMap[key]) == 'undefined' || dataMap[key] === null) {
            dataMap[key] = pos;
            pos++;
        }
    });
    dataMaps[filename] = dataMap;
};

let formatDate = function(date, dateSize) {
    let dd = date.getDate();
    let mm = date.getMonth();
    let yyyy = date.getFullYear();

    if (dateSize == 'day') {
        return dd + '.' + mm + '.' + yyyy;
    }
    if (dateSize == 'month') {
        return mm + '.' + yyyy;
    }
    if (dateSize == 'year') {
        return '' + yyyy;
    }
};

let zipFolder = async function(zipPath, zipFolderPath) {
    // Dynamic import for zip-a-folder (ESM module)
    const { zip } = await import('zip-a-folder');

    // zip-a-folder naturally returns a Promise and awaits completion
    await zip(zipFolderPath, zipPath);
};

let fileSetup = async function(fileConfig) {
    let dataPath = dataFolder + '/';
    let currentTime = new Date();
    currentTime = currentTime.getTime();
    let zipName = currentTime + makeid(8);
    let filePrefix = dataFileLocation + dataPath;
    if (!fs.existsSync(filePrefix)) {
        await fs.mkdir(filePrefix);
    }
    fileConfig.zipPath = filePrefix + zipName + '.zip';
    filePrefix += zipName + '/';
    await fs.mkdir(filePrefix);
    fileConfig.filePrefix = filePrefix;
    fileConfig.zipName = zipName + '.zip';
};

let makeid = function(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

let closeFiles = async function(files) {
    for (let key in files) {
        await files[key].end();
    }
};

let writeDataFile = async function(data, filename, fileSuffix, files, fileConfig) {
    if (fileSuffix == null) {
        fileSuffix = '.txt';
    }
    filename = sanitize(filename);
    filename = fileConfig.filePrefix + filename + fileSuffix;
    if (!files[filename]) {
        let wstream = fs.createWriteStream(filename);
        files[filename] = wstream;
    }
    await files[filename].write(data);
};

let writeDataRowToFile = async function(row, map, filename, rowSplitString, fileSuffix, files, fileConfig) {
    if (fileSuffix == null) {
        fileSuffix = '.txt';
    }
    if (rowSplitString == null) {
        rowSplitString = '\t';
    }
    filename = sanitize(filename);
    filename = fileConfig.filePrefix + filename + fileSuffix;
    if (!files[filename]) {
        let initialRow = '';
        let reverseMap = new Array(Object.keys(map).length);
        Object.keys(map).forEach(function(key) {
            reverseMap[map[key]] = key;
        });
        initialRow += reverseMap[0];
        for (let y = 1; y < reverseMap.length; y++) {
            initialRow += rowSplitString + reverseMap[y];
        }
        initialRow += '\n';
        let wstream = fs.createWriteStream(filename);
        files[filename] = wstream;
        await wstream.write(initialRow);
    }
    let csvRow = arrayToCsvString(row, rowSplitString);
    await files[filename].write(csvRow);
};

let zipFiles = async function(fileConfig) {
    await zipFolder(fileConfig.zipPath, fileConfig.filePrefix);
    fs.remove(fileConfig.filePrefix); // don't need to wait on folder to be deleted after it has been zipped
    return fileConfig.zipName;
};

let csvEscape = function(theString) {
    if (typeof(theString) != undefined && theString !== null) {
        theString = theString + '';
    } else {
        return '';
    }
    if (theString.includes('"') || theString.includes(',') || theString.includes('\n') || theString.includes('\t')) {
        let newString = '';
        newString += '"';
        for (let x = 0; x < theString.length; x++) {
            newString += theString[x];
            if (theString[x] == '"') {
                newString += '"'; // escape double quotes this way
            }
        }

        newString += '"';
        return newString;
    } else {
        return theString;
    }
};

let arrayToCsvString = function(theArray, separator) {
    let newString = '';
    if (theArray.length == 0) {
        return '';
    }
    newString += csvEscape(theArray[0]);
    for (let x = 1; x < theArray.length; x++) {
        newString += separator + csvEscape(theArray[x]);
    }
    newString += '\n';
    return newString;
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

String.prototype.hashCode = function() {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};