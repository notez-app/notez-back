const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const schemaDirectives = require('./directives')

module.exports = () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
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
