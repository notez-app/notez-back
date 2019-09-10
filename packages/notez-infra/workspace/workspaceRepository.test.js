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

  describe('#add', () => {
    describe('when pages creation succeed', () => {
      it('creates the workspace with all its pages and blocks', async () => {
        const pageRepository = {
          addMultiple: jest.fn((pages) => pages),
        }

        const workspaceRepository = makeWorkspaceRepository({ pageRepository })

        const user = await factory.create('user')

        const workspace = await workspaceRepository.add(
          new Workspace({
            name: 'The Workspace',
            pages: [],
            userId: user.id,
          })
        )

        const workspacesCountAfter = await sequelizeModels.Workspace.count()

        expect(workspace.id).toBeTruthy()
        expect(workspace.name).toEqual('The Workspace')

        expect(pageRepository.addMultiple).toHaveBeenCalledWith([])

        expect(workspacesCountAfter).toEqual(1)
      })
    })

    describe('when pages creation fails', () => {
      it('throws error from page creation', async () => {
        const pageRepository = {
          addMultiple: jest.fn(() => Promise.reject(new Error('WRONG'))),
        }

        const workspaceRepository = makeWorkspaceRepository({ pageRepository })

        const user = await factory.create('user')

        const workspacePromise = workspaceRepository.add(
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
})
