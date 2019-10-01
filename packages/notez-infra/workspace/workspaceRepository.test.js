const _makeWorkspaceRepository = require('./workspaceRepository')
const { models: sequelizeModels } = require('../sequelize')
const factory = require('../testSupport/factory')
const { Workspace } = require('@notez/domain/workspace')

describe('Workspace :: workspaceRepository', () => {
  const makeWorkspaceRepository = (overrides) =>
    _makeWorkspaceRepository({
      sequelizeModels,
      ...overrides,
    })

  describe('#store', () => {
    describe('when pages creation succeed', () => {
      it('creates the workspace with a slug and all its pages and blocks', async () => {
        const pageRepository = {
          storeMultiple: jest.fn((pages) => pages),
        }

        const workspaceRepository = makeWorkspaceRepository({ pageRepository })

        const user = await factory.create('user')

        const workspace = await workspaceRepository.store(
          new Workspace({
            name: 'The Workspace',
            pages: [],
            userId: user.id,
          })
        )

        const workspacesCountAfter = await sequelizeModels.Workspace.count()

        expect(workspace.id).toBeTruthy()
        expect(workspace.name).toEqual('The Workspace')
        expect(workspace.slug).toEqual('the-workspace')

        expect(pageRepository.storeMultiple).toHaveBeenCalledWith([])

        expect(workspacesCountAfter).toEqual(1)
      })
    })

    describe('when pages creation fails', () => {
      it('throws error from page creation', async () => {
        const pageRepository = {
          storeMultiple: jest.fn(() => Promise.reject(new Error('WRONG'))),
        }

        const workspaceRepository = makeWorkspaceRepository({ pageRepository })

        const user = await factory.create('user')

        const workspacePromise = workspaceRepository.store(
          new Workspace({
            name: 'The Workspace',
            pages: [],
            userId: user.id,
          })
        )

        const workspacesCountAfter = await sequelizeModels.Workspace.count()

        await expect(workspacePromise).rejects.toThrow(new Error('WRONG'))

        expect(workspacesCountAfter).toEqual(0)
      })
    })
  })

  describe('#selectedWorkspaceForUser', () => {
    it('returns the workspace selected by the user', async () => {
      const user = await factory.create('user')
      const workspace = await factory.create('workspace', {
        name: 'The Workspace [TM]',
        userId: user.id,
      })

      await user.update({ selectedWorkspaceId: workspace.id })

      const workspaceRepository = makeWorkspaceRepository()

      const selectedWorkspace = await workspaceRepository.selectedWorkspaceForUser(
        user.id
      )

      expect(selectedWorkspace).toHaveProperty('name', 'The Workspace [TM]')
    })
  })
})
