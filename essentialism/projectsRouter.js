const express = require('express');

const Projects = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.find()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to get projects.'
            })
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Projects.findById(id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(400).json({
                    error: 'There is no project with that id'
                })
            }            
        })
        .catch(err => {
            res.status(500).json({
                error: 'Could not get project.'
            })
        })
})

module.exports = router