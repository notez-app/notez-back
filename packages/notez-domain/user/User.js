const { attributes } = require('structure')
const InvalidUserError = require('./errors/InvalidUserError')

const User = attributes(
  {
    id: { type: Number },
    firstName: { type: String, empty: false, required: true },
    lastName: { type: String, empty: false, required: true },
    email: { type: String, empty: false, required: true, email: true },
    password: { type: String, empty: false, required: true, nullable: true },
    encryptedPassword: { type: String },
    selectedWorkspaceId: { type: Number },
  },
  {
    strictValidationErrorClass: InvalidUserError,
  }
)(
  class User {
    get fullName() {
      return `${this.firstName} ${this.lastName}`
    }

    withSelectedWorkspace(workspace) {
      return this.clone({
        selectedWorkspaceId: workspace.id,
      })
    }
  }
)

module.exports = User
