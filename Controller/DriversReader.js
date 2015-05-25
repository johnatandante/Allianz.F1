// module wich supposed to read driver's data
var f1host = "www.formula1.com";
var f1DriversUrl = "/content/fom-website/en/championship/results/2015-driver-standings.html";

var ErrorHandler = require('./ErrorHandler');
var xmlNav = require('./XmlCollectionNavigator.js');

var standingsClass = "standings";

var DriversReader = function() {
	this.DbWrap = {};
	
};

var onUrlKo = function (reason) {
	console.log("Ko ", f1DriversUrl, " - ", reason);
};

DriversReader.prototype.Parse = function (htmlString) {
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
		
	});
   
};

DriversReader.prototype.Read = function (onSuccess) {
	this.DbWrap = require('../Model/DriversDbWrap.js');
	if(this.DbWrap.Drivers.length > 0){
		onSuccess();
		return;
	}
	
	var dbWrap = this.DbWrap;
	var options = {
	  host: f1host,
	  path: f1DriversUrl
	};
	
	var self = this;
	require('http').get(options, function(response) {
		var str = '';
		response.setEncoding('utf8');
		
		response.on('error', ErrorHandler.onUrlKo);
		
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		response.on('end', function () {
			self.Parse(str);
			console.log("DriversReader.prototype.Read - Elements: ", 
						dbWrap.Drivers.length);
			onSuccess();
		});
	}).end();
};

module.exports = new DriversReader();