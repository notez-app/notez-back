const createTestClient = require('../support/createTestClient')

describe('Dummy test', () => {
  it('returns dummy response', async () => {
    const { query } = createTestClient()

    const res = await query({
      query: `
        {
          hello
        }
      `,
    })

    expect(res.data).toEqual({ hello: 'Value: world' })
  })
})
