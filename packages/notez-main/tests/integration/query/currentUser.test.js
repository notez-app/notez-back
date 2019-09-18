const { createUser } = require('../../support/authentication')
const createTestClient = require('../../support/clientTestClient')

describe('Query :: currentUser', () => {
  describe('when user is logged', () => {
    it('returns the user data', async () => {
      const { gql, query } = await createUser({
        name: 'The User',
        email: 'the@user.com',
      })

      const res = await query({
        query: gql`
          {
            currentUser {
              name
              email
            }
          }
        `,
      })

      expect(res.data).toEqual({
        currentUser: {
          name: 'The User',
          email: 'the@user.com',
        },
      })
    })
  })

  describe('when user is not logged', () => {
    it('returns an error', async () => {
      const { gql, query } = createTestClient()

      const res = await query({
        query: gql`
          {
            currentUser {
              name
              email
            }
          }
        `,
      })

      expect(res.data).toBeNull()

      expect(res.errors).toEqual([
        expect.objectContaining({
          message: 'User is not logged',
        }),
      ])
    })
  })
})
