const express = require('express')
const uploader = require('../middleware/uploader')
const controller = require('../controllers/book')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/search/:search', controller.searchBooks)
router.get('/sort/:sortValue', controller.sorted)
router.post('/', uploader.single('image'),  controller.create)
router.delete('/:id', controller.destroy)

module.exports = router
