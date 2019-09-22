const factory = require('../testSupport/factory')
const { User } = require('@notez/domain/user')
const makeUserRepository = require('./userRepository')
const { models: sequelizeModels } = require('../sequelize')
const { cryptoService } = require('../crypto')

const { fromDatabase } = makeUserRepository

describe('User :: userRepository', () => {
  let userRepository

  beforeAll(() => {
    userRepository = makeUserRepository({
      sequelizeModels,
      cryptoService,
    })
  })

  describe('#store', () => {
    describe('when user is new', () => {
      describe('when there is no user with given email', () => {
        it('creates, encrypts password and return the new user', async () => {
          const user = new User({
            firstName: 'User',
            lastName: 'Name',
            email: 'user@email.com',
            password: '12345',
          })

          const newUser = await userRepository.store(user)

          expect(newUser).toHaveProperty('id')
          expect(newUser).toHaveProperty('firstName', 'User')
          expect(newUser).toHaveProperty('lastName', 'Name')
          expect(newUser).toHaveProperty('email', 'user@email.com')

          await expect(
            cryptoService.compare('12345', newUser.encryptedPassword)
          ).resolves.toBeTruthy()

          await expect(userRepository.getById(newUser.id)).resolves.toBeTruthy()
        })
      })

      describe('when there is a user with given email already', () => {
        it('fails and throws already in use error', async () => {
          const user = new User({
            firstName: 'User',
            lastName: 'Name',
            email: 'user@email.com',
            password: '12345',
          })

          await userRepository.store(user)

          await expect(userRepository.store(user)).rejects.toHaveProperty(
            'code',
            'EMAIL_ALREADY_IN_USE'
          )
        })
      })
    })

    describe('when user already exists', () => {
      let dbUser

      beforeEach(async () => {
        dbUser = await factory.create('user', {
          firstName: 'The',
          lastName: 'User',
          email: 'me@email.com',
          password: '123',
        })
      })

      describe('when non-password attribute is changed', () => {
        it('updates only the attribute in the database', async () => {
          const user = fromDatabase(dbUser).clone({
            lastName: 'Person',
          })

          const updatedUser = await userRepository.store(user)

          expect(updatedUser).toHaveProperty('firstName', 'The')
          expect(updatedUser).toHaveProperty('lastName', 'Person')
          expect(updatedUser).toHaveProperty('email', 'me@email.com')
          expect(updatedUser).toHaveProperty('encryptedPassword', '123')
          await expect(dbUser.reload()).resolves.toHaveProperty(
            'lastName',
            'Person'
          )
        })
      })

      describe('when password attribute is changed', () => {
        it('updates the password and hashes it', async () => {
          const user = fromDatabase(dbUser).clone({
            password: 'new password',
          })

          const updatedUser = await userRepository.store(user)

          expect(updatedUser.firstName).toEqual('The')
          expect(updatedUser.lastName).toEqual('User')
          expect(updatedUser.email).toEqual('me@email.com')

          await expect(
            cryptoService.compare('new password', updatedUser.encryptedPassword)
          ).resolves.toBeTruthy()

          await dbUser.reload()

          await expect(
            cryptoService.compare('new password', dbUser.password)
          ).resolves.toBeTruthy()

          expect(dbUser).toHaveProperty('firstName', 'The')
          expect(dbUser).toHaveProperty('lastName', 'User')
        })
      })

      describe('when there is no user with given email', () => {
        it('updates the email', async () => {
          const user = fromDatabase(dbUser).clone({
            email: 'new@email.com',
          })

          const newUser = await userRepository.store(user)

          expect(newUser).toHaveProperty('email', 'new@email.com')

          await dbUser.reload()

          expect(dbUser).toHaveProperty('email', 'new@email.com')
        })
      })

      describe('when there is a user with given email already', () => {
        it('fails and throws already in use error', async () => {
          await factory.create('user', { email: 'new@email.com' })

          const user = fromDatabase(dbUser).clone({
            email: 'new@email.com',
          })

          await expect(userRepository.store(user)).rejects.toHaveProperty(
            'code',
            'EMAIL_ALREADY_IN_USE'
          )

          await dbUser.reload()

          expect(dbUser).toHaveProperty('email', 'me@email.com')
        })
      })
    })
  })

  describe('#fromAuth', () => {
    describe('when user exists', () => {
      describe('when password is right', () => {
        it('returns the user', async () => {
          const user = await userRepository.store(
            new User({
              firstName: 'User',
              lastName: 'Name',
              email: 'user@email.com',
              password: '12345',
            })
          )

          const userPromise = userRepository.fromAuth({
            email: 'user@email.com',
            password: '12345',
          })

          await expect(userPromise).resolves.toHaveProperty('id', user.id)
          await expect(userPromise).resolves.toHaveProperty('firstName', 'User')
          await expect(userPromise).resolves.toHaveProperty('lastName', 'Name')
          await expect(userPromise).resolves.toHaveProperty(
            'email',
            'user@email.com'
          )
        })
      })

      describe('when password is wrong', () => {
        it('fails and throws not found error', async () => {
          await userRepository.store(
            new User({
              firstName: 'User',
              lastName: 'Name',
              email: 'user@email.com',
              password: '12345',
            })
          )

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
