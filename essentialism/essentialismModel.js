const db = require('../data/dbConfig');

function findUserValues(id) {
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

function findById(id) {
    return db('values')
        .where({id})
}

function addValue(value) {
    return db('values')
        .insert(value)
}

function updateValue(value, id) {
    return db('values')
        .where({id})
        .update(value)
}

module.exports = {
    findUserValues,
    findById,
    addValue,
    updateValue
}