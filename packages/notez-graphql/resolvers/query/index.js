const { pascalCase } = require('change-case')
const { workspaceFactory } = require('../../../notez-domain/workspace')

exports.Query = {
  defaultWorkspace: async (p, _, { container }) => {
    return workspaceFactory.getStartedWorkspace()
  },
}

exports.Block = {
  __resolveType: (block) => {
    return pascalCase(block.type)
  },
}
