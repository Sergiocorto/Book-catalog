const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const multer = require('multer')
const mongoose = require('mongoose')
const path = require('path')
const $ = require('jquery')

const bookRouter = require('./route/books')
const authorRouter = require('./route/authors')

const handlebars = require('express-handlebars')

const app = express()

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const PORT = config.get('port') || 5000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.render('general')
})
app.use('/books', bookRouter)
app.use('/authors', authorRouter)
app.use('/api/books', bookRouter)
app.use('/api/authors', authorRouter)

async function start() {
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    }catch(e){
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()