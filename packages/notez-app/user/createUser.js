const { User } = require('@notez/domain/user')

module.exports = ({
  createUnitOfWork,
  userRepository,
  workspaceRepository,
  workspaceFactory,
}) =>
  async function createUser(userData) {
    return await createUnitOfWork(async () => {
      const user = await userRepository.store(buildUser(userData))

      const workspace = await workspaceRepository.store(
        workspaceFactory.getStartedWorkspaceFor(user)
      )

      return user
    })
  }

const buildUser = (userData) =>
  User.buildStrict({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  })
