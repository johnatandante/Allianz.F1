var router = require('express').Router();

router.get('/', function(request, response){
      response.status(404).send('Api not yet implemented');
    });

module.exports = router;