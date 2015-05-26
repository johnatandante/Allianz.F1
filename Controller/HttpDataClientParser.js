
var ErrorHandler = require('./ErrorHandler');

var HttpDataClientParser = function() {
	
};

HttpDataClientParser.prototype.Read = function (handler, onSuccess) {
	if(!handler.CanLoadData()){
		onSuccess();
		return;
	}

	require('http').get(handler.ReadOptions, function(response) {
		var htmlString = '';
		response.setEncoding('utf8');
		
		response.on('error', ErrorHandler.onUrlKo);
		
		response.on('data', function (chunk) {
			htmlString += chunk;
		});
		
		response.on('end', function () {
			
			var xml2js = require('xml2js');
			var options = {
				trim: true,
				strict: false,
			};
			
		    var parser = new xml2js.Parser(options);
		    parser.parseString(htmlString.substring(0, htmlString.length), 
								function (err, jsonresult) {
									handler.Parse(err, jsonresult);
								}
			);
			
			console.log("Reader", handler.DbWrap.Name, ".prototype.Read - Elements: ", 
						handler.DbWrap.Count());
			onSuccess();
		});
	}).end();
};


module.exports = new HttpDataClientParser();