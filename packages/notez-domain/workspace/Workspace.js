const { attributes } = require('structure')
const { Page } = require('../page')

const Workspace = attributes({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  pages: {
    required: true,
    type: Array,
    itemType: Page,
    default: () => [],
  },
  userId: { type: Number, required: true },
})(class Workspace {})

module.exports = Workspace
