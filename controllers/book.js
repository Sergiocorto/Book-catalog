const fs = require('fs')
const Book = require('../models/Book')
const Author = require('../models/Author')
//Get all records from the database
module.exports.getAll = async function(req, res){
    try{
        const books = await Book.find().lean()
        const authors = await Author.find().lean()
        res.render('books', {
            books: books,
            authors: authors
        })
    }catch (e){
        console.error(res, e)
    }
}
//Read new record in the database
module.exports.create = async function(req, res){

    const authorsId = req.body.authorsId.split(',')
    const authors = await Author.find({
                            _id: authorsId
                        }).lean()

    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename,
        authors: authors
    })

    try{
        await book.save()
        res.status(200).json(book)
    }catch(error) {
        console.log(error)
    }
}
//deleting a record
module.exports.destroy = async function(req, res){

    const book = await Book.findById({_id: req.params.id})

    fs.unlink('public/uploads/'+book.image, async function (err){
        if (err){
            console.log(err)
        } else {
            try{
                await Book.deleteOne({_id: req.params.id})

                res.status(200).json(book)
            }catch (e) {
                console.log(e)
            }
        }
    })
}

//Sorted books list
module.exports.sorted = async function(req, res){
    try{
        const books = await Book.find().sort({'title' : 1})
        res.status(200).json(books)
    }catch (e) {
        console.error(res, e)
    }
}

//Search book function
module.exports.searchBooks = async function(req, res){
    try{
        if (req.params.search){
//Forming a regular expression based on the submitted request
            const regExp = new RegExp(req.params.search)
//We make a query in the database (we pass a regular expression as a selection parameter)
            const books = await Book.find({title: regExp}).lean()
            res.status(200).json(books)
        }
    }catch (e) {
        console.error(res, e)
    }
}