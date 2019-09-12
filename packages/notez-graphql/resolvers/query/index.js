const fs = require('fs')
const path = require('path')

const baseFolder = __dirname

fs.readdirSync(baseFolder)
  .filter(
    (file) =>
      file !== 'index.js' && !file.startsWith('.') && file.endsWith('.js')
  )
  .forEach((fileName) => {
    const [typeName] = fileName.split('.')

    exports[typeName] = require(path.join(baseFolder, fileName))
  })
