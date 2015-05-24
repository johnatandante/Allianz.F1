// Xml Collection Navigator

var XmlCollectionNavigator = function() {
	// 
};

XmlCollectionNavigator.prototype.NavigateIntoInnerNode = function (nodeName, JsonNode, searchClass) {	
	var self = this;
	var classobj =  JsonNode["$"];
	
	if( classobj != null && classobj.CLASS == searchClass) {
		// vado secco al sodo
		return JsonNode;
	} else if(JsonNode[nodeName] != null) {
		var result = null;
		JsonNode[nodeName].forEach(function(JsonChildNode) {
			if(result == null)
				result = self.NavigateIntoInnerNode(nodeName, JsonChildNode, searchClass);
			// else skip
		});
		return result;
	} else {
		return null;
		
	}
}

var ParseTrItem = function (node, getNewItem) {
	var item = getNewItem();
	node.forEach(function(child) {
		
		var classobj =  child["$"];
		switch(classobj.CLASS) {
			case "number":
				item.Position = child.SPAN[0].SPAN[0]["_"];
				break;
        	case "name":
				item.FirstName = child.SPAN[0]["_"];
				item.LastName = child.SPAN[1]["_"];
				item.DriverTag = child.SPAN[2]["_"];
				break;
	        case "country":
				item.Country = child["_"];
				break;
	        case "team":
				item.Team = child["_"];
				break;
	        case "time":
				item.Time = child["_"];
				break;
        	case "points":
				item.Points = child["_"];
				break;
			case "race-winner":
				item.Winner = child["_"];
				break;
			case "teaser-date":
				item.RaceDate = child["_"];
				break;
		}
	});
	
	return item;
};

XmlCollectionNavigator.prototype.AddCollectionFromTable = function (JsonTable, dbWrap) {
	var trCollection = JsonTable.TBODY[0].TR;
	trCollection.forEach(function(trItem) {
		// esamino la tabella
		dbWrap.Add(ParseTrItem(trItem.TD, dbWrap.GetNewItem));
	});
	
};

XmlCollectionNavigator.prototype.GetNodeFromCollection = function (node, nodeName, className) {
	var result = null;
	
	node[nodeName].forEach(function(element) { 
		if(result == null && element["$"].CLASS == className){
			result = element;
		}
	});
	
	return result;
};

XmlCollectionNavigator.prototype.AddCollectionFromDiv = function (JsonDIVNode, dbWrap) {
	// la struttura è DIV.A.ARTICLE	.FIGURE	.IMG
	//								.SECTION.P
	//										.H4
	var anchorNode = JsonDIVNode.A[0];
	var sectionNode = anchorNode.ARTICLE[0].SECTION[0];
	
	var race = ParseTrItem(sectionNode.P, dbWrap.GetNewItem);
	race.RaceName = sectionNode.H4[0]["_"];
	
	dbWrap.SetLocationData(race, anchorNode["$"].HREF);
	
	var imgNode = self.GetNodeFromCollection(anchorNode.ARTICLE[0].FIGURE[0], "IMG", "hidden");
	if(imgNode != null)
		dbWrap.SetImgData(imgNode["$"].SRC, race);
	
	dbWrap.Add(race);
	
};

module.exports = new XmlCollectionNavigator();