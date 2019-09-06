'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    const cls = require('cls-hooked')
    const namespace = cls.createNamespace('sequelize-namespace')
    Sequelize.useCLS(namespace)

    return queryInterface.sequelize.transaction(async () => {
      await queryInterface.createTable('blocks', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        pageId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        blockSubtypeId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        blockSubtype: {
          allowNull: false,
          type: Sequelize.STRING,
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

      await queryInterface.addIndex('blocks', [
        'id',
        'pageId',
        'blockSubtypeId',
        'blockSubtype',
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('blocks')
  },
}
