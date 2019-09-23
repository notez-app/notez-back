const makeCreateUser = require('./createUser')
const { User } = require('@notez/domain/user')
const { Workspace } = require('@notez/domain/workspace')

describe('User :: createUser', () => {
  describe('when user is valid', () => {
    it('creates user and get started namespace', async () => {
      const workspace = new Workspace({ id: 42 })

      const workspaceFactory = {
        createDefaultWorkspaceFor: jest.fn(() => workspace),
      }

      const workspaceRepository = {
        store: jest.fn((w) => w),
      }

      const createUser = makeCreateUser({
        createUnitOfWork: async (fn) => await fn(),
        userRepository: {
          store: (user) =>
            new User({
              ...user.attributes,
              id: 42,
            }),
        },
        workspaceFactory,
        workspaceRepository,
      })

      const user = await createUser({
        firstName: 'First',
        lastName: 'Last',
        email: 'user@email.com',
        password: 'pwd',
      })

      expect(user).toHaveProperty('id', 42)
      expect(user).toHaveProperty('firstName', 'First')
      expect(user).toHaveProperty('lastName', 'Last')
      expect(user).toHaveProperty('email', 'user@email.com')
      expect(user).toHaveProperty('password', 'pwd')
      expect(user).toHaveProperty('selectedWorkspaceId', 42)

      expect(workspaceFactory.createDefaultWorkspaceFor).toHaveBeenCalledWith(
        expect.any(User)
      )

      expect(workspaceRepository.store).toHaveBeenCalledWith(workspace)
    })
  })

  describe('when user is invalid', () => {
    it('fails', async () => {
      const createUser = makeCreateUser({
        createUnitOfWork: async (fn) => await fn(),
        userRepository: {
          store: (user) => user,
        },
      })

      const userPromise = createUser({
        firstName: 'First',
        lastName: 'Last',
        email: 'invalidEmail',
        password: 'pwd',
      })

      await expect(userPromise).rejects.toHaveProperty('details')
      await expect(userPromise).rejects.toHaveProperty('code', 'INVALID_USER')
    })
  })
})
