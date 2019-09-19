module.exports = ({ workspaceRepository }) => {
  return async function getSelectedWorkspaceForUser(userId) {
    return await workspaceRepository.selectedWorkspaceForUser(userId)
  }
}
