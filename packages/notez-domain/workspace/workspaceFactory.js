const Workspace = require('./Workspace')
const { pageFactory } = require('../page')

const workspaceFactory = {
  getStartedWorkspace(attrs) {
    return new Workspace({
      name: 'Get Started',
      pages: [pageFactory.getStartedPage()],
      ...attrs,
    })
  },
}

module.exports = workspaceFactory
