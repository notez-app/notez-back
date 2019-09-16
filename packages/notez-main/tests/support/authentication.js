const createTestClient = require('./createTestClient')

const userAttributes = {
  name: 'Me',
  email: 'me@email.com',
  password: '12345',
}

exports.createUser = async function createUser(user) {
  user = {
    ...userAttributes,
    ...user,
  }

  const testClient = createTestClient()

  const { gql, mutate, query } = testClient

  const res = await mutate({
    mutation: gql`
      mutation CreateUser($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, email: $email, password: $password) {
          token
        }
      }
    `,
    variables: user,
  })

  const { token } = res.data.createUser

  expect(token).toBeTruthy()

  return {
    ...testClient,
    mutate: withToken(token, mutate),
    query: withToken(token, query),
    token,
  }
}

const withToken = (token, action) => (request) =>
  action({
    ...request,
    http: {
      ...request.http,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(request.http || {}).headers,
      },
    },
  })
