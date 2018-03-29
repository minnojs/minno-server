/**
 * Run:
 * $node test schema2json schema1
 */
var converter = require('../converter');
var fs = require('fs');
var util = require('util');
var mongoose = require('mongoose');


if (process.argv[2] === 'schema2json') {
    var schemaObj = require('./' + process.argv[3]); //'schema1', 'schema2', ...
    var jsonStr = converter.schema2json(schemaObj);

    console.log(jsonStr);

} else if (process.argv[2] === 'json2schema') {
    var jsonStrR = fs.readFileSync(__dirname + '/' + process.argv[3] + '.json', 'utf8');  //'json1', 'json2', ...
    var schemaObjR = converter.json2schema(jsonStrR);

    console.log(util.inspect(schemaObjR));



    //****check schema
    const Schema = require('mongoose').Schema;


    var opts = {
        collection: 'users',
        _id: true, //disable _id
        id: false, //set virtual id property
        autoIndex: true, //auto-create indexes in mognodb collection on mongoose restart
        minimize: true, //remove empty objects
        safe: true, //pass errors to callback
        strict: true, //values not defined in schema will not be saved in db
        validateBeforeSave: true, //validate doc before saving. prevent saving false docs
        timestamps: { //create timestamps for each doc 'created_at' & 'updated_at'
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    };

    var Sch = new Schema(schemaObjR, opts);
    var myModel = mongoose.model('myMD', Sch);
    myModel.find({}, function (err, result) {
        console.log('RESULT:' + result); //cant't be any result because mongoose is not connected to DB
    });
}


