const Page = require('./Page')
const { Text } = require('./block')

const pageFactory = {
  getStartedPage() {
    return new Page({
      icon: '⛰',
      name: 'Get Started',
      blocks: [
        new Text({
          content:
            '👋 Welcome! This is a private page for you to play around with.',
        }),
        new Text({ content: '' }),
        new Text({ content: 'Give these things a try:' }),
        new Text({ content: 'Create an account' }),
        new Text({ content: 'Add a new line and insert something' }),
        new Text({
          content: 'Drag the ⋮⋮ button on the left of this to-do to reorder',
        }),
        new Text({ content: 'Right-click and delete something' }),
        new Text({ content: 'Type "/" for slash commands' }),
        new Text({ content: 'Keyboard shortcuts' }),
        new Text({ content: 'Create subpages inside a page' }),
      ],
    })
  },
  blankPage() {
    return new Page({
      name: '',
      blocks: [new Text({ content: '' })],
    })
  },
}

module.exports = pageFactory
