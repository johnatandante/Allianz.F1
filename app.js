// main
var Q = require('q');

var F1Server = require('./F1Server');

var result = Q.fcall(F1Server.Run)
	.then(F1Server.OnServerUp, console.log).done();
