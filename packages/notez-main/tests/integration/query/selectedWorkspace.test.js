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
    it('returns the default workspace', async () => {
      const { query } = await createUser()

      const res = await query(SELECTED_WORKSPACE)

      expect(res.data).toEqual({
        selectedWorkspace: {
          name: 'Me',
        },
      })
    })
  })

  itRequiresValidationFor(SELECTED_WORKSPACE)
})
