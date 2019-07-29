const { gql } = require('apollo-server-express')

const schema = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): AuthToken!

    loginUser(email: String!, password: String!): AuthToken!
  }

  type AuthToken {
    token: String!
  }

  type User {
    name: String!
    email: String!
  }
`

module.exports = schema
