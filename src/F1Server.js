var express = require('express');
var mainRoutes = require('./routes/main');
var apiRoutes = require('./routes/api');
var path = require('path');

module.exports = function (port, ip_address) {
  
  this.server_port = port || 8080;
  this.server_ip_address = ip_address || "127.0.0.1";

  this.Run = function () {
    var self = this;
    var app = express();

    app.use(express.static(path.join(__dirname, 'app')))
    app.use(express.static(path.join(__dirname, 'css')))
    app.use(express.static(path.join(__dirname, 'libs')))
    app.use(express.static(path.join(__dirname, 'assets')))

    app.use('/', mainRoutes);
    app.use('/api', apiRoutes);

    app
      .listen(self.server_port, function(){
        console.log("listening on port " + self.server_port);

      });
    
    return app;

  };
  
};
