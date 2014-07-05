
var Canvas = require('canvas'), 
	parseCSSColor = require('csscolorparser').parseCSSColor, 
	format = require('util').format, 
	InmouSet = require('../core/inmouset.js');

var generate = module.exports = function(params, callback){
	
	var cvs = new Canvas(params.width, params.height, 'pdf'), 
		ctx = cvs.getContext('2d');

	var color = parseCSSColor(params.color), 
		bgcolor = parseCSSColor(params.bgcolor);

	ctx.fillStyle = format('rgba(%d, %d, %d, %d)', bgcolor[0], bgcolor[1], bgcolor[2], bgcolor[3]);
	ctx.fillRect(0, 0, params.width, params.height);

	ctx.strokeStyle = format('rgba(%d, %d, %d, %d)', color[0], color[1], color[2], color[3]);
	ctx.lineCap = 'round';

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

	var out = cvs.toBuffer();

	callback(null, {
		'data': out, 
		'mime': 'application/pdf'
	});

};