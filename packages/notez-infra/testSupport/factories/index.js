const fs = require('fs')
const path = require('path')

const baseFolder = __dirname
const { models } = require('../../sequelize')

module.exports = (factoryGirl) => {
  fs.readdirSync(baseFolder)
    .filter(
      (file) =>
        file !== 'index.js' && !file.startsWith('.') && file.endsWith('.js')
    )
    .forEach((file) => {
      const factoryPath = path.join(baseFolder, file)
      const factory = require(factoryPath)

      factory(factoryGirl, models)
    })

  return factoryGirl
}
