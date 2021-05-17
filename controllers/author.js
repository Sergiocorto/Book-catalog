const Author = require('../models/Author')
//Get all records from the database
module.exports.getAll = async function(req, res){

    try{
        const authors = await Author.find().lean()
        res.render('authors', {
            authors: authors
        })
    }catch (e) {
        console.error(res, e)
    }
}

//Read new record in the database
module.exports.create = async function(req, res){
    const author = new Author({
        name: req.body.name,
        lastname: req.body.lastname,
        patronymic: req.body.patronymic
    })

    try{
        await author.save()
        res.status(200).json(author)
    }catch(error) {
        console.log(error)
    }
}
//editing a record
module.exports.update = async function(req, res){

    try{
        const author = await Author.findById(req.body.authorId)

        author.name = req.body.name
        author.lastname = req.body.lastname
        author.patronymic = req.body.patronymic

        await author.save()

        res.status(200).json(author)
    }catch(error) {
        console.log(error)
    }
}
//Deleting a records
module.exports.destroy = async function(req, res){

    try{
        await Author.deleteOne({_id: req.params.id})

        res.status(200).json(req.params.id)
    }catch (e) {
        console.log(e)
    }

}
//Sorted author list
module.exports.sorted = async function(req, res){
    if(req.params.sortValue === 'lastname'){
        try{
            const authors = await Author.find().sort({"lastname":1})
            res.status(200).json(authors)
        }catch (e) {
            console.error(res, e)
        }
    }
    if(req.params.sortValue === 'name'){
        try{
            const authors = await Author.find().sort({"name":1})
            res.status(200).json(authors)
        }catch (e) {
            console.error(res, e)
        }
    }
}
//Search author function
module.exports.searchAuthors = async function(req, res){
    try{
        if (req.params.search){
//Forming a regular expression based on the submitted request
            const regExp = new RegExp(req.params.search)
//We make a query in the database (we pass a regular expression as a selection parameter)
            const authors = await Author.find({
                $or: [
                    {name: regExp},
                    {lastname: regExp}
                ]
            }).lean()
            res.status(200).json(authors)
        }
    }catch (e) {
        console.error(res, e)
    }
}