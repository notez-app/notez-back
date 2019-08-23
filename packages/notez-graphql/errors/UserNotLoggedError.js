class UserNotLoggedError extends Error {
  constructor() {
    super('User is not logged')

    this.code = 'USER_NOT_LOGGED'
  }
}

module.exports = UserNotLoggedError
