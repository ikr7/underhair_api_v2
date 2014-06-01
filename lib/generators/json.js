
var InmouSet = require('../core/inmouset.js');

var generate = module.exports = function(params, callback){

	var inmouSet = InmouSet.create(params);

	var json = JSON.stringify(inmouSet);

	callback(null, {
		'data': json, 
		'mime': 'application/json'
	});

};