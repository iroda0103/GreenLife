const userDb = require('../../data-access/usersDb')
const pendingUsersDb = require('../../data-access/pendingUsersDb')
const verificationDb = require('../../data-access/verificationDb')
const Message = require('../../adapters/Message')
const Jwt = require('../../adapters/Jwt')
const Upload = require('../../adapters/Upload')

const makeAddUser = require('./addUser')
const makeListUser = require('./listUser')
const makeShowUser = require('./showUser')
const makeRemoveUser = require('./removeUser')
const makeLoginUser = require('./loginUser')
const makeEditUser = require('./editUser')
const makeVerification = require('./verifyUser')
const makeForgotUser = require('./forgotUser')
const makeVerifyForgotPassword = require('./verifyForgotPassword')

const addUser = makeAddUser({ pendingUsersDb,userDb, verificationDb, Upload, Message })
const listUser = makeListUser({ userDb })
const showUser = makeShowUser({ userDb })
const removeUser = makeRemoveUser({ userDb })
// const loginUser = makeLoginUser({ userDb, verificationDb, Message })
const loginUser = makeLoginUser({ userDb, Jwt })
const forgotUser = makeForgotUser({ userDb, verificationDb, Message })
const editUser = makeEditUser({ userDb })
const verifyUser = makeVerification({  verificationDb,pendingUsersDb, userDb, Jwt})
const verifyForgotPassword = makeVerifyForgotPassword({
    userDb,
    verificationDb,
    Jwt,
})

const userUseCases = Object.freeze({
    addUser,
    listUser,
    showUser,
    removeUser,
    userDb,
    loginUser,
    editUser,
    verifyUser,
    forgotUser,
    verifyForgotPassword,
})

module.exports = userUseCases
