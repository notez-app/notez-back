const fs = require('fs')
const path = require('path')

module.exports = ({ sequelize }) => {
  const loaded = {}
  const baseFolder = path.join(__dirname, 'models')

  fs.readdirSync(baseFolder)
    .filter((file) => !file.startsWith('.') && file.endsWith('.js'))
    .forEach((file) => {
      const model = sequelize['import'](path.join(baseFolder, file))
      loaded[model.name] = model
    })

  Object.keys(loaded).forEach((modelName) => {
    if (loaded[modelName].associate) {
      loaded[modelName].associate(loaded)
    }
  })

  return loaded
}
