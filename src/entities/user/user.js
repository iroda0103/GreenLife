const { InvalidPropertyError } = require('../../shared/errors')

module.exports = function buildMakeUser({ Hash }) {
    return function makeUser({
        id,
        first_name,
        last_name,
        role='user',
        email,
        password,
        avatar = 'default.png',
        username
    } = {}) {
        if (!last_name) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli last_name bo'lishi shart."
            )
        }

        if (!email) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli email bo'lishi shart."
            )
        }
        if (!username) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli username bo'lishi shart."
            )
        }

        if (!password) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli password bo'lishi shart."
            )
        }


        // if (!id) {
        //     throw new InvalidPropertyError(
        //         "Foydalanuvchida yaroqli id bo'lishi shart."
        //     )
        // }

        if (!role) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli rol (role) bo'lishi shart."
            )
        }

        if (!['admin', 'super_admin', 'user'].includes(role)) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli role bo'lishi kk"
            )
        }

        if (!first_name) {
            throw new InvalidPropertyError(
                "Foydalanuvchida yaroqli firts_name bo'lishi shart."
            )
        }

        return Object.freeze({
            getId: () => id,
            getFirstName: () => first_name,
            getLastName: () => last_name,
            getRole: () => role,
            getEmail: () => email,
            getUsername: () => username,
            getPassword: () => password,
            getAvatar: () => avatar,
            hashPassword,
            comparePassword,
        })


        function hashPassword() {
            password = Hash.generate(password)
        }

        function comparePassword(plain) {
            return Hash.compare(plain, password)
        }
    }
}
