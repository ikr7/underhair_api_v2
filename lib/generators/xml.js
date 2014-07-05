
var builder = require('xmlbuilder'),
	InmouSet = require('../core/inmouset.js');

var generate = module.exports = function(params, callback){

	var inmouSet = InmouSet.create(params);

	var xml = builder.create('inmouset');

	inmouSet.forEach(function(inmou){

		var inmouElem = xml.ele('inmou');

		inmou.forEach(function(branch){

			inmouElem.ele('branch', {
				'startX': branch.startX, 
				'startY': branch.startY, 
				'endX': branch.endX, 
				'endY': branch.endY, 
				'width': branch.width
			});

		});

	});

	callback(null, {
		'data': xml.end(), 
		'mime': 'application/xml'
	});

};