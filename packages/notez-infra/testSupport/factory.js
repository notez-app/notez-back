const { factory, SequelizeAdapter } = require('factory-girl')
const loadFactories = require('./factories')

const factoryGirl = new factory.FactoryGirl()
factoryGirl.setAdapter(new SequelizeAdapter())

module.exports = loadFactories(factoryGirl)
