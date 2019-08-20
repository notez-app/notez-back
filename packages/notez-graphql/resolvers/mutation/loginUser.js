module.exports = async function loginUser(_, authData, { container }) {
  const user = await container.loginUser(authData)

  const token = await container.userTokenService.generate(user)

  return token
}
