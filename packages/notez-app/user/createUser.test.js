const makeCreateUser = require('./createUser')

describe('User :: createUser', () => {
  describe('when user is valid', () => {
    it('delegates to user repository', async () => {
      const createUser = makeCreateUser({
        createUnitOfWork: async (fn) => await fn(),
        userRepository: {
          add: (user) => user,
        },
      })

      const user = await createUser({
        name: 'name',
        email: 'user@email.com',
        password: 'pwd',
        other: 'not used',
      })

      expect(user).toHaveProperty('name', 'name')
      expect(user).toHaveProperty('email', 'user@email.com')
      expect(user).toHaveProperty('password', 'pwd')
      expect(user).not.toHaveProperty('other')
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
