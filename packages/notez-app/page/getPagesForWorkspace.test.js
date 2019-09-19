const makeGetPagesForWorkspace = require('./getPagesForWorkspace')

describe('Page :: getPagesForWorkspace', () => {
  it('delegates to page repository', async () => {
    const pageRepository = {
      getAllFromWorkspace: jest.fn(() => 'pages'),
    }

    const getPagesForWorkspace = makeGetPagesForWorkspace({
      pageRepository,
    })

    const pages = await getPagesForWorkspace(1, { withBlocks: true })

    expect(pages).toEqual(pages)
    expect(pageRepository.getAllFromWorkspace).toHaveBeenCalledWith(1, {
      withBlocks: true,
    })
  })
})
