// module wich supposed to read races' data
var f1host = "www.formula1.com";
var f1RacesUrl = "/content/fom-website/en/championship/races/2015.html";
var raceTemplatePathUrl = "/content/fom-website/en/championship/results/2014-race-results/2014-{0}-results.html";

var RacesReader = function() {
	this.DbWrap = {};
	
};

var onUrlKo = function (params) {
	console.log("Ko ", f1RacesUrl, " - ", params);
};

RacesReader.prototype.Read = function (onSuccess) {
	this.DbWrap = require('../Model/RacesDbWrap.js');
	if(this.DbWrap.Races.length > 0) {
		onSuccess();
		return;
	}
	
	var dbWrap = this.DbWrap;

	var options = {
	  host: f1host,
	  path: f1RacesUrl
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
			console.log("RacesReader.prototype.Read - Elements: ", 
						dbWrap.Races.length);
			onSuccess();
		});
		
	}).end();
	
};

module.exports = new RacesReader();