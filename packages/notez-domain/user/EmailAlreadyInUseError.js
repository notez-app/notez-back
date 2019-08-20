const { DomainError } = require('../error')

class EmailAlreadyInUseError extends DomainError {
  constructor() {
    super('Email already in use')
  }
}

EmailAlreadyInUseError.CODE = 'EMAIL_ALREADY_IN_USE'

module.exports = EmailAlreadyInUseError
