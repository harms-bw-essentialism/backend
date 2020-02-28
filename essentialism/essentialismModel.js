const db = require('../data/dbConfig');

function findValues(id) {
    return db('values')
        .join('users', 'users.id', 'values.userId')
        .select(
            'users.id',
            'users.username',
            'values.id as valueId',
            'values.valueName', 
            'values.valueTopThree',
            'values.valueComment'
        )
        .where({userId : id})
};

module.exports = {
    findValues
}