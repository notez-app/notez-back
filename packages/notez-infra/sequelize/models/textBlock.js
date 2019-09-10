'use strict'
module.exports = (sequelize, DataTypes) => {
  const TextBlock = sequelize.define(
    'textBlock',
    {
      content: DataTypes.STRING,
    },
    {}
  )

  return TextBlock
}
