const request = require('supertest');
const server = require('../server');
const db = require('../data/dbConfig');

describe('Value routes', () => {
    let token;

    beforeAll((done) => {
        request(server)
            .post('/api/essentialism/user/login')
            .send({username: 'Aaron', password: 'pass'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });

        request(server)
            .post('/api/essentialism/user/login')
            .send({username: 'Aaron', password: 'pass'})
            .expect(200, done)
    })

    describe('Post /', () => {
        it('Should return 201', async (done) => {
            await db('values').truncate();

            request(server)
                .post('/api/essentialism/values')
                .set('authorization', token)
                .send({valueName: 'Test', valueTopThree: true, userId: 1})
                .expect(201, done);
        })
    });

    describe('Get /', () => {
        it('Should return 200', (done) => {
            request(server)
                .get('/api/essentialism/values')
                .set('authorization', token)
                .expect(200, done);
        })
        it('Should return json', () => {
            request(server)
                .get('/api/essentialism/values')
                .set('authorization', token)
                .expect('Content-Type', /json/);
        })
    });

    describe('Get /:id', () => {
        it('Should return 200', (done) => {
            request(server)
                .get('/api/essentialism/values/1')
                .set('authorization', token)
                .expect(200, done)
        })
        it('Should return 400', (done) => {
            request(server)
                .get('/api/essentialism/values/4')
                .set('authorization', token)
                .expect(400, done)
        })        
    });

    describe('Put /:id', () => {
        it('Should return 204', (done) => {
            request(server)
                .put('/api/essentialism/values/1')
                .set('authorization', token)
                .send({
                    valueName: 'Test', 
                    valueTopThree: true, 
                    valueComment: 'Test Comment',
                    userId: 1
                })
                .expect(204, done);
        })
        it('Should have length 1', async () => {
            const valueDB = await db('values');
            expect(valueDB).toHaveLength(1);
        })   
        it('Should return Test', async () => {
            const valuesDB = await db('values');
            const value = valuesDB[0];
            expect(value.valueName).toBe('Test')
        })        
    })

    describe('Delete /:id', () => {
        it('Should return 204', (done) => {
            request(server)
                .delete('/api/essentialism/values/1')
                .set('authorization', token)
                .expect(204, done)
        })   
        it('Should return 404', (done) => {
            request(server)
            .delete('/api/essentialism/values/10')
            .set('authorization', token)
            .expect(404, done)
        })     
    })
})