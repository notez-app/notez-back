const fs = require('fs')
const path = require('path')

const baseFolder = __dirname

fs.readdirSync(baseFolder)
  .filter(
    (file) =>
      file !== 'index.js' && !file.startsWith('.') && file.endsWith('.js')
  )
  .forEach((fileName) => {
    const [directiveName] = fileName.split('.')

    exports[directiveName] = require(path.join(baseFolder, fileName))
  })
