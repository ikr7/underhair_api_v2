
var express = require('express'), 
	fs = require('fs'), 
	generators = {
		'png': require('./lib/generators/png.js'), 
		'jpg': require('./lib/generators/jpg.js'), 
		'jpeg': require('./lib/generators/jpg.js'), 
		'gif': require('./lib/generators/gif.js'), 
		'svg': require('./lib/generators/svg.js'), 
		'json': require('./lib/generators/json.js'), 
		'pdf': require('./lib/generators/pdf.js')
	};

var app = express();

app.get('/', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(fs.readFileSync('./pages/root.html', 'utf8'));
	return;
});

app.get('/favicon.ico', function(req, res){
	res.writeHead(200, {'Content-Type': 'image/png'});
	res.end(fs.readFileSync('./assets/favicon.ico'));
});

app.get('/v1', function(req, res){
	res.redirect('/');
});

app.get(/^\/v1\/\d+x\d+\.(png|jpg|jpeg|gif|svg|json|pdf)$/i, function(req, res){
	
	var suffixIndex = req.path.lastIndexOf('.'), 
		size = req.path.slice(req.path.lastIndexOf('/') + 1, suffixIndex).split('x');

	var params = {
		'type': req.path.substring(suffixIndex).slice(1).toLowerCase(), 
		'width': size[0] ? parseInt(size[0]) : 320, 
		'height': size[1] ? parseInt(size[1]) : 320, 
		'amount': req.query.amount ? parseInt(req.query.amount) : 15, 
		'color': req.query.color || 'black', 
		'bgcolor': req.query.bgcolor || 'rgba(0, 0, 0, 0)', 
		'curly': req.query.curly ? parseInt(req.query.curly) : 30, 
		'length': req.query.length ? parseInt(req.query.length) / 100 : 1, 
		'callback': req.query.callback || null
	};

	if(
		params.width  > 1024 ||
		params.height > 1024 || 
		(params.type === 'gif' && params.width > 512 && params.height > 512) || 
		params.amount > 1000 
	){
		res.writeHead(400, {'Content-Type': 'text/html'});
		res.end(fs.readFileSync('./pages/error.html', 'utf8'));
		return;
	}

	generators[params.type](params, function(err, result){

		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*', 
			'Content-Length': result.data.length, 
			'Content-Type': result.mime
		});

		res.end(result.data);

	});

});

app.listen(process.env.PORT || 3000);
