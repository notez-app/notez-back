'use strict'
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    'block',
    {
      pageId: DataTypes.INTEGER,
      blockSubtypeId: DataTypes.INTEGER,
      blockSubtype: DataTypes.STRING,
    },
    {}
  )

  return Block
}
