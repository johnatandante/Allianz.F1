'use strict';
var server = require('./F1Server');

(new server(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP ))
  .Run();