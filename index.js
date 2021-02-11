
const fs = require('fs')
const http = require('http2')

const app = require('./app')

const server = http.createSecureServer({
  cert: fs.readFileSync('localhost.crt'),
  key: fs.readFileSync('localhost.key')
})

server.on('error', err => {
  console.error(err)
})

server.on('stream', (stream, headers) => {
  console.log(headers)

  try {
    app(stream, headers)
  } catch (err) {
    console.log(err)
  }
})

server.listen(3000)
