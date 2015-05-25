// Drivers Db Wrap
var DriversDbWrap = function () {
	this.Drivers = [];	
	
	this.Clear = function() {
		this.Drivers = [];
	};
	
	this.Add = function(driver) {
		this.Drivers.push(driver);
	
	};
	
	this.GetNewItem = function() {
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
};

module.exports = new DriversDbWrap();