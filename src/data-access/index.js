const mongoose = require('mongoose')
// const config = require('../shared/config')
const usersDb = require('./usersDb')
const verificationDb = require('./verificationDb')
const pendingUsersDb = require('./pendingUsersDb')

// module.exports = {
//     connect() {
//         return mongoose.connect(
//             // 'mongodb://mongo:bQTXQawmgiMnnCaeH8ZO@containers-us-west-34.railway.app:6973'
//             `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}`,
//             { dbName: config.db.name }
//         )
//     },
//     usersDb,
// }
const config = require("../shared/config");

module.exports = {
  connect() {
    return mongoose.connect(
      `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
    );
  },
  usersDb
};