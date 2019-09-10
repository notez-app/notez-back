'use strict'
module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define(
    'workspace',
    {
      name: DataTypes.STRING,
    },
    {}
  )

  Workspace.associate = function(models) {
    this.belongsTo(models.User)
    this.hasMany(models.Page)
  }

  return Workspace
}
