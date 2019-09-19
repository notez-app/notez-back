const { createUser, CREATE_USER } = require('../../support/authentication')
const { createTestClient } = require('../../support/createTestClient')

describe('Query :: createUser', () => {
  describe('when all data are valid', () => {
    it('returns the token', async () => {
      const { token } = await createUser({
        name: 'The User',
        email: 'the@user.com',
        password: '12345',
      })

      expect(token).toBeTruthy()
    })
  })

  describe('when some data is invalid', () => {
    const assertInvalidUserError = (res, path) => {
      expect(res.errors).toEqual([
        expect.objectContaining({
          message: 'User is invalid',
        }),
      ])

      expect(res.errors[0].extensions.exception.details).toEqual(
        expect.arrayContaining([expect.objectContaining({ path })])
      )
    }

    describe('when name is missing', () => {
      it('returns an error', async () => {
        const { query } = createTestClient()

        const res = await query(CREATE_USER, {
          variables: {
            name: '',
            email: 'the@user.com',
            password: '12345',
          },
        })

        assertInvalidUserError(res, 'name')
      })
    })

    describe('when email is missing', () => {
      it('returns an error', async () => {
        const { query } = createTestClient()

        const res = await query(CREATE_USER, {
          variables: {
            name: 'The User',
            email: '',
            password: '12345',
          },
        })

        assertInvalidUserError(res, 'email')
      })
    })

    describe('when password is missing', () => {
      it('returns an error', async () => {
        const { query } = createTestClient()

        const res = await query(CREATE_USER, {
          variables: {
            name: 'The User',
            email: 'the@user.com',
            password: '',
          },
        })

        assertInvalidUserError(res, 'password')
      })
    })
  })

  describe('when email already exists', () => {
    it('returns an error', async () => {
      await createUser({ email: 'a@b.com' })

      const { query } = createTestClient()

      const res = await query(CREATE_USER, {
        variables: {
          name: 'The User',
          email: 'a@b.com',
          password: '12345',
        },
      })

      expect(res.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Email already in use',
          }),
        ])
      )
    })
  })
})
