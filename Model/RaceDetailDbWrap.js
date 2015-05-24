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
	
	this.GetNewItem = function () {
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
	
};

module.exports = new RaceDetailDbWrap();
