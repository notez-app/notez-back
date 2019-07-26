const createServer = require('./createServer')

module.exports = () =>
  createServer({
    context: ({ req }) => ({
      container: req.container.cradle,
    }),
  })
