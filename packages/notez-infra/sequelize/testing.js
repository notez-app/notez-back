module.exports = (sequelize) => ({
  cleanDatabase: () => sequelize.truncate({ cascade: true }),

  closeConnection: () => sequelize.close(),
})
