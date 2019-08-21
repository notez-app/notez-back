const container = require('./container')

const server = container.resolve('server')

server.start().catch((error) => {
  console.error(error)
  process.exit()
})
