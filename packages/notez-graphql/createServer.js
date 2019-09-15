const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const schemaDirectives = require('./directives')

module.exports = (options) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    ...options,
  })
