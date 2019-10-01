const {
  createUser,
  itRequiresValidationFor,
  gql,
} = require('../../../support/authentication')

describe('Query :: selectedWorspace/pages', () => {
  const SELECTED_WORKSPACE_PAGES = gql`
    {
      selectedWorkspace {
        pages {
          slug
          icon
          name
          blocks {
            __typename
            ... on Text {
              content
            }
          }
        }
      }
    }
  `

  describe('when user was just created and is logged', () => {
    it('returns Get Stated page', async () => {
      const { query } = await createUser()

      const res = await query(SELECTED_WORKSPACE_PAGES)

      expect(res.data).toEqual({
        selectedWorkspace: {
          pages: expect.arrayContaining([
            expect.objectContaining({
              slug: expect.any(String),
              name: 'Get Started',
              icon: '⛰',
            }),
          ]),
        },
      })

      expect(res.data.selectedWorkspace.pages).toHaveLength(1)
      expect(res.data.selectedWorkspace.pages[0].blocks).toBeInstanceOf(Array)
    })
  })

  itRequiresValidationFor(SELECTED_WORKSPACE_PAGES)
})
