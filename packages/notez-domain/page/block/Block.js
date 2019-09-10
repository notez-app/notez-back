class Block {
  isText() {
    return this.is(BlockTypes.Text)
  }

  is(blockType) {
    return this.type === blockType
  }
}

const BlockTypes = {
  Text: 'TEXT',
}

Block.BlockTypes = BlockTypes

module.exports = Block
