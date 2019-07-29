const util = require('util')
const JWT = require('jsonwebtoken')

const sign = util.promisify(JWT.sign)
const verify = util.promisify(JWT.verify)

module.exports = ({ secret }) => ({
  sign: (payload, { options = {} } = {}) => sign(payload, secret, options),

  verify: (token, { options = {} } = {}) => verify(token, secret, options),
})
