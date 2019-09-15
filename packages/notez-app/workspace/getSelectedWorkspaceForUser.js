module.exports = ({ workspaceRepository, userRepository }) => {
  return async function getSelectedWorkspaceForUser(userId) {
    return await workspaceRepository.selectedWorkspaceForUser(userId)
  }
}
