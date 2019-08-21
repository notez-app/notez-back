const { User } = require('@notez/domain/user')

module.exports = ({ createUnitOfWork, userRepository }) => async (userData) => {
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  })

  return await createUnitOfWork(async () => {
    return await userRepository.add(user)
  })
}
