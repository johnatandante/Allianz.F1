// Db Interface, still use MongoDb
var mongoose = require('mongoose');

//process.env.OPENSHIFT_NODEJS_PORT;
//$OPENSHIFT_MONGODB_DB_HOST
//$OPENSHIFT_MONGODB_DB_PORT
var host = process.env.OPENSHIFT_MONGODB_DB_HOST || "ds037622.mongolab.com";
var port = process.env.$OPENSHIFT_MONGODB_DB_PORT || 37622;

var Db = function () {
	var self = this;
	this.utenza = "read:only@";
	this.app =  "allianzf1";
	
	this.OnSuccess = function () { };
	
	this.db = mongoose.connection;
	this.db.on('error', console.error.bind(console, 'connection error:'));
	this.db.once('open', function (callback) {
	  // yay!
	  console.log("Connessione avvenuta con successo!");
	  self.OnSuccess();
	});
	
	this.Connect = function (onSuccess) {
		this.OnSuccess = onSuccess;
		var connectionstring = 'mongodb://' + this.utenza + host + ':' + port + '/' + this.app;
		console.log("Connecting to: ", connectionstring);
		mongoose.connect(connectionstring);
	};
	
	//var p = process;
	if(process.execArgv.length > 0) {
		if (process.execArgv[0].search("debug") <= 0){
			this.app = "";
			this.utenza = "";
		}
		
	}
	
};

module.exports = new Db();