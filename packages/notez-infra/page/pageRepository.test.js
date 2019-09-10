const _makePageRepository = require('./pageRepository')
const { models: sequelizeModels } = require('../sequelize')
const factory = require('../testSupport/factory')
const { Page, Blocks } = require('@notez/domain/page')

describe('Page :: pageRepository', () => {
  const makePageRepository = (overrides) =>
    _makePageRepository({ sequelizeModels })

  describe('#addMultiple', () => {
    it('creates multiple pages with their blocks', async () => {
      const user = await factory.create('user')
      const workspace = await factory.create('workspace', { userId: user.id })

      const pageRepository = makePageRepository()

      const pages = await pageRepository.addMultiple([
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

      await expect(sequelizeModels.Page.count()).resolves.toEqual(2)
      await expect(sequelizeModels.Block.count()).resolves.toEqual(4)
      await expect(
        sequelizeModels.Block.count({ where: { blockSubtype: 'TEXT' } })
      ).resolves.toEqual(4)
      await expect(sequelizeModels.TextBlock.count()).resolves.toEqual(4)
    })
  })
})
