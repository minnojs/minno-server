# mongoose_schema-json
> Convert mongoose schema object to JSON and vice versa.

## Installation
`npm install mongoose_schema-json`

## Usage
For example when you want to store mongoose schema in mongo database you need to convert it into JSON string.


## Example of conversion

```javascript
// mongoose schema in object notation

var schemaObj = {
	name: {type: String, lowercase: true},
	age: Number,
	born: Date,
	isActive: Boolean,
	fans: [Schema.Types.Mixed],
	company_id: Schema.Types.ObjectId
}
```

```json
// mongoose schema in JSON notation

var jsonStr = {
	"name": {"type": "String", "lowercase": true},
	"age": "Number",
	"born": "Date",
	"isActive": "Boolean",
	"fans": ["Schema.Types.Mixed"],
	"company_id": "Schema.Types.ObjectId"
}
```

## Methods

- schema2json()
- json2schema()

```javascript
var convert = require('mongoose_schema-json');

var jsonStr = convert.schema2json(schemaObj);
var schemaObj = convert.json2schema(jsonStr);
```

## Testing
Test results will be visible in console.
NodeJS must be installed !


`$ node test schema2json schema1`

`$ node test json2schema json1`
