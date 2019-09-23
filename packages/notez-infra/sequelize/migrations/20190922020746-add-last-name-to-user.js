'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'lastName')
  },
}
