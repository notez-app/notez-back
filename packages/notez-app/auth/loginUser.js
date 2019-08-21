module.exports = ({ userRepository }) => async (authData) => {
  return await userRepository.fromAuth({
    email: authData.email,
    password: authData.password,
  })
}
