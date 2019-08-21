const { pascalCase } = require('change-case')
const { UserNotLoggedError } = require('../../errors')
const { workspaceFactory } = require('../../../notez-domain/workspace')

exports.Query = {
  currentUser: async (p, _, { container, currentUserId }) => {
    if (!currentUserId) {
      // temporary? Could be replaced by a directive
      throw new UserNotLoggedError()
    }

    return await container.getUser(currentUserId)
  },

  defaultWorkspace: async (p, _, { container }) => {
    // temporary, will be changed
    return workspaceFactory.getStartedWorkspace()
  },
}

exports.Block = {
  __resolveType: (block) => {
    return pascalCase(block.type)
  },
}
