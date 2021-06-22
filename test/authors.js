let mongoose = require("mongoose");
let Author = require('../models/Author');

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('Authors', () => {
    describe('/POST authors', () => {
        it('it should POST a author', (done) => {
            let author = {
                name: "Test",
                lastname: "Test",
                patronymic: "Test"
            }
            chai.request(server)
                .post('/api/authors')
                .send(author)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('lastname');
                    res.body.should.have.property('patronymic');
                    res.body.should.have.property('_id');

                    res.body.name.should.equals(author.name);
                    res.body.lastname.should.equals(author.lastname);
                    res.body.patronymic.should.equals(author.patronymic);

                    done();
                });
        });
    });

    describe('/PATCH authors', () => {
        it('it should PATCH a author', (done) => {
            let author = {
                authorId: "60d1c2ea8a038b2e7c4ecff4",
                name: "Test2",
                lastname: "Test2",
                patronymic: "Test2"
            }
            chai.request(server)
                .patch('/api/authors')
                .send(author)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('lastname');
                    res.body.should.have.property('patronymic');
                    res.body.should.have.property('_id');

                    res.body.name.should.equals(author.name);
                    res.body.lastname.should.equals(author.lastname);
                    res.body.patronymic.should.equals(author.patronymic);
                    res.body._id.should.equals(author.authorId);

                    done();
                });
        });
    });

    describe('/DELETE authors', () => {
        it('it should DELETE a author', (done) => {
            let authorId= "60d1c639678b4f14f86f321d"
            chai.request(server)
                .delete('/api/authors/' + authorId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('string');
                    res.body.should.equals(authorId);

                    done();
                });
        });
    });
});