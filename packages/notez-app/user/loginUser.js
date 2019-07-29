module.exports = ({ userRepository }) => async (authData) => {
  return userRepository.fromAuth({
    email: authData.email,
    password: authData.password,
  })
}
