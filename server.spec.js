describe('server.js', () => {
    test('Should be the testing environment.', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})