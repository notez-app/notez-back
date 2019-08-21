const makeCreateUser = require('./createUser')

describe('User :: createUser', () => {
  it('delegates to user repository', async () => {
    const createUser = makeCreateUser({
      createUnitOfWork: async (fn) => await fn(),
      userRepository: {
        add: (user) => user,
      },
    })

    const user = await createUser({
      name: 'name',
      email: 'email',
      password: 'pwd',
      other: 'not used',
    })

    expect(user).toHaveProperty('name', 'name')
    expect(user).toHaveProperty('email', 'email')
    expect(user).toHaveProperty('password', 'pwd')
    expect(user).not.toHaveProperty('other')
  })
})
