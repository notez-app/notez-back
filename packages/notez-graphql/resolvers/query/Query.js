module.exports = {
  async currentUser(_p, _, { container, currentUserId }) {
    return await container.getUser(currentUserId)
  },

  async selectedWorkspace(_p, _, { container, currentUserId }) {
    return await container.getSelectedWorkspaceForUser(currentUserId)
  },
}
