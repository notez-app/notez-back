const { gql } = require('apollo-server-express')

module.exports = gql`
  type Mutation {
    createUser(name: String!, email: String!, password: String!): AuthToken!

    loginUser(email: String!, password: String!): AuthToken!
  }
`
