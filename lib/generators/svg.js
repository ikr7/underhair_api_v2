
var raphael = require('node-raphael'), 
	parseCSSColor = require('csscolorparser').parseCSSColor, 
	format = require('util').format, 
	InmouSet = require('../core/inmouset.js');

var generate = module.exports = function(params, callback){

	var inmouSet = InmouSet.create(params);

	var color = parseCSSColor(params.color) || [0, 0, 0, 1], 
		bgcolor = parseCSSColor(params.bgcolor) || [0, 0, 0, 0];

	var svg = raphael.generate(params.width, params.height, function(r){

		r.rect(-1, -1, params.width + 2, params.height + 2)
			.attr({
				'fill': format('rgba(%d, %d, %d, %d)', bgcolor[0], bgcolor[1], bgcolor[2], bgcolor[3])
			});

		inmouSet.forEach(function(inmou){
			inmou.forEach(function(branch){
				r.path(
					format('M%d,%d L%d,%d', branch.startX, branch.startY, branch.endX, branch.endY)
				).attr({
					'stroke': format('rgba(%d, %d, %d, %d)', color[0], color[1], color[2], color[3]), 
					'stroke-width': branch.width, 
					'stroke-linecap': 'round'
				});
			});
		});

	});

	callback(null, {
		'data': svg + '>', 
		'mime': 'image/svg+xml'
	});

};