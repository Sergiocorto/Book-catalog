const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    patronymic: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('authors', authorSchema)