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

        await expect(
          cryptoService.compare('12345', newUser.password)
        ).resolves.toBeTruthy()

        await expect(userRepository.getById(newUser.id)).resolves.toBeTruthy()
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

  describe('#fromAuth', () => {
    describe('when user exists', () => {
      describe('when password is right', () => {
        it('returns the user', async () => {
          const user = await userRepository.add({
            name: 'User',
            email: 'user@email.com',
            password: '12345',
          })

          const userPromise = userRepository.fromAuth({
            email: 'user@email.com',
            password: '12345',
          })

          await expect(userPromise).resolves.toHaveProperty('id', user.id)
          await expect(userPromise).resolves.toHaveProperty('email', user.email)
        })
      })

      describe('when password is wrong', () => {
        it('fails and throws not found error', async () => {
          await userRepository.add({
            name: 'User',
            email: 'user@email.com',
            password: '12345',
          })

          const userPromise = userRepository.fromAuth({
            email: 'user@email.com',
            password: '54321',
          })

          await expect(userPromise).rejects.toHaveProperty(
            'code',
            'USER_NOT_FOUND'
          )
        })
      })
    })

    describe('when user does not exist', () => {
      it('fails and throws not found error', async () => {
        const userPromise = userRepository.fromAuth({
          email: 'user@email.com',
          password: '54321',
        })

        await expect(userPromise).rejects.toHaveProperty(
          'code',
          'USER_NOT_FOUND'
        )
      })
    })
  })
})
