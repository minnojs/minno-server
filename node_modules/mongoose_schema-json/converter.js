const Schema = require('mongoose').Schema;


/**
 * Converts mongoose schema object to JSON string.
 * Useful for inserting into MongoDB.
 * @param  {Object} schemaObj - schema object
 * @return {String}           - JSON representation of schema object
 */
module.exports.schema2json = function (schemaObj) {
    'use strict';

    function replacer(key, value) {

        // console.log('KEY-VAL: ', key + ' --- ' + value + ' --- ' + typeof value);

        // Filtering out properties
        var val;
        if (value === String) {
            val = "String";
        } else if (value === Number) {
            val = "Number";
        } else if (value === Date) {
            val = "Date";
        } else if (value === Date.now) {
            val = "Date.now";
        } else if (value === Boolean) {
            val = "Boolean";
        } else if (value === Buffer) {
            val = "Buffer";
        } else if (value === Schema.Types.ObjectId) {
            val = "Schema.Types.ObjectId";
        } else if (value === Schema.Types.Mixed) {
            val = "Schema.Types.Mixed";
        } else if (key === 'match') {
            val = String(value);
        } else {
            val = value;
        }

        return val;
    }

    var jsonStr = JSON.stringify(schemaObj, replacer, 2);

    return jsonStr;
};




/**
 * Converts JSON string to mongoose schema object.
 * @param  {String} jsonStr - mongoose schema in JSON format
 * @return {Object}         - mongoose schema object
 */
module.exports.json2schema = function (jsonStr) {
    'use strict';

    function reviver(key, value) {

        // console.log('KEY-VAL: ', key + ' --- ' + value + ' --- ' + typeof value);

        // Filtering out properties
        var val;
        if (value === "String") {
            val = String;
        } else if (value === "Number") {
            val = Number;
        } else if (value === "Date") {
            val = Date;
        } else if (value === "Date.now") {
            val = Date.now;
        } else if (value === "Boolean") {
            val = Boolean;
        } else if (value === "Buffer") {
            val = Buffer;
        } else if (value === "Schema.Types.ObjectId") {
            val = Schema.Types.ObjectId;
        } else if (value === "Schema.Types.Mixed") {
            val = Schema.Types.Mixed;
        } else {
            val = value;
        }

        return val;
    }

    var schemaObj = JSON.parse(jsonStr, reviver);
    return schemaObj;
};
