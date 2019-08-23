const { attributes } = require('structure')
const { Page } = require('../page')

const Workspace = attributes({
  name: String,
  pages: {
    type: Array,
    itemType: Page,
    default: () => [],
  },
})(class Workspace {})

module.exports = Workspace
