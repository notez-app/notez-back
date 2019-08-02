const Awilix = require('awilix')
const { scopePerRequest } = require('awilix-express')
const { asValue, asClass, asFunction } = Awilix

const container = Awilix.createContainer()

const Server = require('./web/Server')
const jwtService = require('./web/jwtService')
const userTokenService = require('./web/userTokenService')
const { createApolloServer } = require('@notez/graphql')

const Sequelize = require('@notez/infra/sequelize')
const { userRepository } = require('@notez/infra/user')
const { cryptoService } = require('@notez/infra/crypto')

const { createUser, loginUser } = require('@notez/app/user')

// main
container.register({
  server: asClass(Server),
  containerMiddleware: asValue(scopePerRequest(container)),
  jwtService: asFunction(jwtService),
  userTokenService: asFunction(userTokenService),
  secret: asValue('53CR37'),
})

// app
container.register({
  createUser: asFunction(createUser),
  loginUser: asFunction(loginUser),
})

// GraphQL
container.register({
  apolloServer: asFunction(createApolloServer),
  testValue: asValue('world'),
})

// infra
container.register({
  sequelize: asValue(Sequelize.sequelize),
  sequelizeModels: asValue(Sequelize.models),
  createUnitOfWork: asFunction(Sequelize.unitOfWork),

  userRepository: asFunction(userRepository),

  cryptoService: asValue(cryptoService),
})

module.exports = container
