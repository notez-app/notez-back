module.exports = ({ sequelize }) =>
  function createUnitOfWork(run) {
    return sequelize.transaction(run)
  }
