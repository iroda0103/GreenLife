const Hash = require('../../adapters/Hash')
const buildMakeUser = require('./user')

const makeUser = buildMakeUser({Hash })

module.exports = makeUser
