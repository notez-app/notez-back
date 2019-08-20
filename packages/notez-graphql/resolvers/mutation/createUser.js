module.exports = async function createUser(_, userData, { container }) {
  const user = await container.createUser(userData)

  const token = await container.userTokenService.generate(user)

  return token
}
