const supertest = require('supertest')
const container = require('../../container')
const gql = String.raw

module.exports = () => {
  const { express } = container.resolve('server')

  const sendRequest = ({ headers = {}, ...request }) => {
    const client = supertest(express)
      .post('/graphql')
      .set('Accept', 'application/json')

    const clientWithHeaders = Object.keys(headers).reduce(
      (client, headerName) => client.set(headerName, headers[headerName]),
      client
    )

    const data = {
      query: request.query || request.mutation,
      variables: request.variables || {},
    }

    return clientWithHeaders
      .send(data)
      .expect(200)
      .then(({ body }) => body)
  }

  return {
    gql,
    query: sendRequest,
    mutate: sendRequest,
  }
}
