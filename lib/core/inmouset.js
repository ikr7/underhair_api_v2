
var Inmou = require('./inmou.js');

exports.create = function(params){

	var set = [];

	for(var i = 0; i < params.width; i += params.width / params.amount){

		var inmou = Inmou.create(params);
		
		inmou = inmou.map(function(branch){

			branch.startX += i + (params.width / params.amount / 2);
			branch.endX += i + (params.width / params.amount / 2);
			branch.startY += params.height / 6 * 7;
			branch.endY += params.height / 6 * 7;

			return branch;

		});

		set.push(inmou);

	}

	return set;

};