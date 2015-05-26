// module wich supposed to read driver's data
var f1host = "www.formula1.com";
var f1DriversUrl = "/content/fom-website/en/championship/results/2015-driver-standings.html";

var ErrorHandler = require('./ErrorHandler');
var xmlNav = require('./XmlCollectionNavigator.js');

var standingsClass = "standings";

var DriversReader = function() {
	this.DbWrap = require('../Model/DriversDbWrap.js');
	this.CanLoadData = function(){
		return this.DbWrap.Count() == 0;
	};
	
	this.ReadOptions = {
	  host: f1host,
	  path: f1DriversUrl
	};
	
};

DriversReader.prototype.Parse = function (err, jsonresult) {
	var self = this;
	if(err){
		console.log(err);
		return;
	}
	
	if(ErrorHandler.isPageNotFound(jsonresult.HTML.BODY[0])) {
		return;
	}
	
	var firstNodeCollection = jsonresult.HTML.BODY[0].DIV[0].MAIN[0].ARTICLE[0];
	if(firstNodeCollection == null)
		return;
	
	var standingNode = null;
	firstNodeCollection.DIV.forEach(function (element) {
		if(standingNode == null)
			standingNode = xmlNav.NavigateIntoInnerNode("DIV", element, standingsClass);
	});
	
	if(standingNode == null)
		return;
	
	xmlNav.AddCollectionFromTable(standingNode.TABLE[0], self.DbWrap);
   
};


module.exports = new DriversReader();