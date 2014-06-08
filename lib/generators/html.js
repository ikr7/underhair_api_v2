
var parseCSSColor = require('csscolorparser').parseCSSColor, 
	format = require('util').format, 
	InmouSet = require('../core/inmouset.js');

var generate = module.exports = function(params, callback){
	
	var cvs = new Canvas(params.width, params.height), 
		ctx = cvs.getContext('2d');

	var color = parseCSSColor(params.color), 
		bgcolor = parseCSSColor(params.bgcolor);

	var inmouSet = InmouSet.create(params);

	inmouSet.forEach(function(inmou){
		inmou.forEach(function(branch){
			ctx.lineWidth = branch.width;
			ctx.beginPath();
			ctx.moveTo(branch.startX, branch.startY);
			ctx.lineTo(branch.endX, branch.endY);
			ctx.stroke();
		});
	});

	

};