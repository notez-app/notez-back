const { DomainError } = require('../../error')

class InvalidUserError extends DomainError {
  constructor(validationErrors) {
    super('User is invalid')

    this.details = validationErrors
  }
}

InvalidUserError.CODE = 'INVALID_USER'

module.exports = InvalidUserError
