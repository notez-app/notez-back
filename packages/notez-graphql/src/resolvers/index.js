const resolvers = {
  Query: {
    hello: (p, a, { container }) => `Value: ${container.testValue}`,
  },
}

module.exports = resolvers
