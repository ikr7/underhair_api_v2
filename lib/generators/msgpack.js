
var InmouSet = require('../core/inmouset.js'), 
	msgpack = require('msgpack');

var generate = module.exports = function(params, callback){

	var inmouSet = InmouSet.create(params);

	var packed = msgpack.pack(inmouSet);

	callback(null, {
		'data': packed, 
		'mime': 'application/json'
	});

};