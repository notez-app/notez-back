const { User } = require('@notez/domain/user')

module.exports = ({ userRepository }) => async (userData) => {
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  })

  return userRepository.add(user)
}
