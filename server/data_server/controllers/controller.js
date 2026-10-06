'use strict';

const config = require.main.require('../config'),
    mongoose = require('mongoose'),
    Data2 = require('../models/dataSchema'),
    DataRequest2 = require('../models/dataRequestSchema'),
    Study = require('../models/studySchema'),
    DataRequest = mongoose.model('DataRequest'),
    Data = mongoose.model('Data'),
    experimentSessionSchema2 = require('../models/experimentSessionSchema'),
    experimentSessionSchema = mongoose.model('ExperimentSession'),
    sanitize = require('sanitize-filename');

mongoose.set('strictQuery', true);

const logger = require('../../logger');

let fs = require('fs-extra');

const varSplit = '.';
const nullDataValue = '';
const defaultDataFilename = '_data';
const defaultValueName = 'data';
const dataPrefix = '';
const dataFileLocation = config.base_folder;
const dataFolder = config.dataFolder;

let maxRowsInMemory = config.data_rows;

if (typeof maxRowsInMemory === 'undefined') {
    maxRowsInMemory = 100000;
}


/*
 * --------------------------------------------------------------------------
 * INSERT DATA
 * --------------------------------------------------------------------------
 */

exports.insertData = function(req, res) {
    let reqBody = req.body;

    reqBody = sanitizeMongoJson(reqBody);

    let newData = new Data(reqBody);

    if (newData.sessionId < 0) {
        res.json('{message:"data not saved due to negative sessionID"}');
        return;
    }

    newData.save(function(err, data) {
        if (err) {
            res.send(err);
            return;
        }

        res.json(data);
    });
};


exports.insertExperimentSession = async function(params) {
    if (params.sessionId < 0) {
        return null;
    }

    let newData = new experimentSessionSchema(params);

    newData.save(function(err) {
        if (err) {
            logger.error({
                message: err
            });
        }

        return true;
    });
};


/*
 * --------------------------------------------------------------------------
 * DOWNLOAD REQUESTS
 * --------------------------------------------------------------------------
 */

exports.getDownloadRequests = function(studyIds) {
    return new Promise(function(resolve, reject) {
        DataRequest.find(
            {
                requestId: {
                    $in: studyIds
                }
            },
            (err, dataRequests) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dataRequests);
                }
            }
        );
    });
};


/*
 * --------------------------------------------------------------------------
 * STATISTICS
 * --------------------------------------------------------------------------
 */

exports.getStatistics = async function(
    studyId,
    versionId,
    startDate,
    endDate,
    dateSize,
    additionalColumns
) {
    if (typeof studyId === 'undefined' || !studyId) {
        throw new Error('Error: studyId must be specified');
    }

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
            versionId.forEach(function(vId, index) {
                versionId[index] = vId.toString();
            });

            findObject.versionId = {
                $in: versionId
            };
        } else {
            findObject.versionId = versionId.toString();
        }
    }

    let fieldsToFind =
        'descriptiveId -_id createdDate version ';

    if (
        typeof dateSize === 'undefined' ||
        (
            dateSize !== 'day' &&
            dateSize !== 'month' &&
            dateSize !== 'year'
        )
    ) {
        dateSize = 'none';
    }

    if (additionalColumns != null) {
        additionalColumns.forEach(function(element) {
            fieldsToFind += ' ' + element;
        });
    }

    let dataMap = new Map();
    let currentDate = null;

    let cursor = experimentSessionSchema
        .find(findObject, fieldsToFind)
        .lean()
        .cursor({
            batchSize: 10000
        });

    for (
        let dataEntry = await cursor.next();
        dataEntry != null;
        dataEntry = await cursor.next()
    ) {
        if (dateSize !== 'none') {
            dataEntry.createdDate = formatDate(
                dataEntry.createdDate,
                dateSize
            );
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

            if (
                dataEntry['#earliest_session'] >
                currentDate
            ) {
                dataEntry['#earliest_session'] = currentDate;
            }

            if (
                dataEntry['#latest_session'] <
                currentDate
            ) {
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


/*
 * --------------------------------------------------------------------------
 * GET DATA
 * --------------------------------------------------------------------------
 */

exports.getData2 = function(req, res) {
    res.send(exports.getData(req.get('studyId')));
};


exports.getData = async function(
    studyId,
    fileFormat,
    fileSplitVar,
    startDate,
    endDate,
    versionId
) {
    const startTime = Date.now();

    function elapsed() {
        return (
            (Date.now() - startTime) / 1000
        ).toFixed(2) + 's';
    }

    function log(message, data) {
        if (typeof data !== 'undefined') {
            console.log(
                `[GETDATA ${elapsed()}] ${message}`,
                data
            );
        } else {
            console.log(
                `[GETDATA ${elapsed()}] ${message}`
            );
        }
    }

    log('========== START ==========');

    if (typeof studyId === 'undefined' || !studyId) {
        throw new Error(
            'Error: studyId must be specified'
        );
    }

    let findObject = {};
    let files = {};
    let dataMaps = {};
    let rowSplitString = '\t';
    let fileSuffix = '.txt';
    let fileConfig = {};
    let dataCount = 0;
    let useDataArray = true;

    findObject.studyId = studyId;

    if (Array.isArray(studyId)) {
        findObject.studyId = {
            $in: studyId
        };
    }

    if (
        typeof startDate !== 'undefined' &&
        startDate
    ) {
        findObject.createdDate = {
            $gt: new Date(startDate)
        };
    }

    if (
        typeof endDate !== 'undefined' &&
        endDate
    ) {
        if (
            typeof findObject.createdDate === 'undefined' ||
            !findObject.createdDate
        ) {
            findObject.createdDate = {};
        }

        findObject.createdDate.$lt =
            new Date(endDate);
    }

    if (
        typeof versionId !== 'undefined' &&
        versionId
    ) {
        if (Array.isArray(versionId)) {
            versionId.forEach(function(vId, index) {
                versionId[index] = vId.toString();
            });

            findObject.versionId = {
                $in: versionId
            };
        } else {
            findObject.versionId =
                versionId.toString();
        }
    }

    if (fileFormat === 'csv') {
        rowSplitString = ',';
        fileSuffix = '.csv';
    }

    if (fileFormat === 'tsv') {
        rowSplitString = '\t';
    }

    log('findObject', findObject);
    log('fileFormat', fileFormat);
    log('fileSplitVar', fileSplitVar);
    log('startDate', startDate);
    log('endDate', endDate);
    log('versionId', versionId);
    log('maxRowsInMemory', maxRowsInMemory);


    /*
     * ----------------------------------------------------------------------
     * COUNT DOCUMENTS
     * ----------------------------------------------------------------------
     */

    log('COUNT: starting Data.countDocuments()');

    const dataDocumentsCount =
        await Data.countDocuments(findObject);

    log(
        'COUNT: Data',
        dataDocumentsCount
    );

    log(
        'COUNT: starting experimentSessionSchema.countDocuments()'
    );

    const experimentDocumentsCount =
        await experimentSessionSchema.countDocuments(
            findObject
        );

    log(
        'COUNT: experimentSessionSchema',
        experimentDocumentsCount
    );

    const expectedTotal =
        dataDocumentsCount +
        experimentDocumentsCount;

    log(
        'COUNT: TOTAL',
        expectedTotal
    );


    /*
     * ----------------------------------------------------------------------
     * MEMORY ARRAY
     * ----------------------------------------------------------------------
     */

    let newMapArray =
        new Array(maxRowsInMemory);


    /*
     * ----------------------------------------------------------------------
     * DATA COLLECTION
     * ----------------------------------------------------------------------
     */

    log('DATA: creating cursor');

    let cursor = Data
        .find(findObject)
        .lean()
        .cursor({
            batchSize: 10000
        });

    log('DATA: cursor created');

    let dataDocumentsRead = 0;
    let dataMapsCreated = 0;

    for (
        let dataEntry = await cursor.next();
        dataEntry != null;
        dataEntry = await cursor.next()
    ) {
        dataDocumentsRead++;

        if (dataDocumentsRead === 1) {
            log(
                'DATA: first document received',
                {
                    id: dataEntry._id
                }
            );
        }

        const newMaps =
            getInitialVarMap(dataEntry);

        if (Array.isArray(newMaps)) {
            dataMapsCreated += newMaps.length;
        }

        if (useDataArray) {
            newMapArray[dataCount] =
                newMaps;

            dataCount++;
        }

        if (
            dataCount >= maxRowsInMemory
        ) {
            useDataArray = false;
            dataCount = 0;
            newMapArray = [];
        }

        newMaps.forEach(function(newMap) {
            updateMap(
                dataMaps,
                newMap,
                fileSplitVar
            );
        });
    }

    log(
        'DATA: cursor finished',
        {
            documentsRead:
            dataDocumentsRead,

            expectedDocuments:
            dataDocumentsCount,

            difference:
                dataDocumentsCount -
                dataDocumentsRead,

            dataMapsCreated:
            dataMapsCreated,

            dataMapsKeys:
            Object.keys(dataMaps).length,

            useDataArray:
            useDataArray,

            dataCount:
            dataCount
        }
    );


    /*
     * ----------------------------------------------------------------------
     * EXPERIMENT SESSION COLLECTION
     * ----------------------------------------------------------------------
     */

    log(
        'EXPERIMENT: creating cursor'
    );

    cursor =
        experimentSessionSchema
            .find(findObject)
            .lean()
            .cursor({
                batchSize: 10000
            });

    log(
        'EXPERIMENT: cursor created'
    );

    let experimentDocumentsRead = 0;
    let experimentMapsCreated = 0;

    for (
        let dataEntry = await cursor.next();
        dataEntry != null;
        dataEntry = await cursor.next()
    ) {
        experimentDocumentsRead++;

        if (
            experimentDocumentsRead === 1
        ) {
            log(
                'EXPERIMENT: first document received',
                {
                    id: dataEntry._id
                }
            );
        }

        const newMaps =
            getInitialVarMap(dataEntry);

        if (Array.isArray(newMaps)) {
            experimentMapsCreated +=
                newMaps.length;
        }

        if (useDataArray) {
            newMapArray[dataCount] =
                newMaps;

            dataCount++;
        }

        if (
            dataCount >= maxRowsInMemory
        ) {
            useDataArray = false;
            dataCount = 0;
            newMapArray = [];
        }

        newMaps.forEach(function(newMap) {
            updateMap(
                dataMaps,
                newMap,
                fileSplitVar
            );
        });
    }

    log(
        'EXPERIMENT: cursor finished',
        {
            documentsRead:
            experimentDocumentsRead,

            expectedDocuments:
            experimentDocumentsCount,

            difference:
                experimentDocumentsCount -
                experimentDocumentsRead,

            experimentMapsCreated:
            experimentMapsCreated,

            dataMapsKeys:
            Object.keys(dataMaps).length,

            useDataArray:
            useDataArray,

            dataCount:
            dataCount
        }
    );


    /*
     * ----------------------------------------------------------------------
     * VERIFICATION
     * ----------------------------------------------------------------------
     */

    log(
        'VERIFY: document counts',
        {
            Data: {
                expected:
                dataDocumentsCount,

                read:
                dataDocumentsRead,

                difference:
                    dataDocumentsCount -
                    dataDocumentsRead
            },

            experimentSessionSchema: {
                expected:
                experimentDocumentsCount,

                read:
                experimentDocumentsRead,

                difference:
                    experimentDocumentsCount -
                    experimentDocumentsRead
            },

            total: {
                expected:
                expectedTotal,

                read:
                    dataDocumentsRead +
                    experimentDocumentsRead,

                difference:
                    expectedTotal -
                    (
                        dataDocumentsRead +
                        experimentDocumentsRead
                    )
            }
        }
    );

    log(
        'DATA MAPS:',
        {
            count:
            Object.keys(dataMaps).length,

            keys:
                Object.keys(dataMaps)
        }
    );

    if (
        Object.keys(dataMaps).length === 0
    ) {
        throw {
            status: 500,
            message: 'ERROR: No data!'
        };
    }


    /*
     * ----------------------------------------------------------------------
     * FILE SETUP
     * ----------------------------------------------------------------------
     */

    log('FILE SETUP: START');

    await fileSetup(fileConfig);

    log('FILE SETUP: DONE');


    /*
     * ----------------------------------------------------------------------
     * WRITE DATA
     * ----------------------------------------------------------------------
     */

    let rowsWrittenAttempted = 0;

    log(
        'WRITE: START',
        {
            useDataArray:
            useDataArray,

            dataCount:
            dataCount,

            format:
            fileFormat
        }
    );


    /*
     * ----------------------------------------------------------------------
     * MEMORY WRITE PATH
     * ----------------------------------------------------------------------
     */

    if (
        useDataArray &&
        typeof fileFormat !== 'undefined' &&
        fileFormat !== 'json'
    ) {
        log(
            'WRITE: using memory array'
        );

        for (
            let x = 0;
            x < dataCount;
            x++
        ) {
            const newMaps =
                newMapArray[x];

            if (!newMaps) {
                continue;
            }

            for (
                const newMap of newMaps
                ) {
                let filename = null;

                if (
                    fileSplitVar == null ||
                    fileSplitVar === '' ||
                    newMap[fileSplitVar] == null ||
                    newMap[fileSplitVar] === ''
                ) {
                    filename =
                        defaultDataFilename;
                } else {
                    filename =
                        newMap[fileSplitVar];
                }

                const dataMap =
                    dataMaps[filename];

                if (!dataMap) {
                    logger.error({
                        message:
                            'Missing dataMap',

                        filename:
                        filename,

                        newMap:
                        newMap
                    });

                    continue;
                }

                const row =
                    mapToRow(
                        dataMap,
                        newMap
                    );

                writeDataRowToFile(
                    row,
                    dataMap,
                    filename,
                    rowSplitString,
                    fileSuffix,
                    files,
                    fileConfig
                );

                rowsWrittenAttempted++;

                if (
                    rowsWrittenAttempted %
                    1000 === 0
                ) {
                    log(
                        'WRITE: progress',
                        {
                            rowsWrittenAttempted:
                            rowsWrittenAttempted
                        }
                    );
                }
            }
        }
    } else {


        /*
         * ------------------------------------------------------------------
         * SECOND PASS
         * ------------------------------------------------------------------
         */

        log(
            'WRITE: using second database pass'
        );


        /*
         * DATA
         */

        cursor = Data
            .find(findObject)
            .lean()
            .cursor({
                batchSize: 10000
            });

        let secondPassDataDocumentsRead = 0;

        for (
            let dataEntry = await cursor.next();
            dataEntry != null;
            dataEntry = await cursor.next()
        ) {
            secondPassDataDocumentsRead++;

            if (
                typeof fileFormat !== 'undefined' &&
                fileFormat === 'json'
            ) {
                writeDataFile(
                    JSON.stringify(dataEntry),
                    defaultDataFilename,
                    fileSuffix,
                    files,
                    fileConfig
                );

                rowsWrittenAttempted++;

                continue;
            }

            const newMaps =
                getInitialVarMap(
                    dataEntry
                );

            for (
                const newMap of newMaps
                ) {
                let filename = null;

                if (
                    fileSplitVar == null ||
                    fileSplitVar === '' ||
                    newMap[fileSplitVar] == null ||
                    newMap[fileSplitVar] === ''
                ) {
                    filename =
                        defaultDataFilename;
                } else {
                    filename =
                        newMap[fileSplitVar];
                }

                const dataMap =
                    dataMaps[filename];

                if (!dataMap) {
                    logger.error({
                        message:
                            'Missing dataMap',

                        filename:
                        filename,

                        newMap:
                        newMap
                    });

                    continue;
                }

                const row =
                    mapToRow(
                        dataMap,
                        newMap
                    );

                writeDataRowToFile(
                    row,
                    dataMap,
                    filename,
                    rowSplitString,
                    fileSuffix,
                    files,
                    fileConfig
                );

                rowsWrittenAttempted++;

                if (
                    rowsWrittenAttempted %
                    1000 === 0
                ) {
                    log(
                        'WRITE: progress',
                        {
                            rowsWrittenAttempted:
                            rowsWrittenAttempted
                        }
                    );
                }
            }
        }

        log(
            'WRITE: second Data pass finished',
            {
                documentsRead:
                secondPassDataDocumentsRead
            }
        );


        /*
         * EXPERIMENT SESSION
         */

        cursor =
            experimentSessionSchema
                .find(findObject)
                .lean()
                .cursor({
                    batchSize: 10000
                });

        let secondPassExperimentDocumentsRead = 0;

        for (
            let dataEntry = await cursor.next();
            dataEntry != null;
            dataEntry = await cursor.next()
        ) {
            secondPassExperimentDocumentsRead++;

            if (
                typeof fileFormat !== 'undefined' &&
                fileFormat === 'json'
            ) {
                writeDataFile(
                    JSON.stringify(dataEntry),
                    defaultDataFilename,
                    fileSuffix,
                    files,
                    fileConfig
                );

                rowsWrittenAttempted++;

                continue;
            }

            const newMaps =
                getInitialVarMap(
                    dataEntry
                );

            for (
                const newMap of newMaps
                ) {
                let filename = null;

                if (
                    fileSplitVar == null ||
                    fileSplitVar === '' ||
                    newMap[fileSplitVar] == null ||
                    newMap[fileSplitVar] === ''
                ) {
                    filename =
                        defaultDataFilename;
                } else {
                    filename =
                        newMap[fileSplitVar];
                }

                const dataMap =
                    dataMaps[filename];

                if (!dataMap) {
                    logger.error({
                        message:
                            'Missing dataMap',

                        filename:
                        filename,

                        newMap:
                        newMap
                    });

                    continue;
                }

                const row =
                    mapToRow(
                        dataMap,
                        newMap
                    );

                writeDataRowToFile(
                    row,
                    dataMap,
                    filename,
                    rowSplitString,
                    fileSuffix,
                    files,
                    fileConfig
                );

                rowsWrittenAttempted++;

                if (
                    rowsWrittenAttempted %
                    1000 === 0
                ) {
                    log(
                        'WRITE: progress',
                        {
                            rowsWrittenAttempted:
                            rowsWrittenAttempted
                        }
                    );
                }
            }
        }

        log(
            'WRITE: second experiment pass finished',
            {
                documentsRead:
                secondPassExperimentDocumentsRead
            }
        );
    }


    log(
        'WRITE: FINISHED',
        {
            rowsWrittenAttempted:
            rowsWrittenAttempted,

            filesOpened:
            Object.keys(files).length,

            files:
                Object.keys(files)
        }
    );


    /*
     * ----------------------------------------------------------------------
     * CLOSE FILES
     * ----------------------------------------------------------------------
     */

    log(
        'CLOSE FILES: START',
        {
            files:
            Object.keys(files).length
        }
    );

    await closeFiles(files);

    log(
        'CLOSE FILES: DONE'
    );


    /*
     * ----------------------------------------------------------------------
     * FINAL VERIFICATION
     * ----------------------------------------------------------------------
     */

    const totalDocumentsRead =
        dataDocumentsRead +
        experimentDocumentsRead;

    log(
        'FINAL:',
        {
            dataDocumentsCount:
            dataDocumentsCount,

            experimentDocumentsCount:
            experimentDocumentsCount,

            expectedTotal:
            expectedTotal,

            dataDocumentsRead:
            dataDocumentsRead,

            experimentDocumentsRead:
            experimentDocumentsRead,

            totalDocumentsRead:
            totalDocumentsRead,

            rowsWrittenAttempted:
            rowsWrittenAttempted,

            filesCreated:
            Object.keys(files).length,

            dataMaps:
            Object.keys(dataMaps).length
        }
    );

    if (totalDocumentsRead === 0) {
        throw {
            status: 500,
            message: 'ERROR: No data!'
        };
    }


    /*
     * ----------------------------------------------------------------------
     * ZIP
     * ----------------------------------------------------------------------
     */

    log('ZIP: START');

    const zipResult =
        await zipFiles(fileConfig);

    log('ZIP: DONE');

    log('========== END ==========');

    return zipResult;
};


/*
 * --------------------------------------------------------------------------
 * OTHER DATA FUNCTIONS
 * --------------------------------------------------------------------------
 */

exports.getStudyDailyData = async function(
    study,
    end_date
) {
    return Promise.all(
        study.versions.map(
            version =>
                this.getDailyData(
                    version.hash,
                    end_date
                )
        )
    )
        .then(
            versions =>
                Object.values(versions)
                    .reduce(
                        (acc, val) => acc + val,
                        0
                    )
        )
        .then(
            total_data => ({
                id: study._id,
                total_data
            })
        );
};


exports.getDailyData = async function(
    version_id,
    date
) {
    let findObject = {};

    findObject.versionId =
        version_id;

    let start_date = new Date();

    start_date.setTime(
        date.getTime() -
        24 * 3600000
    );

    start_date.setHours(
        0,
        0,
        0,
        0
    );

    let end_date = new Date();

    end_date.setTime(
        start_date.getTime() +
        24 * 3600000
    );

    end_date.setHours(
        0,
        0,
        0,
        0
    );

    findObject.createdDate = {};

    findObject.createdDate.$gt =
        start_date;

    findObject.createdDate.$lt =
        end_date;

    return Data.find(findObject).then(
        docs =>
            !docs || !docs.length
                ? 0
                : Buffer.byteLength(
                    JSON.stringify(docs),
                    'utf-8'
                )
    );
};


exports.getFirstDate = async function() {
    return Data.findOne({
        sessionId: 1
    })
        .then(
            data => data.createdDate
        );
};


exports.deleteData = async function(
    studyId,
    startDate,
    endDate,
    versionId
) {
    if (
        typeof studyId === 'undefined' ||
        !studyId
    ) {
        throw new Error(
            'Error: studyId must be specified'
        );
    }

    let findObject = {};

    findObject.studyId =
        studyId;

    if (Array.isArray(studyId)) {
        findObject.studyId = {
            $in: studyId
        };
    }

    if (
        typeof startDate !== 'undefined' &&
        startDate
    ) {
        findObject.createdDate = {};

        findObject.createdDate.$gt =
            new Date(startDate);
    }

    if (
        typeof endDate !== 'undefined' &&
        endDate
    ) {
        if (
            typeof findObject.createdDate === 'undefined' ||
            !findObject.createdDate
        ) {
            findObject.createdDate = {};
        }

        findObject.createdDate.$lt =
            new Date(endDate);
    }

    if (
        typeof versionId !== 'undefined' &&
        versionId
    ) {
        if (Array.isArray(versionId)) {
            versionId.forEach(function(vId, index) {
                versionId[index] =
                    vId.toString();
            });

            findObject.versionId = {
                $in: versionId
            };
        } else {
            findObject.versionId =
                versionId.toString();
        }
    }

    return Data.deleteMany(
        findObject
    );
};


/*
 * --------------------------------------------------------------------------
 * MAP FUNCTIONS
 * --------------------------------------------------------------------------
 */

let mapToRow = function(
    dataMap,
    newMap
) {
    let row =
        new Array(
            Object.keys(dataMap).length
        );

    row.fill(nullDataValue);

    Object.keys(newMap).forEach(
        function(key) {
            row[dataMap[key]] =
                newMap[key];
        }
    );

    return row;
};


let getInitialVarMap = function(data) {
    let varMap = {};
    let varMaps = [];

    Object.keys(data).forEach(
        function(key) {
            if (key[0] === '_') {
                return;
            }

            let item = data[key];

            if (key !== 'data') {
                if (varMap[key] == null) {
                    varMap[key] = item;
                }
            }
        }
    );

    let item = data.data;
    let pushVarMaps = false;

    if (
        item != null &&
        item.length > 0 &&
        typeof item === 'object'
    ) {
        item.forEach(
            function(row, index) {
                if (
                    Object.keys(row).length > 0 &&
                    typeof row === 'object'
                ) {
                    varMaps.push(
                        getVarMap(
                            row,
                            dataPrefix,
                            Object.assign(
                                {},
                                varMap
                            )
                        )
                    );
                } else {
                    if (
                        varMap[
                        defaultValueName +
                        varSplit +
                        index
                            ] == null
                    ) {
                        varMap[
                        defaultValueName +
                        varSplit +
                        index
                            ] = row;

                        pushVarMaps = true;
                    }
                }
            }
        );
    } else {
        varMap[defaultValueName] =
            item;

        pushVarMaps = true;
    }

    if (pushVarMaps) {
        varMaps.push(varMap);
    }

    return varMaps;
};


let getVarMap = function(
    data,
    prefix,
    map
) {
    if (data == null) {
        return map;
    }

    if (Array.isArray(data)) {
        let x = 1;

        data.forEach(
            function(row) {
                if (
                    Object.keys(row).length > 0 &&
                    typeof row === 'object'
                ) {
                    map =
                        getVarMap(
                            row,
                            prefix +
                            x +
                            varSplit,
                            map
                        );
                } else {
                    if (
                        map[
                        prefix + x
                            ] == null
                    ) {
                        map[
                        prefix + x
                            ] = row;
                    }
                }

                x++;
            }
        );

        return map;
    }

    Object.keys(data).forEach(
        function(key) {
            let item = data[key];

            if (
                typeof item === 'undefined' ||
                item === null
            ) {
                return;
            }

            if (Array.isArray(item)) {
                map =
                    getVarMap(
                        item,
                        prefix +
                        key +
                        varSplit,
                        map
                    );
            } else {
                if (
                    typeof item === 'object'
                ) {
                    Object.keys(item).forEach(
                        function(key2) {
                            let item2 =
                                item[key2];

                            if (
                                item2 !== null &&
                                typeof item2 === 'object'
                            ) {
                                map =
                                    getVarMap(
                                        item[key2],
                                        prefix +
                                        key +
                                        varSplit +
                                        key2 +
                                        varSplit,
                                        map
                                    );
                            } else {
                                if (
                                    typeof map[
                                    prefix +
                                    key +
                                    varSplit +
                                    key2
                                        ] === 'undefined' ||
                                    map[
                                    prefix +
                                    key +
                                    varSplit +
                                    key2
                                        ] === null
                                ) {
                                    map[
                                    prefix +
                                    key +
                                    varSplit +
                                    key2
                                        ] = item2;
                                }
                            }
                        }
                    );
                } else {
                    if (
                        typeof map[
                        prefix +
                        key
                            ] === 'undefined' ||
                        map[
                        prefix +
                        key
                            ] === null
                    ) {
                        map[
                        prefix +
                        key
                            ] = item;
                    }
                }
            }
        }
    );

    return map;
};


let updateMap = function(
    dataMaps,
    newMap,
    splitVar
) {
    let filename;
    let dataMap;

    if (
        !splitVar ||
        splitVar === '' ||
        newMap[splitVar] == null ||
        newMap[splitVar] === ''
    ) {
        filename =
            defaultDataFilename;
    } else {
        filename =
            newMap[splitVar];
    }

    if (
        dataMaps[filename] == null
    ) {
        dataMap = {};
    } else {
        dataMap =
            dataMaps[filename];
    }

    let pos =
        Object.keys(dataMap).length;

    Object.keys(newMap).forEach(
        function(key) {
            if (
                typeof dataMap[key] === 'undefined' ||
                dataMap[key] === null
            ) {
                dataMap[key] = pos;
                pos++;
            }
        }
    );

    dataMaps[filename] =
        dataMap;
};


/*
 * --------------------------------------------------------------------------
 * DATE
 * --------------------------------------------------------------------------
 */

let formatDate = function(
    date,
    dateSize
) {
    let dd = date.getDate();
    let mm = date.getMonth();
    let yyyy = date.getFullYear();

    if (dateSize === 'day') {
        return (
            dd +
            '.' +
            mm +
            '.' +
            yyyy
        );
    }

    if (dateSize === 'month') {
        return (
            mm +
            '.' +
            yyyy
        );
    }

    if (dateSize === 'year') {
        return '' + yyyy;
    }
};


/*
 * --------------------------------------------------------------------------
 * ZIP / FILE SETUP
 * --------------------------------------------------------------------------
 */

let zipFolder = async function(
    zipPath,
    zipFolderPath
) {
    const {
        zip
    } = await import(
        'zip-a-folder'
        );

    await zip(
        zipFolderPath,
        zipPath
    );
};


let fileSetup = async function(
    fileConfig
) {
    let dataPath =
        dataFolder + '/';

    let currentTime =
        new Date();

    currentTime =
        currentTime.getTime();

    let zipName =
        currentTime +
        makeid(8);

    let filePrefix =
        dataFileLocation +
        dataPath;

    if (
        !fs.existsSync(filePrefix)
    ) {
        await fs.mkdir(
            filePrefix
        );
    }

    fileConfig.zipPath =
        filePrefix +
        zipName +
        '.zip';

    filePrefix +=
        zipName + '/';

    await fs.mkdir(
        filePrefix
    );

    fileConfig.filePrefix =
        filePrefix;

    fileConfig.zipName =
        zipName + '.zip';
};


let makeid = function(length) {
    let text = '';

    let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (
        let i = 0;
        i < length;
        i++
    ) {
        text +=
            possible.charAt(
                Math.floor(
                    Math.random() *
                    possible.length
                )
            );
    }

    return text;
};


/*
 * --------------------------------------------------------------------------
 * FILE WRITING
 * --------------------------------------------------------------------------
 *
 * IMPORTANT:
 *
 * stream.write() does not return a Promise.
 * stream.end() does not return a Promise.
 *
 * Therefore we do not use:
 *
 *     await stream.write(...)
 *
 * or:
 *
 *     await stream.end()
 *
 * Instead, closeFiles waits for the "finish" event.
 */

let writeDataFile = function(
    data,
    filename,
    fileSuffix,
    files,
    fileConfig
) {
    if (fileSuffix == null) {
        fileSuffix = '.txt';
    }

    filename =
        sanitize(filename);

    filename =
        fileConfig.filePrefix +
        filename +
        fileSuffix;

    if (!files[filename]) {
        let wstream =
            fs.createWriteStream(
                filename
            );

        wstream.on(
            'error',
            function(err) {
                logger.error({
                    message:
                        'File write error',

                    filename:
                    filename,

                    error:
                    err
                });
            }
        );

        files[filename] =
            wstream;
    }

    files[filename].write(
        data
    );
};


let writeDataRowToFile = function(
    row,
    map,
    filename,
    rowSplitString,
    fileSuffix,
    files,
    fileConfig
) {
    if (fileSuffix == null) {
        fileSuffix = '.txt';
    }

    if (rowSplitString == null) {
        rowSplitString = '\t';
    }

    filename =
        sanitize(filename);

    filename =
        fileConfig.filePrefix +
        filename +
        fileSuffix;

    if (!files[filename]) {
        let initialRow = '';

        let reverseMap =
            new Array(
                Object.keys(map).length
            );

        Object.keys(map).forEach(
            function(key) {
                reverseMap[map[key]] =
                    key;
            }
        );

        initialRow +=
            reverseMap[0];

        for (
            let y = 1;
            y < reverseMap.length;
            y++
        ) {
            initialRow +=
                rowSplitString +
                reverseMap[y];
        }

        initialRow += '\n';

        let wstream =
            fs.createWriteStream(
                filename
            );

        wstream.on(
            'error',
            function(err) {
                logger.error({
                    message:
                        'File write error',

                    filename:
                    filename,

                    error:
                    err
                });
            }
        );

        files[filename] =
            wstream;

        wstream.write(
            initialRow
        );
    }

    let csvRow =
        arrayToCsvString(
            row,
            rowSplitString
        );

    files[filename].write(
        csvRow
    );
};


/*
 * --------------------------------------------------------------------------
 * CLOSE FILES
 * --------------------------------------------------------------------------
 */

let closeFiles = async function(
    files
) {
    const closePromises = [];

    for (
        let key in files
        ) {
        const stream =
            files[key];

        closePromises.push(
            new Promise(
                function(resolve, reject) {
                    let settled = false;

                    function cleanup() {
                        stream.removeListener(
                            'finish',
                            onFinish
                        );

                        stream.removeListener(
                            'error',
                            onError
                        );
                    }

                    function onFinish() {
                        if (settled) {
                            return;
                        }

                        settled = true;

                        cleanup();

                        resolve();
                    }

                    function onError(err) {
                        if (settled) {
                            return;
                        }

                        settled = true;

                        cleanup();

                        reject(err);
                    }

                    stream.once(
                        'finish',
                        onFinish
                    );

                    stream.once(
                        'error',
                        onError
                    );

                    stream.end();
                }
            )
        );
    }

    await Promise.all(
        closePromises
    );
};


/*
 * --------------------------------------------------------------------------
 * ZIP
 * --------------------------------------------------------------------------
 */

let zipFiles = async function(
    fileConfig
) {
    await zipFolder(
        fileConfig.zipPath,
        fileConfig.filePrefix
    );

    await fs.remove(
        fileConfig.filePrefix
    );

    return fileConfig.zipName;
};


/*
 * --------------------------------------------------------------------------
 * CSV
 * --------------------------------------------------------------------------
 */

let csvEscape = function(
    theString
) {
    if (
        typeof theString !== 'undefined' &&
        theString !== null
    ) {
        theString =
            theString + '';
    } else {
        return '';
    }

    if (
        theString.includes('"') ||
        theString.includes(',') ||
        theString.includes('\n') ||
        theString.includes('\t')
    ) {
        let newString = '';

        newString += '"';

        for (
            let x = 0;
            x < theString.length;
            x++
        ) {
            newString +=
                theString[x];

            if (
                theString[x] === '"'
            ) {
                newString += '"';
            }
        }

        newString += '"';

        return newString;
    }

    return theString;
};


let arrayToCsvString = function(
    theArray,
    separator
) {
    let newString = '';

    if (
        theArray.length === 0
    ) {
        return '';
    }

    newString +=
        csvEscape(
            theArray[0]
        );

    for (
        let x = 1;
        x < theArray.length;
        x++
    ) {
        newString +=
            separator +
            csvEscape(
                theArray[x]
            );
    }

    newString += '\n';

    return newString;
};


/*
 * --------------------------------------------------------------------------
 * MONGO SANITIZATION
 * --------------------------------------------------------------------------
 */

let sanitizeMongoJson = function(
    mongoJson
) {
    if (Array.isArray(mongoJson)) {
        mongoJson.forEach(
            element =>
                sanitizeMongoJson(
                    element
                )
        );
    } else {
        if (
            mongoJson instanceof Object
        ) {
            mongoJson =
                sanitizeMongo(
                    mongoJson
                );

            for (
                let key in mongoJson
                ) {
                mongoJson[key] =
                    sanitizeMongoJson(
                        mongoJson[key]
                    );
            }
        }
    }

    return mongoJson;
};


let sanitizeMongo = function(
    v
) {
    if (
        v instanceof Object
    ) {
        for (
            let key in v
            ) {
            if (
                /^\$/.test(key)
            ) {
                delete v[key];
            }
        }
    }

    return v;
};


/*
 * --------------------------------------------------------------------------
 * STUDY INSTANCE
 * --------------------------------------------------------------------------
 */

exports.newStudyInstance = function(
    req,
    res
) {
    let study = {
        studyId:
        req.params.studyId,

        conditions:
        req.params.conditions,

        userAgent:
            req.headers['user-agent'],

        referrer:
            req.header('Referer')
    };

    let newStudy =
        new Study(study);

    newStudy.save(
        function(err, study) {
            if (err) {
                res.send(err);
                return;
            }

            res.json(study);
        }
    );
};


/*
 * --------------------------------------------------------------------------
 * HASH CODE
 * --------------------------------------------------------------------------
 */

String.prototype.hashCode =
    function() {
        let hash = 0;
        let i;
        let chr;

        if (
            this.length === 0
        ) {
            return hash;
        }

        for (
            i = 0;
            i < this.length;
            i++
        ) {
            chr =
                this.charCodeAt(i);

            hash =
                (
                    (hash << 5) -
                    hash
                ) +
                chr;

            hash |= 0;
        }

        return hash;
    };