module.exports = ({ userRepository }) =>
  async function loginUser(authData) {
    return await userRepository.fromAuth({
      email: authData.email,
      password: authData.password,
    })
  }
