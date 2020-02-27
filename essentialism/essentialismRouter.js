const express = require('express');

const Essentialism = require('./essentialismModel');

const router = express.Router();

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