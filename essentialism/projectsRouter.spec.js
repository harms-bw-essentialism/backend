const request = require('supertest');
const server = require('../server');
const db = require('../data/dbConfig');

describe('Project routes', () => {
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
            await db('projects').truncate();

            request(server)
                .post('/api/essentialism/projects')
                .set('authorization', token)
                .send({projectName: 'Test', userId: 1})
                .expect(201,done);
        })
        it('Should insert project into db', async () => {
            const projectsDB = await db('projects');
            expect(projectsDB).toHaveLength(1);
        })
        it('Should return Test', async () => {
            const projectsDB = await db('projects');
            const project = projectsDB[0];
            expect(project.projectName).toBe('Test');
        })
    });

    describe('Get /', () => {
        it('Should return 200', (done) => {
            request(server)
                .get('/api/essentialism/projects')
                .set('authorization', token)
                .expect(200, done);
        })
        it('Should return json', () => {
            request(server)
                .get('/api/essentialism/projects')
                .set('authorization', token)
                .expect('Content-Type', /json/);
        })
    });

    describe('Get /:id', () => {       
        it('Should return 200', (done) => {
            request(server)
                .get('/api/essentialism/projects/1')
                .set('authorization', token)
                .expect(200, done)
        })
        it('Should return 400', (done) => {
            request(server)
                .get('/api/essentialism/projects/4')
                .set('authorization', token)
                .expect(400, done)
        })        
    });
    
    describe('Delete /:id', () => {
        it('Should return 204', (done) => {
            request(server)
                .delete('/api/essentialism/projects/1')
                .set('authorization', token)
                .expect(204, done)
        })   
        it('Should return 404', (done) => {
            request(server)
            .delete('/api/essentialism/projects/10')
            .set('authorization', token)
            .expect(404, done)
        })  
        it('Should remove project', async () => {
            const projectsDB = await db('projects');
            expect(projectsDB).toHaveLength(0);
        })   
    })
})