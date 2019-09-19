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
const { workspaceRepository } = require('@notez/infra/workspace')
const { pageRepository } = require('@notez/infra/page')
const { cryptoService } = require('@notez/infra/crypto')

const { createUser, getUser } = require('@notez/app/user')
const { loginUser } = require('@notez/app/auth')
const { getSelectedWorkspaceForUser } = require('@notez/app/workspace')
const { getPagesForWorkspace } = require('@notez/app/page')

const { workspaceFactory } = require('@notez/domain/workspace')

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
  getUser: asFunction(getUser),
  getSelectedWorkspaceForUser: asFunction(getSelectedWorkspaceForUser),
  getPagesForWorkspace: asFunction(getPagesForWorkspace),
})

container.register({
  workspaceFactory: asValue(workspaceFactory),
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
  workspaceRepository: asFunction(workspaceRepository),
  pageRepository: asFunction(pageRepository),

  cryptoService: asValue(cryptoService),
})

module.exports = container
