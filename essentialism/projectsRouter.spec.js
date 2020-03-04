const request = require('supertest');
const server = require('../server');
const db = require('../data/dbConfig');

describe('Project routes', () => {
    describe('Post /', () => {
        it('Should return 201', async (done) => {
            await db('projects').truncate();

            request(server)
                .post('/api/essentialism/projects')
                .send({projectName: 'Test', userId: 1})
                .expect(201,done);
        })
    });

    describe('Get /', () => {
        it('Should return 200', (done) => {
            request(server)
                .get('/api/essentialism/projects')
                .expect(200, done);
        })
        it('Should return json', () => {
            request(server)
                .get('/api/essentialism/projects')
                .expect('Content-Type', /json/);
        })
    });

    describe('Get /:id', () => {
        it('Should return 200', (done) => {
            request(server)
                .get('/api/essentialism/projects/1')
                .expect(200, done)
        })
        it('Should return 400', (done) => {
            request(server)
                .get('/api/essentialism/projects/4')
                .expect(400, done)
        })        
    });

    describe('Get /user/:id', () => {
        it('Should return 200', (done) => {            
            request(server)
                .get('/api/essentialism/projects/user/1')
                .expect(200, done)
        })
        it('Should return 400', (done) => {
            request(server)
                .get('/api/essentialism/projects/user/10')
                .expect(400, done)
        })
    });

    describe('Put /:id', () => {
        it('Should return 204', (done) => {
            request(server)
                .put('/api/essentialism/projects/1')
                .send({
                    projectName: 'Test',
                    projectDescription: 'Testing', 
                    userId: 1
                })
                .expect(204, done)
        })
        it('Should return 404', (done) => {
            request(server)
                .put('/api/essentialism/projects/10')
                .send({
                    projectName: 'Test',
                    projectDescription: 'Testing', 
                    userId: 1
                })
                .expect(404, done)
        })
    })

    describe('Delete /:id', () => {
        it('Should return 204', (done) => {
            request(server)
                .delete('/api/essentialism/projects/1')
                .expect(204, done)
        })   
        it('Should return 404', (done) => {
            request(server)
            .delete('/api/essentialism/projects/10')
            .expect(404, done)
        })     
    })
})