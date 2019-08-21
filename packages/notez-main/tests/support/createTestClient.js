const { createTestClient } = require('@notez/graphql')
const container = require('../../container')
const gql = String.raw

module.exports = () => ({
  ...createTestClient({
    context: () => ({
      container: container.createScope().cradle,
    }),
  }),
  gql,
})
