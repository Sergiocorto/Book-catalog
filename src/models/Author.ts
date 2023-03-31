import {Schema, model} from 'mongoose'
import {IAuthor} from '../interfaces/IAuthor'

const authorSchema = new Schema<IAuthor>({
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

export default model('authors', authorSchema)