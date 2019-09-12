const { pascalCase } = require('change-case')

module.exports = {
  __resolveType: (block) => {
    return pascalCase(block.type)
  },
}
