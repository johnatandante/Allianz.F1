var router = require('express').Router();
var path = require('path');

router
  .get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname + "/../index.html"));
  });

module.exports = router;