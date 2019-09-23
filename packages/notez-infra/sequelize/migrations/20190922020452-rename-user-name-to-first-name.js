'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'name', 'firstName')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'firstName', 'name')
  },
}
