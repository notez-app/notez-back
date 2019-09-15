module.exports = {
  async currentUser(p, _, { container, currentUserId }) {
    return await container.getUser(currentUserId)
  },

  async selectedWorkspace(p, _, { container, currentUserId }) {
    return container.getSelectedWorkspaceForUser(currentUserId)
  },
}
