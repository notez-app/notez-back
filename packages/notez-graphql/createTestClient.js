const { createTestClient } = require('apollo-server-testing')
const createServer = require('./createServer')

module.exports = (options) => createTestClient(createServer(options))
