
exports.create = function(params){

	var branches = [], 
		depth = 12, 
		maxAngle = params.curly * Math.PI / 180, 
		length = params.height / 6 * params.length, 
		startWidth = params.startWidth || params.width / 64;

	(function(startX, startY, length, angle, width, i){

		if(i > depth){
			return;
		}

		var startX = startX, 
			startY = startY, 
			endX   = startX + length * Math.sin(angle), 
			endY   = startY + length * Math.cos(angle), 
			length = length, 
			width  = width;

		branches.push({
			'startX': startX, 
			'startY': startY, 
			'endX'  : endX, 
			'endY'  : endY, 
			'width' : width
		});

		arguments.callee(
			endX, 
			endY, 
			length * (0.7 + Math.random() * 0.3), 
			angle + Math.random() * maxAngle - maxAngle * 0.5, 
			width * 0.8, 
			i + 1
		);

	})(0, 0, length, Math.PI, startWidth, 0);

	return branches;

};
