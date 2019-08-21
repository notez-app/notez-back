module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'notez_development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'notez_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  production: process.env.DATABASE_URL,
}
