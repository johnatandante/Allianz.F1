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

RaceDetailReader.prototype.Parse = function (err, jsonresult) {
	var self = this;
	self.DbWrap.Clear();
	
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
  	
};

module.exports = new RaceDetailReader();