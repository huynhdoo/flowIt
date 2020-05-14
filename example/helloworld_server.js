var html = require('fs').readFileSync(__dirname+'/helloworld.html');
//var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/my_database');

var server = require('http').createServer(function(req, res){
  res.end(html);
});
server.listen(7070);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};
