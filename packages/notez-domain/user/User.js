const { attributes } = require('structure')
const InvalidUserError = require('./errors/InvalidUserError')

const User = attributes(
  {
    id: { type: Number },
    name: { type: String, required: true },
    email: { type: String, required: true, email: true },
    password: { type: String, required: true },
  },
  {
    strictValidationErrorClass: InvalidUserError,
  }
)(class User {})

module.exports = User
