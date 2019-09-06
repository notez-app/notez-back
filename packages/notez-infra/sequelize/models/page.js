'use strict'
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    'page',
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      workspaceId: DataTypes.INTEGER,
    },
    {}
  )

  Page.hasBlocks = function(models, blockSubtype, as) {
    this.belongsToMany(models.TextBlock, {
      as,
      otherKey: 'blockSubtypeId',
      through: {
        model: models.Block,
        scope: { blockSubtype },
      },
    })
  }

  Page.associate = function(models) {
    this.belongsTo(models.Workspace)
    this.hasMany(models.Block)

    this.hasBlocks(models, 'Text', 'textBlocks')
  }

  return Page
}
