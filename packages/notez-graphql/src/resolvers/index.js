const mutation = require('./mutation')

const resolvers = {
  Query: {
    hello: (p, a, { container, currentUserId }) => {
      return `Value: ${container.testValue} #${currentUserId}`
    },
  },
  Mutation: mutation,
}

module.exports = resolvers
