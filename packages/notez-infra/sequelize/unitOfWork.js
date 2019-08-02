module.exports = ({ sequelize }) => (run) => sequelize.transaction(run)
