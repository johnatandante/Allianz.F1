// module wich supposed to read races' data
var f1host = "www.formula1.com";
var placeholder = "{0}";
var raceTemplatePathUrl = "/content/fom-website/en/championship/results/2015-race-results/2015-" 
							+ placeholder + "-results/race.html";
var ErrorHandler = require('./ErrorHandler');
var xmlNav = require('./XmlCollectionNavigator.js');

var standingsClass = "standings";

var RaceDetailReader = function() {
	this.DbWrap = require('../Model/RaceDetailDbWrap.js');
	
	this.CanLoadData = function(){
		return true;
	};
	
	this.SetRace = function (race) {
		this.ReadOptions.path = raceTemplatePathUrl.replace(placeholder, race);
	};
	
	this.ReadOptions = {
	  host: f1host,
	  path: raceTemplatePathUrl.replace(placeholder, this.Race),
	};
	
};

RaceDetailReader.prototype.SetRaceDescription = function (divNode) {
	this.DbWrap.RaceDescription = divNode.H3[0]["_"];
};

RaceDetailReader.prototype.SetRaceName = function (divNode) {
	this.DbWrap.RaceName = divNode.A[0]["_"].toLowerCase();
};

RaceDetailReader.prototype.Parse = function (htmlString) {
	var self = this;
	
	self.DbWrap.Clear();
	
	var xml2js = require('xml2js');
	var options = {
		trim: true,
		strict: false,
	};
	
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
			return;
		
		self.SetRaceDescription(standingNode);
		xmlNav.AddCollectionFromTable(standingNode.TABLE[0], self.DbWrap);
		
	});
  	
};

var Read = function (self, onSuccess) {
	if(self.CanLoadData()){
		onSuccess();
		return;
	}
	
	require('http').get(self.DbWrap.ReadOptions, function(response) {
		var str = '';
		response.setEncoding('utf8');
		
		response.on('error', ErrorHandler.onUrlKo);
		
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		response.on('end', function () {
			self.Parse(str);
			console.log("Reader", self.DbWrap.Name, ".prototype.Read - Elements: ", 
						self.DbWrap.Count);
			onSuccess();
		});
	}).end();
	
};

module.exports = new RaceDetailReader();