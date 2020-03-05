const db = require('../data/dbConfig');
const projects = require('./projectModel');

describe('Projects model', () => {

    describe('add', () => {
        db('projects').truncate();

        it('Should insert project into db', async () => {
            await projects.add({projectName: 'Test', userId: 1});
            const projectsDB = await db('projects');
            expect(projectsDB).toHaveLength(1);
        })

        it('Should return Test', async () => {
            const projectsDB = await db('projects');
            const project = projectsDB[0];
            expect(project.projectName).toBe('Test');
        })
    });

    describe('update', () => {
        it('Should update project with description', async () => {
            await projects.update({projectDescription: 'Testing'}, 2);
            const projectsDB = await db('projects');
            const project = projectsDB[0];
            expect(project.projectDescription).toBe('Testing')
        })
    });

    describe('remove', () => {
        it('Should remove project', async () => {
            await projects.remove(2);
            const projectsDB = await db('projects');
            expect(projectsDB).toHaveLength(0);
        })
    })
})