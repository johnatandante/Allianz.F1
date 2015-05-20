// Drivers Db Wrap
var standingsClass = "standings";

var DriversDbWrap = function () {
	this.Drivers = [];	
};

DriversDbWrap.prototype.Add = function(driver) {
	this.Drivers.push(driver);
	
};

DriversDbWrap.prototype.onDbRejected = function (reason) {
	console.log("Can't populate DriversDbWrap for ", reason);	
};

var GetNewItem = function() {
	return {
				Position: -1,
				FirstName: "None",
				LastName: "Found",
				Nationality: "...",
				Team: "None",
				Car: "Mercedes car",
				Points: -1,
	};
};

var ParseTrItem = function (item) {
	var driver = GetNewItem();
				
	item.TD.forEach(function(tr) {
		
		var classobj =  tr["$"];
		switch(classobj.CLASS) {
			case "number":
				driver.Position = tr.SPAN[0].SPAN[0]["_"];
				break;
        	case "name":
				driver.FirstName = tr.SPAN[0]["_"];
				driver.LastName = tr.SPAN[1]["_"];
           		 //<span class="tla">HAM</span>
				break;
	        case "country":
				driver.Nationality = tr["_"];
				break;
	        case "team":
				driver.Team = tr["_"];
				break;
	        case "car":
				driver.Car = tr.IMG[0]["$"].SRC;
				break;
        	case "points":
				driver.Points = tr["_"];
				break;
		}
	});
	
	return driver;
};

DriversDbWrap.prototype.AddCollectionFromTable = function (JsonTable) {
	var self = this;
	var trCollection = JsonTable.TBODY[0].TR;
	trCollection.forEach(function(trItem) {
		// esamino la tabella
		self.Add(ParseTrItem(trItem));
	});
	
};

DriversDbWrap.prototype.NavigateIntoInnerNode = function (nodeName, JsonNode) {
	if(JsonNode == null) {
		console.log("--end for null");
		return;
	}
	
	var self = this;
	var classobj =  JsonNode["$"];
	
	if( classobj != null && classobj.CLASS == standingsClass) {
		// vado secco al sodo
		self.AddCollectionFromTable(JsonNode.TABLE[0]);
	} else if(JsonNode[nodeName] != null){
		JsonNode[nodeName].forEach(function(JsonChildNode) {
			self.NavigateIntoInnerNode(nodeName, JsonChildNode);
		});
	}
};

DriversDbWrap.prototype.Parse = function (htmlString) {
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
			this.Add(GetNewItem());
			return;
		}
		
		var firstNodeCollection = jsonresult.HTML.BODY[0].DIV[0].MAIN[0].ARTICLE[0].DIV;
		firstNodeCollection.forEach(function (element) {
			self.NavigateIntoInnerNode("DIV", element);
		});
		
	});
   
	
};

module.exports = new DriversDbWrap();