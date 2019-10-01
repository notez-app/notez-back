'use strict'

const Slugify = require('sequelize-slugify')

module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define(
    'workspace',
    {
      name: DataTypes.STRING,
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {}
  )

  Slugify.slugifyModel(Workspace, {
    source: ['name'],
    slugOptions: { lower: true },
    overwrite: false,
  })

  Workspace.associate = function(models) {
    this.belongsTo(models.User)
    this.hasMany(models.Page)
  }

  return Workspace
}
