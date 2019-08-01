module.exports = ({ jwtService }) => ({
  generate: async (user) => ({
    token: jwtService.sign(String(user.id)),
  }),

  getId: (token) => jwtService.verify(token),
})
