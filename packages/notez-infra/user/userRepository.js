const {
  User,
  UserNotFoundError,
  EmailAlreadyInUseError,
} = require('@notez/domain/user')

module.exports = ({ sequelizeModels, cryptoService }) => ({
  async add(user) {
    const userAttrs = toDatabase(user)

    userAttrs.password = await cryptoService.hash(userAttrs.password)

    try {
      const dbUser = await sequelizeModels.User.create(userAttrs)

      return fromDatabase(dbUser)
    } catch (error) {
      switch (error.name) {
        case 'SequelizeUniqueConstraintError':
          throw new EmailAlreadyInUseError()

        default:
          throw error
      }
    }
  },

  async fromAuth({ email, password }) {
    try {
      const dbUser = await sequelizeModels.User.findOne({
        where: { email },
      })

      const isPasswordRight = await cryptoService.compare(
        password,
        dbUser.password
      )

      if (!isPasswordRight) {
        throw new UserNotFoundError()
      }

      return fromDatabase(dbUser)
    } catch (error) {
      switch (error.name) {
        case 'SequelizeEmptyResultError':
          throw new UserNotFoundError()
        default:
          throw error
      }
    }
  },
})

const fromDatabase = (dbUser) =>
  new User({
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    password: dbUser.password,
  })

const toDatabase = (user) => ({
  name: user.name,
  email: user.email,
  password: user.password,
})
