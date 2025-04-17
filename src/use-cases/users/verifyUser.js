const makeUser = require('../../entities/user')
const makeVerification = require('../../entities/verification')
const {
    NotFoundError,
    ConflictError,
    ForbiddenError,
} = require('../../shared/errors')

/**
 * @param {object} deps
 * @param {import('../../data-access/verificationDb')} deps.verificationDb
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../data-access/pendingUsersDb')} deps.pendingUsersDb
 * @param {import('../../adapters/Jwt')} deps.Jwt
 */
module.exports = function makeVerifyClient({ verificationDb, pendingUsersDb, userDb, Jwt }) {
    return async function verifyClient({ email, code }) {
        const verificationInfo = await verificationDb.findLatestOne({
            email,
        })

        if (!verificationInfo) {
            throw new ForbiddenError(
                `${email} emaliga tasqidlash kodi yuborilmagan.`
            )
        }

        const verification = makeVerification(verificationInfo)

        if (verification.isExpired(code)) {
            throw new ForbiddenError('Tasdiqlash kodining muddati tugagan.')
        }

        if (!verification.matchesCode(code)) {
            throw new ForbiddenError('Tasdiqlash kodi xato.')
        }

        const userInfo = await pendingUsersDb.findOne({ email })

        if (!userInfo) {
            throw new NotFoundError('Mijoz topilmadi.')
        }

        const user = makeUser(userInfo)

        const result = await userDb.insert({
            id: user.getId(),
            first_name: user.getFirstName(),
            last_name: user.getLastName(),
            role: user.getRole(),
            email: user.getEmail(),
            username:user.getUsername(),
            password: user.getPassword(),
            avatar: user.getAvatar(),
        })

        await pendingUsersDb.remove({id:user.getId()})

        return result
    }
}
