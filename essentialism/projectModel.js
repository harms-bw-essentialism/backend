const db = require('../data/dbConfig');

function find() {
    return db('projects')
};

function findById(id) {
    return db('projects')
        .where({id})
}

module.exports = {
    find,
    findById
}