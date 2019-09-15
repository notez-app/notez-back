const { Page, Blocks } = require('@notez/domain/page')

module.exports = ({ sequelizeModels }) => ({
  async storeMultiple(pages) {
    const { Page } = sequelizeModels

    const pagesAttrs = pages.map(toDatabase)

    const dbPages = await Page.bulkCreate(pagesAttrs, {
      include: [...Page.BlockSubtypes],
      returning: true,
    })

    return dbPages.map(fromDatabase)
  },
})

const toDatabase = (page) => ({
  icon: page.icon,
  name: page.name,
  workspaceId: page.workspaceId,
  ...toDatabaseBlocks(page.blocks || []),
})

const toDatabaseBlocks = (blocks) => ({
  textBlocks: blocks.filter((block) => block.isText()).map(toDatabaseTextBlock),
})

const toDatabaseTextBlock = ({ content }) => ({ content })

const fromDatabase = (dbPage) =>
  new Page({
    id: dbPage.id,
    name: dbPage.name,
    icon: dbPage.icon,
    blocks: fromDatabaseBlocks(dbPage),
  })

const fromDatabaseBlocks = (dbPage) => {
  const textBlocks = dbPage.textBlocks.map(fromDatabaseTextBlock)

  return [textBlocks]
}

const fromDatabaseTextBlock = ({ id, content }) =>
  new Blocks.Text({ id, content })
