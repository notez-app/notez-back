const { createTestClient, gql } = require('./createTestClient')

const userAttributes = {
  firstName: 'The',
  lastName: 'User',
  email: 'me@email.com',
  password: '12345',
}

exports.gql = gql

const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
    }
  }
`

exports.CREATE_USER = CREATE_USER

exports.createUser = async function createUser(user) {
  user = {
    ...userAttributes,
    ...user,
  }

  const testClient = createTestClient()

  const { mutate, query } = testClient

  const res = await mutate(CREATE_USER, { variables: user })

  const { token } = res.data.createUser

  expect(token).toBeTruthy()

  return {
    ...testClient,
    mutate: withToken(token, mutate),
    query: withToken(token, query),
    token,
    res,
  }
}

const withToken = (token, action) => (query, options = {}) =>
  action(query, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.http || {}).headers,
    },
  })

exports.itRequiresValidationFor = (queryOrMutation, options = {}) => {
  describe('when user is not logged', () => {
    it('returns an error', async () => {
      const { query } = createTestClient()

      const res = await query(queryOrMutation, options)

      expect(res.data).toBeNull()

      expect(res.errors).toEqual([
        expect.objectContaining({
          message: 'User is not logged',
        }),
      ])
    })
  })
}
