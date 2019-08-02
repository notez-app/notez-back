const Workspace = require('./Workspace')
const { pageFactory } = require('../page')

const workspaceFactory = {
  blankWorkspace({ name }) {
    return new Workspace({
      name,
      pages: [pageFactory.blankPage()],
    })
  },
}

module.exports = workspaceFactory
