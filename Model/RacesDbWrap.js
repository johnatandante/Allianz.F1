// Races Db Wrap
var f1host = "www.formula1.com";
var raceTemplatePathUrl = "./racedetail?race={0}";

var RacesDbWrap = function () {
	this.Races = [];

	this.Clear = function() {
		this.Races = [];
	};
	
	this.Add = function(race) {
		this.Races.push(race);
	};

	this.GetNewItem = function() {
		return {		
			Location: "NoWhere",
			Img: "<nodata>",
			RaceName: "None",
			Winner: "Nope",
			RaceDate: "Never",
			DestinationUrl: "",
		};
	};
	
	this.SetLocationData = function(url, race) {
		var tmpStr = url.toLowerCase()
						.replace(".html", "");
						
		race.Location = tmpStr.substring(tmpStr.lastIndexOf("/") + 1, tmpStr.length);
		race.DestinationUrl = raceTemplatePathUrl.replace("{0}", race.Location);
	};
	
	this.SetImgData = function(url, race) {
		race.Img = "http://" + f1host + url;	
	};
	
};

module.exports = new RacesDbWrap();