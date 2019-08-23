const makeLoginUser = require('./loginUser')

describe('Auth :: loginUser', () => {
  it('delegates to userRepository', async () => {
    const loginUser = makeLoginUser({
      userRepository: {
        fromAuth: () => 'logged user',
      },
    })

    const user = await loginUser({ email: 'email', password: 'password' })

    expect(user).toEqual('logged user')
  })
})
