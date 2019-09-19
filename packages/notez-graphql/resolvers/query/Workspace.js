const fields = require('graphql-fields')

module.exports = {
  async pages(workspace, _, { container }, info) {
    const requestedBlocks = Boolean(fields(info).blocks)

    return await container.getPagesForWorkspace(workspace.id, {
      withBlocks: requestedBlocks,
    })
  },
}
