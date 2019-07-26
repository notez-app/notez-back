const { createTestClient } = require('@notez/graphql')
const container = require('../../src/container')

module.exports = () =>
  createTestClient({
    context: () => ({
      container: container.createScope().cradle,
    }),
  })
