const express = require('express');
const auth = require("../essentialism-auth/authMiddleWare")
const Values = require('./valuesModel');

const router = express.Router();

router.get('/', auth, (req, res) => {
    Values.find()
        .then(values => {
            res.status(200).json(values)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Could not get values.'
            })
        })
})

router.get('/:id', auth, (req, res) => {
    const {id} = req.params;
    
    Values.findById(id)
        .then(value => {
            if (value.length != 0) {
                res.status(200).json(value)
            } else {
                res.status(400).json({
                    error: 'There is no value with that id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'Could not get value.'
            })
        })
})

router.get('/user/:id', auth, (req, res) => {
    const {id} = req.params;

    Values.findUserValues(id)
        .then(values => {
            if (values.length != 0) {
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

router.post('/', auth, (req, res) => {
    const value = req.body

    Values.add(value)
        .then(info => {
            res.status(201).json(info);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to post value.'
            })
        })
})

router.put('/:id', auth, (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Values.findById(id)
        .then(info => {
            if (info) {
                Values.update(changes, id)
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

router.delete('/:id', auth, (req, res) => {
    const {id} = req.params;

    Values.remove(id)
        .then(value => {
            if (value) {
                res.status(204).json({removed: value})
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
});

module.exports = router