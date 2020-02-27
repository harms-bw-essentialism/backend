const express = require('express');

const EssentialismRouter = require('./essentialism/essentialismRouter');

const server = express();

server.use(express.json());
server.use('/api/essentialism', EssentialismRouter);

module.exports = server;