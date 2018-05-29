/* Run:
 * $node test schema2json schema2
 */

const Schema = require('mongoose').Schema;

var schemaObj = {
    user_id: {type: Schema.Types.ObjectId, ref: 'usersMD'},

    server: {type: String, required: true},
    port: {type: Number, required: true},
    name: {type: String, required: true},
    username: String,
    password: String,

    isActive: {type: Boolean, default: true},

    collections: [
        {
            name: {type: String},
            collschema: Schema.Types.Mixed,
            colloptions: Schema.Types.Mixed,
            methods: String,
            statics: String,
            query: String,
            virtuals: String,
            pre: String,
            post: String,
            plugin: String
        }
    ]

};


module.exports = schemaObj;
