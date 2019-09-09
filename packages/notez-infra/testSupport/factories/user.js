const dataFaker = require('../dataFaker')

module.exports = (factory, { User }) =>
  factory.define('user', User, {
    name: dataFaker.name(),
    email: dataFaker.email(),
    password: dataFaker.hash(),
  })
