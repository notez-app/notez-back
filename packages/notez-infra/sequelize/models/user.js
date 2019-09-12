'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      selectedWorkspaceId: DataTypes.INTEGER,
    },
    {}
  )

  User.associate = function(models) {
    this.hasMany(models.Workspace)
  }

  return User
}
