'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const cls = require('cls-hooked')
    const namespace = cls.createNamespace('sequelize-namespace')
    Sequelize.useCLS(namespace)

    return queryInterface.sequelize.transaction(async () => {
      await queryInterface.sequelize.query(
        'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
      )

      return await queryInterface.addColumn('pages', 'uuid', {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
        allowNull: false,
        unique: true,
      })
    })
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('pages', 'uuid')
  },
}
