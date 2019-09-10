const makeCreateUser = require('./createUser')
const { User } = require('@notez/domain/user')

describe('User :: createUser', () => {
  describe('when user is valid', () => {
    it('creates user and get started namespace', async () => {
      const workspaceFactory = {
        getStartedWorkspace: jest.fn(() => 'workspace'),
      }

      const workspaceRepository = {
        add: jest.fn(),
      }

      const createUser = makeCreateUser({
        createUnitOfWork: async (fn) => await fn(),
        userRepository: {
          add: (user) =>
            new User({
              ...user.attributes,
              id: 42,
            }),
        },
        workspaceFactory,
        workspaceRepository,
      })

      const user = await createUser({
        name: 'name',
        email: 'user@email.com',
        password: 'pwd',
      })

      expect(user).toHaveProperty('id', 42)
      expect(user).toHaveProperty('name', 'name')
      expect(user).toHaveProperty('email', 'user@email.com')
      expect(user).toHaveProperty('password', 'pwd')

      expect(workspaceFactory.getStartedWorkspace).toHaveBeenCalledWith({
        userId: 42,
      })

      expect(workspaceRepository.add).toHaveBeenCalledWith('workspace')
    })
  })

  describe('when user is invalid', () => {
    it('fails', async () => {
      const createUser = makeCreateUser({
        createUnitOfWork: async (fn) => await fn(),
        userRepository: {
          add: (user) => user,
        },
      })

      const userPromise = createUser({
        name: 'name',
        email: 'invalidEmail',
        password: 'pwd',
      })

      await expect(userPromise).rejects.toHaveProperty('details')
      await expect(userPromise).rejects.toHaveProperty('code', 'INVALID_USER')
    })
  })
})
