const db = require('../data/dbConfig');

function add(user) {
    return db('users')
        .insert(user, 'id')
};

function find(user) {
    return db('users')
};

function remove(id) {
    return db('users')
        .delete()
        .where({id})
}

module.exports = {
    add,
    find,
    remove
}