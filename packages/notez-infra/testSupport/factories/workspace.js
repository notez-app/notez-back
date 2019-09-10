const dataFaker = require('../dataFaker')

module.exports = (factory, { Workspace }) =>
  factory.define('workspace', Workspace, {
    name: dataFaker.word(),
  })
