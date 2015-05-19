// Races Db Wrap
var standingsClass = "group article-columns raceindex-teaser-container";

var RacesDbWrap = function () {
	this.Races = [];
};

RacesDbWrap.prototype.Add = function(race) {
	this.Races.push(race);
	
};

RacesDbWrap.prototype.onDbRejected = function (reason) {
	console.log("Can't populate RacesDbWrap for ", reason);	
};

RacesDbWrap.prototype.AddCollectionFromDiv = function (JsonDIVNode) {
	var self = this;
	// la struttura è DIV.A.ARTICLE	.FIGURE	.IMG
	//								.SECTION.P
	//										.H4
	var race = {		
		Location: "NoWhere",
		Img: "<nodata>",
		RaceName: "None",
		Nationality: "...",
		Winner: "Nope",
	};
	
	var anchorNode = JsonDIVNode.A[0];
	race.Location = anchorNode["$"].HREF; // substring lo faccio dopo 
	
	var imgNode = anchorNode.ARTICLE[0].FIGURE[0].IMG.find(function(element) { return element["$"].CLASS == "hidden"; });
	race.Img = imgNode.SRC;
	
	var sectionNode = anchorNode.ARTICLE[0].SECTION[0];
	race.RaceName = sectionNode.H4[0]["_"];
	
	sectionNode.P.forEach(function(pelement) {
		switch(pelement["$"].CLASS) {
			case "race-winner":
				race.Winner = pelement.SPAN[0]["_"];
				break;
			case "teaser-date":
				race.Date = pelement["_"];
				break;
		}
	});
	self.Add(race);
	
};

RacesDbWrap.prototype.NavigateIntoInnerNode = function (nodeName, JsonNode) {
	if(JsonNode == null) {
		console.log("--end for null");
		return;
	}
	
	var self = this;
	var classobj =  JsonNode["$"];
	
	if( classobj != null && classobj.CLASS == standingsClass) {
		// vado secco al sodo
		JsonNode.DIV.forEach(function(divElement) {
			self.AddCollectionFromDiv(divElement);
		});
	} else if(JsonNode[nodeName] != null){
		JsonNode[nodeName].forEach(function(JsonChildNode) {
			self.NavigateIntoInnerNode(nodeName, JsonChildNode);
		});
	}
	
};

RacesDbWrap.prototype.Parse = function (htmlString) {
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
			var race = {
				Location: -1,
				RaceName: "None",
				Nationality: "...",
				Winner: "Nope",
			};
			
			this.Add(race);
			return;
		}
		
		var firstNodeCollection = jsonresult.HTML.BODY[0].DIV[0].MAIN[0].DIV;
		firstNodeCollection.forEach(function (element) {
			self.NavigateIntoInnerNode("DIV", element);
		});
		
	});
  	
};

module.exports = new RacesDbWrap();