const User = require('./User')

describe('User', () => {
  describe('#withSelectedWorkspace', () => {
    it('returns a copy with the workspace set as selected', () => {
      const user = new User()

      const userWithSelectedWorkspace = user.withSelectedWorkspace({ id: 42 })

      expect(userWithSelectedWorkspace).toHaveProperty(
        'selectedWorkspaceId',
        42
      )
    })
  })
})
