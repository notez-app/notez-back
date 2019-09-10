'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    const cls = require('cls-hooked')
    const namespace = cls.createNamespace('sequelize-namespace')
    Sequelize.useCLS(namespace)

    return queryInterface.sequelize.transaction(async () => {
      await queryInterface.createTable('pages', {
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
        icon: {
          type: Sequelize.STRING,
        },
        workspaceId: {
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

      await queryInterface.addIndex('pages', ['id', 'workspaceId'])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pages')
  },
}
