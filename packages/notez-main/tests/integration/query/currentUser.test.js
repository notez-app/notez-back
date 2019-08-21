const createTestClient = require('../../support/createTestClient')

// dummy test for now
describe('Query :: currentUser', () => {
  describe('when user is logged', () => {
    it('returns the user data', async () => {
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

      expect(res.data).toEqual({ currentUser: null })
    })
  })
})
