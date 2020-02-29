const db = require('../data/dbConfig');

function find() {
    return db('values')
}

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

function remove(id) {
    return db('values')
        .where({id})
        .delete()
}

module.exports = {
    find,
    findUserValues,
    findById,
    addValue,
    updateValue,
    remove
}