var path = require('path');
var Dispatcher = require('./HttpDispatcher');

var HttpDataClientParser = require('./Controller/HttpDataClientParser');
var DriversReader = require('./Controller/DriversReader');
var RacesReader = require('./Controller/RacesReader');
var RaceDetailReader = require('./Controller/RaceDetailReader');

var bind = require('bind');

var F1Server = function (dispatcherObj) {
  this.dispatcher = dispatcherObj; 
  
  this.server_port = 8080;
  this.server_ip_address = "127.0.0.1";
  
  // definisco un listener per la page2
  //dispatcher.onPost("/page2", function(req, res) {
  //  res.writeHead(200, {'Content-Type': 'text/plain'});
  //  res.end('Page two'); 
  //}); 
  
  this.Run = function (param) {
    var self = this;
      
    if(process == undefined) {
    	process = { };
    }
    self.server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    self.server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    
    require('http').createServer(function (req, res) {
      Dispatcher.dispatch(req, res);
      
    }).listen(this.server_port, this.server_ip_address);
    return self.server_ip_address+ ":" + self.server_port;
  };
  
};

var WriteContent = function(res, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
};

var HomeResponse = function(req, res, chain) {
  bind.toFile(path.join(__dirname, '/View/home.tpl'), 
    {
       title : "Allianz.F1 Home", 
        id: 1
    }, function(data) {
      WriteContent(res, data);
    });
};

var DriversResponse = function(req, res, chain) {
  
  HttpDataClientParser.Read(DriversReader, function() {
    bind.toFile(path.join(__dirname, '/View/drivers.tpl'), 
      { 
          title : "Allianz.F1 Drivers", 
          drivers : DriversReader.DbWrap.Drivers 
        }
      , function(data) {
        WriteContent(res, data);
      });
    });
};

var RacesResponse = function(req, res, chain) {
  try {
    HttpDataClientParser.Read(RacesReader, function() {
      bind.toFile(path.join(__dirname, '/View/races.tpl'), 
        {
          title : "Allianz.F1 Races", 
          races : RacesReader.DbWrap.Races
        }, function(data) {
          WriteContent(res, data);
        });
      });  
  } catch (error) {
    console.log(error);  
  }
  
  
};

var RacesDetailResponse = function(req, res, chain) {
  try {
    RaceDetailReader.SetRace(req.params.race);
    HttpDataClientParser.Read(RaceDetailReader,  function(){
      bind.toFile(path.join(__dirname, '/View/racedetail.tpl'), 
        {
          title : "Allianz.F1 Race " + RaceDetailReader.DbWrap.RaceDescription, 
          raceDescription : RaceDetailReader.DbWrap.RaceDescription,
          details : RaceDetailReader.DbWrap.RaceDetail
        }, function(data) {
          WriteContent(res, data);
        });
    });  
  } catch (error) {
    console.log(error);
  }
};

var AdminResponse = function(req, res, chain) {
  bind.toFile(path.join(__dirname, '/View/admin.tpl'), 
    {
    
        title : "Allianz.F1 Admin Page", 
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
Dispatcher.onGet("/racedetail", RacesDetailResponse);
 //this.dispatcher.onGet("/score", HomeResponse);

Dispatcher.onGet("/admin", AdminResponse);

F1Server.prototype.OnServerUp = function(message) {
  console.log("F1 Server up and running at ", message);
};

module.exports = new F1Server(Dispatcher);
