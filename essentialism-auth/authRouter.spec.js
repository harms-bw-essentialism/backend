const request = require('supertest');
const server = require('../server');
const db = require('../data/dbConfig');

describe('Auth routes', () => {
    describe('Post /register', () => {
        it('Should return 201', async (done) => {  
            await db('users').truncate();

            request(server)
                .post('/api/essentialism/user/register')
                .send({username: 'Aaron', password: 'pass'})
                .expect(201, done);
            request(server)
                .post('/api/essentialism/user/register')
                .send({username: 'David', password: 'pass'})
                .expect(201, done);
        })
        it('Should return json', async () => {
            request(server)
                .post('/api/essentialism/user/register')
                .send({username:'David', password: 'pass'})
                .expect('Content-Type', /json/)
        })
    });

    describe('Post /login', () => {
        it('Should return 200', async (done) => {
            request(server)
                .post('/api/essentialism/user/login')
                .send({username: 'Aaron', password: 'pass'})
                .expect(200, done)
        })
        it('Should return json', () => {
            request(server)
                .post('/api/essentialism/user/login')
                .send({username: 'Aaron', password: 'pass'})
                .expect('Content-Type', /json/)
        })
    })

    let token;

    beforeAll((done) => {
        request(server)
            .post('/api/essentialism/user/login')
            .send({username: 'Aaron', password: 'pass'})
            .end((err, res) => {
                token = res.body.token;
                done();
            })
    })

    describe('Get /', () => {
        it('Should return 401 with no auth', (done) => {
            request(server)
                .get('/api/essentialism/user')
                .expect(401, done)
        })
        it('Should return 200 with auth', (done) => {
            request(server)
                .get('/api/essentialism/user')
                .set('authorization', token)
                .expect(200, done)
        })
        it('Should have 2 users', async () => {
            const userDB = await db('users');
            expect(userDB).toHaveLength(2);
        })
    })

    describe('Delete /:id', () => {
        it('Should return 200', (done) => {
            request(server)
                .delete('/api/essentialism/user/2')
                .set('authorization', token)
                .expect(200, done)
        })
        it('Return an empty db.users', async () => {
            const usersDB = await db('users');
            expect(usersDB).toHaveLength(1);                
        })
    })
})