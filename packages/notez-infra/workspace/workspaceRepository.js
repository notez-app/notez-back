const { Workspace } = require('@notez/domain/workspace')

module.exports = ({ sequelizeModels, pageRepository }) => ({
  async store(newWorkspace) {
    const { Workspace } = sequelizeModels

    const workspaceAttrs = toDatabase(newWorkspace)
    const { pages = [] } = newWorkspace

    const dbWorkspace = await Workspace.create(workspaceAttrs)

    const pagesWithWorkspace = pages.map((page) =>
      page.clone({
        workspaceId: dbWorkspace.id,
      })
    )

    const persistedPages = await pageRepository.storeMultiple(
      pagesWithWorkspace
    )

    return fromDatabase(dbWorkspace, persistedPages)
  },

  async selectedWorkspaceForUser(userId) {
    const { User } = sequelizeModels

    const dbUser = await User.findByPk(userId, {
      attributes: [],
      include: [User.SelectedWorkspace],
      rejectOnEmpty: true,
    })

    return fromDatabase(dbUser.selectedWorkspace)
  },
})

const toDatabase = (workspace) => ({
  name: workspace.name,
  slug: workspace.slug,
  userId: workspace.userId,
})

const fromDatabase = (dbWorkspace, pages = []) =>
  new Workspace({
    id: dbWorkspace.id,
    slug: dbWorkspace.slug,
    name: dbWorkspace.name,
    userId: dbWorkspace.userId,
    pages,
  })
