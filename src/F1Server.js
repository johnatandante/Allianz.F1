'use strict';

var F1Server = function () {
  
  this.server_port = 8080;
  this.server_ip_address = "127.0.0.1";
  this.app = null;

  this.Run = function () {
    var self = this;
  
    self.server_port = process.env.OPENSHIFT_NODEJS_PORT || self.server_port;
    self.server_ip_address = process.env.OPENSHIFT_NODEJS_IP || self.server_ip_address;
    
    var express = require('express');

    self.app = express();
    self.app.get('/', function(request, response){
      response.send("Server "+self.server_ip_address+" up and running on port" + self.server_port);

    });
    self.app
      .listen(self.server_port, function(){
        console.log("listening on port " + self.server_port);

      });
    
  };
  
};

(new F1Server())
  .Run();
