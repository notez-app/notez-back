const { attributes } = require('structure')

const Block = require('./Block')

const Text = attributes({
  content: {
    type: String,
    required: true,
    empty: true,
  },
})(
  class Text extends Block {
    constructor(attrs) {
      super(attrs)

      this.type = Block.BlockTypes.Text
    }
  }
)

module.exports = Text
