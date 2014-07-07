
var Canvas = require('canvas'), 
	GIFEncoder = require('gifencoder'), 
	parseCSSColor = require('csscolorparser').parseCSSColor, 
	format = require('util').format, 
	InmouSet = require('../core/inmouset.js');

var generate = module.exports = function(params, callback){
	
	var cvs = new Canvas(params.width, params.height), 
		ctx = cvs.getContext('2d'), 
		encoder = new GIFEncoder(params.width, params.height);

	encoder.start();
	encoder.setRepeat(0);
	encoder.setDelay(params.delay);
	encoder.setQuality(10);

	var color = parseCSSColor(params.color) || [0, 0, 0, 1], 
		bgcolor = parseCSSColor(params.bgcolor) || [0, 0, 0, 0];

	ctx.fillStyle = format('rgba(%d, %d, %d, %d)', bgcolor[0], bgcolor[1], bgcolor[2], bgcolor[3]);
	ctx.fillRect(0, 0, params.width, params.height);

	encoder.addFrame(ctx);

	ctx.strokeStyle = format('rgba(%d, %d, %d, %d)', color[0], color[1], color[2], color[3]);
	ctx.lineCap = 'round';

	var inmouSet = InmouSet.create(params);

	for(var i = 0; i < inmouSet[0].length; i++){
		inmouSet.forEach(function(inmou){
			ctx.lineWidth = inmou[i].width;
			ctx.beginPath();
			ctx.moveTo(inmou[i].startX, inmou[i].startY);
			ctx.lineTo(inmou[i].endX, inmou[i].endY);
			ctx.stroke();
		});
		encoder.addFrame(ctx);
	}

	encoder.finish();

	callback(null, {
		'data': encoder.out.getData(), 
		'mime': 'image/gif'
	});

};