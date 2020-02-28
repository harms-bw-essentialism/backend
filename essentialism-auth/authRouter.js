const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets');

const Essentialism = require('./authModel');

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Essentialism.add(user)
        .then(info => {
            res.status(201).json(info);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to create user'
            })
            console.log(err)
        })
})

router.get('/', (req, res) => {
    Essentialism.find()
        .then(info => {
            res.status(200).json(info);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to get users'
            })
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Essentialism.remove(id)
        .then(info => {
            if (info) {
                res.json({removed: info})
            } else {
                res.status(404).json({
                    error: 'Could not find user with given id'
                })
            }
        })
        .catch(info => {
            res.status(500).json({
                error: 'Failed to delete user'
            })
        })
})

module.exports = router;