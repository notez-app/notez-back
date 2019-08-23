const { testing } = require('./sequelize')

beforeEach(() => testing.cleanDatabase())

afterAll(() => testing.closeConnection())
