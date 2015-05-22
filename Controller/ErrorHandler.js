// Gestore degli errori	
var ErrorHandler = function () {
	
};

ErrorHandler.prototype.isPageNotFound = function (nodeContainer) {
	try {
		var h1node = nodeContainer.DIV[0].DIV[0].H1;
		return h1node != null && h1node.length > 0
			&& h1node[0]["$"].CLASS == "headline"
			&& h1node[0]["_"].toLowerCase().indexOf("we could") >= 0;
	} catch(error) {
		console.log(error);
		return true;
	}
};

ErrorHandler.prototype.onUrlKo = function (reason) {
	console.log("Url Ko  - ", reason);
};

ErrorHandler.prototype.onDbRejected = function (dbName, reason) {
	console.log("Can't populate ", dbName, " for ", reason);	
};
	
module.exports = new ErrorHandler();