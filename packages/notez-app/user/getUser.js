module.exports = ({ userRepository }) => async (userId) => {
  return await userRepository.getById(userId)
}
