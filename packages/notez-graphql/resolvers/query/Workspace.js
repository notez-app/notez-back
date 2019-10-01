const fields = require('graphql-fields')
const pageSerializer = require('../serializers/pageSerializer')

module.exports = {
  async pages(workspace, _, { container }, info) {
    const requestedBlocks = Boolean(fields(info).blocks)

    const pages = await container.getPagesForWorkspace(workspace.id, {
      withBlocks: requestedBlocks,
    })

    return pages.map(pageSerializer.serialize)
  },
}
