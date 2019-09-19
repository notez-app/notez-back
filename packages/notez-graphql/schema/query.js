const { gql } = require('apollo-server-express')

module.exports = gql`
  directive @auth on FIELD_DEFINITION

  type Query {
    currentUser: User! @auth
    selectedWorkspace: Workspace! @auth
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
