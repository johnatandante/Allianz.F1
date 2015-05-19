// module wich supposed to read races' data
var f1host = "www.formula1.com";
var placeholder = "{0}";
var raceTemplatePathUrl = "/content/fom-website/en/championship/results/2015-race-results/2015-" 
							+ placeholder + "-results.html";

var RaceDetailReader = function() {
	this.DbWrap = {};
	
};

var onUrlKo = function (reason) {
	console.log("Ko ", raceTemplatePathUrl, " - ", reason);
};

RaceDetailReader.prototype.Read = function (race, onSuccess) {
	this.DbWrap = require('../Model/RaceDetailDbWrap.js');
	var dbWrap = this.DbWrap;

	var options = {
	  host: f1host,
	  path: raceTemplatePathUrl.replace(placeholder, race),
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
			console.log("RaceDetailReader.prototype.Read - Elements: ", 
						dbWrap.RaceDetail.length);
			onSuccess();
		});
	}).end();
	
};

module.exports = new RaceDetailReader();