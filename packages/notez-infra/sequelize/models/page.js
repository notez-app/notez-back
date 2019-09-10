'use strict'

const { Block } = require('@notez/domain/page')

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
    return this.belongsToMany(models.TextBlock, {
      as,
      otherKey: 'blockSubtypeId',
      through: {
        model: models.Block,
        scope: { blockSubtype: Block.BlockTypes[blockSubtype] },
      },
    })
  }

  Page.associate = function(models) {
    this.Workspace = this.belongsTo(models.Workspace)
    this.Blocks = this.hasMany(models.Block)

    this.TextBlocks = this.hasBlocks(models, 'Text', 'textBlocks')

    this.BlockSubtypes = [this.TextBlocks]
  }

  return Page
}
