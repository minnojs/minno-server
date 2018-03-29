/* Run:
 * $node test schema2json schema3
 */

var ToySchema = {};

var schemaObj = {
    toys: [ToySchema],
    buffers: [Buffer],
    string: [String],
    numbers: [Number]
};


module.exports = schemaObj;
