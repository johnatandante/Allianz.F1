// Races Db Wrap
var RacesDbWrap = function () {
	this.Races = [];
};

RacesDbWrap.Add = function(race) {
	this.Races.push(race);
	
};

RacesDbWrap.prototype.onDbRejected = function (reason) {
	console.log("Can't populate RacesDbWrap for ", reason);	
};


RacesDbWrap.prototype.NavigateIntoInnerNode = function (nodeName, JsonNode) {
	if(JsonNode == null) {
		console.log("--end for null");
		return;
	}
	
	var self = this;
	var classobj =  JsonNode["$"];
	console.log("Start NavigateIntoInner ", nodeName, " ", classobj);
	
	if( classobj != null && classobj.CLASS == standingsClass) {
		// vado secco al sodo
		self.AddCollectionFromTable(JsonNode.TABLE[0]);
	} else if(JsonNode[nodeName] != null){
		JsonNode[nodeName].forEach(function(JsonChildNode) {
			self.NavigateIntoInnerNode(nodeName, JsonChildNode);
		});
	}
	
	console.log("End NavigateIntoInner ", nodeName, " ", classobj);
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