const { Page, Blocks } = require('@notez/domain/page')

module.exports = ({ sequelizeModels }) => ({
  async storeMultiple(pages) {
    const { Page } = sequelizeModels

    const pagesAttrs = pages.map(toDatabase)

    const dbPages = await Page.bulkCreate(pagesAttrs, {
      include: [...Page.BlockSubtypes],
      returning: true,
    })

    return dbPages.map((dbPage) => fromDatabase(dbPage, { withBlocks: true }))
  },

  async getAllFromWorkspace(workspaceId, { withBlocks = true } = {}) {
    const { Page } = sequelizeModels

    const dbPages = await Page.findAll({
      where: { workspaceId },
      include: withBlocks ? [...Page.BlockSubtypes] : [],
      rejectOnEmpty: true,
    })

    return dbPages.map((dbPage) => fromDatabase(dbPage, { withBlocks }))
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

const fromDatabase = (dbPage, { withBlocks }) =>
  new Page({
    id: dbPage.id,
    uuid: cleanUuid(dbPage.uuid),
    name: dbPage.name,
    icon: dbPage.icon,
    ...(withBlocks ? { blocks: fromDatabaseBlocks(dbPage) } : null),
  })

const cleanUuid = (uuid) => uuid.replace(/\-/g, '')

const fromDatabaseBlocks = (dbPage) => {
  const textBlocks = dbPage.textBlocks.map(fromDatabaseTextBlock)

  return [...textBlocks]
}

const fromDatabaseTextBlock = ({ id, content }) =>
  new Blocks.Text({ id, content })
