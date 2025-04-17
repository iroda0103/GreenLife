const makeUser = require('../../entities/user')
const makeVerification = require('../../entities/verification')
const { NotFoundError, ForbiddenError } = require('../../shared/errors')

/**
 * @param {object} deps
 * @param {import('../../data-access/verificationDb')} deps.verificationDb
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../adapters/Jwt')} deps.Jwt
 */
module.exports = function makeVerifyForgotPassword({
    verificationDb,
    userDb,
    Jwt,
}) {
    return async function verifyForgotPassword({ email, code, password }) {
        const verificationInfo = await verificationDb.findLatestOne({
            email,
        })
        console.log('verificationInfo', verificationInfo);

        if (!verificationInfo) {
            throw new ForbiddenError(
                `${email} emaliga tasqidlash kodi yuborilmagan.`
            )
        }

        const verification = makeVerification(verificationInfo)
        console.log('verification', verification.getCreatedAt().getTime(),Date.now(),verification.isExpired(code));

        if (verification.isExpired(code)) {
            throw new ForbiddenError('Tasdiqlash kodining muddati tugagan.')
        }
        console.log('verification.isExpired(code)', verification.isExpired(code));

        if (!verification.matchesCode(code)) {
            throw new ForbiddenError('Tasdiqlash kodi xato.')
        }

        const userInfo = await userDb.findOne({ email })

        if (!userInfo) {
            throw new NotFoundError('Mijoz topilmadi.')
        }

        const user = makeUser({ ...userInfo, password })

        user.hashPassword()
        const result = await userDb.update({
            id: user.getId(),
            first_name: user.getFirstName(),
            last_name: user.getLastName(),
            username: user.getUsername(),
            role: user.getRole(),
            email: user.getEmail(),
            password: user.getPassword(),
            avatar:user.getAvatar()
        })

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
