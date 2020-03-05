const db = require('../data/dbConfig');
const values = require('./valuesModel');

describe('Values model', () => {
    beforeAll(() => {
        db('values').truncate();
    })

    describe('add', () => {
        it('Should insert value into db', async () => {
            await values.add({valueName: 'Test', valueTopThree: true, userId: 1});
            const valuesDB = await db('values');
            expect(valuesDB).toHaveLength(1);
        })

        it('Should return Test', async () => {
            const valuesDB = await db('values');
            const value = valuesDB[0];
            expect(value.valueName).toBe('Test')
        })
    });

    // describe('update', () => {
    //     it('Should update values with comment', async () => {
    //         await values.update({
    //             valueName: 'Test', 
    //             valueTopThree: true, 
    //             valueComment: 'Test Comment',
    //             userId: 1
    //         }, 1);
    //         const valuesDB = await db('values');
    //         const values = valuesDB[0];
    //         expect(values.valueComment).toBe('Test Comment')
    //     })
    // })
})