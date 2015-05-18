var Dispatcher = require('./HttpDispatcher');

var DriversReader = require('./Controller/DriversReader');
DriversReader.Read();

var F1Server = function (dispatcherObj) {
  this.dispatcher = dispatcherObj; 
   
  // definisco un listener per la page2
  //dispatcher.onPost("/page2", function(req, res) {
  //  res.writeHead(200, {'Content-Type': 'text/plain'});
  //  res.end('Page two'); 
  //}); 
   
};

var bind = require('bind');

var WriteContent = function(res, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
};


var HomeResponse = function(req, res, chain) {
  var path = require('path');
  bind.toFile(path.join(__dirname, '/View/home.tpl'), 
    {
      id: 1
    }, function(data) {
      WriteContent(res, data);
    });
};

var DriversResponse = function(req, res, chain) {
  var path = require('path');
  var driversi = DriversReader.DbWrap.Drivers;
  bind.toFile(path.join(__dirname, '/View/drivers.tpl'), 
    { drivers : DriversReader.DbWrap.Drivers }
    , function(data) {
      WriteContent(res, data);
    });
};

var RacesResponse = function(req, res, chain) {
  var path = require('path');
  bind.toFile(path.join(__dirname, '/View/races.tpl'), 
    {
      id: 1
    }, function(data) {
      WriteContent(res, data);
    });
};

  
var AdminResponse = function(req, res, chain) {
  var path = require('path');
  bind.toFile(path.join(__dirname, '/View/admin.tpl'), {
        name: 'Dante',
    }, function(data) {
      WriteContent(res, data);
    });
};

Dispatcher.onGet("/home", HomeResponse); 
  // wrap home
Dispatcher.onGet("/", HomeResponse); 
Dispatcher.onGet("/index.htm", HomeResponse); 
Dispatcher.onGet("/index.html", HomeResponse); 
  
Dispatcher.onGet("/drivers", DriversResponse);
Dispatcher.onGet("/races", RacesResponse);
 //this.dispatcher.onGet("/score", HomeResponse);

Dispatcher.onGet("/admin", AdminResponse);

require('http').createServer(function (req, res) {
  Dispatcher.dispatch(req, res);
}).listen(1337, '127.0.0.1');

module.exports = new F1Server(Dispatcher);
