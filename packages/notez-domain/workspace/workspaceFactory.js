const Workspace = require('./Workspace')
const { pageFactory } = require('../page')

const workspaceFactory = {
  createDefaultWorkspaceFor(user) {
    return new Workspace({
      name: user.firstName,
      pages: [pageFactory.createGetStartedPage()],
      userId: user.id,
    })
  },
}

module.exports = workspaceFactory
