const express = require('express');

const Essentialism = require('./essentialismModel');

const router = express.Router();

router.get('/values', (req, res) => {
    Essentialism.find()
        .then(values => {
            res.status(200).json(values)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Could not get values.'
            })
        })
})

router.get('/values/user/:id', (req, res) => {
    const {id} = req.params;

    Essentialism.findUserValues(id)
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
});

router.post('/values', (req, res) => {
    const value = req.body

    Essentialism.addValue(value)
        .then(info => {
            res.status(201).json(info);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to post value.'
            })
        })
})

router.put('/values/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Essentialism.findById(id)
        .then(info => {
            if (info) {
                Essentialism.updateValue(changes, id)
                    .then(update => {
                        res.status(204).json(update)
                    })
            } else {
                res.status(404).json({
                    error: 'There is no value with that id.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to update value.'
            })
            console.log(err)
        })
});

router.delete('/values/:id', (req, res) => {
    const {id} = req.params;

    Essentialism.remove()
        .then(value => {
            if (value) {
                res.json({removed: deleted})
            } else {
                res.status(404).json({
                    error: 'Could not find value with given id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'Could not delete value.'
            })
        })
})

module.exports = router