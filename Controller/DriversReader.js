// module wich supposed to read driver's data
var f1host = "www.formula1.com";
var f1DriversUrl = "/content/fom-website/en/championship/results/2015-driver-standings.html";

var DriversReader = function() {
	this.DbWrap = {};
	
};

var onUrlKo = function (reason) {
	console.log("Ko ", f1DriversUrl, " - ", reason);
};

DriversReader.prototype.Read = function (onSuccess) {
	
	this.DbWrap = require('../Model/DriversDbWrap.js');
	var dbWrap = this.DbWrap;

	var options = {
	  host: f1host,
	  path: f1DriversUrl
	};
	
	require('http').get(options, function(response) {
		var str = '';
		response.setEncoding('utf8');
		
		response.on('error', onUrlKo);
		
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		response.on('end', function () {
			dbWrap.Parse(str);
			console.log("DriversReader.prototype.Read - Elements: ", 
						dbWrap.Drivers.length);
			onSuccess();
		});
	}).end();
};

module.exports = new DriversReader();