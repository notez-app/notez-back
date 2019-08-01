const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    # currentUser: User
    defaultWorkspace: Workspace!
    # workspace(id: Int): Workspace
  }

  type AuthToken {
    token: String!
  }

  type User {
    name: String!
    email: String!
  }

  type Workspace {
    name: String!
    pages: [Page]!
  }

  type Page {
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
