const { gql } = require('apollo-server-express')

module.exports = gql`
  directive @auth on FIELD_DEFINITION

  type Query {
    currentUser: User! @auth
    selectedWorkspace: Workspace! @auth
  }

  type AuthToken {
    token: String!
  }

  type User {
    fullName: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Workspace {
    slug: String!
    name: String!
    pages: [Page]!
  }

  type Page {
    slug: String!
    icon: String
    name: String!
    blocks: [Block]!
  }

  union Block = Text

  enum BlockType {
    TEXT
  }

  type Text {
    type: BlockType!
    content: String!
  }
`
