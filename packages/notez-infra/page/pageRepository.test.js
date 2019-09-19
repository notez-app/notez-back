const _makePageRepository = require('./pageRepository')
const { models: sequelizeModels } = require('../sequelize')
const factory = require('../testSupport/factory')
const { Page, Blocks } = require('@notez/domain/page')

describe('Page :: pageRepository', () => {
  const makePageRepository = (overrides) =>
    _makePageRepository({ sequelizeModels })

  describe('#storeMultiple', () => {
    it('creates multiple pages with their blocks', async () => {
      const user = await factory.create('user')
      const workspace = await factory.create('workspace', { userId: user.id })

      const pageRepository = makePageRepository()

      const pages = await pageRepository.storeMultiple([
        new Page({
          name: 'The one page',
          icon: '1️⃣',
          workspaceId: workspace.id,
          blocks: [
            new Blocks.Text({ content: 'abc' }),
            new Blocks.Text({ content: 'def' }),
          ],
        }),
        new Page({
          name: 'The other page',
          icon: '2️⃣',
          workspaceId: workspace.id,
          blocks: [
            new Blocks.Text({ content: 'ghi' }),
            new Blocks.Text({ content: 'jkw' }),
          ],
        }),
      ])

      expect(pages).toHaveLength(2)
      expect(pages[0].id).toBeTruthy()
      expect(pages[1].id).toBeTruthy()

      expect(pages[0].blocks[0].content).toEqual('abc')
      expect(pages[0].blocks[1].content).toEqual('def')

      expect(pages[1].blocks[0].content).toEqual('ghi')
      expect(pages[1].blocks[1].content).toEqual('jkw')

      await expect(sequelizeModels.Page.count()).resolves.toEqual(2)
      await expect(sequelizeModels.Block.count()).resolves.toEqual(4)
      await expect(
        sequelizeModels.Block.count({ where: { blockSubtype: 'TEXT' } })
      ).resolves.toEqual(4)
      await expect(sequelizeModels.TextBlock.count()).resolves.toEqual(4)
    })
  })

  describe('#getAllFromWorkspace', () => {
    let pageRepository
    let workspace

    beforeEach(async () => {
      const user = await factory.create('user')
      workspace = await factory.create('workspace', { userId: user.id })

      pageRepository = makePageRepository()

      const pages = await pageRepository.storeMultiple([
        new Page({
          name: 'The one page',
          icon: '1️⃣',
          workspaceId: workspace.id,
          blocks: [
            new Blocks.Text({ content: 'abc' }),
            new Blocks.Text({ content: 'def' }),
          ],
        }),
      ])
    })

    describe('when withBlocks is true', () => {
      it('returns all the pages from a workspace with their blocks', async () => {
        const pages = await pageRepository.getAllFromWorkspace(workspace.id, {
          withBlocks: true,
        })

        expect(pages).toHaveLength(1)

        expect(pages[0].blocks[0].content).toEqual('abc')
        expect(pages[0].blocks[1].content).toEqual('def')
      })
    })

    describe('when withBlocks is false', () => {
      it('returns all the pages from a workspace without their blocks', async () => {
        const pages = await pageRepository.getAllFromWorkspace(workspace.id, {
          withBlocks: false,
        })

        expect(pages).toHaveLength(1)

        expect(pages[0].blocks).toHaveLength(0)
      })
    })
  })
})
