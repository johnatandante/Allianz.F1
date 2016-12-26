var router = require('express').Router();

router.get('/', function(request, response){
      response.send("Server up and running");
    });

module.exports = router;