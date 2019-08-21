const makeUserRepository = require('./userRepository')
const { models: sequelizeModels } = require('../sequelize')
const { cryptoService } = require('../crypto')

describe('User :: userRepository', () => {
  let userRepository

  beforeAll(() => {
    userRepository = makeUserRepository({
      sequelizeModels,
      cryptoService,
    })
  })

  describe('#add', () => {
    describe('when there is no user with given email', () => {
      it('inserts, encrypts password and return the new user', async () => {
        const user = {
          name: 'User',
          email: 'user@email.com',
          password: '12345',
        }

        const newUser = await userRepository.add(user)

        expect(newUser).toHaveProperty('id')
        expect(newUser).toHaveProperty('name', 'User')
        expect(newUser).toHaveProperty('email', 'user@email.com')
        expect(newUser).toHaveProperty('password')
        expect(newUser.password).not.toBe('12345')

        await expect(userRepository.getById(newUser.id)).resolves.toBeTruthy()
      })
    })
  })

  describe('when there is a user with given email already', () => {
    it('fails and throws already in use error', async () => {
      const user = {
        name: 'User',
        email: 'user@email.com',
        password: '12345',
      }

      await userRepository.add(user)

      await expect(userRepository.add(user)).rejects.toHaveProperty(
        'code',
        'EMAIL_ALREADY_IN_USE'
      )
    })
  })
})
