const nodemailer = require('nodemailer')

async function sendMessage({ email, code }) {
    async function main() {
        let transporter = nodemailer.createTransport({
            host: 'localhost', // host get from cpanel
            service: 'gmail',
            secure: true,
            port: 465, // port get from cpanel
            auth: {
                user: 'iroda3242@gmail.com', // generated ethereal user
                pass: 'lert mnvr xzym aopc', // generated ethereal password seiljnkivbuuqdjh 
            },
        })

        let info = await transporter.sendMail({
            from: 'iroda3242@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'GREEN LIFE', // Subject line
            text: 'Hello world?',
            html: `<h4>Tasdiqlash kodi: ${code}</h4>`,
        })

        console.log('Message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    }
    main().catch(console.error)
}

const Message = Object.freeze({ send: sendMessage })

module.exports = Message
