class DomainError extends Error {
  constructor(message) {
    super(message)

    this.name = this.constructor.name
    this.code = this.constructor.CODE

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = DomainError
