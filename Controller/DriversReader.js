// module that read driver's data
var f1host = "www.formula1.com";
var f1DriversUrl = "/content/fom-website/en/championship/results/2015-driver-standings.html";

var DriversReader = function() {
	this.DbWrap = {};
	
};

var onUrlKo = function (params) {
	console.log("Ko ", f1DriversUrl, " - ", params);
}

DriversReader.prototype.onDataRead = function (params) {
	console.log("Just Read It: ", params);
};

DriversReader.prototype.Read = function () {
	
	this.DbWrap = require('../Model/DriversDbWrap.js');
	var dbWrap = this.DbWrap;
	
	console.log(dbWrap);
	
  	var http = require('http');
	var options = {
	  host: f1host,
	  path: f1DriversUrl
	};
	  
	http.get(options, function(response) {
		var str = '';
		response.setEncoding('utf8');
		
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		response.on('end', function () {
			//console.log("Read request: ", str);
			dbWrap.Parse(str);
			console.log("DriversReader.prototype.Read - Elements: ", 
						dbWrap.Drivers.length);
		});
	}).end();
	console.log("DriversReader.prototype.Read - Elements: ", this.DbWrap.Drivers.length);
};

module.exports = new DriversReader();