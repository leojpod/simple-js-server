const http = require('http')
const fs = require('fs')

// this will create a server that will call the function each time it receive a request
const server = http.createServer(function (request, response) {
  console.log('incoming request')
  console.log(`${request.method} ${request.url}`)
  switch (request.method) {
    case 'GET':
      serveStaticFiles(request, response)
      break

    case 'POST':
      api(request, response)
      break
    default:
      response.writeHead(404)
      response.end('404 error page!!')
  }
})

function serveStaticFiles (request, response) {
  let path = `./public${request.url}`
  console.log('path -> ', path)
  fs.stat(path, (err, stat) => {
    if (err) {
      response.statusCode = 500
      response.end('woops what happened')
    }
    if (!stat) {
      response.statusCode = 404
      response.end(`The path ${path} does not match any file`)
      return
    }
    if (stat.isDirectory()) {
      path += 'index.html'
    }
    fs.readFile(path, (err, data) => {
      if (err) {
        response.statusCode = 500
        response.end(`Could not get the file: ${path}`)
      } else {
        response.end(data)
      }
    })
  }
  )
}

function api (request, response) {
  if (request.url !== '/api/process-text') {
    response.statusCode = 404
    response.end('the api cannot deal with that request')
  } else {
    // let's go on
    // we need to read the body then parse it then play with it
    let data = ''
    request.on('data', (pieceOfData) => {
      data += pieceOfData
    })
    request.on('end', () => {
      let jsonData = JSON.parse(data)
      let text = jsonData.content
      response.statusCode = 200
      let responseMsg = JSON.stringify({content: text.toUpperCase()})
      response.end(responseMsg)
    })
  }
}

server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function () {
  var addr = server.address()
  console.log(`simple server listening on ${process.env.IP || 3000}:${process.env.PORT || 3000} !`)
  console.log('addr -> ', addr)
})
