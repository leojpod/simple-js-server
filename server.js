const http = require('http');
const fs = require('fs');

// this will create a server that will call the function each time it receive a request
const server = http.createServer(function(request, response) {
  console.log('incoming request')
  console.log(`${request.method} ${request.url}`)
  switch (request.method) {
    case 'GET':
      serveStaticFiles(request, response)
      break;

    case 'POST':
      api(request, response)
      break
    default:
      response.writeHead(404)
      response.end('404 error page!!')
  }
});

function serveStaticFiles(request, response) {
  let path = `./public${request.url}`
  console.log('path -> ', path)
  fs.exists(path, (exist) => {
    console.log('exists? ', exist)
    if (!exist) {
      console.log('does not exists')
      response.statusCode = 404
      response.end(`Filename ${path} does not exist`)
      return
    }

    fs.stat(path, (err, stat) => {
      if (err) {
        response.statusCode = 500
        response.end('woops what happened')
      }
      if (stat.isDirectory()) {
        path += 'index.html'
      }
      fs.readFile(path, (err, data) => {
        if (err) {
          response.statusCode = 500
          response.end(`Could not get the file: ${path}`)
        }
        else {
          response.end(data)
        }
      })
    })
  })
}

function api(request, response) {
  console.log('api api')
  response.writeHead(200)
  response.end('hello world')
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log(`simple server listening on ${process.env.IP || 3000}:${process.env.PORT || 3000} !`)
  console.log('addr -> ', addr)
});
