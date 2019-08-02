const Page = require('./Page')
const { Text } = require('./block')

const pageFactory = {
  blankPage() {
    return new Page({
      name: '',
      blocks: [new Text({ content: '' })],
    })
  },
}

module.exports = pageFactory
