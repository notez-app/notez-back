const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

module.exports = (options) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    ...options,
  })
