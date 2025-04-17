const makeUser = require('../../entities/user')
const makeVerification = require('../../entities/verification')
const { UnauthorizedError } = require('../../shared/errors')

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../data-access/verificationDb')} deps.verificationDb
 */
module.exports = function makeLoginUser({ userDb,Jwt }) {
    return async function loginUser({email,password}) {

        const userInfo = await userDb.findOne({ email })

        if (!userInfo) {
            throw new NotFoundError('User topilmadi.')
        }

        const user = makeUser({ ...userInfo, password })

        user.hashPassword()

        const payload = {
            user: {
                id: user.getId(),
                role: user.getRole(),
            },
        }

        const token = Jwt.generateToken(payload)

        return {
            token,
            role: user.getRole(),
        }
    }
}
