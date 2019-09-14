const Workspace = require('./Workspace')
const { pageFactory } = require('../page')

const workspaceFactory = {
  getStartedWorkspaceFor(user) {
    return new Workspace({
      name: 'Get Started',
      pages: [pageFactory.getStartedPage()],
      userId: user.id,
    })
  },
}

module.exports = workspaceFactory
