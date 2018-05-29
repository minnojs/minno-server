/* Run:
 * $node test schema2json schema3
 */

const Schema = require('mongoose').Schema;

var schemaObj = {
    dat: Date,
    bul: Boolean,
    my_arr: [Number],
    mix: Schema.Types.Mixed,
    mix_arr: [Schema.Types.Mixed], //numbers, strings, objects, etc
    my_id: Schema.Types.ObjectId

};


module.exports = schemaObj;
