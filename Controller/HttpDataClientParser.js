var http = require('http');
var xml2js = require('xml2js');
var ErrorHandler = require('./ErrorHandler');

var HttpDataClientParser = function() {
	this.ParseOptions = {
				trim: true,
				strict: false,
			};
};

HttpDataClientParser.prototype.Read = function (handler, onSuccess) {
	if(!handler.CanLoadData()){
		onSuccess();
		return;
	}
	
	var self = this;
	http.get(handler.ReadOptions, function(response) {
		var htmlString = '';
		response.setEncoding('utf8');
		
		response.on('error', ErrorHandler.onUrlKo);
		
		response.on('data', function (chunk) {
			htmlString += chunk;
		});
		
		response.on('end', function () {
		    var parser = new xml2js.Parser(self.ParseOptions);
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