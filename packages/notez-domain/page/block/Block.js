class Block {
  isText() {
    return this.type === BlockTypes.Text
  }
}

const BlockTypes = {
  Text: 'TEXT',
}

Block.BlockTypes = BlockTypes

module.exports = Block
