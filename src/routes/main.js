var router = require('express').Router();
var path = require('path');

// Todo: Rewrite Url for AngularJs

router.get('/', function (request, response) {
  var p = __dirname + "/../index.html";
  response.sendFile(path.resolve(p));
});

module.exports = router;