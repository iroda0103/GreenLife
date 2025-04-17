const mongoose = require('mongoose')
const User = require('../models/userModel')
const { ObjectId } = require('mongodb')
const config = require('../../../shared/config')
const bcrypt = require('bcryptjs')

mongoose
    .connect(
        `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}`,
        { dbName: config.db.name },
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('DB ga ulandi.')
    })
    .catch((err) => {
        console.log('DB da xatolik: ', err)
    })

const seedAdmins = [
    {
        id: new ObjectId('64dfb699c7ea86c4037cbbf8'),
        first_name: 'Iroda',
        last_name: 'Muminova',
        birthday: '01.03.2004',
        email: 'iroda3242@gmail.com',
        role: 'admin',
        password: bcrypt.hashSync('123456', 10),
        phone: 998882222220,
        gender: 'ayol',
        photo: 'default.png',
    }
]


const seedDB = async () => {
    await User.deleteMany({})
    await User.insertMany([
        ...seedAdmins
    ])

}

seedDB().then(() => {
    mongoose.connection.close()
})
