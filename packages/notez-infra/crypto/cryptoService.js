const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = {
  hash: (payload) => bcrypt.hash(payload, 10),
}
