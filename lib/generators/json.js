
var InmouSet = require('../core/inmouset.js');

var generate = module.exports = function(params, callback){

	var inmouSet = InmouSet.create(params);

	var json = JSON.stringify(inmouSet);

	if(params.callback){
		json = params.callback + '(' + json + ');';
	}

	callback(null, {
		'data': json, 
		'mime': 'application/json'
	});

};