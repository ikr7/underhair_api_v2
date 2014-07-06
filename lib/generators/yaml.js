
var InmouSet = require('../core/inmouset.js'), 
	YAML = require('js-yaml');

var generate = module.exports = function(params, callback){

	var inmouSet = InmouSet.create(params);

	var yaml = YAML.dump(inmouSet);

	callback(null, {
		'data': yaml, 
		'mime': 'application/x-yaml'
	});

};