const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets');

const Essentialism = require('./essentialismModel');

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Essentialism.addUser(user)
        .then(info => {
            res.status(201).json(info);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to create user'
            })
        })
})

router.get('/values/:id', (req, res) => {
    const {id} = req.params;

    Essentialism.findValues(id)
        .then(values => {
            if (values) {
                res.status(200).json(values)
            } else {
                res.status(400).json({
                    error: 'Could not find values for user'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to get values.'
            });
            console.log(err)
        })
})

module.exports = router