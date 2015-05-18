// Traditional dispatcher
var HttpDispatcher = function() {
  this.listeners = { get: [ ], post: [ ] };
  this.errorListener = function(req, res) { 
    console.log("Non trovato ");
    res.writeHead(404, {'Content-Type': 'text/plain'});
    //res.write(file, 'binary');
    res.end(); 
    
  };
  this.staticFolderPrefix = '/Content'; 
  this.cssFolderPrefix = '/Css'; 
};

HttpDispatcher.prototype.on = function(method, url, cb) {
  this.listeners[method].push({
    cb: cb,
    url: url 
  }); 
  
};
 
HttpDispatcher.prototype.onGet = function(url, cb) {
  this.on('get', url, cb); 
};
 
HttpDispatcher.prototype.onPost = function(url, cb) {
  this.on('post', url, cb); 
};

HttpDispatcher.prototype.onError = function(cb) {
  this.errorListener = cb; 
};

HttpDispatcher.prototype.setStatic = function(folder) {
  this.staticFolderPrefix = folder; 
};

HttpDispatcher.prototype.staticListener = function(req, res) {
  var url = require('url').parse(req.url, true);
  var path = require('path');
  var filename = path.join(__dirname, url.pathname);
  
  console.log("Read from Static listener at ", filename);
  var errorListener = this.errorListener;
  var fs = require('fs');
  
  fs.readFile(filename, 'utf8', function(err, file) {
    if(err) {
      errorListener(req, res);
      return; 
    }
    var mimetype = require('mime').lookup(filename);
    res.writeHeader(200, 
                    { "Content-Type": mimetype });
    switch(mimetype){
      case "text/css":
        res.write(file);
        break;
      default:
        res.write(file, 'binary');
        break;
      
    }
    res.end(); 
  }); 
};

HttpDispatcher.prototype.dispatch = function(req, res) {
  var parsedUrl = require('url').parse(req.url, true);
  // console.log("Dispatch url: ", parsedUrl);
  if(parsedUrl.pathname.indexOf(this.staticFolderPrefix) == 0
    || parsedUrl.pathname.indexOf(this.cssFolderPrefix) == 0) {
    this.staticListener(req, res);
    return; 
  }
  
  var key = parsedUrl.pathname;
  var method = req.method.toLowerCase();
  if(!this.listeners[method]) {
    this.errorListener(req, res);  
    return; 
  }
  
  // Lettura dei parametri in Post o in Get, a seconda di 
  // come li ho registrati
  if(method == 'post') {
     var body = '';
     req.on('data', function(data) {
          body += data;
     });
      
     req.on('end', function() {
         var post = require('querystring').parse(body);
         req.params = post; //aggancio un nuovo attributo
     });
  } else {
     var url_parts = require('url').parse(req.url, true);
     req.params = url_parts.query; //aggancio un nuovo attributo
  }
   
  this.listeners[method].forEach(function(element) {
    if(element.url == key){
      element.cb(req, res);
      return;
    }
  }, this);
  
};

module.exports = new HttpDispatcher();