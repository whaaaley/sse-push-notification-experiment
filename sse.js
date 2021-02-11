
const crypto = require('crypto')
const clients = new Map()

const reload = () => {
  for (const [key] of clients) {
    clients.get(key).write('data:reload\n\n')
  }
}

const handler = stream => {
  const id = crypto.randomBytes(6).toString('hex')

  clients.set(id, stream)
  stream.write('data:connect\n\n')

  // heartbeats can be completely empty, but i want to log when i get one
  // that requires adding data
  // heatbeats need to be sent out once every 2 minutes
  // but tcp can expire before that
  // 90 seconds is a safe middle ground
  const heartbeat = setInterval(() => {
    // stream.write(':\n\n') // this is an empty response
    stream.write('data:heartbeat\n\n')
  }, 90000)

  // be annoying and send a notification every 10 seconds
  const push = setInterval(() => {
    stream.write('data:push\n\n')
  }, 5000)

  stream.on('aborted', () => {
    clearInterval(heartbeat)
    clearInterval(push)
    clients.delete(id)
  })
}

module.exports = {
  handler: handler,
  reload: reload
}
