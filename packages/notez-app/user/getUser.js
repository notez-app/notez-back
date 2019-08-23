module.exports = ({ userRepository }) =>
  async function getUser(userId) {
    return await userRepository.getById(userId)
  }
