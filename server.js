const http = require('http');

// this will create a server that will call the function each time it receive a request
const server = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write('Hello there!')
  response.end()
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log(`simple server listening on ${addr}:${process.env.PORT || 3000} !`)
});
