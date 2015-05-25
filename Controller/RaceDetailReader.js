// module wich supposed to read races' data
var f1host = "www.formula1.com";
var placeholder = "{0}";
var raceTemplatePathUrl = "/content/fom-website/en/championship/results/2015-race-results/2015-" 
							+ placeholder + "-results/race.html";
var ErrorHandler = require('./ErrorHandler');
var xmlNav = require('./XmlCollectionNavigator.js');

var standingsClass = "standings";

var RaceDetailReader = function() {
	this.DbWrap = {};
	
};


RaceDetailReader.prototype.SetRaceDescription = function (divNode) {
	this.DbWrap.RaceDescription = divNode.H3[0]["_"];
};

RaceDetailReader.prototype.SetRaceName = function (divNode) {
	this.DbWrap.RaceName = divNode.A[0]["_"].toLowerCase();
};

RaceDetailReader.prototype.Parse = function (htmlString) {
	var xml2js = require('xml2js');
	var options = {
		trim: true,
		strict: false,
	};
	
	var self = this;
    var parser = new xml2js.Parser(options);
    parser.parseString(htmlString.substring(0, htmlString.length), function (err, jsonresult) {
		if(err) {
			console.log(err);
			return;
		}
		
		if(ErrorHandler.isPageNotFound(jsonresult.HTML.BODY[0])) {
			return;
		}
		
		var firstNodeCollection = jsonresult.HTML.BODY[0].DIV[0].MAIN[0].ARTICLE[0];
		if(firstNodeCollection == null)
			return;
		
		self.SetRaceName(firstNodeCollection.DIV[0].DIV[0].DIV[0]);
		var standingNode = null;
		firstNodeCollection.DIV.forEach(function (element) {
			if(standingNode == null)
				standingNode = xmlNav.NavigateIntoInnerNode("DIV", element, standingsClass);
		});
		
		if(standingNode == null)
			return; // errore
		
		self.SetRaceDescription(standingNode);
		xmlNav.AddCollectionFromTable(standingNode.TABLE[0], self.DbWrap);
		
	});
  	
};

RaceDetailReader.prototype.Read = function (race, onSuccess) {
	this.DbWrap = require('../Model/RaceDetailDbWrap.js');
	this.DbWrap.Clear();
	
	var self = this;

	var options = {
	  host: f1host,
	  path: raceTemplatePathUrl.replace(placeholder, race),
	};
	
	require('http').get(options, function(response) {
		var str = '';
		response.setEncoding('utf8');
		
		response.on('error', ErrorHandler.onUrlKo);
		
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		response.on('end', function () {
			self.Parse(str);
			console.log("RaceDetailReader.prototype.Read - Elements: ", 
						self.DbWrap.RaceDetail.length);
			onSuccess();
		});
	}).end();
	
};

module.exports = new RaceDetailReader();