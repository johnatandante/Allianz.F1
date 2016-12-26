module.exports = function (port, ip_address) {
  
  this.server_port = port || 8080;
  this.server_ip_address = ip_address || "127.0.0.1";

  this.Run = function () {
    var self = this;

    var express = require('express');
    var main = require('./routes/main');

    var app = express();

    app.use('/', main);

    app
      .listen(self.server_port, function(){
        console.log("listening on port " + self.server_port);

      });
    
    return app;

  };
  
};
