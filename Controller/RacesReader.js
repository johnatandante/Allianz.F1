// module wich supposed to read races' data
var f1host = "www.formula1.com";
var f1RacesUrl = "/content/fom-website/en/championship/races/2015.html";
var raceTemplatePathUrl = "/content/fom-website/en/championship/results/2014-race-results/2014-{0}-results.html";
var standingsClass = "group article-columns raceindex-teaser-container";

var ErrorHandler = require('./ErrorHandler');
var xmlNav = require('./XmlCollectionNavigator.js');

var RacesReader = function() {
	this.DbWrap = {};
	
};

RacesReader.prototype.Parse = function (htmlString) {
	var xml2js = require('xml2js');
	var options = {
		trim: true,
		strict: false,
	};
	
	var self = this;
    var parser = new xml2js.Parser(options);
    parser.parseString(htmlString.substring(0, htmlString.length), function (err, jsonresult) {
		if(err){
			console.log(err);
			return;
		}
		
		var divNode = null;
		var firstNodeCollection = jsonresult.HTML.BODY[0].DIV[0].MAIN[0].DIV;
		if(ErrorHandler.isPageNotFound(firstNodeCollection)) {
			return;
		}
		
		firstNodeCollection.forEach(function (element) {
			if(divNode == null)
				divNode = xmlNav.NavigateIntoInnerNode("DIV", element, standingsClass);
		});
		
		if(divNode == null)
			return;
		
		divNode.DIV.forEach(function(divElement) {
			xmlNav.AddCollectionFromDiv(divElement, self.DbWrap);
			
		});
		
	});
  	
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
	
	self = this;
	require('http').get(options, function(response) {
		var str = '';
		response.setEncoding('utf8');
		
		response.on('error', ErrorHandler.onUrlKo);
		
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		response.on('end', function () {
			self.Parse(str);
			console.log("RacesReader.prototype.Read - Elements: ", 
						dbWrap.Races.length);
			onSuccess();
		});
		
	}).end();
	
};

module.exports = new RacesReader();