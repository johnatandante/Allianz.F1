// Race Detail Db Wrap
var RaceDetailDbWrap = function () {
	this.RaceName = "";
	this.RaceDescription = "";
	this.RaceDetail = [];
	
	this.Clear = function() {
		this.RaceDetail = [];
		this.RaceDescription = "";
		this.RaceName = "";
	};
	
	this.Add = function(race) {
		this.RaceDetail.push(race);
	};

};

module.exports = new RaceDetailDbWrap();
