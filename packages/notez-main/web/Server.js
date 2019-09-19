const Express = require('express')

class Server {
  constructor({ apolloServer, containerMiddleware }) {
    this.express = Express()
    this.express.use(containerMiddleware)
    apolloServer.applyMiddleware({ app: this.express })
  }

  start() {
    return new Promise((resolve) => {
      const http = this.express.listen(3000, () => {
        const { port } = http.address()
        console.log(`[${process.pid}] Listening at port ${port}`)
        resolve()
      })
    })
  }
}

module.exports = Server
