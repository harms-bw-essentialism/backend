const db = require('../data/dbConfig');

function addUser(user) {
    return db('users')
        .insert(user, 'id')
}

module.exports = {
    addUser
}