const { workspaceFactory } = require('../../../notez-domain/workspace')

module.exports = {
  async currentUser(p, _, { container, currentUserId }) {
    return await container.getUser(currentUserId)
  },

  async selectedWorkspace(p, _, { container }) {
    // temporary, will be changed
    return workspaceFactory.getStartedWorkspace()
  },
}
