// Race Detail Db Wrap
var RaceDetailDbWrap = function () {
	this.RaceName = "";
	this.RaceDetail = [];
};

RaceDetailDbWrap.prototype.Add = function(race) {
	this.Races.push(race);
	
};

RaceDetailDbWrap.prototype.onDbRejected = function (reason) {
	console.log("Can't populate RaceDetailDbWrap for ", reason);	
};

RaceDetailDbWrap.prototype.Parse = function (htmlString) {
	var xml2js = require('xml2js');
	var options = {
		trim: true,
		strict: false,
	};
	
	//var self = this;
    var parser = new xml2js.Parser(options);
    parser.parseString(htmlString.substring(0, htmlString.length), function (err, jsonresult) {
		if(err){
			console.log(err);
			var detail = {
				Driver: "None",
				Position: -1,
				Points: -1,
				Time: "NoTime",
			};
			
			this.Add(detail);
			return;
		}
		
		//var firstNodeCollection = jsonresult.HTML.BODY[0].DIV[0].MAIN[0].DIV;
		//firstNodeCollection.forEach(function (element) {
		//	self.NavigateIntoInnerNode("DIV", element);
		//});
		
	});
  	
};

module.exports = new RaceDetailDbWrap();
