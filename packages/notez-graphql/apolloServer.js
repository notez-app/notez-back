const createServer = require('./createServer')

module.exports = () =>
  createServer({
    context: async ({ req }) => {
      const context = {
        container: req.container.cradle,
      }

      const authHeader = req.headers.authorization || ''
      const [, currentToken] = authHeader.split(' ')

      if (currentToken) {
        const userTokenService = req.container.resolve('userTokenService')
        const currentUserId = await userTokenService.getId(currentToken)

        context.currentUserId = currentUserId
      }

      return context
    },
  })
