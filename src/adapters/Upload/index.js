const fs = require('fs/promises')
const path = require('path')
const multer = require('multer')

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})

// Create the multer instance
const upload = multer({ storage: storage })
upload.remove = (filename) => {
    return fs.unlink(path.join(process.cwd(), 'uploads', filename))
}

module.exports = upload
