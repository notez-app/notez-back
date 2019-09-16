const createTestClient = require('../../support/createTestClient')
const { createUser } = require('../../support/authentication')

describe('Query :: currentUser', () => {
  describe('when user is logged', () => {
    it('returns the user data', async () => {
      const { gql, query } = await createUser()

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
    })
  })
})
