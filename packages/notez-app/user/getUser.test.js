const makeGetUser = require('./getUser')

describe('User :: getUser', () => {
  describe('when user exists', () => {
    it('returns the user', async () => {
      const userRepository = {
        getById: jest.fn(() => ({
          name: 'The User',
        })),
      }

      const getUser = makeGetUser({
        userRepository,
      })

      const user = await getUser(123)

      expect(userRepository.getById).toHaveBeenCalledWith(123)
      expect(user).toEqual({ name: 'The User' })
    })
  })

  describe('when user does not exist', () => {
    it('throws an error', async () => {
      const userRepository = {
        getById: jest.fn(() => {
          throw new Error('User does not exist')
        }),
      }

      const getUser = makeGetUser({
        userRepository,
      })

      const userPromise = getUser(123)

      expect(userRepository.getById).toHaveBeenCalledWith(123)
      await expect(userPromise).rejects.toThrow('User does not exist')
    })
  })
})
