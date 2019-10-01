'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workspaces', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('workspaces', 'slug')
  },
}
