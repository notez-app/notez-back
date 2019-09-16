module.exports = ({ pageRepository }) => {
  return async function getPagesForWorkspace(workspaceId, { withBlocks }) {
    return await pageRepository.getAllFromWorkspace(workspaceId, { withBlocks })
  }
}
