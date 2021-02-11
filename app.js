
const fs = require('fs')
const sse = require('./sse')

const index = fs.readFileSync('public/index.html')
const sw = fs.readFileSync('public/sw.js')

module.exports = (stream, headers) => {
  // Quick and dirty preflight
  // this is for file serving only
  // not required for sse
  if (headers[':method'] === 'preflight') {
    stream.respond({
      ':status': 200,
      'access-control-allow-origin': '*'
    })
    stream.end('200 OK')
    return // exit
  }

  // Quick and dirty route to SSE handler
  if (headers[':path'] === '/sse') {
    stream.respond({
      ':status': 200,
      'access-control-allow-origin': '*',
      'content-type': 'text/event-stream'
    })
    sse.handler(stream)
    return // exit
  }

  // Quick and file server
  // this is for file serving only
  // not required for sse
  if (headers[':path'] === '/') {
    stream.respond({
      ':status': 200,
      'access-control-allow-origin': '*',
      'content-type': 'text/html'
    })
    stream.end(index)
    return // exit
  }
  if (headers[':path'] === '/sw.js') {
    stream.respond({
      ':status': 200,
      'access-control-allow-origin': '*',
      'content-type': 'application/javascript'
    })
    stream.end(sw)
    return // exit
  }

  // Everything else is bad
  stream.respond({
    ':status': 400,
    'access-control-allow-origin': '*'
  })
  stream.end('400 Bad Request')
}
