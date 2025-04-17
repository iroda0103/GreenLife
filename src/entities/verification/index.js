const Code = require('../../adapters/Code')
const buildMakeVerification = require('./verification')

const makeVerification = buildMakeVerification({ Code })

module.exports = makeVerification