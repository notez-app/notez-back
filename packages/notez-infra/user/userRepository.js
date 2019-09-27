const {
  User,
  UserNotFoundError,
  EmailAlreadyInUseError,
} = require('@notez/domain/user')

module.exports = ({ sequelizeModels, cryptoService }) => ({
  async store(user) {
    try {
      let storedUser

      if (this._isPersisted(user)) {
        storedUser = await this._update(user)
      } else {
        storedUser = await this._add(user)
      }

      return fromDatabase(storedUser)
    } catch (error) {
      switch (error.name) {
        case 'SequelizeUniqueConstraintError':
          throw new EmailAlreadyInUseError()

        default:
          throw error
      }
    }
  },

  _isPersisted(user) {
    return Boolean(user.id)
  },

  async _add(user) {
    const { User } = sequelizeModels

    user = await this._withEncryptedPassword(user)

    const userAttrs = toDatabase(user)

    return await User.create(userAttrs)
  },

  async _update(user) {
    const dbUser = await this._getByFinder('findByPk', user.id)

    if (user.password) {
      user = await this._withEncryptedPassword(user)
    }

    const userAttrs = toDatabase(user)

    return await dbUser.update(userAttrs)
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
    if (!id) {
      throw new UserNotFoundError()
    }

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

  async _withEncryptedPassword(user) {
    return await user.clone({
      password: null,
      encryptedPassword: await cryptoService.hash(user.password),
    })
  },
})

const fromDatabase = (dbUser) =>
  new User({
    id: dbUser.id,
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    email: dbUser.email,
    password: null,
    encryptedPassword: dbUser.password,
    selectedWorkspaceId: dbUser.selectedWorkspaceId,
  })

const toDatabase = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  password: user.encryptedPassword,
  selectedWorkspaceId: user.selectedWorkspaceId,
})

module.exports.fromDatabase = fromDatabase
