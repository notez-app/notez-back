'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: DataTypes.STRING,
      lastName: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {}
  )

  User.associate = function(models) {
    this.hasMany(models.Workspace)
    this.SelectedWorkspace = this.belongsTo(models.Workspace, {
      as: 'selectedWorkspace',
      constraints: false,
    })
  }

  return User
}
