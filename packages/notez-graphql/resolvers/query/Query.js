const { UserNotLoggedError } = require('../../errors')
const { workspaceFactory } = require('../../../notez-domain/workspace')

module.exports = {
  async currentUser(p, _, { container, currentUserId }) {
    if (!currentUserId) {
      // temporary? Could be replaced by a directive
      throw new UserNotLoggedError()
    }

    return await container.getUser(currentUserId)
  },

  async selectedWorkspace(p, _, { container }) {
    // temporary, will be changed
    return workspaceFactory.getStartedWorkspace()
  },
}
