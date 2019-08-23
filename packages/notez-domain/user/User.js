const { attributes } = require('structure')
const InvalidUserError = require('./errors/InvalidUserError')

const User = attributes({
  id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, email: true },
  password: { type: String, required: true },
})(
  class User {
    assertValidity() {
      const { valid, errors } = this.validate()

      if (!valid) {
        throw new InvalidUserError(errors)
      }
    }
  }
)

module.exports = User
