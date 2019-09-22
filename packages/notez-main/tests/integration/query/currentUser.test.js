const {
  createUser,
  itRequiresValidationFor,
  gql,
} = require('../../support/authentication')

describe('Query :: currentUser', () => {
  const CURRENT_USER = gql`
    {
      currentUser {
        fullName
        firstName
        lastName
        email
      }
    }
  `

  describe('when user is logged', () => {
    it('returns the user data', async () => {
      const { query } = await createUser({
        firstName: 'The',
        lastName: 'User',
        email: 'the@user.com',
      })

      const res = await query(CURRENT_USER)

      expect(res.data).toEqual({
        currentUser: {
          fullName: 'The User',
          firstName: 'The',
          lastName: 'User',
          email: 'the@user.com',
        },
      })
    })
  })

  itRequiresValidationFor(CURRENT_USER)
})
