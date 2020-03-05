const request = require('supertest');
const server = require('../server');
const db = require('../data/dbConfig');

describe('Value routes', () => {
    describe('Post /', () => {
        it('Should return 201', async (done) => {
            await db('values').truncate();

            request(server)
                .post('/api/essentialism/values')
                .send({valueName: 'Test', valueTopThree: true, userId: 1})
                .expect(201, done);
        })
    });

    describe('Get /', () => {
        it('Should return 200', (done) => {
            request(server)
                .get('/api/essentialism/values')
                .expect(200, done);
        })
        it('Should return json', () => {
            request(server)
                .get('/api/essentialism/values')
                .expect('Content-Type', /json/);
        })
    });

    describe('Get /:id', () => {
        it('Should return 200', (done) => {
            request(server)
                .get('/api/essentialism/values/1')
                .expect(200, done)
        })
        it('Should return 400', (done) => {
            request(server)
                .get('/api/essentialism/values/4')
                .expect(400, done)
        })        
    });

    describe('Put /:id', () => {
        it('Should return 204', (done) => {
            request(server)
                .put('/api/essentialism/values/1')
                .send({
                    valueName: 'Test', 
                    valueTopThree: true, 
                    valueComment: 'Test Comment',
                    userId: 1
                })
                .expect(204, done)
        })
    })

    describe('Delete /:id', () => {
        it('Should return 204', (done) => {
            request(server)
                .delete('/api/essentialism/values/1')
                .expect(204, done)
        })   
        it('Should return 404', (done) => {
            request(server)
            .delete('/api/essentialism/values/10')
            .expect(404, done)
        })     
    })
})