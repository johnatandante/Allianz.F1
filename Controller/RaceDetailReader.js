// module wich supposed to read races' data
var ErrorHandler = require('./ErrorHandler');

var f1host = "www.formula1.com";
var placeholder = "{0}";
var raceTemplatePathUrl = "/content/fom-website/en/championship/results/2015-race-results/2015-" 
							+ placeholder + "-results/race.html";

var standingsClass = "standings";

var RaceDetailReader = function() {
	this.DbWrap = {};
	
};

var GetNewItem = function () {
	return { 
			Position: -1,
			FirstName: "None",
			LastName: "None",
			DriverTag: "None",
			Country: "Nope",
			Team : "None",
			Time : "",
			Points: -1,
	};
};

var ParseTrItem = function (item) {
	var position = GetNewItem();
				
	item.TD.forEach(function(tr) {
		
		var classobj =  tr["$"];
		switch(classobj.CLASS) {
			case "number":
				position.Position = tr.SPAN[0].SPAN[0]["_"];
				break;
        	case "name":
				position.FirstName = tr.SPAN[0]["_"];
				position.LastName = tr.SPAN[1]["_"];
				position.DriverTag = tr.SPAN[2]["_"];
				break;
	        case "country":
				position.Country = tr["_"];
				break;
	        case "team":
				position.Team = tr["_"];
				break;
	        case "time":
				position.Time = tr["_"];
				break;
        	case "points":
				position.Points = tr["_"];
				break;
		}
	});
	
	return position;
};

RaceDetailReader.prototype.AddCollectionFromTable = function (JsonTable) {
	var self = this;
	var trCollection = JsonTable.TBODY[0].TR;
	trCollection.forEach(function(trItem) {
		// esamino la tabella
		self.DbWrap.Add(ParseTrItem(trItem));
	});
	
};

RaceDetailReader.prototype.SetRaceDescription = function (divNode) {
	this.DbWrap.RaceDescription = divNode.H3[0]["_"];
};

RaceDetailReader.prototype.NavigateIntoInnerNode = function (nodeName, JsonNode) {
	if(JsonNode == null) {
		console.log("--end for null");
		return;
	}
	
	var self = this;
	var classobj =  JsonNode["$"];
	
	if( classobj != null && classobj.CLASS == standingsClass) {
		// vado secco al sodo
		self.SetRaceDescription(JsonNode);
		self.AddCollectionFromTable(JsonNode.TABLE[0]);
	} else if(JsonNode[nodeName] != null){
		JsonNode[nodeName].forEach(function(JsonChildNode) {
			self.NavigateIntoInnerNode(nodeName, JsonChildNode);
		});
	}
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
			self.DbWrap.Add(GetNewItem());
			return;
		}
		
		var firstNodeCollection = jsonresult.HTML.BODY[0].DIV[0].MAIN[0].ARTICLE[0];
		if(ErrorHandler.isPageNotFound(firstNodeCollection)) {
			return;
		}
		
		self.SetRaceName(firstNodeCollection.DIV[0].DIV[0].DIV[0]);
		firstNodeCollection.DIV.forEach(function (element) {
			self.NavigateIntoInnerNode("DIV", element);
		});
		
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