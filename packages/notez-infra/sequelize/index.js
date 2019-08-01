const Sequelize = require('sequelize')
const loadModels = require('./loadModels')
const config = require('./config')

const env = process.env.NODE_ENV || 'development'

const databaseConfig = config[env]

const sequelize = new Sequelize(databaseConfig)

const models = loadModels({ sequelize })

module.exports = {
  sequelize,
  models,
}
