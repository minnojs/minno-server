/* Run:
 * $node test schema2json schema1
 */

const Schema = require('mongoose').Schema;

var schemaObj = {
    name: {type: String, lowercase: true},
    age: Number,
    born: Date,
    isActive: Boolean,
    buff: Buffer,
    fans: [Schema.Types.Mixed],
    company_id: Schema.Types.ObjectId
};


module.exports = schemaObj;
