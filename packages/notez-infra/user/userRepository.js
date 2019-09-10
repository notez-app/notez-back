const {
  User,
  UserNotFoundError,
  EmailAlreadyInUseError,
} = require('@notez/domain/user')

module.exports = ({ sequelizeModels, cryptoService }) => ({
  async add(user) {
    const { User } = sequelizeModels

    const userAttrs = toDatabase(user)

    userAttrs.password = await cryptoService.hash(userAttrs.password)

    try {
      const dbUser = await User.create(userAttrs)

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
    const dbUser = await this._getByFinder('findOne', { where: { email } })

    const isPasswordRight = await cryptoService.compare(
      password,
      dbUser.password
    )

    if (!isPasswordRight) {
      throw new UserNotFoundError()
    }

    return fromDatabase(dbUser)
  },

  async getById(id) {
    const dbUser = await this._getByFinder('findByPk', id)

    return fromDatabase(dbUser)
  },

  async _getByFinder(finderName, ...criteria) {
    try {
      const { User } = sequelizeModels
      return await User[finderName](...criteria)
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
