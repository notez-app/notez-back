const { testing } = require('@notez/infra/sequelize')

beforeEach(() => testing.cleanDatabase())

afterAll(() => testing.closeConnection())
