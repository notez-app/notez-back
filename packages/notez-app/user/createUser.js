const { User } = require('@notez/domain/user')

module.exports = ({
  createUnitOfWork,
  userRepository,
  workspaceRepository,
  workspaceFactory,
}) =>
  async function createUser(userData) {
    return await createUnitOfWork(async () => {
      const newUser = User.buildStrict({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })

      const user = await userRepository.add(newUser)

      const newWorkspace = workspaceFactory.getStartedWorkspace({
        userId: user.id,
      })

      await workspaceRepository.add(newWorkspace)

      return user
    })
  }
