/* Run:
 * $node test schema2json schema1
 */


var schemaObj = {
    str_simple: String,
    str_lower: {type: String, lowercase: true},
    str_upper: {type: String, uppercase: true},
    str_trim: {type: String, trim: true},
    str_match: {type: String, match: /^[a-z0-9 ]+$/i}, //only alphanumeric chars and space
    str_enum: {type: String, enum: ['cat', 'dog', 'cow']} //array of strings
};

module.exports = schemaObj;
