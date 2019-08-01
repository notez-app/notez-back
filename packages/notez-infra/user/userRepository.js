const { User } = require('@notez/domain/user')

module.exports = ({ sequelizeModels, cryptoService }) => ({
  async add(user) {
    const userAttrs = toDatabase(user)

    userAttrs.password = await cryptoService.hash(userAttrs.password)

    const dbUser = await sequelizeModels.User.create(userAttrs)

    return fromDatabase(dbUser)
  },

  async fromAuth({ email, password }) {
    const hashedPassword = await cryptoService.hash(password)

    const dbUser = await sequelizeModels.User.findOne({
      where: {
        email,
        password: hashedPassword,
      },
      rejectOnEmpty: true,
    })

    return fromDatabase(dbUser)
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
