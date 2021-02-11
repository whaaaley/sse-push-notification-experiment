
const message = () => {
  console.log('message')
  const date = Date.now()

  self.registration.showNotification('message', {
    body: 'hello from service worker' + date,
    tag: 'hello-world-' + date
  })
}

const oninstall = event => {
  const source = new EventSource('/sse')

  source.onmessage = async body => {
    switch (body.data) {
      case 'connect':
        console.log('Connected to SSE event source')
        break
      case 'push':
        console.log('Send a push notification')
        message()
        break
      default:
        console.log('Heartbeat from automatic reload', new Date())
    }
  }

  console.log('oninstall')

  // event.waitUntil(async () => {
  //   // await setTimeout(() => {}, 10000)
  // })

  // Other stuff

  const cachePromise = caches.open('v1')
    .then(cache => cache.add('./sw.js'))
    .catch(err => console.log('SW caching failed'))

  event.waitUntil(cachePromise)
}

// const onactivate = event => {
//   const cachePromise = caches.keys()
//     .then(list => Promise.all(list.map(key => caches.delete(key))))
//     .catch(err => console.log('SW cleanup failed'))

//   event.waitUntil(cachePromise)
// }

self.addEventListener('install', oninstall)
// self.addEventListener('activate', onactivate)

// self.addEventListener('push', onpush)
// self.addEventListener('install', event  => {
//   console.log('Hello from service worker')
// })
