const { User } = require('@notez/domain/user')

module.exports = ({
  createUnitOfWork,
  userRepository,
  workspaceRepository,
  workspaceFactory,
}) =>
  async function createUser(userData) {
    return await createUnitOfWork(async () => {
      let user = await userRepository.store(buildUser(userData))

      const workspace = await workspaceRepository.store(
        workspaceFactory.createDefaultWorkspaceFor(user)
      )

      user = user.withSelectedWorkspace(workspace)

      return await userRepository.store(user)
    })
  }

const buildUser = (userData) =>
  User.buildStrict({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
  })
