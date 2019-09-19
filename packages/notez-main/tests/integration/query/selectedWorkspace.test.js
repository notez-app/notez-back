const {
  createUser,
  itRequiresValidationFor,
  gql,
} = require('../../support/authentication')

describe('Query :: selectedWorkspace', () => {
  const SELECTED_WORKSPACE = gql`
    {
      selectedWorkspace {
        name
      }
    }
  `

  describe('when user has just been created', () => {
    it('returns the the Get Started workspace', async () => {
      const { query } = await createUser()

      const res = await query(SELECTED_WORKSPACE)

      expect(res.data).toEqual({
        selectedWorkspace: {
          name: 'Get Started',
        },
      })
    })
  })

  itRequiresValidationFor(SELECTED_WORKSPACE)
})
