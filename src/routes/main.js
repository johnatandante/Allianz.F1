var router = require('express').Router();

// Todo: Rewrite Url for AngularJs

router.get('/', function(request, response){
      response.send("Server up and running");
    });

module.exports = router;