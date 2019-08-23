const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = {
  hash: (payload) => bcrypt.hash(payload, saltRounds),

  compare: (plain, hashed) => bcrypt.compare(plain, hashed),
}
