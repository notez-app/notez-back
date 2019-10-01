const supertest = require('supertest')
const container = require('../../container')
const gql = String.raw

exports.createTestClient = () => {
  const { express } = container.resolve('server')

  const sendRequest = (query, { headers = {}, variables = {} } = {}) => {
    const client = supertest(express)
      .post('/graphql')
      .set('Accept', 'application/json')

    const clientWithHeaders = Object.keys(headers).reduce(
      (client, headerName) => client.set(headerName, headers[headerName]),
      client
    )

    const data = {
      query,
      variables,
    }

    return clientWithHeaders.send(data).then(({ body }) => body)
  }

  return {
    gql,
    query: sendRequest,
    mutate: sendRequest,
  }
}

exports.gql = gql
