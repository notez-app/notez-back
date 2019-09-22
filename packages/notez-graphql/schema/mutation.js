const { gql } = require('apollo-server-express')

module.exports = gql`
  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthToken!

    loginUser(email: String!, password: String!): AuthToken!
  }
`
