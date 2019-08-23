const { attributes } = require('structure')

const { Block } = require('./block')

const Page = attributes({
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
})(class Page {})

module.exports = Page
