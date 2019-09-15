const { attributes } = require('structure')
const InvalidUserError = require('./errors/InvalidUserError')

const User = attributes(
  {
    id: { type: Number },
    name: { type: String, required: true },
    email: { type: String, required: true, email: true },
    password: { type: String, empty: false, required: true, nullable: true },
    encryptedPassword: { type: String },
    selectedWorkspaceId: { type: Number },
  },
  {
    strictValidationErrorClass: InvalidUserError,
  }
)(
  class User {
    withSelectedWorkspace(workspace) {
      return this.clone({
        selectedWorkspaceId: workspace.id,
      })
    }
  }
)

module.exports = User
