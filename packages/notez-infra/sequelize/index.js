const Sequelize = require('sequelize')
const cls = require('cls-hooked')
const loadModels = require('./loadModels')
const config = require('./config')
const unitOfWork = require('./unitOfWork')
const createTestUtils = require('./testing')

const env = process.env.NODE_ENV || 'development'

const databaseConfig = config[env]

const namespace = cls.createNamespace('sequelize-namespace')

Sequelize.useCLS(namespace)

const sequelize = new Sequelize({
  ...databaseConfig,
  define: {
    rejectOnEmpty: true,
  },
})

const models = loadModels({ sequelize })

const testing = createTestUtils(sequelize)

module.exports = {
  sequelize,
  models,
  unitOfWork,
  testing,
}
