const Workspace = require('./Workspace')
const { pageFactory } = require('../page')

const workspaceFactory = {
  blankWorkspace({ name }) {
    return new Workspace({
      name,
      pages: [pageFactory.blankPage()],
    })
  },
  getStartedWorkspace() {
    return new Workspace({
      name: 'Get Started',
      pages: [pageFactory.getStartedPage()],
    })
  },
}

module.exports = workspaceFactory
