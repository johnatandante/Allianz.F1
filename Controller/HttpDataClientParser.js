
var ErrorHandler = require('./ErrorHandler');

var HttpDataClientParser = function() {
	
};

HttpDataClientParser.prototype.Read = function (handler, onSuccess) {
	if(!handler.CanLoadData()){
		onSuccess();
		return;
	}

	require('http').get(handler.ReadOptions, function(response) {
		var str = '';
		response.setEncoding('utf8');
		
		response.on('error', ErrorHandler.onUrlKo);
		
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		response.on('end', function () {
			handler.Parse(str);
			console.log("Reader", handler.DbWrap.Name, ".prototype.Read - Elements: ", 
						handler.DbWrap.Count());
			onSuccess();
		});
	}).end();
};


module.exports = new HttpDataClientParser();