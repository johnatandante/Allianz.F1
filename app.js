// main
var Q = require('q');
//
var F1Sever = require('./F1Server');
Q.defer().promise.then(F1Sever.Run)
	.then(null, console.log)
	.done();

console.log("F1 Server run at ",  '127.0.0.1', ":", "1337");