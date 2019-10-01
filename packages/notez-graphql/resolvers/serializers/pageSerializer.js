const slug = require('sluglife')

exports.serialize = function serializePage(page) {
  const serializedPage = page.toJSON()

  return {
    ...serializedPage,
    slug: createSlug(page),
  }
}

const createSlug = (page) => slug(`${page.name}-${page.uuid}`, { lower: true })
