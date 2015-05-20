// Gestore degli errori	
var ErrorHandler = function () {
	
};

ErrorHandler.prototype.isPageNotFound = function (nodeContainer) {
	try {
		return nodeContainer.DIV[0].DIV[0].H1 != null;
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