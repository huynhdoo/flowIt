/***********************
* Initialize http server
************************/
var fs = require('fs'),
    path = require('path');

var http = require('http').createServer(function(request, response) {
    console.log('request for : ' + request.url);
    var filePath = path.join('.', request.url);
    if (filePath === './') {
        filePath = './reader.html';
    }

    path.exists(filePath, function(exists) {
        if (exists) {
            var extname = path.extname(filePath);
            var contentType = 'text/html';
            switch (extname) {
              case '.js':
                  contentType = 'text/javascript';
                  break;
              case '.css':
                  contentType = 'text/css';
                  break;
            }
            //console.log(contentType)

            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            console.log('Something goes wrong ;(');
            response.writeHead(404);
            response.end();
        }
    });
});
http.listen(7070);
console.log('Server running on port 7070!');

/**************************
 * Initialize now.js object
 **************************/
var nowjs = require("now");
var everyone = nowjs.initialize(http);

everyone.now.focus = 0;

everyone.now.distributeMessage = function(action, message){
  console.log('distributeMessage : ' + action + ' ' + message)
  everyone.now.createMessage(action, message);
};

everyone.now.distributeRenderMessage = function(action, message, order){
  console.log('distributeRenderMessage : ' + action + ', ' + message + ', ' + order)
  everyone.now.renderMessage(action, message, order);
};