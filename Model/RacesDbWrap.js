// Races Db Wrap
var RacesDbWrap = function () {
	this.Races = [];	
};

RacesDbWrap.Add = function(race) {
	this.Races.push(race);
	
};

module.exports = new RacesDbWrap();