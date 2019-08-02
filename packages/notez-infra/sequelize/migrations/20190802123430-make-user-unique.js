'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      unique: true,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      unique: false,
    })
  },
}
