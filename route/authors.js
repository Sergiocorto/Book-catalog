const express = require('express')
const multer = require('multer')
const upload = multer()
const controller = require('../controllers/author')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/search/:search', controller.searchAuthors)
router.get('/sort/:sortValue', controller.sorted)
router.post('/', upload.none(), controller.create)
router.patch('/', upload.none(), controller.update)
router.delete('/:id', controller.destroy)


module.exports = router