const dataFaker = require('../dataFaker')

module.exports = (factory, { User }) =>
  factory.define('user', User, {
    firstName: dataFaker.first(),
    lastName: dataFaker.last(),
    email: dataFaker.email(),
    password: dataFaker.hash(),
  })
