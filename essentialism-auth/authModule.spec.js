const db = require('../data/dbConfig');
const users = require('./authModel');

describe('Users model', () => {

    describe('add', () => {
        db('users').truncate();
        
        it('Should insert user into db', async () => {
            await users.add({username: 'Aaron', password: 'pass'});
            const usersDB = await db('users');
            expect(usersDB).toHaveLength(1);
        })

        it('Should return Aaron', async () => {
            const usersDB = await db('users');
            const user = usersDB[0];
            expect(user.username).toBe('Aaron');
        })
    });

    describe('remove', () => {
        it('Should remove Aaron', async () => {
            await users.remove(2);
            const usersDB = await db('users');
            expect(usersDB).toHaveLength(0);
        })
    })
})