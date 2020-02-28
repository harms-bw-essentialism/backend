const db = require('../data/dbConfig');

function add(user) {
    return db('users')
        .insert(user, 'id')
};

function find(user) {
    return db('users')
}

module.exports = {
    add,
    find
}