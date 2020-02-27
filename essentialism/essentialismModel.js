const db = require('../data/dbConfig');

function findValues(id) {
    return db('values')
        .join('users', 'users.id', 'values.user_id')
        .select(
            'user.id',
            'users.username',
            'values.id',
            'values.name', 
            'values.topThree',
            'values.comment'
        )
        .where({user_id: id})
};

module.exports = {
    findValues
}