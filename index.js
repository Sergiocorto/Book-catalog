const express = require('express')
const bodyParser = require('body-parser')
const port = require('./keys/index').PORT
const mongoUri = require('./keys/index').MONGO_URI
const mongoose = require('mongoose')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')

const bookRouter = require('./route/books')
const authorRouter = require('./route/authors')

const handlebars = require('express-handlebars')

const app = express()

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



const PORT = port || 5000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.render('general')
})

app.use(helmet())
app.use(compression())
app.use('/books', bookRouter)
app.use('/authors', authorRouter)
app.use('/api/books', bookRouter)
app.use('/api/authors', authorRouter)

async function start() {
    try{
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    }catch(e){
        console.log('Server error', e.message)
        process.exit(1)
    }
}
module.exports = app
start()

