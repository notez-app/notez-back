const workspaceFactory = require('./workspaceFactory')

describe('Workspace :: workspaceFactory', () => {
  describe('#createDefaultWorkspaceFor', () => {
    it('creates a workspace with user first name and userId', () => {
      const user = {
        id: 42,
        firstName: 'Myself',
      }

      const workspace = workspaceFactory.createDefaultWorkspaceFor(user)

      expect(workspace).toHaveProperty('userId', 42)
      expect(workspace).toHaveProperty('name', 'Myself')
    })
  })
})
