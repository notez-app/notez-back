const mutation = require('./mutation')
const queries = require('./query')

const resolvers = {
  Mutation: mutation,
  ...queries,
}

module.exports = resolvers
