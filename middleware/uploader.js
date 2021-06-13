const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename(req, file, cb) {
        const name = req.body.title
        const type = path.extname(file.originalname)
        cb(null, `${name}${type}`)
    }
})

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})