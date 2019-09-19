const {
  createUser,
  itRequiresValidationFor,
  gql,
} = require('../../support/authentication')

describe('Query :: currentUser', () => {
  const CURRENT_USER = gql`
    {
      currentUser {
        name
        email
      }
    }
  `

  describe('when user is logged', () => {
    it('returns the user data', async () => {
      const { query } = await createUser({
        name: 'The User',
        email: 'the@user.com',
      })

      const res = await query(CURRENT_USER)

      expect(res.data).toEqual({
        currentUser: {
          name: 'The User',
          email: 'the@user.com',
        },
      })
    })
  })

  itRequiresValidationFor(CURRENT_USER)
})
