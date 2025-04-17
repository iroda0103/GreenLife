const makeUser = require('../../entities/user')
const makeVerification = require("../../entities/verification")
const { BadRequestError } = require('../../shared/errors')

/**
 * @param {object} deps
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../data-access/pendingUsersDb')} deps.pendingUsersDb
 * @param {import('../../data-access/verificationDb')} deps.verificationDb
 * @param {import('../../adapters/Upload')} deps.Upload
 * @param {import('../../adapters/Message')} deps.Message
 */
module.exports = function makeAddUser({ pendingUsersDb, userDb, verificationDb, Upload, Message }) {
    return async function addUser(data) {
        try {
            console.log('USE_CASE');

            const user = makeUser({
                ...data,
            })
            console.log('user', user);

            const userInfo = await userDb.findOne({ email: user.getEmail() })

            if (userInfo) {
                throw new BadRequestError(
                    'Bunday nomli Email mavjud boshqa email tanlang'
                )
            }
            const userInfo2 = await userDb.findOne({ username: user.getUsername() })

            if (userInfo2) {
                throw new BadRequestError(
                    'Bunday nomli Username mavjud boshqa username tanlang'
                )
            }

            const verification = makeVerification({ email: data.email })

            const code = verification.getCode()

            await verificationDb.insert({
                id: verification.getId(),
                email: verification.getEmail(),
                code
            })
            await Message.send({ email: data.email, code })

            user.hashPassword()
            
            const result = await pendingUsersDb.upsert({
                id: user.getId(),
                first_name: user.getFirstName(),
                last_name: user.getLastName(),
                username:user.getUsername(),
                role: user.getRole(),
                email: user.getEmail(),
                password: user.getPassword(),
                avatar: user.getAvatar(),
            })
            console.log('PENDING_USERS ADDED',result);

            return { msg: `${data.email} pochtaga tasdiqlash kodi yuborildi. Pochtangizni tekshirib ko’ring` };
        } catch (e) {
            // await Upload.remove(data.photo)
            throw e
        }
    }
}
