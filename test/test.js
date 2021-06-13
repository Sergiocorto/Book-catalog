const authorRoute = require ('../route/authors')
const chai = require ('chai')
const chaiHTTP = require ('chai-http')

chai.should()
chai.use(chaiHTTP)

describe('Autors API`s', () => {

    describe('Test POST route /api/authors', () =>{
        it('It should return author added to database', (done) =>{
            chai.request(authorRoute)
            .post

        })
    })
})    