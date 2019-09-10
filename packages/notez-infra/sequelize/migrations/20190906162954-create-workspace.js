'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    const cls = require('cls-hooked')
    const namespace = cls.createNamespace('sequelize-namespace')
    Sequelize.useCLS(namespace)

    return queryInterface.sequelize.transaction(async () => {
      await queryInterface.createTable('workspaces', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })

      await queryInterface.addIndex('workspaces', ['id', 'userId'], {
        unique: true,
      })
    })
  },
  down: (queryInterface, _) => {
    return queryInterface.dropTable('workspaces')
  },
}
