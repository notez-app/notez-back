const { Workspace } = require('@notez/domain/workspace')

module.exports = ({ sequelizeModels, pageRepository }) => ({
  async add(newWorkspace) {
    const { Workspace } = sequelizeModels

    const workspaceAttrs = toDatabase(newWorkspace)
    const { pages = [] } = newWorkspace

    const dbWorkspace = await Workspace.create(workspaceAttrs)

    // gotta be like this until Structure supports clone
    pages.forEach((page) => {
      page.workspaceId = dbWorkspace.id
    })

    const persistedPages = await pageRepository.addMultiple(pages)

    return fromDatabase(dbWorkspace, persistedPages)
  },
})

const toDatabase = (workspace) => ({
  name: workspace.name,
  userId: workspace.userId,
})

const fromDatabase = (dbWorkspace, pages) =>
  new Workspace({
    id: dbWorkspace.id,
    name: dbWorkspace.name,
    userId: dbWorkspace.userId,
    pages,
  })
