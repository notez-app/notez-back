const Awilix = require('awilix')
const { scopePerRequest } = require('awilix-express')
const { asValue, asClass, asFunction } = Awilix

const container = Awilix.createContainer()

const Server = require('./web/Server')
const { createApolloServer } = require('@notez/graphql')

container.register({
  server: asClass(Server),
  apolloServer: asFunction(createApolloServer),
  containerMiddleware: asValue(scopePerRequest(container)),
  testValue: asValue('world'),
})

module.exports = container
