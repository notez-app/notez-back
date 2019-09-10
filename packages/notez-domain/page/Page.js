const { attributes } = require('structure')

const Block = require('./block/Block')

const Page = attributes({
  id: Number,
  icon: {
    type: String,
    empty: true,
    required: false,
  },
  name: {
    type: String,
    empty: true,
    required: true,
  },
  blocks: {
    type: Array,
    itemType: Block,
    required: true,
    default: () => [],
  },
  workspaceId: {
    type: Number,
    required: true,
  },
})(class Page {})

module.exports = Page
