const { DomainError } = require('../../error')

class UserNotFoundError extends DomainError {
  constructor() {
    super('User not found')
  }
}

UserNotFoundError.CODE = 'USER_NOT_FOUND'

module.exports = UserNotFoundError
