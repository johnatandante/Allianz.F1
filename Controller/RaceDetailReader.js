// module wich supposed to read races' data
var f1host = "www.formula1.com";
var raceTemplatePathUrl = "/content/fom-website/en/championship/results/2014-race-results/2014-{0}-results.html";

var RaceDetailReader = function() {
	this.DbWrap = {};
	
};

RaceDetailReader.prototype.Add = function(detail) {
	this.RaceDetail.push(detail);
	
};

RaceDetailReader.prototype.onDbRejected = function (reason) {
	console.log("Can't populate RacesDbWrap for ", reason);	
};


RaceDetailReader.prototype.Read = function (race) {
	
	this.DbWrap = require('../Model/RacesDbWrap.js');
	var dbWrap = this.DbWrap;

	var options = {
	  host: f1host,
	  path: raceTemplatePathUrl.replace("{0}", race),
	};
	  
	require('http').get(options, function(response) {
		var str = '';
		response.setEncoding('utf8');
		
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		response.on('end', function () {
			dbWrap.Parse(str);
			console.log("RaceDetailReader.prototype.Read - Elements: ", 
						dbWrap.RaceDetail.length);
		});
	}).end();
	
};

module.exports = new RaceDetailReader();