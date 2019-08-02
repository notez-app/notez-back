const { pascalCase } = require('change-case')

exports.Query = {
  defaultWorkspace: async (p, _, { container }) => {
    return {
      name: 'Main Workspace',
      pages: [
        {
          name: 'My first document',
          blocks: [
            {
              type: 'TEXT',
              content: 'Something',
            },
          ],
        },
      ],
    }
  },
}

exports.Block = {
  __resolveType: (block) => {
    return pascalCase(block.type)
  },
}
