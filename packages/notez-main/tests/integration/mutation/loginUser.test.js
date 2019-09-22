const { createUser, CREATE_USER } = require('../../support/authentication')
const { createTestClient, gql } = require('../../support/createTestClient')

describe('Query :: loginUser', () => {
  const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        token
      }
    }
  `

  describe('when user exists', () => {
    describe('when password is right', () => {
      it('returns the token', async () => {
        const { mutate } = await createUser({
          firstName: 'The',
          lastName: 'User',
          email: 'the@user.com',
          password: '12345',
        })

        const res = await mutate(LOGIN_USER, {
          variables: { email: 'the@user.com', password: '12345' },
        })

        expect(res.data.loginUser.token).toBeTruthy()
      })
    })

    describe('when password is wrong', () => {
      it('returns an error', async () => {
        const { mutate } = await createUser({
          firstName: 'The',
          lastName: 'User',
          email: 'the@user.com',
          password: '12345',
        })

        const res = await mutate(LOGIN_USER, {
          variables: { email: 'the@user.com', password: '54321' },
        })

        expect(res.errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              message: 'User not found',
            }),
          ])
        )
      })
    })
  })

  describe('when user does not exist', () => {
    it('returns an error', async () => {
      const { mutate } = createTestClient()

      const res = await mutate(LOGIN_USER, {
        variables: { email: 'the@user.com', password: '12345' },
      })

      expect(res.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: 'User not found',
          }),
        ])
      )
    })
  })
})
