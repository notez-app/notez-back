const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { UserNotLoggedError } = require('../errors')

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field

    field.resolve = async function auth(parent, args, context) {
      if (!context.currentUserId) {
        throw new UserNotLoggedError()
      }

      if (resolve) {
        return await resolve(parent, args, context)
      }

      return parent[field.name]
    }
  }
}

module.exports = AuthDirective
